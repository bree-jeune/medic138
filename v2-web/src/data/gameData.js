
// Clinical data for all games
export const GAME_DATA = {
    tankFactors: {
        D: 0.16,
        E: 0.28,
        M: 1.56,
        H: 3.14
    },

    oxygenScenarios: {
        flow_calculations: [
            { tank: 'E', psi: 2000, flowRate: 15, difficulty: 'EMT-Basic', answer: 37 },
            { tank: 'D', psi: 1500, flowRate: 10, difficulty: 'EMT-Basic', answer: 24 },
            { tank: 'E', psi: 1000, flowRate: 6, difficulty: 'EMT-Basic', answer: 47 },
            { tank: 'M', psi: 2200, flowRate: 15, difficulty: 'Paramedic', answer: 229 },
            { tank: 'E', psi: 800, flowRate: 12, difficulty: 'Paramedic', answer: 19 },
            { tank: 'M', psi: 1800, flowRate: 10, difficulty: 'Critical Care', answer: 281 },
            { tank: 'D', psi: 2000, flowRate: 8, difficulty: 'Critical Care', answer: 40 },
            { tank: 'H', psi: 2200, flowRate: 15, difficulty: 'Critical Care', answer: 460 }
        ],
        scenario_based: [
            {
                scenario: "45-year-old male, SpO2 88%, respiratory distress, COPD history",
                options: [
                    { text: "Non-rebreather at 15 L/min", correct: false, explanation: "Too high for COPD patient - risk of CO2 retention" },
                    { text: "Nasal cannula at 2-4 L/min", correct: true, explanation: "Correct - controlled oxygen for COPD, titrate to SpO2 90-94%" },
                    { text: "Simple face mask at 6 L/min", correct: false, explanation: "May be appropriate but start lower with COPD" },
                    { text: "BVM with 100% O2", correct: false, explanation: "Not indicated unless respiratory failure" }
                ],
                difficulty: 'Paramedic'
            },
            {
                scenario: "22-year-old female, anaphylaxis, SpO2 85%, stridor, severe dyspnea",
                options: [
                    { text: "Nasal cannula at 4 L/min", correct: false, explanation: "Insufficient for severe anaphylaxis" },
                    { text: "Non-rebreather at 15 L/min", correct: true, explanation: "Correct - high-flow oxygen for severe respiratory distress" },
                    { text: "Simple face mask at 8 L/min", correct: false, explanation: "Insufficient oxygen delivery" },
                    { text: "Wait and see if epinephrine helps", correct: false, explanation: "Need immediate high-flow oxygen" }
                ],
                difficulty: 'EMT-Basic'
            }
        ]
    },

    interventionMatching: {
        symptoms_interventions: [
            { symptom: "Chest pain radiating to left arm, diaphoresis", intervention: "Aspirin, O2, IV, 12-lead, nitroglycerin", category: 'Cardiac' },
            { symptom: "Wheezing, decreased breath sounds, respiratory distress", intervention: "Albuterol nebulizer, O2, IV access, consider epi", category: 'Respiratory' },
            { symptom: "Altered mental status, fruity breath odor", intervention: "Check glucose, IV access, fluid bolus if DKA", category: 'Metabolic' },
            { symptom: "Unresponsive, pinpoint pupils, respiratory depression", intervention: "Naloxone 2-4mg IN/IV, BVM ventilation, O2", category: 'Overdose' },
            { symptom: "Severe headache, hypertension, one-sided weakness", intervention: "O2, IV, 12-lead, stroke scale, rapid transport", category: 'Neuro' },
            { symptom: "Hypotension, tachycardia, distended abdomen after trauma", intervention: "Large bore IV x2, fluid bolus, rapid transport", category: 'Trauma' }
        ],
        medications_indications: [
            { medication: "Epinephrine 1:1000", indication: "Anaphylaxis (IM), severe asthma", dose: "0.3-0.5mg IM" },
            { medication: "Epinephrine 1:10000", indication: "Cardiac arrest", dose: "1mg IV q3-5min" },
            { medication: "Atropine", indication: "Symptomatic bradycardia", dose: "0.5mg IV q3-5min" },
            { medication: "Amiodarone", indication: "V-fib/pulseless V-tach, stable V-tach", dose: "300mg IV (1st), 150mg (2nd)" },
            { medication: "Adenosine", indication: "Stable SVT with narrow complex", dose: "6mg rapid IV, then 12mg" },
            { medication: "Naloxone", indication: "Opioid overdose, respiratory depression", dose: "0.4-2mg IV/IM/IN" },
            { medication: "Dextrose", indication: "Hypoglycemia (<60 mg/dL)", dose: "25g D50 IV (or 10g D10)" },
            { medication: "Aspirin", indication: "Suspected ACS/MI", dose: "324mg PO chewed" }
        ],
        rhythms_treatments: [
            { rhythm: "Ventricular Fibrillation", treatment: "Immediate defibrillation, CPR, epinephrine, amiodarone", category: 'Shockable' },
            { rhythm: "Pulseless V-Tach", treatment: "Immediate defibrillation, CPR, epinephrine, amiodarone", category: 'Shockable' },
            { rhythm: "PEA", treatment: "CPR, epinephrine, treat reversible causes (Hs & Ts)", category: 'Non-shockable' },
            { rhythm: "Asystole", treatment: "High-quality CPR, epinephrine, treat causes", category: 'Non-shockable' },
            { rhythm: "Stable SVT", treatment: "Vagal maneuvers, adenosine 6mg then 12mg rapid IV", category: 'Tachycardia' },
            { rhythm: "A-fib with RVR", treatment: "Rate control: diltiazem or metoprolol if stable", category: 'Tachycardia' },
            { rhythm: "Symptomatic bradycardia", treatment: "Atropine 0.5mg, TCP if no response, dopamine/epi", category: 'Bradycardia' },
            { rhythm: "3rd degree heart block", treatment: "TCP, atropine, dopamine or epinephrine infusion", category: 'Bradycardia' }
        ]
    },

    ivCalculations: [
        {
            scenario: "Calculate drops per minute for 500mL NS over 2 hours with 10 gtt/mL tubing",
            given: { volume: 500, time: 120, dropFactor: 10 },
            answer: 42,
            formula: "(Volume × Drop Factor) / Time in minutes",
            calculation: "(500 × 10) / 120 = 42 gtt/min",
            difficulty: 'EMT-Basic'
        },
        {
            scenario: "Patient weighs 80kg, needs dopamine at 5 mcg/kg/min. Mix is 400mg in 250mL. Calculate mL/hr.",
            given: { weight: 80, dose: 5, concentration: 1600 },
            answer: 15,
            formula: "(Dose × Weight × 60) / Concentration",
            calculation: "(5 mcg/kg/min × 80kg × 60min) / 1600 mcg/mL = 15 mL/hr",
            difficulty: 'Paramedic'
        },
        {
            scenario: "Epinephrine drip: Start at 2 mcg/min. Mix is 1mg in 250mL. Calculate initial mL/hr.",
            given: { dose: 2, concentration: 4 },
            answer: 30,
            formula: "(Dose × 60) / Concentration",
            calculation: "(2 mcg/min × 60min) / 4 mcg/mL = 30 mL/hr",
            difficulty: 'Critical Care'
        },
        {
            scenario: "1000mL LR over 8 hours with 15 gtt/mL tubing. Calculate gtt/min.",
            given: { volume: 1000, time: 480, dropFactor: 15 },
            answer: 31,
            formula: "(Volume × Drop Factor) / Time in minutes",
            calculation: "(1000 × 15) / 480 = 31 gtt/min",
            difficulty: 'EMT-Basic'
        }
    ],

    cardiacRhythms: [
        {
            name: "Normal Sinus Rhythm",
            description: "Regular rhythm, rate 60-100, normal P waves before each QRS",
            rate: "60-100",
            treatment: "No treatment needed",
            difficulty: 'EMT-Basic'
        },
        {
            name: "Sinus Bradycardia",
            description: "Regular rhythm, rate <60, normal P waves",
            rate: "<60",
            treatment: "If symptomatic: Atropine 0.5mg IV",
            difficulty: 'EMT-Basic'
        },
        {
            name: "Sinus Tachycardia",
            description: "Regular rhythm, rate >100, normal P waves",
            rate: ">100",
            treatment: "Treat underlying cause (pain, fever, hypovolemia)",
            difficulty: 'EMT-Basic'
        },
        {
            name: "Atrial Fibrillation",
            description: "Irregularly irregular, no P waves, wavy baseline",
            rate: "Variable",
            treatment: "Rate control if RVR, anticoagulation",
            difficulty: 'Paramedic'
        },
        {
            name: "Ventricular Tachycardia",
            description: "Wide QRS (>0.12s), regular, rate >100",
            rate: "100-250",
            treatment: "If pulseless: defibrillate. If stable: amiodarone",
            difficulty: 'Paramedic'
        },
        {
            name: "Ventricular Fibrillation",
            description: "Chaotic, irregular waveform, no organized rhythm",
            rate: "N/A",
            treatment: "Immediate defibrillation, CPR, epinephrine",
            difficulty: 'EMT-Basic'
        },
        {
            name: "3rd Degree AV Block",
            description: "P waves and QRS complexes independent, no relationship",
            rate: "Atrial >ventricular",
            treatment: "TCP, atropine, dopamine/epinephrine infusion",
            difficulty: 'Critical Care'
        },
        {
            name: "SVT",
            description: "Narrow complex, regular, rate 150-250, no visible P waves",
            rate: "150-250",
            treatment: "Vagal maneuvers, adenosine 6mg then 12mg",
            difficulty: 'Paramedic'
        }
    ],

    medicationDosing: [
        {
            scenario: "5-year-old, 20kg, cardiac arrest. Calculate epinephrine dose.",
            weight: 20,
            age: 5,
            medication: "Epinephrine",
            calculation: "0.01 mg/kg",
            answer: 0.2,
            unit: "mg",
            route: "IV/IO",
            difficulty: 'Paramedic'
        },
        {
            scenario: "Adult patient, active seizure lasting 5 minutes. Midazolam IM dose?",
            medication: "Midazolam",
            answer: 10,
            unit: "mg",
            route: "IM",
            explanation: "Standard adult IM dose for seizures",
            difficulty: 'EMT-Basic'
        },
        {
            scenario: "Adult anaphylaxis. Epinephrine 1:1000 dose and route?",
            medication: "Epinephrine 1:1000",
            answer: 0.3,
            unit: "mg",
            route: "IM",
            explanation: "0.3-0.5mg IM lateral thigh",
            difficulty: 'EMT-Basic'
        },
        {
            scenario: "70kg patient needs fentanyl 1 mcg/kg. Concentration is 50 mcg/mL. How many mL?",
            weight: 70,
            dose: 1,
            concentration: 50,
            answer: 1.4,
            unit: "mL",
            calculation: "(70kg × 1 mcg/kg) / 50 mcg/mL = 1.4 mL",
            difficulty: 'Paramedic'
        }
    ],

    traumaScenarios: [
        {
            scenario: "MVA rollover, 35M ejected, found 20 feet from vehicle",
            findings: [
                "Obvious deformity right thigh",
                "Large scalp laceration, bleeding controlled",
                "Diminished breath sounds right side",
                "Tracheal deviation to left",
                "BP 90/60, HR 130, RR 32, SpO2 88%"
            ],
            lifeThreats: [
                { threat: "Tension pneumothorax", priority: 1, intervention: "Needle decompression" },
                { threat: "Hemorrhagic shock", priority: 2, intervention: "IV access, fluid resuscitation" },
                { threat: "Femur fracture", priority: 3, intervention: "Traction splint, pain control" },
                { threat: "Scalp laceration", priority: 4, intervention: "Already controlled" }
            ],
            difficulty: 'Paramedic'
        },
        {
            scenario: "Pedestrian struck by car, 28F, found in roadway",
            findings: [
                "Alert and oriented",
                "Abdominal pain and rigidity",
                "Pelvis unstable with lateral compression",
                "Deformity left lower leg",
                "BP 100/70, HR 110, RR 24"
            ],
            lifeThreats: [
                { threat: "Pelvic fracture with instability", priority: 1, intervention: "Pelvic binder, avoid movement" },
                { threat: "Possible intra-abdominal bleeding", priority: 2, intervention: "IV access, monitor, rapid transport" },
                { threat: "Tibia/fibula fracture", priority: 3, intervention: "Splint, pain control" }
            ],
            difficulty: 'Critical Care'
        }
    ],

    abgInterpretation: [
        {
            values: { pH: 7.28, PaCO2: 58, HCO3: 24, PaO2: 65 },
            interpretation: "Respiratory acidosis, uncompensated",
            oxygenation: "Hypoxemia",
            likelyCause: "COPD exacerbation, respiratory failure",
            difficulty: 'Paramedic'
        },
        {
            values: { pH: 7.32, PaCO2: 48, HCO3: 18, PaO2: 92 },
            interpretation: "Metabolic acidosis, partially compensated",
            oxygenation: "Normal",
            likelyCause: "DKA, lactic acidosis, renal failure",
            difficulty: 'Critical Care'
        },
        {
            values: { pH: 7.48, PaCO2: 32, HCO3: 24, PaO2: 98 },
            interpretation: "Respiratory alkalosis, uncompensated",
            oxygenation: "Normal",
            likelyCause: "Hyperventilation, anxiety, pain",
            difficulty: 'Paramedic'
        },
        {
            values: { pH: 7.38, PaCO2: 42, HCO3: 24, PaO2: 95 },
            interpretation: "Normal ABG",
            oxygenation: "Normal",
            likelyCause: "No disturbance",
            difficulty: 'EMT-Basic'
        }
    ],

    triageScenarios: [
        {
            scenario: "School bus vs semi-truck. 20 patients total.",
            patients: [
                { id: 1, presentation: "8F, walking, crying, abrasion right arm", correctTriage: "GREEN", explanation: "Minor injury, stable, can wait" },
                { id: 2, presentation: "12M, unresponsive, agonal respirations, open skull fracture", correctTriage: "BLACK", explanation: "Unsurvivable injury in MCI setting" },
                { id: 3, presentation: "45M driver, alert, severe leg pain, can't walk, BP 110/70 HR 90", correctTriage: "YELLOW", explanation: "Serious but stable, can wait for transport" },
                { id: 4, presentation: "10F, difficulty breathing, RR 32, SpO2 85%, diminished breath sounds", correctTriage: "RED", explanation: "Life-threatening respiratory distress, immediate care" },
                { id: 5, presentation: "Teacher, 35F, walking, minor cuts, anxious", correctTriage: "GREEN", explanation: "Minor injuries, stable" },
                { id: 6, presentation: "14M, unresponsive, weak pulse, BP 70/40, abdominal distension", correctTriage: "RED", explanation: "Shock, internal bleeding, immediate" }
            ],
            difficulty: 'Paramedic'
        }
    ],

    ecgInterpretation: [
        {
            type: "STEMI",
            location: "Inferior",
            leads: ["II", "III", "aVF"],
            reciprocalChanges: ["I", "aVL"],
            description: "ST elevation in inferior leads (II, III, aVF)",
            artery: "Right Coronary Artery (RCA)",
            additionalFindings: "Consider right-sided 12-lead (V4R)",
            treatment: "Aspirin, cath lab activation, consider RV infarct",
            difficulty: 'Paramedic'
        },
        {
            type: "STEMI",
            location: "Anterior",
            leads: ["V1", "V2", "V3", "V4"],
            reciprocalChanges: [],
            description: "ST elevation in precordial leads V1-V4",
            artery: "Left Anterior Descending (LAD)",
            additionalFindings: "High mortality, 'widow maker'",
            treatment: "Immediate cath lab activation, dual antiplatelet",
            difficulty: 'Paramedic'
        },
        {
            type: "STEMI",
            location: "Lateral",
            leads: ["I", "aVL", "V5", "V6"],
            reciprocalChanges: ["III", "aVF"],
            description: "ST elevation in lateral leads",
            artery: "Left Circumflex",
            additionalFindings: "May be subtle, check for reciprocal changes",
            treatment: "Cath lab activation",
            difficulty: 'Critical Care'
        },
        {
            type: "Normal",
            location: "N/A",
            leads: [],
            reciprocalChanges: [],
            description: "Normal sinus rhythm, no ST changes",
            artery: "None",
            additionalFindings: "Normal 12-lead",
            treatment: "No emergent intervention",
            difficulty: 'EMT-Basic'
        }
    ],

    sampleOpqrst: [
        {
            chiefComplaint: "Chest pain",
            patientAge: 45,
            patientGender: "F",
            requiredQuestions: [
                { category: "Onset", question: "When did the pain start?", answer: "30 minutes ago while watching TV" },
                { category: "Provocation", question: "What makes it better or worse?", answer: "Nothing makes it better, worse with deep breath" },
                { category: "Quality", question: "What does the pain feel like?", answer: "Sharp, stabbing sensation" },
                { category: "Radiation", question: "Does the pain go anywhere else?", answer: "No radiation" },
                { category: "Severity", question: "On a scale of 1-10, how bad is the pain?", answer: "7/10" },
                { category: "Time", question: "How long has this been going on?", answer: "Constant for 30 minutes" },
                { category: "Allergies", question: "Any medication allergies?", answer: "Penicillin" },
                { category: "Medications", question: "What medications do you take?", answer: "Birth control pills" },
                { category: "Past History", question: "Any medical history?", answer: "Recent flight from Europe 2 days ago" },
                { category: "Last Intake", question: "When did you last eat or drink?", answer: "2 hours ago" }
            ],
            redFlags: ["Pleuritic chest pain", "Recent long flight", "Birth control use"],
            suspectedDiagnosis: "Possible pulmonary embolism",
            difficulty: 'Critical Care'
        }
    ]
};

// Game metadata
export const GAMES = [
    {
        id: 'oxygen_regulator',
        title: 'Oxygen Regulator Challenge',
        description: 'Master O2 calculations, flow rates, and tank duration',
        icon: '🫁',
        hasSubModes: true,
        subModes: ['flow_calculations', 'visual_adjustment', 'pressure_reading', 'scenario_based'],
        hasDifficulty: true,
        isPremium: false
    },
    {
        id: 'intervention_matching',
        title: 'Intervention Matching',
        description: 'Match symptoms, medications, equipment, rhythms, and vitals',
        icon: '🏥',
        hasSubTypes: true,
        subTypes: ['symptoms_interventions', 'medications_indications', 'rhythms_treatments'],
        hasDifficulty: true,
        isPremium: false
    },
    {
        id: 'iv_flow_rate',
        title: 'IV Flow Rate Calculator',
        description: 'Calculate drip rates and medication infusions',
        icon: '💉',
        hasSubModes: false,
        hasDifficulty: true,
        isPremium: true
    },
    {
        id: 'cardiac_rhythms',
        title: 'Cardiac Rhythm Flash Cards',
        description: 'Identify ECG rhythms quickly and accurately',
        icon: '📈',
        hasSubModes: false,
        hasDifficulty: false,
        isPremium: false
    },
    {
        id: 'airway_management',
        title: 'Airway Management Decision Tree',
        description: 'Navigate complex airway scenarios',
        icon: '🫁',
        hasSubModes: false,
        hasDifficulty: true,
        isPremium: false
    },
    {
        id: 'medication_dosing',
        title: 'Medication Dosing Calculator',
        description: 'Calculate correct doses for pediatric and adult patients',
        icon: '💊',
        hasSubModes: false,
        hasDifficulty: true,
        isPremium: false
    },
    {
        id: 'trauma_assessment',
        title: 'Trauma Assessment Priority',
        description: 'Identify and prioritize life threats',
        icon: '🚑',
        hasSubModes: false,
        hasDifficulty: true,
        isPremium: false
    },
    {
        id: 'lead_placement',
        title: '12-Lead Placement',
        description: 'Place electrodes in correct anatomical positions',
        icon: '📍',
        hasSubModes: false,
        hasDifficulty: false,
        isPremium: false
    },
    {
        id: 'sample_opqrst',
        title: 'SAMPLE/OPQRST Practice',
        description: 'Gather complete patient histories',
        icon: '📋',
        hasSubModes: false,
        hasDifficulty: false,
        isPremium: false
    },
    {
        id: 'abg_interpretation',
        title: 'ABG Interpretation',
        description: 'Interpret arterial blood gas values',
        icon: '🩸',
        hasSubModes: false,
        hasDifficulty: false,
        isPremium: true
    },
    {
        id: 'triage_scenarios',
        title: 'Triage Scenarios',
        description: 'Practice mass casualty incident triage',
        icon: '🏷️',
        hasSubModes: false,
        hasDifficulty: true,
        isPremium: false
    },
    {
        id: 'ecg_interpretation',
        title: 'ECG Interpretation',
        description: 'Identify STEMIs, ectopy, and abnormalities',
        icon: '💓',
        hasSubModes: false,
        hasDifficulty: false,
        isPremium: true
    },
    {
        id: 'ventilator_management',
        title: 'Ventilator Management',
        description: 'Master lung-protective strategies and ARDS management',
        icon: '🌬️',
        hasSubModes: false,
        hasDifficulty: false,
        isPremium: true
    }
];

export const DIFFICULTY_LEVELS = ['EMT-Basic', 'Paramedic', 'Critical Care'];
export const GAME_MODES = ['Free Practice', 'Timed Challenge'];

export const LEAD_PLACEMENTS = {
    'V1': {
        x: 52, y: 35,
        description: '4th intercostal space, right sternal border',
        landmark: 'Sternal angle → 2nd rib → count down 2 spaces'
    },
    'V2': {
        x: 48, y: 35,
        description: '4th intercostal space, left sternal border',
        landmark: 'Mirror V1 across sternum'
    },
    'V3': {
        x: 42, y: 40,
        description: 'Between V2 and V4',
        landmark: 'Placed after V4 is located'
    },
    'V4': {
        x: 36, y: 45,
        description: '5th intercostal space, midclavicular line',
        landmark: 'Clavicle → straight down to 5th ICS'
    },
    'V5': {
        x: 32, y: 48,
        description: '5th intercostal space, anterior axillary line',
        landmark: 'Horizontal from V4, anterior armpit'
    },
    'V6': {
        x: 28, y: 48,
        description: '5th intercostal space, midaxillary line',
        landmark: 'Horizontal from V4, mid-armpit'
    },
    'RA': {
        x: 65, y: 20,
        description: 'Right arm (anywhere on right arm/shoulder)',
        landmark: 'Avoid bony areas'
    },
    'LA': {
        x: 35, y: 20,
        description: 'Left arm (anywhere on left arm/shoulder)',
        landmark: 'Avoid bony areas'
    },
    'RL': {
        x: 58, y: 75,
        description: 'Right leg (anywhere on right leg/hip)',
        landmark: 'Ground electrode'
    },
    'LL': {
        x: 42, y: 75,
        description: 'Left leg (anywhere on left leg/hip)',
        landmark: 'Below umbilicus typically'
    }
};

export const AIRWAY_SCENARIOS = [
    {
        id: 1,
        title: 'Unresponsive Overdose Patient',
        difficulty: 'Paramedic',
        presentation: {
            age: 32,
            gender: 'M',
            chiefComplaint: 'Unresponsive',
            scene: 'Found by roommate, empty pill bottles nearby',
            vitals: {
                gcs: 'E1V1M3 = 5',
                rr: 6,
                hr: 58,
                bp: '98/60',
                spo2: 84
            },
            airway: 'Snoring respirations, vomit in mouth',
            breathing: 'Slow, shallow, irregular',
            skin: 'Cool, pale'
        },
        decisionTree: [
            {
                step: 1,
                question: 'What is your immediate airway intervention?',
                options: [
                    { text: 'Suction airway immediately', correct: true, feedback: 'Correct! Clear the airway first - you can\'t ventilate through vomit.' },
                    { text: 'Start BVM ventilation', correct: false, feedback: 'Not yet - you need to clear the airway first. BVM will push vomit into lungs.' },
                    { text: 'Insert OPA', correct: false, feedback: 'Not yet - suction first, then adjunct.' },
                    { text: 'Prepare for intubation', correct: false, feedback: 'Suction comes before any other intervention.' }
                ]
            },
            {
                step: 2,
                question: 'After suctioning, what airway adjunct?',
                options: [
                    { text: 'OPA (oropharyngeal airway)', correct: true, feedback: 'Correct! GCS 5 = no gag reflex, OPA is safe and effective.' },
                    { text: 'NPA (nasopharyngeal airway)', correct: false, feedback: 'NPA works, but OPA is better for unresponsive patients with no gag.' },
                    { text: 'No adjunct needed', correct: false, feedback: 'The snoring indicates obstruction - you need an adjunct.' },
                    { text: 'Immediate intubation', correct: false, feedback: 'Try basic interventions first. OPA + BVM may be adequate.' }
                ]
            },
            {
                step: 3,
                question: 'Patient still hypoxic (SpO2 86%) with OPA and BVM. Next step?',
                options: [
                    { text: 'Administer Narcan 2mg IN', correct: true, feedback: 'Correct! Reverse the opioid, restore respiratory drive. Monitor for re-sedation.' },
                    { text: 'Intubate immediately', correct: false, feedback: 'Try Narcan first - it may restore respiratory drive without advanced airway.' },
                    { text: 'Increase BVM rate', correct: false, feedback: 'You need to address the cause (opioid overdose), not just treat the symptom.' },
                    { text: 'Apply CPAP', correct: false, feedback: 'CPAP requires patient effort. This patient is apneic.' }
                ]
            }
        ],
        clinicalPearls: [
            'Suction always comes before any other airway intervention',
            'OPA for unresponsive (GCS ≤8), NPA for responsive patients',
            'Narcan reverses opioids but not benzos - patient may need airway even after Narcan',
            'Monitor for re-sedation - Narcan wears off before opioids do'
        ]
    },
    {
        id: 2,
        title: 'Anaphylaxis with Stridor',
        difficulty: 'EMT-Basic',
        presentation: {
            age: 28,
            gender: 'F',
            chiefComplaint: 'Can\'t breathe, throat swelling',
            scene: 'Restaurant, ate shrimp 10 minutes ago',
            vitals: {
                gcs: '14 (anxious, can\'t speak in full sentences)',
                rr: 32,
                hr: 128,
                bp: '98/60',
                spo2: 88
            },
            airway: 'Audible stridor, hoarse voice, drooling',
            breathing: 'Severe distress, using accessory muscles',
            skin: 'Flushed, urticaria on face and chest'
        },
        decisionTree: [
            {
                step: 1,
                question: 'What is your FIRST medication?',
                options: [
                    { text: 'Epinephrine 0.3mg IM (1:1000)', correct: true, feedback: 'Correct! Epi first in anaphylaxis. IM lateral thigh, can repeat q5min.' },
                    { text: 'Albuterol nebulizer', correct: false, feedback: 'Albuterol helps but won\'t stop anaphylaxis. Epi first!' },
                    { text: 'Benadryl 50mg IV', correct: false, feedback: 'Benadryl is adjunct therapy. Won\'t reverse airway swelling fast enough.' },
                    { text: 'High-flow oxygen', correct: false, feedback: 'O2 is important but won\'t stop the anaphylaxis. Epi first!' }
                ]
            },
            {
                step: 2,
                question: 'After Epi, stridor worsening. What is the airway emergency you\'re concerned about?',
                options: [
                    { text: 'Complete airway obstruction from laryngeal edema', correct: true, feedback: 'Correct! This is "can\'t intubate, can\'t oxygenate" territory. Prepare for cric.' },
                    { text: 'Aspiration from vomiting', correct: false, feedback: 'Possible, but laryngeal swelling is the immediate life threat.' },
                    { text: 'Bronchospasm', correct: false, feedback: 'Stridor = upper airway. Bronchospasm = lower airway (wheezing).' },
                    { text: 'Respiratory arrest', correct: false, feedback: 'That\'s a consequence of airway obstruction, not the primary problem.' }
                ]
            },
            {
                step: 3,
                question: 'Patient suddenly can\'t speak, unable to ventilate with BVM, SpO2 dropping to 70%. Your next move?',
                options: [
                    { text: 'Prepare for surgical cricothyrotomy', correct: true, feedback: 'Correct! Complete obstruction + failed BVM = surgical airway NOW. Don\'t delay.' },
                    { text: 'Attempt intubation', correct: false, feedback: 'If you can\'t BVM, you won\'t see anatomy. Cric is the answer.' },
                    { text: 'Give more Epi', correct: false, feedback: 'No time - airway is completely obstructed. Need surgical access.' },
                    { text: 'Hyperextend neck and try BVM again', correct: false, feedback: 'Positional maneuvers won\'t help complete anatomic obstruction.' }
                ]
            }
        ],
        clinicalPearls: [
            'Epi is the only medication that stops anaphylaxis - everything else is supportive',
            'Stridor = upper airway obstruction. Wheezing = lower airway bronchospasm',
            'Can\'t ventilate with BVM + complete obstruction = surgical airway immediately',
            'IM Epi can be repeated q5-15min. Don\'t wait for "improvement" if patient worsening'
        ]
    },
    {
        id: 3,
        title: 'Trauma Patient with Blood in Airway',
        difficulty: 'Critical Care',
        presentation: {
            age: 45,
            gender: 'M',
            chiefComplaint: 'Assault with baseball bat to face',
            scene: 'Active bleeding from nose/mouth, confused',
            vitals: {
                gcs: 'E3V4M5 = 12',
                rr: 28,
                hr: 118,
                bp: '132/88',
                spo2: 91
            },
            airway: 'Gurgling, blood pooling in oropharynx, midface instability',
            breathing: 'Rapid, splinting',
            skin: 'Pale, diaphoretic'
        },
        decisionTree: [
            {
                step: 1,
                question: 'First priority in this airway?',
                options: [
                    { text: 'Suction blood from airway', correct: true, feedback: 'Correct! Can\'t secure airway you can\'t see. Suction first, always.' },
                    { text: 'Prepare for RSI', correct: false, feedback: 'RSI is coming, but suction the blood first or you won\'t see anatomy.' },
                    { text: 'Apply c-collar', correct: false, feedback: 'Airway before c-spine. He has a patent airway issue NOW.' },
                    { text: 'Start BVM ventilation', correct: false, feedback: 'Can\'t ventilate through blood. Suction first.' }
                ]
            },
            {
                step: 2,
                question: 'After suctioning, which intubation approach?',
                options: [
                    { text: 'RSI with video laryngoscopy', correct: true, feedback: 'Correct! Trauma + blood + midface injury = RSI with best visualization (video).' },
                    { text: 'Awake nasal intubation', correct: false, feedback: 'Never in midface trauma - you could pass tube into cranial vault through fracture.' },
                    { text: 'Nasopharyngeal airway only', correct: false, feedback: 'NPA contraindicated in midface trauma. Also, he needs definitive airway.' },
                    { text: 'Blind digital intubation', correct: false, feedback: 'Not with active bleeding and facial trauma. Use direct visualization.' }
                ]
            },
            {
                step: 3,
                question: 'During RSI prep, patient vomits. GCS now 8. What do you do?',
                options: [
                    { text: 'Position patient head down, suction, then intubate', correct: true, feedback: 'Correct! Trendelenburg lets vomit drain away from cords. Suction, then tube.' },
                    { text: 'Abort RSI and BVM only', correct: false, feedback: 'No - he needs airway protection now. Vomiting with GCS 8 = high aspiration risk.' },
                    { text: 'Roll patient on side', correct: false, feedback: 'Not with possible c-spine injury. Head-down positioning instead.' },
                    { text: 'Proceed with intubation through vomit', correct: false, feedback: 'Suction first - you won\'t see cords through vomit.' }
                ]
            }
        ],
        clinicalPearls: [
            'Blood in airway = suction before any other intervention',
            'Midface trauma = contraindication for nasal airway or nasal intubation',
            'RSI in trauma: assume full stomach, use rapid sequence with cricoid pressure',
            'If patient vomits during RSI: suction, position (head down if no c-spine concern), then intubate'
        ]
    },
    {
        id: 4,
        title: 'CHF Patient in Respiratory Distress',
        difficulty: 'Paramedic',
        presentation: {
            age: 72,
            gender: 'F',
            chiefComplaint: 'Can\'t breathe, worse when lying flat',
            scene: 'Home, multiple pillows on bed, swollen ankles',
            vitals: {
                gcs: '15 (anxious)',
                rr: 36,
                hr: 122,
                bp: '188/102',
                spo2: 82
            },
            airway: 'Patent, speaking in 2-3 word sentences',
            breathing: 'Severe distress, crackles throughout, pink frothy sputum',
            skin: 'Cool, diaphoretic, peripheral edema'
        },
        decisionTree: [
            {
                step: 1,
                question: 'What is your first-line respiratory intervention?',
                options: [
                    { text: 'CPAP 10cm H2O with 100% O2', correct: true, feedback: 'Correct! CPAP is first-line for CHF/pulmonary edema. Reduces preload, improves oxygenation.' },
                    { text: 'High-flow oxygen via NRB', correct: false, feedback: 'O2 helps but won\'t address the pulmonary edema. CPAP is superior.' },
                    { text: 'Immediate intubation', correct: false, feedback: 'Too aggressive. CPAP works in 90% of cases. Try non-invasive first.' },
                    { text: 'BVM ventilation', correct: false, feedback: 'BVM is for apneic/inadequate breathing. She\'s working hard but breathing. Try CPAP.' }
                ]
            },
            {
                step: 2,
                question: 'Along with CPAP, what medication?',
                options: [
                    { text: 'Nitroglycerin 0.4mg SL (if BP permits)', correct: true, feedback: 'Correct! NTG reduces preload (dilates veins), decreases work on heart. Watch BP!' },
                    { text: 'Furosemide (Lasix) 40mg IV', correct: false, feedback: 'Lasix works but takes 20-30min. NTG works in minutes. Some protocols use both.' },
                    { text: 'Albuterol nebulizer', correct: false, feedback: 'This is pulmonary edema, not bronchospasm. Crackles, not wheezes.' },
                    { text: 'Morphine 2mg IV', correct: false, feedback: 'Morphine used to be standard but is no longer recommended. Causes respiratory depression.' }
                ]
            },
            {
                step: 3,
                question: 'After 5min on CPAP + NTG, patient becomes drowsy, RR 8, SpO2 94%. What happened?',
                options: [
                    { text: 'Hypercarbic respiratory failure - prepare to intubate', correct: true, feedback: 'Correct! She fatigued. High work of breathing → exhaustion → hypoventilation. Need advanced airway.' },
                    { text: 'CPAP is working - continue current treatment', correct: false, feedback: 'No - drowsiness + bradypnea = failure. She\'s retaining CO2. This is bad.' },
                    { text: 'NTG dropped BP too much - give fluid bolus', correct: false, feedback: 'Drowsiness isn\'t from hypotension. This is respiratory fatigue.' },
                    { text: 'Normal response to treatment - patient is relaxing', correct: false, feedback: 'Never assume drowsiness is "relaxation" in respiratory distress. Always check RR!' }
                ]
            }
        ],
        clinicalPearls: [
            'CPAP is first-line for CHF/pulmonary edema - reduces intubation rate by ~50%',
            'Watch for respiratory fatigue: decreasing RR + drowsiness = failure, need tube',
            'NTG works faster than Lasix for acute pulmonary edema',
            'Pink frothy sputum = pulmonary edema (CHF). White frothy = aspiration/other cause'
        ]
    },
    {
        id: 5,
        title: 'Pediatric Foreign Body Airway Obstruction',
        difficulty: 'EMT-Basic',
        presentation: {
            age: 3,
            gender: 'M',
            chiefComplaint: 'Choking on toy piece',
            scene: 'Home, mother witnessed choking event',
            vitals: {
                gcs: 'Alert, panicking',
                rr: 0,
                hr: 160,
                bp: 'not obtained',
                spo2: 'dropping from 98 to 70%'
            },
            airway: 'Unable to cry or cough, silent, turning blue',
            breathing: 'None - complete obstruction',
            skin: 'Cyanotic'
        },
        decisionTree: [
            {
                step: 1,
                question: 'Child is conscious but unable to cough or breathe. Your immediate action?',
                options: [
                    { text: 'Back blows and chest thrusts (infant) or abdominal thrusts (child)', correct: true, feedback: 'Correct! Complete obstruction + conscious = BLS airway clearance maneuvers immediately.' },
                    { text: 'Attempt to visualize and remove object with fingers', correct: false, feedback: 'Never blind finger sweep - you could push object deeper. Do obstruction maneuvers first.' },
                    { text: 'Immediate BVM ventilation', correct: false, feedback: 'Can\'t ventilate through complete obstruction. Clear airway first.' },
                    { text: 'Call for ALS backup first', correct: false, feedback: 'No time - child will arrest in seconds. Act NOW, call for help simultaneously.' }
                ]
            },
            {
                step: 2,
                question: 'After 5 back blows, child goes limp and unconscious. Next step?',
                options: [
                    { text: 'Start CPR beginning with compressions', correct: true, feedback: 'Correct! Unconscious foreign body = CPR. Compressions may dislodge object.' },
                    { text: 'Continue back blows', correct: false, feedback: 'Once unconscious, switch to CPR. Compressions create pressure to dislodge object.' },
                    { text: 'Attempt rescue breathing first', correct: false, feedback: 'No - start with compressions. Pressure from compressions may clear obstruction.' },
                    { text: 'Perform emergency cricothyrotomy', correct: false, feedback: 'Not appropriate for pediatric foreign body. CPR first, then advanced airway if needed.' }
                ]
            },
            {
                step: 3,
                question: 'During CPR, you open airway and see the object at back of throat. What do you do?',
                options: [
                    { text: 'Remove it with Magill forceps or fingers if easily grasped', correct: true, feedback: 'Correct! If you can SEE it and REACH it easily, remove it. Don\'t blind sweep.' },
                    { text: 'Continue CPR without removing it', correct: false, feedback: 'If you can see and reach it, remove it! Clear obstruction = restore breathing.' },
                    { text: 'Attempt to push it past cords with laryngoscope', correct: false, feedback: 'Dangerous - could completely occlude one mainstem. Remove the object.' },
                    { text: 'Suction it out', correct: false, feedback: 'Suction won\'t work on solid objects. Use forceps or fingers if visible.' }
                ]
            }
        ],
        clinicalPearls: [
            'Conscious + complete obstruction = back blows/abdominal thrusts immediately',
            'Unconscious + foreign body = CPR (compressions may dislodge)',
            'Never blind finger sweep - only remove if you can SEE and REACH the object',
            'Pediatric foreign body: grapes, hot dogs, toys, coins are most common'
        ]
    }
];

export const SAMPLE_OPQRST_SCENARIOS = [
    {
        id: 1,
        title: 'Chest Pain - Possible ACS',
        difficulty: 'Paramedic',
        patient: {
            name: 'Robert Johnson',
            age: 58,
            gender: 'M',
            appearance: 'Pale, diaphoretic, anxious',
            chiefComplaint: 'Chest pain'
        },
        answers: {
            onset: 'Started 30 minutes ago while watching TV, came on suddenly',
            provocation: 'Nothing makes it better, worse when I take a deep breath',
            quality: 'Feels like pressure, like an elephant sitting on my chest',
            radiation: 'Goes into my left arm and jaw',
            severity: '8 out of 10',
            time: 'Constant for the last 30 minutes',
            signs: 'Sweating, nausea, feels like I might pass out',
            allergies: 'Penicillin',
            medications: 'Lisinopril for blood pressure, baby aspirin daily',
            pastHistory: 'High blood pressure, high cholesterol, father had heart attack at 55',
            lastIntake: 'Ate dinner 2 hours ago',
            events: 'Nothing unusual, just sitting at home watching TV when it started'
        },
        criticalFindings: [
            'Sudden onset',
            'Radiation to arm and jaw',
            'Diaphoresis',
            'Family history of early MI',
            'High-risk presentation'
        ],
        redFlags: [
            'Classic ACS presentation',
            'Radiation pattern concerning for MI',
            'Diaphoresis = high-risk feature',
            'Family history significant'
        ],
        suspectedDx: 'Acute Coronary Syndrome (possible STEMI)'
    },
    {
        id: 2,
        title: 'Abdominal Pain - Possible Appendicitis',
        difficulty: 'EMT-Basic',
        patient: {
            name: 'Sarah Martinez',
            age: 19,
            gender: 'F',
            appearance: 'Lying still, guarding abdomen, pale',
            chiefComplaint: 'Stomach pain'
        },
        answers: {
            onset: 'Started yesterday around my belly button, moved to right lower side this morning',
            provocation: 'Hurts more when I move, cough, or you press on it',
            quality: 'Sharp, stabbing pain',
            radiation: 'Stays in the right lower side now',
            severity: '7 out of 10, getting worse',
            time: 'Been about 24 hours total, worse in the last 6 hours',
            signs: 'Fever of 101, nausea, threw up twice this morning',
            allergies: 'No known allergies',
            medications: 'Birth control pills only',
            pastHistory: 'No major medical problems',
            lastIntake: 'Can\'t remember, maybe yesterday afternoon - I have no appetite',
            events: 'Just started hurting, nothing happened before it'
        },
        criticalFindings: [
            'Periumbilical → RLQ migration (classic)',
            'Pain with movement/rebound',
            'Fever',
            'Anorexia',
            'Nausea/vomiting'
        ],
        redFlags: [
            'McBurney\'s point tenderness',
            'Migration pattern classic for appendicitis',
            'Guarding suggests peritoneal irritation',
            'Young female - also consider ectopic pregnancy'
        ],
        suspectedDx: 'Acute Appendicitis (surgical emergency)'
    },
    {
        id: 3,
        title: 'Headache - Possible Stroke',
        difficulty: 'Critical Care',
        patient: {
            name: 'Margaret Chen',
            age: 67,
            gender: 'F',
            appearance: 'Left facial droop, slurred speech',
            chiefComplaint: 'Worst headache of my life'
        },
        answers: {
            onset: 'Sudden, like a thunderclap, about 45 minutes ago',
            provocation: 'Nothing makes it better or worse',
            quality: 'Severe, never felt anything like this before',
            radiation: 'All over my head, mostly back of head',
            severity: '10 out of 10, worst pain ever',
            time: '45 minutes, constant',
            signs: 'Left side of face feels weird, trouble talking, left arm weak',
            allergies: 'Sulfa drugs',
            medications: 'Warfarin for atrial fibrillation, metoprolol',
            pastHistory: 'Atrial fibrillation, high blood pressure, previous TIA 2 years ago',
            lastIntake: 'Coffee this morning around 8am',
            events: 'Was getting ready for church when headache hit like a bolt of lightning'
        },
        criticalFindings: [
            'Sudden "thunderclap" onset',
            'Worst headache ever',
            'Focal neuro deficits (facial droop, arm weakness)',
            'On anticoagulation',
            'AFib history'
        ],
        redFlags: [
            'Thunderclap headache = subarachnoid hemorrhage until proven otherwise',
            'Anticoagulation + sudden headache = ICH risk',
            'Stroke symptoms (FAST positive)',
            'Time-sensitive emergency'
        ],
        suspectedDx: 'CVA (stroke) vs Intracranial Hemorrhage - activate stroke protocol'
    },
    {
        id: 4,
        title: 'Shortness of Breath - COPD Exacerbation',
        difficulty: 'Paramedic',
        patient: {
            name: 'William Thompson',
            age: 72,
            gender: 'M',
            appearance: 'Tripod position, pursed lip breathing, barrel chest',
            chiefComplaint: 'Can\'t catch my breath'
        },
        answers: {
            onset: 'Been getting worse over the past 3 days, really bad today',
            provocation: 'Worse when I try to move around, better when I sit still',
            quality: 'Just can\'t get enough air, feels tight',
            radiation: 'Just in my chest',
            severity: '8 out of 10 - I\'m really struggling',
            time: '3 days getting worse, severe for past 6 hours',
            signs: 'Coughing up green mucus, fever yesterday, wheezing',
            allergies: 'None',
            medications: 'Albuterol inhaler, Spiriva, prednisone, home oxygen 2L',
            pastHistory: 'COPD, 50 pack-year smoking history, quit 5 years ago',
            lastIntake: 'Had some soup for lunch',
            events: 'Caught a cold from my grandson last week, been getting worse since'
        },
        criticalFindings: [
            'Progressive worsening (3 days)',
            'Productive cough with color change',
            'Fever',
            'Increased work of breathing',
            'Home O2 dependent'
        ],
        redFlags: [
            'COPD exacerbation likely infectious',
            'High risk for respiratory failure',
            'Watch for fatigue/declining mental status',
            'May need NIV or intubation'
        ],
        suspectedDx: 'Acute COPD Exacerbation with suspected pneumonia'
    }
];
