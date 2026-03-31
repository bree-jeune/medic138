/**
 * NREMT Clinical Simulation Engine - Architecture
 * All clinical guidelines must reference NAEMT (PHTLS/AMLS) or AHA standards published within the last 5 years.
 */

export type CertificationLevel =
  | "EMR"
  | "EMT"
  | "AEMT"
  | "Paramedic"
  | "Critical Care";

export type ClinicalDomain =
  | "Airway, Respiration & Ventilation"
  | "Cardiology & Resuscitation"
  | "Trauma"
  | "Medical/Obstetrics/Gynecology"
  | "EMS Operations";

export interface CompetencyReference {
  source:
    | "NREMT"
    | "NAEMT"
    | "AHA"
    | "National EMS Educational Standards"
    | "Pharm"
    | "Legal";
  standardId: string; // e.g., "AHA ACLS 2020 Update", "PHTLS 9th Ed."
  description: string;
}

// ---------------------------------------------------------
// 1. The Walkthrough / Pre-Game
// ---------------------------------------------------------
export interface PreScenarioWalkthrough {
  title: string;
  competenciesMatched: CompetencyReference[];
  learningObjectives: string[];
  // Does not provide answers, only educational standards and logic parameters
  clinicalGuidelines: string[];
}

// ---------------------------------------------------------
// 2. Dynamic Vitals & Pathologies
// ---------------------------------------------------------
export type ClinicalPathology =
  | "Normal"
  | "Asthma"
  | "COPD"
  | "OpiateOverdose"
  | "Anaphylaxis"
  | "CHF"
  | "STEMI"
  | "VFibArrest"
  | "SVT";

export interface DynamicVitalsSystem {
  // Functions to generate vitals based on pathology
  generateRR: (pathology: ClinicalPathology) => number; // e.g. <12 for opiate, >20 for Asthma
  generateHR: (age: number, distressLevel: number) => number;
  generateBP: (pathology: string) => { systolic: number; diastolic: number };
}

export interface PatientVitals {
  rr: number;
  hr: number;
  bp: { systolic: number; diastolic: number };
  gcs: number;
  spo2: number;
}

// ---------------------------------------------------------
// 3. Interactive Assessment Components
// ---------------------------------------------------------
export interface AuscultationPoint {
  anatomicalLocation:
    | "RUL"
    | "RML"
    | "RLL"
    | "LUL"
    | "LLL"
    | "Aortic"
    | "Pulmonic"
    | "Tricuspid"
    | "Mitral";
  soundFileUrl: string; // e.g., '/audio/wheezing-expiratory.mp3'
  correctFindingText: string;
}

export interface SphygmomanometerConfig {
  actualSystolic: number;
  actualDiastolic: number;
  marginOfErrorAllowed: number; // e.g., +/- 4 mmHg
  korotkoffSoundUrl: string; // The base audio file
}

export interface SimulatedMonitorConfig {
  // Used for Paramedic / Critical Care levels
  supports12Lead: boolean;
  supportsPacing: boolean;
  supportsDefibrillation: boolean;
  supportsSynchronizedCardioversion: boolean;
  initialRhythmText: string; // e.g. "Sinus Tachycardia" -> renders as a waveform
}

export interface PatientAssessmentData {
  avatarImageUrl: string; // Image of the patient for click interactions (Epic LDA-style)
  auscultationPoints: AuscultationPoint[];
  bpConfig?: SphygmomanometerConfig; // If EMR/EMT/AEMT, require manual BP
  monitorConfig?: SimulatedMonitorConfig; // If ALS, provide heart monitor interface
  visualFindings: string[]; // e.g., "Cyanosis", "JVD"
}

// ---------------------------------------------------------
// 4. The NREMT Phases (En Route, Scene, Post-Scene)
// ---------------------------------------------------------
// The overarching NREMT testing phases with more granular sub-phases
export type SimulationPhaseName =
  // En Route Phase
  | "Dispatch"
  | "PreArrival"
  // Scene Phase
  | "SceneArrival"
  | "Assessment"
  | "Treatment"
  // Post-Scene (Transport) Phase
  | "TransportDecision"
  | "Destination";

export interface SimulationAction {
  id: string;
  text: string;
  isCorrect: boolean;
  timeCostMs: number; // e.g., 2 minutes (120000 ms) simulated time
  competencyRef: CompetencyReference;
  feedback: string;
}

export interface SimulationPhase {
  phaseName: SimulationPhaseName;
  scenarioText: string;
  availableActions: SimulationAction[];
  requiredActionsToAdvance: string[]; // Action IDs that must be completed to move to the next phase
  assessmentData?: PatientAssessmentData; // Available during Primary/Secondary
  timeLimitMs?: number; // Optional hard limit for the phase
}

// ---------------------------------------------------------
// 5. The Root Scenario Engine Interface
// ---------------------------------------------------------
export interface NREMTSimulation {
  id: string;
  title: string;
  targetCertification: CertificationLevel[];
  clinicalDomain: ClinicalDomain;
  estimatedDurationMs: number; // e.g., 20 mins = 1200000
  walkthrough: PreScenarioWalkthrough;
  sourceFootnotes: string[]; // e.g. ["American Heart Association. (2020). Guidelines for CPR and ECC.", "NAEMT. (2023). PHTLS 10th Edition."]

  // The generator builds the full phase structure based on dynamic vitals
  generateSimulation: (seed?: number) => {
    phases: Record<SimulationPhaseName, SimulationPhase>;
    initialVitals: PatientVitals;
  };
}
