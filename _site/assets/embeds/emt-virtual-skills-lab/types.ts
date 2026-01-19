
export enum UserLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'instructor';
  avatar: string;
}

export interface Scenario {
  id: string;
  patientDemographics: string;
  chiefComplaint: string;
  vitals: {
    hr: string;
    bp: string;
    rr: string;
    spO2: string;
  };
  narrative: string;
  requiredSkill: string;
  environmentalFactors?: string;
  isDistractionActive?: boolean;
  phase: number;
  totalPhases: number;
  chainContext?: string; // Summary of previous events for AI context
  suggestedDistraction?: string; // Specific distraction suggested for this scenario
}

export interface Skill {
  id: string;
  name: string;
  category: 'Airway' | 'Cardiac' | 'Trauma' | 'Assessment' | 'Medical';
  description: string;
  icon: string;
  criticalCriteria: string[];
  visionCompatibility: 'High' | 'Medium' | 'Low';
}

export interface FeedbackItem {
  id: string;
  skillId: string;
  skillName: string;
  assessmentType: 'Needs Practice' | 'Developing' | 'Proficient' | 'Excellent';
  score: number; // 0-100
  timestamp: number;
  fullText: string;
  userLevel: UserLevel;
}

export interface SessionState {
  currentUser: User | null;
  userLevel: UserLevel | null;
  activeSkill: Skill | null;
  isRecording: boolean;
  isPaused: boolean;
  isLiveMode: boolean;
  history: FeedbackItem[];
  currentScenario: Scenario | null;
  lightingIntensity: number; // 0 to 1
  showOverlays: boolean;
  activeDistraction: string | null;
}
