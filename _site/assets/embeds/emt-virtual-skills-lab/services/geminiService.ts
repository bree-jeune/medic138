import { GoogleGenAI, GenerateContentResponse, Type, Modality, LiveServerMessage } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Skill, UserLevel, Scenario } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateScenario = async (skill: Skill, level: UserLevel, previousScenario?: Scenario): Promise<Scenario> => {
  const ai = getAI();
  
  const currentPhase = previousScenario ? previousScenario.phase + 1 : 1;
  const contextPrompt = previousScenario 
    ? `SCENARIO CHAINING ACTIVATED: This is PHASE ${currentPhase}. 
       PREVIOUS PHASE RECAP: The patient had ${previousScenario.chiefComplaint}. Narrative was: ${previousScenario.narrative}.
       Now, generate a logical clinical deterioration or MEDICAL COMPLICATION (e.g., shock, respiratory failure, cardiac event) that follows the initial trauma.
       The new skill requirement is ${skill.name}.`
    : `INITIAL PHASE: Generate a realistic TRAUMA or primary emergency case related to ${skill.name}.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a highly descriptive, realistic EMT scenario for ${skill.name} at ${level} difficulty. 
    ${contextPrompt}
    
    Variety Requirements:
    - Presentations: Vary patient age, gender, and social context.
    - Medical History: Include relevant/complicating PMH (e.g., on blood thinners, diabetic, COPD).
    - Environment: Describe complex surroundings (e.g., high-traffic roadside, cramped bathroom, outdoor sporting event, rainy night).
    - Distractions: At higher levels, suggest a specific situational distraction (e.g., "Partner drops bag", "Flashlight flickers").

    Return as JSON.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          patientDemographics: { type: Type.STRING },
          chiefComplaint: { type: Type.STRING },
          vitals: {
            type: Type.OBJECT,
            properties: {
              hr: { type: Type.STRING },
              bp: { type: Type.STRING },
              rr: { type: Type.STRING },
              spO2: { type: Type.STRING }
            }
          },
          narrative: { type: Type.STRING },
          requiredSkill: { type: Type.STRING },
          environmentalFactors: { type: Type.STRING },
          phase: { type: Type.INTEGER },
          totalPhases: { type: Type.INTEGER },
          suggestedDistraction: { type: Type.STRING }
        },
        required: ['id', 'patientDemographics', 'chiefComplaint', 'vitals', 'narrative', 'requiredSkill', 'phase', 'totalPhases']
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const analyzeSkillWithContext = async (
  base64Image: string,
  skill: Skill,
  userLevel: UserLevel,
  scenario: Scenario | null,
  isRealTime: boolean = false,
  distractionContext: string = ""
): Promise<{ text: string; score?: number; assessmentType?: string }> => {
  const ai = getAI();
  const contextText = scenario 
    ? `PHASE ${scenario.phase} OF ${scenario.totalPhases}. SCENARIO: ${scenario.narrative}. ENV: ${scenario.environmentalFactors}` 
    : "Standard skills practice.";
  
  // Skill specific coaching prompts
  let skillPrompt = "";
  if (skill.id === 'bleeding-control') {
    skillPrompt = "GESTURE FOCUS: Look for stacked hands for direct pressure or windlass twisting for tourniquet. Confirm placement 2-3 inches above wound if TQ.";
  }

  const prompt = isRealTime 
    ? `REAL-TIME COACHING: Analyze technique for "${skill.name}" at ${userLevel} difficulty. ${contextText}. ${skillPrompt} ${distractionContext} Give 1 quick correction (max 10 words).`
    : `FULL DEBRIEF: Final assessment for "${skill.name}". ${contextText}. Analyze overall performance including gesture accuracy and response to distractions. Return JSON { "feedbackText", "score", "assessmentType" }.`;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: isRealTime ? 'gemini-flash-lite-latest' : 'gemini-3-pro-preview',
    contents: {
      parts: [
        ...(base64Image ? [{ inlineData: { mimeType: 'image/jpeg', data: base64Image } }] : []),
        { text: prompt }
      ]
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.35,
      ...(isRealTime ? {} : { responseMimeType: "application/json" })
    }
  });

  if (isRealTime) return { text: response.text || "" };
  const json = JSON.parse(response.text || "{}");
  return {
    text: json.feedbackText || "Analysis complete.",
    score: json.score || 0,
    assessmentType: json.assessmentType || "Developing"
  };
};

export const speakText = async (text: string): Promise<Uint8Array | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Clinical instructor: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio ? decode(base64Audio) : null;
  } catch (err) { return null; }
};

export function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) { bytes[i] = binaryString.charCodeAt(i); }
  return bytes;
}

export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number = 24000, numChannels: number = 1): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) { channelData[i] = dataInt16[i * numChannels + channel] / 32768.0; }
  }
  return buffer;
}
