/**
 * NREMT Clinical Simulation Engine - Architecture
 * All clinical guidelines must reference NAEMT (PHTLS/AMLS) or AHA standards published within the last 5 years.
 */

export type CertificationLevel = 'EMR' | 'EMT' | 'AEMT' | 'Paramedic' | 'Critical Care';

export type ClinicalDomain = 
  | 'Airway, Respiration & Ventilation'
  | 'Cardiology & Resuscitation'
  | 'Trauma'
  | 'Medical/Obstetrics/Gynecology'
  | 'EMS Operations';

export interface EducationalCompetency {
  source: 'NREMT' | 'NAEMT' | 'AHA' | 'National EMS Educational Standards';
  standardId: string; // e.g., "AHA ACLS 2020 Update", "PHTLS 9th Ed."
  description: string;
}

// ---------------------------------------------------------
// 1. The Walkthrough / Pre-Game
// ---------------------------------------------------------
export interface PreScenarioWalkthrough {
  title: string;
  competenciesMatched: EducationalCompetency[];
  learningObjectives: string[];
  // Does not provide answers, only educational standards and logic parameters
  clinicalGuidelines: string[]; 
}

// ---------------------------------------------------------
// 2. Dynamic Vitals & Pathologies
// ---------------------------------------------------------
export type RespiratoryPathology = 'Normal' | 'Asthma' | 'COPD' | 'OpiateOverdose' | 'Anaphylaxis' | 'CHF';

export interface DynamicVitalsSystem {
  // Functions to generate vitals based on pathology
  generateRR: (pathology: RespiratoryPathology) => number; // e.g. <12 for opiate, >20 for Asthma
  generateHR: (age: number, distressLevel: number) => number;
  generateBP: (pathology: string) => { systolic: number, diastolic: number };
}

// ---------------------------------------------------------
// 3. Interactive Assessment Components
// ---------------------------------------------------------
export interface AuscultationPoint {
  anatomicalLocation: 'RUL' | 'RML' | 'RLL' | 'LUL' | 'LLL' | 'Aortic' | 'Pulmonic' | 'Tricuspid' | 'Mitral';
  soundFileUrl: string; // e.g., '/audio/wheezing-expiratory.mp3'
  correctFindingText: string;
}

export interface SphygmomanometerConfig {
  actualSystolic: number;
  actualDiastolic: number;
  marginOfErrorAllowed: number; // e.g., +/- 4 mmHg
  korotkoffSoundUrl: string; // The base audio file
}

export interface PatientAssessmentData {
  avatarImageUrl: string; // Image of the patient for click interactions
  auscultationPoints: AuscultationPoint[];
  bpConfig?: SphygmomanometerConfig; // If EMR/EMT/AEMT, require manual BP
  visualFindings: string[]; // e.g., "Cyanosis", "JVD"
}

// ---------------------------------------------------------
// 4. The NREMT Phases
// ---------------------------------------------------------
export type SimulationPhaseName = 'Dispatch' | 'PreArrival' | 'SceneArrival' | 'PrimaryAssessment' | 'SecondaryAssessment' | 'Treatment' | 'TransportDecision' | 'Destination';

export interface SimulationAction {
  id: string;
  text: string;
  isCorrect: boolean;
  timeCostMs: number; // e.g., 2 minutes (120000 ms) simulated time
  competencyRef: EducationalCompetency;
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
  estimatedDurationMs: number; // e.g., 20 mins = 1200000
  walkthrough: PreScenarioWalkthrough;
  
  // The generator builds the full phase structure based on dynamic vitals
  generateSimulation: (seed?: number) => {
    phases: Record<SimulationPhaseName, SimulationPhase>;
    initialVitals: Record<string, any>;
  };
}
