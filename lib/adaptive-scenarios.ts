export type CertificationLevel = 'EMR' | 'EMT' | 'AEMT' | 'Paramedic' | 'Critical Care';

export type ClinicalDomain = 
  | 'Airway Management' 
  | 'Cardiology' 
  | 'Medical Emergencies' 
  | 'Trauma' 
  | 'Pediatrics' 
  | 'OB/GYN' 
  | 'Operations'
  | 'Pharmacology';

export interface CompetencyTag {
  domain: ClinicalDomain;
  skill: string;     
  difficulty: CertificationLevel; 
}

export interface WalkthroughData {
  title: string;
  objective: string;
  instructions: string[];
  clinicalGuidelines: string[]; 
  formulas?: string[];          
}

export interface DecisionOption {
  text: string;
  isCorrect: boolean;
  feedback: string;       
  scoreModifier?: number; 
}

export interface ScenarioStep {
  stepNumber: number;
  questionText: string;
  options: DecisionOption[];
}

export interface PatientVitals {
  hr: number | string;
  rr: number | string;
  bp: string;
  spo2: number | string;
  etco2?: number | string;
  gcs: string;
  temp?: number | string;
  bgl?: number | string;
}

export interface PatientPresentation {
  age: number;
  gender: 'M' | 'F' | 'Other';
  weightKg?: number; 
  chiefComplaint: string;
  sceneInfo: string;
  vitals: PatientVitals;
  examFindings: {
    airway: string;
    breathing: string;
    circulation?: string;
    skin: string;
    neuro?: string;
  };
}

export interface AdaptiveScenario {
  id: string; 
  title: string;
  allowedCertifications: CertificationLevel[];
  competencies: CompetencyTag[];
  walkthrough: WalkthroughData;
  generate: (seed?: number) => {
    presentation: PatientPresentation;
    decisionTree: ScenarioStep[];
    clinicalPearls: string[];
  };
}

export const createAnaphylaxisScenario = (): AdaptiveScenario => ({
  id: 'airway-anaphylaxis-001',
  title: 'Anaphylaxis with Impending Airway Compromise',
  allowedCertifications: ['EMT', 'AEMT', 'Paramedic'],
  competencies: [
    { domain: 'Medical Emergencies', skill: 'Allergic Reaction', difficulty: 'EMT' },
    { domain: 'Pharmacology', skill: 'Epinephrine Administration', difficulty: 'EMT' },
    { domain: 'Airway Management', skill: 'Cricothyrotomy', difficulty: 'Paramedic' }
  ],
  walkthrough: {
    title: 'Managing Severe Anaphylaxis',
    objective: 'Identify impending airway closure and prioritize IM Epinephrine over adjunctive therapies.',
    instructions: [
      'Assess the patient for signs of severe systemic reaction (stridor, hypotension, severe wheezing).',
      'Select the appropriate first-line medication.',
      'Anticipate airway failure and prepare advanced interventions.'
    ],
    clinicalGuidelines: [
      'Epinephrine 1:1,000 via IM injection is the first-line treatment for anaphylaxis.',
      'Antihistamines (Benadryl) and steroids (Solu-Medrol) are delayed-onset adjuncts and should not delay Epinephrine.',
      'If intubation fails in complete airway obstruction, progress immediately to surgical cricothyrotomy.'
    ]
  },
  generate: () => {
    const age = Math.floor(Math.random() * (50 - 18 + 1)) + 18; 
    const hr = Math.floor(Math.random() * (140 - 120 + 1)) + 120; 
    const systolic = Math.floor(Math.random() * (100 - 70 + 1)) + 70; 
    const spo2 = Math.floor(Math.random() * (92 - 84 + 1)) + 84; 
    const allergens = ['shrimp', 'peanuts', 'wasp sting', 'amoxicillin'];
    const trigger = allergens[Math.floor(Math.random() * allergens.length)];

    return {
      presentation: {
        age,
        gender: Math.random() > 0.5 ? 'F' : 'M',
        chiefComplaint: "My throat is closing and my skin is burning.",
        sceneInfo: `Exposure to ${trigger} approximately 10 minutes prior to call.`,
        vitals: {
          gcs: "14 (Anxious)",
          hr,
          rr: 32,
          bp: `${systolic}/${Math.floor(systolic * 0.6)}`,
          spo2
        },
        examFindings: {
          airway: "Audible stridor, hoarse voice, drooling.",
          breathing: "Severe distress, accessory muscle use, tight bilateral wheezing.",
          skin: "Flushed, diffuse urticaria (hives)."
        }
      },
      decisionTree: [
        {
          stepNumber: 1,
          questionText: 'What is your FIRST and most critical medication?',
          options: [
            { 
              text: 'Epinephrine 0.3mg IM (1:1,000)', 
              isCorrect: true, 
              feedback: 'Correct! Epinephrine is the primary treatment for anaphylaxis. It provides rapid alpha-1 (vasoconstriction) and beta-2 (bronchodilation) effects to reverse the shock and airway swelling.' 
            },
            { 
              text: 'Albuterol 2.5mg nebulized', 
              isCorrect: false, 
              feedback: 'Incorrect. While albuterol treats bronchospasm, it will not stop the systemic histamine release or laryngeal edema causing the upper airway obstruction. Epinephrine must come first.' 
            },
            { 
               text: 'Diphenhydramine (Benadryl) 50mg IV/IM', 
               isCorrect: false, 
               feedback: 'Incorrect. Benadryl is an H1 antagonist and is used as an adjunct. Its onset of action is too slow to reverse life-threatening anaphylaxis.' 
            },
            { 
               text: 'High-flow oxygen via NRB mask', 
               isCorrect: false, 
               feedback: 'Incorrect prioritization. While oxygen is important, it does not stop the anaphylactic cascade. Administer Epinephrine first while assigning a partner to handle oxygen.' 
            }
          ]
        },
        {
          stepNumber: 2,
          questionText: "After Epi, stridor worsening. What is the airway emergency you are concerned about?",
          options: [
            { text: 'Complete airway obstruction from laryngeal edema', isCorrect: true, feedback: "Correct! This is a classic 'Cannot Intubate, Cannot Oxygenate' (CICO) territory. Prepare for cricothyrotomy." },
            { text: 'Aspiration from vomiting', isCorrect: false, feedback: 'Possible, but worsening stridor is a direct sign of advancing laryngeal edema, which is the immediate life threat.' },
            { text: 'Bronchospasm', isCorrect: false, feedback: 'Incorrect. Stridor indicates an upper airway obstruction. Bronchospasm relates to the lower airway (wheezing).' },
            { text: 'Respiratory arrest', isCorrect: false, feedback: "Incorrect. Respiratory arrest is a secondary consequence of the primary problem, which is the airway obstructing." }
          ]
        },
        {
          stepNumber: 3,
          questionText: "Patient suddenly cannot speak, unable to ventilate with BVM, SpO2 dropping to 70%. Your next move?",
          options: [
            { text: 'Prepare for surgical cricothyrotomy', isCorrect: true, feedback: "Correct! Complete obstruction + failed BVM = surgical airway NOW. Do not delay." },
            { text: 'Attempt intubation', isCorrect: false, feedback: 'Incorrect. If BVM is failing due to complete supraglottic swelling, you will not see anatomy with a laryngoscope. Go straight to a surgical airway.' },
            { text: 'Give more Epi', isCorrect: false, feedback: 'Incorrect. The patient has zero airway patency remaining. You cannot wait for medications to work; secure the airway surgically.' },
            { text: 'Hyperextend neck and try BVM again', isCorrect: false, feedback: 'Incorrect. The obstruction is anatomic swelling inside the airway (laryngeal edema), not a positional issue. Repositioning will not help.' }
          ]
        }
      ],
      clinicalPearls: [
        'Epinephrine is the ONLY medication that stops anaphylaxis - everything else is supportive.',
        'Stridor = upper airway obstruction. Wheezing = lower airway bronchospasm.',
        'Unable to ventilate with BVM + complete upper airway obstruction = surgical airway immediately.',
        'IM Epinephrine can be repeated every 5-15 minutes. Do not wait for "improvement" if the patient is acutely worsening.'
      ]
    };
  }
});

export const createOpioidOverdoseScenario = (): AdaptiveScenario => ({
  id: 'airway-opioid-001',
  title: 'Unresponsive Opioid Overdose',
  allowedCertifications: ['EMR', 'EMT', 'AEMT', 'Paramedic'],
  competencies: [
    { domain: 'Airway Management', skill: 'Basic Airway Maneuvers (Suctioning)', difficulty: 'EMR' },
    { domain: 'Pharmacology', skill: 'Naloxone Administration', difficulty: 'EMT' }
  ],
  walkthrough: {
    title: 'Managing Apnea and Airway Obstructions',
    objective: 'Prioritize airway clearance (suctioning) and basic adjuncts over medications or advanced airways in an apneic overdose patient.',
    instructions: [
      'Assess the airway for physical obstructions (vomit, blood, tongue).',
      'Clear the airway before attempting positive pressure ventilation.',
      'Provide basic ventilatory support before administering reversal agents (Naloxone).'
    ],
    clinicalGuidelines: [
      'Always suction the airway before initiating BVM ventilation if fluids are present.',
      'An Oropharyngeal Airway (OPA) is indicated for unresponsive patients without a gag reflex.',
      'Naloxone should be titrated to restore adequate respiratory drive, not necessarily full consciousness.'
    ]
  },
  generate: () => {
    const age = Math.floor(Math.random() * (45 - 20 + 1)) + 20; 
    const rr = Math.floor(Math.random() * 4) + 4; // 4-7 breaths per min
    
    return {
      presentation: {
        age,
        gender: Math.random() > 0.5 ? 'F' : 'M',
        chiefComplaint: "Unresponsive",
        sceneInfo: "Found unresponsive by a friend. Empty prescription pill bottles (Oxycodone) nearby.",
        vitals: {
          gcs: "3 (E1V1M1)",
          hr: 58,
          rr,
          bp: "98/60",
          spo2: 82
        },
        examFindings: {
          airway: "Snoring respirations, vomit pooling in the oropharynx.",
          breathing: "Slow, shallow, and irregular.",
          skin: "Cool, pale, and cyanotic around the lips."
        }
      },
      decisionTree: [
         {
          stepNumber: 1,
          questionText: 'What is your immediate, first airway intervention?',
          options: [
            { text: 'Suction airway immediately', isCorrect: true, feedback: "Correct! Clear the airway first. You cannot ventilate a patient effectively through vomit, and doing so will push it into the lungs (aspiration)." },
            { text: 'Start BVM ventilation', isCorrect: false, feedback: 'Incorrect. You must clear the airway first. Initiating BVM now will force vomit down the trachea.' },
            { text: 'Insert OPA', isCorrect: false, feedback: 'Incorrect. While an OPA is needed, you must suction the vomit out first before placing any adjuncts.' },
            { text: 'Administer Naloxone 2mg IN', isCorrect: false, feedback: 'Incorrect prioritization. The patient has an obstructed airway right now. BLS airway maneuvers (suction, positioning) always precede medications.' }
          ]
        },
        {
          stepNumber: 2,
          questionText: 'After suctioning the vomit, what is your next airway step prior to bagging?',
          options: [
            { text: 'Insert an OPA (oropharyngeal airway)', isCorrect: true, feedback: 'Correct. A GCS of 3 indicates no gag reflex. An OPA will keep the tongue from occluding the airway while you ventilate.' },
            { text: 'Insert an NPA (nasopharyngeal airway)', isCorrect: false, feedback: 'Incorrect. While an NPA works, an OPA is the preferred adjunct for fully unresponsive patients without a gag reflex as it is more effective at displacing the tongue.' },
            { text: 'No adjunct needed, just bag', isCorrect: false, feedback: 'Incorrect. The patient had snoring respirations (tongue obstruction). You need an adjunct to maintain an open airway during PPV.' },
            { text: 'Immediate endotracheal intubation', isCorrect: false, feedback: 'Incorrect. You should always start with basic interventions (BLS up to ALS). Establishing oxygenation via OPA + BVM is the primary goal.' }
          ]
        },
        {
          stepNumber: 3,
          questionText: `Patient is now being ventilated with a BVM and OPA, but remains apneic. Your next step?`,
          options: [
            { text: 'Administer Naloxone (Narcan)', isCorrect: true, feedback: 'Correct! Now that the airway is clear and oxygen is being delivered, you can reverse the opioid toxicity to restore the patient\'s own respiratory drive.' },
            { text: 'Prepare for intubation', isCorrect: false, feedback: 'Incorrect. Intubation is overly invasive when a simple, safe medication (Naloxone) can completely reverse the cause of the apnea.' },
            { text: 'Increase the BVM ventilation rate to 30 breaths/min', isCorrect: false, feedback: 'Incorrect. Hyperventilation is dangerous and does not treat the underlying pathology (opioid overdose).' },
            { text: 'Apply continuous positive airway pressure (CPAP)', isCorrect: false, feedback: 'Incorrect. CPAP requires the patient to be breathing on their own and have a patent airway. This patient is apneic.' }
          ]
        }
      ],
      clinicalPearls: [
        'Suction ALWAYS comes before any other airway intervention.',
        'Use an OPA for unresponsive patients (typically GCS ≤8) and an NPA for responsive or semi-responsive patients with a gag reflex.',
        'Naloxone reverses opioid toxicity but its half-life is often shorter than the opioid ingested—monitor closely for re-sedation.'
      ]
    };
  }
});

export const createTraumaAirwayScenario = (): AdaptiveScenario => ({
  id: 'airway-trauma-001',
  title: 'Trauma Patient with Active Airway Bleeding',
  allowedCertifications: ['Paramedic', 'Critical Care'],
  competencies: [
    { domain: 'Airway Management', skill: 'Suctioning and Hemorrhage Control', difficulty: 'Paramedic' },
    { domain: 'Airway Management', skill: 'Rapid Sequence Intubation (RSI)', difficulty: 'Paramedic' },
    { domain: 'Trauma', skill: 'Maxillofacial Trauma Assessment', difficulty: 'Paramedic' }
  ],
  walkthrough: {
    title: 'Managing the Soiled Airway in Trauma',
    objective: 'Prioritize clearing a heavily soiled airway before attempting advanced visualization or intubation.',
    instructions: [
      'Recognize midface instability as a contraindication for nasal airway placement.',
      'Aggressively suction the oropharynx before applying positive pressure or attempting visualization.',
      'Anticipate vomiting during RSI and utilize proper positioning to prevent aspiration.'
    ],
    clinicalGuidelines: [
      'In the presence of massive facial trauma and active bleeding, aggressive large-bore suction (e.g., DuCanto or rigid Yankauer) is the immediate priority.',
      'Blind insertion of nasal airways or nasal intubation is contraindicated in midface/basilar skull fractures.',
      'If vomiting occurs during endotracheal intubation, immediately suction while utilizing positional strategies (e.g., Trendelenburg or lateral recumbent) if cervical spine clearance allows or after balancing the immediate airway threat against spine risks.'
    ]
  },
  generate: () => {
    const age = Math.floor(Math.random() * (60 - 20 + 1)) + 20; 
    const hr = Math.floor(Math.random() * (135 - 110 + 1)) + 110; 
    
    return {
      presentation: {
        age,
        gender: Math.random() > 0.5 ? 'F' : 'M',
        chiefComplaint: "Assault to the face",
        sceneInfo: "Assault with a blunt weapon (baseball bat). Active bleeding from nose and mouth, confused.",
        vitals: {
          gcs: "12 (E3V4M5)",
          hr,
          rr: 28,
          bp: "132/88",
          spo2: 91
        },
        examFindings: {
          airway: "Gurgling, significant venous blood pooling in oropharynx, midface instability palpated.",
          breathing: "Rapid and shallow, splinting.",
          skin: "Pale and diaphoretic."
        }
      },
      decisionTree: [
         {
          stepNumber: 1,
          questionText: 'What is your FIRST priority specific to this airway presentation?',
          options: [
            { text: 'Suction blood from the airway with a rigid catheter', isCorrect: true, feedback: 'Correct! You cannot secure an airway you cannot see. Immediate aggressive suctioning is mandatory.' },
            { text: 'Prepare equipment for Rapid Sequence Intubation (RSI)', isCorrect: false, feedback: 'Incorrect prioritization. RSI is likely needed, but suctioning the active bleeding must happen first so you can visualize the anatomy.' },
            { text: 'Apply a cervical collar', isCorrect: false, feedback: 'Incorrect. While C-spine must be protected, a massive airway hemorrhage is an immediate life threat that takes precedence over collar placement (maintain manual stabilization while treating the airway issue).' },
            { text: 'Start BVM ventilation', isCorrect: false, feedback: 'Incorrect. You cannot effectively ventilate through blood, and bagging will force blood into the lungs, worsening the patient\'s oxygenation.' }
          ]
        },
        {
          stepNumber: 2,
          questionText: 'After suctioning the blood, which intubation approach is most appropriate given the facial trauma?',
          options: [
            { text: 'Oral Rapid Sequence Intubation (RSI) with video laryngoscopy', isCorrect: true, feedback: 'Correct! A trauma patient with blood and midface injury meets criteria for RSI with optimal visualization (video). Direct visualization is required.' },
            { text: 'Awake Nasotracheal Intubation', isCorrect: false, feedback: 'Incorrect. Nasal intubation is strictly contraindicated in patients with midface instability (Le Fort fractures) due to the risk of passing the tube into the cranial vault.' },
            { text: 'Nasopharyngeal airway (NPA) insertion', isCorrect: false, feedback: 'Incorrect. An NPA is contraindicated with midface trauma. Furthermore, this patient needs definitive airway protection from the ongoing hemorrhage.' },
            { text: 'Blind digital intubation', isCorrect: false, feedback: 'Incorrect. With active bleeding, facial trauma, and intact protective reflexes, direct visualization and pharmacologic control are necessary.' }
          ]
        },
        {
          stepNumber: 3,
          questionText: 'During RSI preparation, the patient vomits copiously. GCS drops to 8. What is your immediate action?',
          options: [
            { text: 'Position the patient head down (Trendelenburg), aggressively suction, then intubate', isCorrect: true, feedback: 'Correct! The immediate threat is aspiration. Trendelenburg positioning uses gravity to drain vomit away from the vocal cords. Suction until clear, then definitively secure the airway.' },
            { text: 'Abort the RSI attempt and only provide BVM ventilations', isCorrect: false, feedback: 'Incorrect. He needs definitive airway protection NOW. Vomiting with a GCS of 8 presents a massive aspiration risk.' },
            { text: 'Roll the patient onto their side', isCorrect: false, feedback: 'Incorrect. With suspected cervical spine trauma from a blunt assault, rolling the patient could compromise the spine. Head-down positioning (Trendelenburg on a backboard/stretcher) is preferred while maintaining spinal alignment.' },
            { text: 'Proceed directly with intubation through the vomit', isCorrect: false, feedback: 'Incorrect. You must suction first. You will not see the vocal cords through vomit, and attempting to pass the tube will blindly push vomit into the trachea.' }
          ]
        }
      ],
      clinicalPearls: [
        'Blood or vomit in the airway requires immediate suctioning before any other intervention.',
        'Midface trauma is an absolute contraindication for blindly inserting nasal airways or nasal intubation.',
        'When RSI is performed in trauma, assume the patient has a full stomach.',
        'If a supine patient vomits during intubation (where C-spine precautions prevent lateral rolling), placing the stretcher in Trendelenburg position helps clear the glottis.'
      ]
    };
  }
});

export const createCHFRespiratoryScenario = (): AdaptiveScenario => ({
  id: 'airway-chf-001',
  title: 'CHF Patient in Severe Respiratory Distress',
  allowedCertifications: ['AEMT', 'Paramedic', 'Critical Care'],
  competencies: [
    { domain: 'Cardiology', skill: 'Heart Failure Recognition', difficulty: 'Paramedic' },
    { domain: 'Airway Management', skill: 'CPAP Application', difficulty: 'AEMT' },
    { domain: 'Pharmacology', skill: 'Nitroglycerin Administration', difficulty: 'Paramedic' }
  ],
  walkthrough: {
    title: 'Managing Acute Pulmonary Edema',
    objective: 'Apply Non-Invasive Positive Pressure Ventilation (NIPPV) to treat acute pulmonary edema and monitor for signs of respiratory fatigue.',
    instructions: [
      'Recognize the signs of acute heart failure (crackles, severe orthopnea, hypertension, pink frothy sputum).',
      'Select CPAP as the primary non-invasive ventilatory support.',
      'Administer vasodilators (Nitroglycerin) if blood pressure safely permits to decrease preload.',
      'Monitor closely for signs of exhaustion indicating a transition to hypercarbic respiratory failure.'
    ],
    clinicalGuidelines: [
      'CPAP is the first-line therapy for severe respiratory distress due to acute cardiogenic pulmonary edema. It reduces preload and improves alveolar oxygenation.',
      'Nitroglycerin assists in treating pulmonary edema by causing venous dilation (reducing preload) and arterial dilation (reducing afterload), taking stress off the failing left ventricle.',
      'Patients failing CPAP therapy (evidenced by lethargy, altered mental status, or bradypnea) require immediate transition to BVM ventilation and advanced airway placement.'
    ]
  },
  generate: () => {
    const age = Math.floor(Math.random() * (85 - 65 + 1)) + 65; 
    const systolic = Math.floor(Math.random() * (220 - 170 + 1)) + 170; // highly hypertensive
    const diastolic = Math.floor(Math.random() * (120 - 90 + 1)) + 90;
    
    return {
      presentation: {
        age,
        gender: Math.random() > 0.5 ? 'F' : 'M',
        chiefComplaint: "Can't breathe, worse when lying flat (Orthopnea)",
        sceneInfo: "Found at home, sitting upright leaning forward. Multiple pillows stacked on the bed. Swollen ankles noted.",
        vitals: {
          gcs: "15 (Anxious and agitated)",
          hr: 122,
          rr: 36,
          bp: `${systolic}/${diastolic}`,
          spo2: 82
        },
        examFindings: {
          airway: "Patent, speaking in 2-3 word sentences.",
          breathing: "Severe distress, diffuse inspiratory crackles (rales) auscultated bilaterally. Coughing pink, frothy sputum.",
          skin: "Cool, diaphoretic, with 2+ pitting peripheral edema."
        }
      },
      decisionTree: [
         {
          stepNumber: 1,
          questionText: 'What is your FIRST-LINE respiratory intervention?',
          options: [
            { text: 'CPAP (Continuous Positive Airway Pressure) with 100% O2', isCorrect: true, feedback: 'Correct! CPAP is the gold standard for acute pulmonary edema. The positive pressure forces fluid out of the alveoli, reduces venous return to the heart (preload), and decreases the work of breathing.' },
            { text: 'High-flow oxygen via a Non-Rebreather mask (NRB)', isCorrect: false, feedback: 'Incorrect. While supplemental oxygen is helpful, an NRB mask does not provide the positive pressure required to push fluid out of the alveoli. CPAP is superior for pulmonary edema.' },
            { text: 'Immediate endotracheal intubation', isCorrect: false, feedback: 'Incorrect. This is too aggressive. CPAP works in the vast majority of cases to reverse pulmonary edema without the need for an invasive definitive airway.' },
            { text: 'Bag-Valve Mask (BVM) ventilation', isCorrect: false, feedback: 'Incorrect. BVM ventilation is indicated for apneic patients or those with inadequate ventilatory effort. This patient is breathing at 36 breaths/min with a patent airway; she needs CPAP, not a BVM.' }
          ]
        },
        {
          stepNumber: 2,
          questionText: 'Along with CPAP, which medication is indicated in this hypertensive pulmonary edema presentation?',
          options: [
            { text: 'Nitroglycerin 0.4mg Sublingually', isCorrect: true, feedback: 'Correct! The patient is severely hypertensive. Nitroglycerin dilates the veins to reduce blood returning to the heart (preload) and reduces the Resistance the heart must pump against (afterload).' },
            { text: 'Furosemide (Lasix) 40mg IV', isCorrect: false, feedback: 'Incorrect. While a diuretic, Lasix takes 20-30 minutes to work. Nitroglycerin provides immediate, rapid offloading of the heart. Many modern protocols emphasize Nitroglycerin over Furosemide in the acute phase.' },
            { text: 'Albuterol 2.5mg nebulized', isCorrect: false, feedback: 'Incorrect. This patient has pulmonary edema (crackles), not bronchospasm (wheezing). Albuterol stimulates beta-receptors, which drives the heart rate up (already 122) and increases cardiac oxygen demand without fixing the fluid overload.' },
            { text: 'Morphine 2mg IV', isCorrect: false, feedback: 'Incorrect. Morphine was historically used to reduce preload and anxiety but is no longer standard due to the risk of respiratory depression and worse clinical outcomes.' }
          ]
        },
        {
          stepNumber: 3,
          questionText: 'After 5 minutes on CPAP and Nitroglycerin, the patient becomes very drowsy with a respiratory rate dropping to 8 breaths/min. SpO2 falls to 78%. What happened, and what is your next move?',
          options: [
            { text: 'Hypercarbic respiratory failure – Remove CPAP and start BVM ventilations', isCorrect: true, feedback: 'Correct. The patient has become fatigued from the high work of breathing and is now failing. Drowsiness and bradypnea paired with hypoxia indicate an immediate need for assisted ventilation (BVM) and preparation for an advanced airway.' },
            { text: 'CPAP is working well – Continue current treatment securely', isCorrect: false, feedback: 'Incorrect. Never assume drowsiness is "relaxation" in severe respiratory distress—it usually indicates deadly CO2 retention from ventilatory failure.' },
            { text: 'The Nitroglycerin dropped the blood pressure too much – Provide a fluid bolus', isCorrect: false, feedback: 'Incorrect. While Nitroglycerin drops blood pressure, a fluid bolus would be catastrophic for a patient whose lungs are already failing due to fluid overload.' },
            { text: 'The CPAP pressure is inadequate – Increase CPAP to 15cm H2O', isCorrect: false, feedback: 'Incorrect. CPAP strictly requires an awake, compliant patient who can maintain their own airway and respiratory drive. This patient is failing to do so.' }
          ]
        }
      ],
      clinicalPearls: [
        'CPAP pushes fluid back across the alveolar-capillary membrane, drastically improving oxygen exchange.',
        'Nitroglycerin relies on a robust blood pressure to be safe. It shifts volume into the venous system, reducing right ventricular preload.',
        'Lethargy, altered mental status, and a dropping respiratory rate in a previously struggling patient indicate hypercarbic respiratory failure (CO2 narcosis). Remove CPAP and manually ventilate immediately.'
      ]
    };
  }
});

export const ADAPTIVE_AIRWAY_SCENARIOS = [
  createAnaphylaxisScenario,
  createOpioidOverdoseScenario,
  createTraumaAirwayScenario,
  createCHFRespiratoryScenario
];
