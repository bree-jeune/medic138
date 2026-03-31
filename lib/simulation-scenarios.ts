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

export const buildSTEMIScenario = (): NREMTSimulation => {
  const age = Math.floor(Math.random() * 20) + 55; // 55-75
  const initialVitals = generateVitals("STEMI", age);

  return {
    id: "nremt-cardiac-001",
    title: "Chest Pain - Suspected Inferior STEMI",
    targetCertification: ["AEMT", "Paramedic", "Critical Care"],
    clinicalDomain: "Cardiology & Resuscitation",
    estimatedDurationMs: 900000, // 15 mins
    sourceFootnotes: [
      "American Heart Association. (2020). Guidelines for CPR and ECC.",
      "National EMS Educational Standards. Cardiology."
    ],
    walkthrough: {
      title: "Managing the Acute Myocardial Infarction",
      competenciesMatched: [
        {
          source: "AHA",
          standardId: "ACLS - Acute Coronary Syndromes",
          description: "Early acquisition and interpretation of 12-lead ECG."
        }
      ],
      learningObjectives: [
        "Prioritize early 12-Lead ECG in patients with non-traumatic chest pain.",
        "Recognize contraindications for Nitroglycerin (Inferior wall involvement / Hypotension).",
        "Administer Aspirin early in the absence of allergies."
      ],
      clinicalGuidelines: [
        "AHA guidelines recommend a 12-lead ECG within 10 minutes of initial contact for suspected ACS.",
        "Nitroglycerin should be held if signs of Right Ventricular involvement are present (often seen in Inferior STEMIs) due to risk of profound hypotension."
      ]
    },
    generateSimulation: () => ({
      initialVitals,
      phases: {
        Dispatch: {
          phaseName: "Dispatch",
          scenarioText: "Dispatched to a local hardware store for a 62-year-old male clutching his chest and sweating profusely.",
          availableActions: [
            {
              id: "disp01",
              text: "Acknowledge and respond Code 3",
              isCorrect: true,
              timeCostMs: 0,
              competencyRef: { source: "NREMT", standardId: "Response", description: "Appropriate response mode." },
              feedback: "Appropriate."
            }
          ],
          requiredActionsToAdvance: ["disp01"]
        },
        PreArrival: {
          phaseName: "PreArrival",
          scenarioText: "En route. Traffic is light. ETA 4 minutes.",
          availableActions: [
            {
              id: "pre01",
              text: "Assign roles: One provider to grab monitor, one to assess airway.",
              isCorrect: true,
              timeCostMs: 0,
              competencyRef: { source: "NREMT", standardId: "Crew Resource Management", description: "Role assignment." },
              feedback: "Good delegation."
            }
          ],
          requiredActionsToAdvance: ["pre01"]
        },
        SceneArrival: {
          phaseName: "SceneArrival",
          scenarioText: "Patient is found sitting on a bucket in aisle 4, pale, diaphoretic, and in obvious distress.",
          availableActions: [
            {
              id: "arr01",
              text: "Ensure Scene Safety and BSI",
              isCorrect: true,
              timeCostMs: 5000,
              competencyRef: { source: "NREMT", standardId: "Scene Size Up", description: "Standard precautions." },
              feedback: "Always."
            }
          ],
          requiredActionsToAdvance: ["arr01"]
        },
        Assessment: {
          phaseName: "Assessment",
          scenarioText: `Patient states the pain feels like "an elephant sitting on my chest" and radiates to his left jaw. Occurred at rest.`,
          assessmentData: {
            avatarImageUrl: "",
            auscultationPoints: [
              { anatomicalLocation: "Aortic", soundFileUrl: "", correctFindingText: "Regular rate, S1/S2 present, no murmurs." },
              { anatomicalLocation: "LLL", soundFileUrl: "", correctFindingText: "Clear bilaterally." }
            ],
            bpConfig: { actualSystolic: initialVitals.bp.systolic, actualDiastolic: initialVitals.bp.diastolic, marginOfErrorAllowed: 4, korotkoffSoundUrl: "" },
            visualFindings: ["Pale, cool, diaphoretic skin", "Levine's sign (clutching chest)"]
          },
          availableActions: [
            {
              id: "assess01",
              text: "Acquire 12-Lead ECG",
              isCorrect: true,
              timeCostMs: 45000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "ECG within 10 min." },
              feedback: "12-Lead shows ST elevation in II, III, and aVF (Inferior STEMI)."
            },
            {
              id: "assess02",
              text: "Instruct patient to wait for transport before checking vitals",
              isCorrect: false,
              timeCostMs: 60000,
              competencyRef: { source: "NREMT", standardId: "Assessment", description: "Delay of care." },
              feedback: "Critical failure. Time is muscle. Evaluate immediately."
            }
          ],
          requiredActionsToAdvance: ["assess01"]
        },
        Treatment: {
          phaseName: "Treatment",
          scenarioText: `Monitor shows Sinus Rhythm with ST elevation in inferior leads. Vitals: HR ${initialVitals.hr}, BP ${initialVitals.bp.systolic}/${initialVitals.bp.diastolic}.`,
          assessmentData: {
            avatarImageUrl: "",
            auscultationPoints: [],
            bpConfig: { actualSystolic: initialVitals.bp.systolic, actualDiastolic: initialVitals.bp.diastolic, marginOfErrorAllowed: 4, korotkoffSoundUrl: "" },
            visualFindings: ["Continues to complain of 9/10 chest pain."]
          },
          availableActions: [
            {
              id: "tx01",
              text: "Administer Aspirin 324mg PO (Chewed)",
              isCorrect: true,
              timeCostMs: 15000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Antiplatelet therapy." },
              feedback: "Correct. Decreases platelet aggregation."
            },
            {
              id: "tx02",
              text: "Administer Nitroglycerin 0.4mg SL",
              isCorrect: false,
              timeCostMs: 15000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Contraindications for NTG." },
              feedback: "DANGEROUS. Patient has an Inferior STEMI. Need to rule out Right Ventricular infarct first; NTG can cause severe hypotension."
            },
            {
              id: "tx03",
              text: "Establish IV Access",
              isCorrect: true,
              timeCostMs: 45000,
              competencyRef: { source: "NREMT", standardId: "Treatment", description: "IV access for ACS." },
              feedback: "IV established. Ready for fluid bolus if required."
            }
          ],
          requiredActionsToAdvance: ["tx01", "tx03"]
        },
        TransportDecision: {
          phaseName: "TransportDecision",
          scenarioText: "Patient is packaged. He still has 9/10 chest pain but is stable.",
          availableActions: [
            {
              id: "trans01",
              text: "Transport Code 3 to nearest PCI-capable facility and transmit ECG",
              isCorrect: true,
              timeCostMs: 60000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Early STEMI alert and PCI center." },
              feedback: "Correct. Goal is door-to-balloon time < 90 minutes."
            },
            {
              id: "trans02",
              text: "Transport Code 2 to local freestanding ER (non-PCI)",
              isCorrect: false,
              timeCostMs: 60000,
              competencyRef: { source: "NREMT", standardId: "Transport", description: "Appropriate destination." },
              feedback: "Incorrect. Patient needs emergency catheterization. Transporting to a non-PCI center delays definitive care."
            }
          ],
          requiredActionsToAdvance: ["trans01"]
        },
        Destination: {
          phaseName: "Destination",
          scenarioText: "En route to St. Jude's PCI Center. Cath lab has been activated based on your ECG transmission.",
          availableActions: [
            {
              id: "dest01",
              text: "Continue monitoring and transport",
              isCorrect: true,
              timeCostMs: 300000,
              competencyRef: { source: "NREMT", standardId: "En Route Care", description: "Reassessment." },
              feedback: "Good catch. You saved the myocardium."
            }
          ],
          requiredActionsToAdvance: ["dest01"]
        }
      }
    })
  };
};

export const buildVFibScenario = (): NREMTSimulation => {
  const age = Math.floor(Math.random() * 20) + 45; // 45-65
  const initialVitals = generateVitals("VFibArrest", age);

  return {
    id: "nremt-cardiac-002",
    title: "Cardiac Arrest - Ventricular Fibrillation",
    targetCertification: ["Paramedic", "Critical Care"],
    clinicalDomain: "Cardiology & Resuscitation",
    estimatedDurationMs: 1200000,
    sourceFootnotes: [
      "American Heart Association. (2020). Guidelines for CPR and ECC. Adult Cardiac Arrest Algorithm."
    ],
    walkthrough: {
      title: "Managing Ventricular Fibrillation",
      competenciesMatched: [
        { source: "AHA", standardId: "ACLS - Cardiac Arrest", description: "Early defibrillation for shockable rhythms." }
      ],
      learningObjectives: [
        "Prioritize immediate defibrillation for witnessed or monitored VFib.",
        "Minimize interruptions in CPR (resume immediately after shock).",
        "Administer Epinephrine 1mg every 3-5 minutes."
      ],
      clinicalGuidelines: [
        "AHA guidelines emphasize high-quality CPR and early defibrillation as the primary survival factors.",
        "Do not conduct a rhythm check immediately after a shock; immediately resume chest compressions for 2 minutes."
      ]
    },
    generateSimulation: () => ({
      initialVitals,
      phases: {
        Dispatch: {
          phaseName: "Dispatch",
          scenarioText: "Dispatched to a tennis court for a 52-year-old male who collapsed suddenly. Bystander CPR is in progress.",
          availableActions: [
            {
              id: "disp01",
              text: "Acknowledge and respond Code 3",
              isCorrect: true, timeCostMs: 0,
              competencyRef: { source: "NREMT", standardId: "Response", description: "Appropriate response mode." },
              feedback: "Appropriate."
            }
          ],
          requiredActionsToAdvance: ["disp01"]
        },
        PreArrival: {
          phaseName: "PreArrival",
          scenarioText: "En route. ETA 3 minutes.",
          availableActions: [
            {
              id: "pre01",
              text: "Prepare monitor/defibrillator and airway gear",
              isCorrect: true, timeCostMs: 0,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Anticipate arrest needs." },
              feedback: "Excellent anticipation."
            }
          ],
          requiredActionsToAdvance: ["pre01"]
        },
        SceneArrival: {
          phaseName: "SceneArrival",
          scenarioText: "You arrive to find a bystander performing inadequate compressions. Patient is apneic and cyanotic.",
          availableActions: [
            {
              id: "arr01",
              text: "Take over high-quality CPR",
              isCorrect: true, timeCostMs: 5000,
              competencyRef: { source: "AHA", standardId: "BLS", description: "High-quality CPR." },
              feedback: "Good. Compressions are the priority while the monitor is being applied."
            }
          ],
          requiredActionsToAdvance: ["arr01"]
        },
        Assessment: {
          phaseName: "Assessment",
          scenarioText: `CPR is ongoing. You need to analyze the rhythm.`,
          assessmentData: {
            avatarImageUrl: "",
            auscultationPoints: [
              { anatomicalLocation: "Aortic", soundFileUrl: "", correctFindingText: "No heart sounds." }
            ],
            bpConfig: { actualSystolic: 0, actualDiastolic: 0, marginOfErrorAllowed: 4, korotkoffSoundUrl: "" },
            visualFindings: ["Apneic", "Unresponsive"]
          },
          availableActions: [
            {
              id: "assess01",
              text: "Attach monitor pads and pause CPR for rhythm analysis",
              isCorrect: true, timeCostMs: 10000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Rhythm check." },
              feedback: "Rhythm is Coarse Ventricular Fibrillation."
            }
          ],
          requiredActionsToAdvance: ["assess01"]
        },
        Treatment: {
          phaseName: "Treatment",
          scenarioText: `Monitor shows Ventricular Fibrillation.`,
          assessmentData: {
            avatarImageUrl: "",
            auscultationPoints: [],
            bpConfig: { actualSystolic: 0, actualDiastolic: 0, marginOfErrorAllowed: 4, korotkoffSoundUrl: "" },
            visualFindings: ["Unresponsive"]
          },
          availableActions: [
            {
              id: "shock", // Matches the monitor button
              text: "Hardware: Defibrillate (Deliver Shock)",
              isCorrect: true, timeCostMs: 15000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Immediate defibrillation." },
              feedback: "Shock delivered. 200 Joules. Note: you must manually resume CPR."
            },
            {
              id: "tx02",
              text: "Resume CPR immediately and establish IV/IO",
              isCorrect: true, timeCostMs: 120000, // Represents the 2 minute cycle
              competencyRef: { source: "AHA", standardId: "ACLS", description: "CPR post-shock." },
              feedback: "Correct. Never delay compressions for a post-shock rhythm check."
            },
            {
              id: "tx03",
              text: "Check pulse immediately after shock",
              isCorrect: false, timeCostMs: 10000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Avoid pulse checks post-shock." },
              feedback: "CRITICAL FAILURE. AHA guidelines strictly mandate resuming CPR for 2 minutes immediately after a shock."
            },
            {
              id: "tx04",
              text: "Administer Epinephrine 1mg (1:10,000) IV/IO",
              isCorrect: true, timeCostMs: 15000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Epinephrine in arrest." },
              feedback: "Epinephrine 1mg administered."
            }
          ],
          requiredActionsToAdvance: ["shock", "tx02", "tx04"]
        },
        TransportDecision: {
          phaseName: "TransportDecision",
          scenarioText: "After the 2-minute cycle, the patient converts to Sinus Tachycardia with a strong palpable pulse. ROSC achieved.",
          availableActions: [
            {
              id: "trans01",
              text: "Transport Code 3 to nearest STEMI Center and begin Post-Arrest Care",
              isCorrect: true, timeCostMs: 60000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Post-Cardiac Arrest Care." },
              feedback: "Correct. Patient needs targeted temperature management and possible PCI."
            }
          ],
          requiredActionsToAdvance: ["trans01"]
        },
        Destination: {
          phaseName: "Destination",
          scenarioText: "En route. Patient remains hemodynamically stable.",
          availableActions: [
            {
              id: "dest01",
              text: "Continue monitoring core temperature, BP, and 12-lead ECG",
              isCorrect: true, timeCostMs: 300000,
              competencyRef: { source: "AHA", standardId: "ACLS", description: "Post-ROSC maintenance." },
              feedback: "Great job running the code."
            }
          ],
          requiredActionsToAdvance: ["dest01"]
        }
      }
    })
  };
};

export const INITIAL_SCENARIOS = [buildOverdoseScenario, buildAsthmaScenario, buildSTEMIScenario, buildVFibScenario];
