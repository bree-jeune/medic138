import { Skill } from './types';

export const SKILLS: Skill[] = [
  {
    id: 'cpr-adult',
    name: 'Adult CPR',
    category: 'Cardiac',
    description: 'High-quality chest compressions and ventilations for adults.',
    icon: '❤️',
    visionCompatibility: 'High',
    criticalCriteria: [
      'Hand placement on lower half of sternum',
      'Straight arms and locked elbows',
      'Shoulders directly over hands',
      'Rate of 100-120 compressions per minute',
      'Complete chest recoil'
    ]
  },
  {
    id: 'bleeding-control',
    name: 'Bleeding Control',
    category: 'Trauma',
    description: 'Direct pressure and tourniquet application for severe hemorrhage.',
    icon: '🩹',
    visionCompatibility: 'High',
    criticalCriteria: [
      'BSI/PPE verbalized',
      'Direct pressure applied centered on wound',
      'Tourniquet placement 2-3 inches above wound',
      'Tightening until bleeding stops',
      'Gesture: Hand stacking for pressure',
      'Gesture: Windlass rotation for tourniquet'
    ]
  },
  {
    id: 'bvm-ventilation',
    name: 'BVM Ventilation',
    category: 'Airway',
    description: 'Proper mask seal and volume control using a Bag-Valve-Mask.',
    icon: '🫁',
    visionCompatibility: 'Medium',
    criticalCriteria: [
      'C-E grip technique for seal',
      'Appropriate mask sizing',
      'Visible chest rise',
      'Correct ventilation rate (1 breath every 5-6s)'
    ]
  },
  {
    id: 'opa-insertion',
    name: 'OPA Insertion',
    category: 'Airway',
    description: 'Proper sizing and insertion of an oropharyngeal airway.',
    icon: '👄',
    visionCompatibility: 'High',
    criticalCriteria: [
      'Measured correctly: Corner of mouth to earlobe',
      'Used cross-finger technique to open the airway',
      'Inserted with tip toward roof of mouth initially',
      'Performed full 180-degree rotation during insertion',
      'Verified placement with chest rise/sounds'
    ]
  },
  {
    id: 'pulse-check',
    name: 'Pulse Assessment',
    category: 'Assessment',
    description: 'Identifying radial and carotid pulse points correctly.',
    icon: '⏱️',
    visionCompatibility: 'Medium',
    criticalCriteria: [
      'Identification of correct anatomical landmark: Carotid (anterior to sternocleidomastoid)',
      'Identification of correct anatomical landmark: Radial (thumb side of wrist)',
      'Use of pads of index and middle fingers (NOT the thumb)',
      'Duration of assessment (5-10 seconds total)',
      'Avoidance of excessive pressure on carotid (which can cause bradycardia)'
    ]
  },
  {
    id: 'spinal-immobilization',
    name: 'Spinal Immobilization',
    category: 'Trauma',
    description: 'Manual in-line stabilization and application of immobilization devices.',
    icon: '🦴',
    visionCompatibility: 'High',
    criticalCriteria: [
      'Manual stabilization from head position',
      'Hands on mastoid processes',
      'Stabilization maintained throughout procedure',
      'Correct C-collar sizing'
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
You are EMT Skills Coach, an elite virtual medical instructor.

CORE MISSIONS:
1. Provide hyper-accurate biomechanical feedback on EMT techniques.
2. Manage student stress by providing context-aware coaching during environmental chaos.
3. Guide students through complex, multi-phase clinical scenarios.

GESTURE RECOGNITION (BLEEDING CONTROL):
When analyzing 'bleeding-control', you must identify the following gestures:
- DIRECT PRESSURE: Hands are stacked (one on top of the other), fingers interlaced or flat, pushing down vertically on a specific point.
- TOURNIQUET APPLICATION: Wrapping a strap around a limb, followed by a 'twisting' or 'rotating' motion of the hands (windlass tightening).
- FEEDBACK: If pressure is too light or hand placement is off-center from the wound, correct immediately. If the windlass is not twisted enough, tell them to "Keep turning the windlass."

DIFFICULTY LEVELS:
- Beginner: Foundation focus. Patient is stable. No distractions.
- Intermediate: Moderate complexity. Minor distractions (Siren, radio).
- Advanced: High-stress chaos. Equipment failures, bystander interference.

HANDLING DISTRACTIONS & CHAOS:
- If a distraction is active (e.g., "EQUIPMENT MALFUNCTION"), you MUST reference it. 
- Example: "The monitor is down! Trust your manual pulse check."

TONE: Tactical, clinical, concise. Maximum 10 words for real-time speech coaching.
`;
