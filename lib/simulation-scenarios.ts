import { NREMTSimulation } from "./simulation-models";
import { generateVitals } from "./simulation-vitals";

export const buildOverdoseScenario = (): NREMTSimulation => {
  const age = Math.floor(Math.random() * 40) + 18; // 18-57
  const initialVitals = generateVitals("OpiateOverdose", age);

  return {
    id: "nremt-od-001",
    title: "Unresponsive Male - Suspected Overdose",
    targetCertification: ["EMT", "AEMT", "Paramedic"],
    clinicalDomain: "Medical/Obstetrics/Gynecology",
    estimatedDurationMs: 900000, // 15 mins
    sourceFootnotes: [
      "National Association of Emergency Medical Technicians (NAEMT). (2023). Prehospital Trauma Life Support (PHTLS) 10th Edition.",
      "American Heart Association. (2020). Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.",
    ],
    walkthrough: {
      title: "Managing the Apneic OD",
      competenciesMatched: [
        {
          source: "AHA",
          standardId: "2020 BLS Guidelines",
          description:
            "Recognize respiratory arrest and initiate rescue breathing prior to naloxone administration.",
        },
        {
          source: "National EMS Educational Standards",
          standardId: "Toxicology - Opioids",
          description:
            "Assess for opiate toxidrome (CNS depression, respiratory depression, miosis).",
        },
      ],
      learningObjectives: [
        "Prioritize airway management (BVM) over immediate naloxone administration.",
        "Identify indications for mechanical ventilation in the setting of severe bradypnea.",
        "Understand the pharmacology and peak onset of intranasal vs intravenous naloxone.",
      ],
      clinicalGuidelines: [
        "AHA guidelines emphasize that BVM ventilation is the immediate priority for profound respiratory depression (< 8/min) or apnea.",
        "Naloxone should be titrated to restore adequate respiratory drive, not necessarily to full consciousness, to prevent acute withdrawal.",
      ],
    },
    generateSimulation: () => ({
      initialVitals,
      phases: {
        Dispatch: {
          phaseName: "Dispatch",
          scenarioText:
            'You are dispatched to a residential address for a 28-year-old male reported as "unconscious and not waking up" by a roommate. Caller states he was fine 30 minutes ago.',
          availableActions: [
            {
              id: "disp01",
              text: "Request law enforcement to secure the scene",
              isCorrect: true,
              timeCostMs: 10000,
              competencyRef: {
                source: "NREMT",
                standardId: "Scene Size-Up",
                description:
                  "Ensure scene safety on unknown medicals / suspected ODs.",
              },
              feedback: "Appropriate. PD should clear unknown unresponsives.",
            },
            {
              id: "disp02",
              text: "Upgrade to Code 3 (lights/sirens)",
              isCorrect: true,
              timeCostMs: 0,
              competencyRef: {
                source: "NREMT",
                standardId: "Dispatch Phase",
                description: "Determine response mode.",
              },
              feedback: "Appropriate given reported unconsciousness.",
            },
            {
              id: "disp03",
              text: "Advise caller to pour water on patient",
              isCorrect: false,
              timeCostMs: 5000,
              competencyRef: {
                source: "NREMT",
                standardId: "Dispatch Phase",
                description: "PMD instructions.",
              },
              feedback: "Inappropriate and potentially dangerous.",
            },
          ],
          requiredActionsToAdvance: ["disp01"],
        },
        PreArrival: {
          phaseName: "PreArrival",
          scenarioText:
            "You are En Route. Response time is 4 minutes. What is your primary anticipation strategy?",
          availableActions: [
            {
              id: "pre01",
              text: "Prepare the jump bag with BVM, suction, and Naloxone on top",
              isCorrect: true,
              timeCostMs: 0,
              competencyRef: {
                source: "NREMT",
                standardId: "En Route Phase",
                description: "Anticipate equipment needs.",
              },
              feedback:
                "Correct preparation for suspected OD/respiratory arrest.",
            },
            {
              id: "pre02",
              text: "Review protocols for cardiac arrest only",
              isCorrect: false,
              timeCostMs: 60000,
              competencyRef: {
                source: "AHA",
                standardId: "BLS",
                description: "Differentiate respiratory vs cardiac arrest.",
              },
              feedback: "Too narrow. Prepare for airway compromise first.",
            },
            {
              id: "pre03",
              text: "Prepare mechanical CPR device (LUCAS)",
              isCorrect: false,
              timeCostMs: 30000,
              competencyRef: {
                source: "AHA",
                standardId: "BLS",
                description: "Resource management",
              },
              feedback:
                "Premature. Focus on respiratory failure initial tools.",
            },
          ],
          requiredActionsToAdvance: ["pre01"],
        },
        SceneArrival: {
          phaseName: "SceneArrival",
          scenarioText:
            "PD has cleared the scene. You enter a very messy bedroom to find the patient supine on the floor. He appears cyanotic.",
          availableActions: [
            {
              id: "arr01",
              text: "Perform primary assessment (XABC)",
              isCorrect: true,
              timeCostMs: 30000,
              competencyRef: {
                source: "NREMT",
                standardId: "Primary Assessment",
                description:
                  "Assess exsanguination, airway, breathing, circulation.",
              },
              feedback: "Correct.",
            },
            {
              id: "arr02",
              text: "Demand ID from the bystander",
              isCorrect: false,
              timeCostMs: 45000,
              competencyRef: {
                source: "NREMT",
                standardId: "Patient Assessment",
                description: "Prioritize patient over info gathering.",
              },
              feedback: "Delays critical patient care.",
            },
          ],
          requiredActionsToAdvance: ["arr01"],
        },
        Assessment: {
          phaseName: "Assessment",
          scenarioText:
            "Patient is unresponsive to painful stimuli (GCS 3). He has pinpoint pupils. Airway is patent but respirations are extremely shallow and agonal. Carotid pulse is palpable but slow.",
          assessmentData: {
            avatarImageUrl: "", // Epic LDA
            auscultationPoints: [
              {
                anatomicalLocation: "RUL",
                soundFileUrl: "",
                correctFindingText: "Minimal air movement, no wheezes",
              },
              {
                anatomicalLocation: "LLL",
                soundFileUrl: "",
                correctFindingText: "Diminished bases bilaterally",
              },
            ],
            bpConfig: {
              actualSystolic: initialVitals.bp.systolic,
              actualDiastolic: initialVitals.bp.diastolic,
              marginOfErrorAllowed: 4,
              korotkoffSoundUrl: "",
            },
            visualFindings: [
              "Cyanosis to lips and nailbeds",
              "Track marks on left antecubital",
              "Pinpoint pupils (1mm)",
            ],
          },
          availableActions: [
            {
              id: "assess01",
              text: "Check blood glucose",
              isCorrect: true,
              timeCostMs: 60000,
              competencyRef: {
                source: "NREMT",
                standardId: "Altered Mental Status",
                description: "Rule out hypoglycemia.",
              },
              feedback: "BGL is 110 mg/dL.",
            },
            {
              id: "assess02",
              text: "Check orthostatic blood pressure",
              isCorrect: false,
              timeCostMs: 90000,
              competencyRef: {
                source: "NREMT",
                standardId: "Patient Assessment",
                description: "Appropriate vs inappropriate tests.",
              },
              feedback: "Contraindicated in an unresponsive patient.",
            },
          ],
          requiredActionsToAdvance: [],
        },
        Treatment: {
          phaseName: "Treatment",
          scenarioText: `Respiratory rate is ${initialVitals.rr}/min. SpO2 is ${initialVitals.spo2}%.`,
          assessmentData: {
            avatarImageUrl: "", // Epic LDA
            auscultationPoints: [
              {
                anatomicalLocation: "RUL",
                soundFileUrl: "",
                correctFindingText: "Minimal air movement, no wheezes",
              },
              {
                anatomicalLocation: "LLL",
                soundFileUrl: "",
                correctFindingText: "Diminished bases bilaterally",
              },
            ],
            bpConfig: {
              actualSystolic: initialVitals.bp.systolic,
              actualDiastolic: initialVitals.bp.diastolic,
              marginOfErrorAllowed: 4,
              korotkoffSoundUrl: "",
            },
            visualFindings: [
              "Cyanosis to lips and nailbeds",
              "Track marks on left antecubital",
              "Pinpoint pupils (1mm)",
            ],
          },
          availableActions: [
            {
              id: "tx01",
              text: "Administer Naloxone 2mg IN immediately",
              isCorrect: false,
              timeCostMs: 60000,
              competencyRef: {
                source: "AHA",
                standardId: "2020 BLS",
                description: "Ventilate before antagonizing.",
              },
              feedback:
                "Incorrect priority. AHA guidelines require BVM ventilation for severe hypoxia/apnea before drawing up and administering Naloxone to prevent anoxic brain injury and flash pulmonary edema.",
            },
            {
              id: "tx02",
              text: "Insert NPA and initiate BVM ventilation 1 breath every 6 seconds",
              isCorrect: true,
              timeCostMs: 60000,
              competencyRef: {
                source: "AHA",
                standardId: "2020 BLS",
                description: "Rescue breathing.",
              },
              feedback:
                "Correct! BVM is the absolute first priority for an apneic/bradypneic patient.",
            },
            {
              id: "tx03",
              text: "Administer Naloxone 2mg IN AFTER initiating BVM",
              isCorrect: true,
              timeCostMs: 60000,
              competencyRef: {
                source: "NAEMT",
                standardId: "AMLS",
                description: "Titrate to respiratory drive.",
              },
              feedback: "Correct order of operations.",
            },
            {
              id: "tx04",
              text: "Administer Romazicon (Flumazenil)",
              isCorrect: false,
              timeCostMs: 45000,
              competencyRef: {
                source: "Pharm",
                standardId: "Toxidromes",
                description: "Correct antagonist selection.",
              },
              feedback:
                "Incorrect. Flumazenil is for benzos and lowers seizure threshold. Patient has opiate signs.",
            },
          ],
          requiredActionsToAdvance: ["tx02", "tx03"],
        },
        TransportDecision: {
          phaseName: "TransportDecision",
          scenarioText:
            "Patient's respiratory rate has increased to 12. SpO2 is 96%. He is beginning to moan and withdraw from pain.",
          availableActions: [
            {
              id: "trans01",
              text: "Load and go - Emergent (Code 3) transport",
              isCorrect: false,
              timeCostMs: 120000,
              competencyRef: {
                source: "NREMT",
                standardId: "Transport Decision",
                description: "Determine transport priority.",
              },
              feedback:
                "Unnecessary. Airway is secured and respirations are restored. Non-emergent transport is safer.",
            },
            {
              id: "trans02",
              text: "Routine (Code 2) transport",
              isCorrect: true,
              timeCostMs: 120000,
              competencyRef: {
                source: "NREMT",
                standardId: "Transport Decision",
                description: "Determine transport priority.",
              },
              feedback:
                "Appropriate. The immediate life threat has been reversed.",
            },
            {
              id: "trans03",
              text: "Allow patient to refuse transport (RMA)",
              isCorrect: false,
              timeCostMs: 300000,
              competencyRef: {
                source: "Legal",
                standardId: "Refusal of Care",
                description: "Assess capacity post-naloxone.",
              },
              feedback:
                "Patient cannot refuse immediately after Naloxone due to risk of re-sedation and altered capacity.",
            },
          ],
          requiredActionsToAdvance: ["trans02"],
        },
        Destination: {
          phaseName: "Destination",
          scenarioText:
            "En route to the facility. Patient is now opening eyes and asking what happened.",
          availableActions: [
            {
              id: "dest01",
              text: "Transport to closest appropriate Emergency Department",
              isCorrect: true,
              timeCostMs: 600000,
              competencyRef: {
                source: "NREMT",
                standardId: "Facility Selection",
                description: "Select appropriate facility.",
              },
              feedback: "Correct.",
            },
          ],
          requiredActionsToAdvance: ["dest01"],
        },
      },
    }),
  };
};

export const buildAsthmaScenario = (): NREMTSimulation => {
  const age = Math.floor(Math.random() * 20) + 12; // 12-32
  const initialVitals = generateVitals("Asthma", age);

  return {
    id: "nremt-resp-001",
    title: "Severe Respiratory Distress - Asthma Exacerbation",
    targetCertification: ["EMT", "AEMT", "Paramedic"],
    clinicalDomain: "Airway, Respiration & Ventilation",
    estimatedDurationMs: 1200000, // 20 mins
    sourceFootnotes: [
      "National Association of Emergency Medical Technicians (NAEMT). (2020). Advanced Medical Life Support (AMLS) 3rd Edition.",
    ],
    walkthrough: {
      title: "Managing Status Asthmaticus",
      competenciesMatched: [
        {
          source: "National EMS Educational Standards",
          standardId: "Respiratory Emergencies",
          description:
            "Recognize signs of impending respiratory failure in asthma.",
        },
      ],
      learningObjectives: [
        "Differentiate between mild distress and impending respiratory failure.",
        "Properly sequence albuterol/ipratropium and epinephrine if indicated.",
        'Identify "silent chest" as a critical finding requiring immediate positive pressure ventilation.',
      ],
      clinicalGuidelines: [
        'A "silent chest" with high work of breathing means no air is moving; albuterol nebulizers will not reach the lower airways.',
        "Intramuscular Epinephrine 1:1,000 is indicated for severe asthma exacerbations refractory to continuous albuterol or in impending failure.",
      ],
    },
    generateSimulation: () => ({
      initialVitals,
      phases: {
        Dispatch: {
          phaseName: "Dispatch",
          scenarioText:
            "Dispatched for a 19-year-old female with difficulty breathing. Caller is the school nurse.",
          availableActions: [
            {
              id: "disp01",
              text: "Acknowledge call and respond Code 3",
              isCorrect: true,
              timeCostMs: 0,
              competencyRef: {
                source: "NREMT",
                standardId: "Dispatch",
                description: "Response.",
              },
              feedback: "Appropriate.",
            },
            {
              id: "disp02",
              text: "Advise caller to have patient breathe into a paper bag",
              isCorrect: false,
              timeCostMs: 10000,
              competencyRef: {
                source: "NREMT",
                standardId: "Medical Command",
                description: "Appropriate instructions.",
              },
              feedback:
                "Dangerous. This is for hyperventilation syndrome, not asthma.",
            },
          ],
          requiredActionsToAdvance: ["disp01"],
        },
        PreArrival: {
          phaseName: "PreArrival",
          scenarioText: "En route. ETA is 6 minutes.",
          availableActions: [
            {
              id: "pre01",
              text: "Prepare nebulizer and Albuterol 2.5mg",
              isCorrect: true,
              timeCostMs: 0,
              competencyRef: {
                source: "NREMT",
                standardId: "En Route",
                description: "Preparation.",
              },
              feedback: "Appropriate anticipation.",
            },
            {
              id: "pre02",
              text: "Prepare Amiodarone for anticipated VTach",
              isCorrect: false,
              timeCostMs: 30000,
              competencyRef: {
                source: "AHA",
                standardId: "ACLS",
                description: "Anticipate correct emergencies.",
              },
              feedback:
                "Incorrect focus. Prepare airway/respiratory tools first.",
            },
          ],
          requiredActionsToAdvance: ["pre01"],
        },
        SceneArrival: {
          phaseName: "SceneArrival",
          scenarioText:
            "You arrive at the school nurse's office. Patient is tripodding on a cot. She can only speak in 1-2 word sentences. \"Can't... breathe.\" She is visibly using accessory muscles.",
          availableActions: [
            {
              id: "arr01",
              text: "Ensure Scene Safety and BSI",
              isCorrect: true,
              timeCostMs: 5000,
              competencyRef: {
                source: "NREMT",
                standardId: "Scene Size Up",
                description: "BSI.",
              },
              feedback: "Always.",
            },
            {
              id: "arr02",
              text: "Run to patient without BSI",
              isCorrect: false,
              timeCostMs: 0,
              competencyRef: {
                source: "NREMT",
                standardId: "Scene Size Up",
                description: "BSI.",
              },
              feedback: "Critical failure. Always take standard precautions.",
            },
          ],
          requiredActionsToAdvance: ["arr01"],
        },
        Assessment: {
          phaseName: "Assessment",
          scenarioText:
            "Patient is lethargic, head bobbing. Respiratory rate is 40. HR is 140.",
          assessmentData: {
            avatarImageUrl: "",
            auscultationPoints: [
              {
                anatomicalLocation: "RUL",
                soundFileUrl: "",
                correctFindingText: "No air movement heard (Silent Chest)",
              },
              {
                anatomicalLocation: "LLL",
                soundFileUrl: "",
                correctFindingText: "No air movement heard (Silent Chest)",
              },
            ],
            bpConfig: {
              actualSystolic: initialVitals.bp.systolic,
              actualDiastolic: initialVitals.bp.diastolic,
              marginOfErrorAllowed: 4,
              korotkoffSoundUrl: "",
            },
            visualFindings: [
              "Severe supraclavicular retractions",
              "Cyanosis around lips",
              "Lethargy",
            ],
          },
          availableActions: [
            {
              id: "assess01",
              text: "Listen to lung sounds",
              isCorrect: true,
              timeCostMs: 15000,
              competencyRef: {
                source: "NAEMT",
                standardId: "AMLS",
                description: "Auscultate for wheezing/diminished sounds.",
              },
              feedback: "No air movement heard. This is Status Asthmaticus.",
            },
            {
              id: "assess02",
              text: "Apply 12-Lead ECG before treating airway",
              isCorrect: false,
              timeCostMs: 60000,
              competencyRef: {
                source: "NREMT",
                standardId: "Primary Assessment",
                description: "Prioritize ABCs.",
              },
              feedback:
                "Incorrect priority. Airway and breathing are the immediate life threats.",
            },
          ],
          requiredActionsToAdvance: ["assess01"],
        },
        Treatment: {
          phaseName: "Treatment",
          scenarioText:
            'The patient shows a "silent chest" and is becoming lethargic. SpO2 is 82% on room air.',
          assessmentData: {
            avatarImageUrl: "",
            auscultationPoints: [
              {
                anatomicalLocation: "RUL",
                soundFileUrl: "",
                correctFindingText: "No air movement heard (Silent Chest)",
              },
              {
                anatomicalLocation: "LLL",
                soundFileUrl: "",
                correctFindingText: "No air movement heard (Silent Chest)",
              },
            ],
            bpConfig: {
              actualSystolic: initialVitals.bp.systolic,
              actualDiastolic: initialVitals.bp.diastolic,
              marginOfErrorAllowed: 4,
              korotkoffSoundUrl: "",
            },
            visualFindings: [
              "Severe supraclavicular retractions",
              "Cyanosis around lips",
              "Lethargy",
            ],
          },
          availableActions: [
            {
              id: "tx01",
              text: "Administer Albuterol 2.5mg via nebulizer mask",
              isCorrect: false,
              timeCostMs: 60000,
              competencyRef: {
                source: "NAEMT",
                standardId: "AMLS",
                description:
                  "Recognize failure of aerosolized meds in silent chest.",
              },
              feedback:
                "Incorrect. She is not moving enough air to pull nebulized medication into her lungs.",
            },
            {
              id: "tx02",
              text: "Administer Epinephrine 0.3mg (1:1,000) IM",
              isCorrect: true,
              timeCostMs: 30000,
              competencyRef: {
                source: "NAEMT",
                standardId: "AMLS",
                description: "IM Epi for severe asthma.",
              },
              feedback:
                "Correct! Systemic bronchodilation is required immediately for a silent chest.",
            },
            {
              id: "tx03",
              text: "Apply CPAP",
              isCorrect: false,
              timeCostMs: 60000,
              competencyRef: {
                source: "NAEMT",
                standardId: "AMLS",
                description: "Contraindications for CPAP.",
              },
              feedback:
                "Lethargy and dropping respiratory drive (head bobbing) are contraindications for CPAP. She needs BVM if she crashes.",
            },
            {
              id: "tx04",
              text: "Administer Nitroglycerin 0.4mg SL",
              isCorrect: false,
              timeCostMs: 30000,
              competencyRef: {
                source: "Pharm",
                standardId: "Bronchodilators",
                description: "Select correct medication.",
              },
              feedback:
                "Incorrect. NTG is a vasodilator for cardiac ischemia, not a bronchodilator for asthma.",
            },
          ],
          requiredActionsToAdvance: ["tx02"],
        },
        TransportDecision: {
          phaseName: "TransportDecision",
          scenarioText:
            "Following the IM Epinephrine, her lung sounds return to tight, diffuse expiratory wheezing. She is more alert.",
          availableActions: [
            {
              id: "trans01",
              text: "Move to ambulance and transport Code 3",
              isCorrect: true,
              timeCostMs: 60000,
              competencyRef: {
                source: "NREMT",
                standardId: "Transport Decision",
                description: "Emergent transport for Status Asthmaticus.",
              },
              feedback: "Appropriate. She is still very sick.",
            },
            {
              id: "trans02",
              text: "Have patient sign refusal (RMA) since she feels better",
              isCorrect: false,
              timeCostMs: 120000,
              competencyRef: {
                source: "Legal",
                standardId: "Refusals",
                description: "Identify ongoing life threats.",
              },
              feedback:
                "Extremely dangerous. Epi is short acting and she will absolutely rebound into respiratory failure.",
            },
          ],
          requiredActionsToAdvance: ["trans01"],
        },
        Destination: {
          phaseName: "Destination",
          scenarioText:
            "En route, you can now administer nebulized Albuterol/Ipratropium.",
          availableActions: [
            {
              id: "dest01",
              text: "Transport to closest ED",
              isCorrect: true,
              timeCostMs: 300000,
              competencyRef: {
                source: "NREMT",
                standardId: "Destination",
                description: "Facility.",
              },
              feedback: "Correct.",
            },
          ],
          requiredActionsToAdvance: ["dest01"],
        },
      },
    }),
  };
};

export const INITIAL_SCENARIOS = [buildOverdoseScenario, buildAsthmaScenario];
