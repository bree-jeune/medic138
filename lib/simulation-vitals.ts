import { ClinicalPathology } from './simulation-models';

/**
 * Dynamic Vitals Generation Engine
 * Generates initial vitals based on standard pathology presentations.
 * Models NREMT / NAEMT / AHA standard presentations.
 */

export const generateRespiratoryRate = (pathology: ClinicalPathology): number => {
  switch (pathology) {
    case 'OpiateOverdose':
      return Math.floor(Math.random() * 6) + 4; // 4 - 9 breaths per minute
    case 'Asthma':
    case 'Anaphylaxis':
    case 'CHF':
      return Math.floor(Math.random() * 16) + 24; // 24 - 39 breaths per minute
    case 'COPD':
      return Math.floor(Math.random() * 10) + 22; // 22 - 31 breaths per minute
    case 'VFibArrest':
      return 0; // Apnea in cardiac arrest
    case 'STEMI':
    case 'SVT':
    case 'Normal':
    default:
      return Math.floor(Math.random() * 8) + 12; // 12 - 19 breaths per minute
  }
};

export const generateHeartRate = (pathology: ClinicalPathology, age: number): number => {
  let baseHr = age > 65 ? 80 : 70;

  switch (pathology) {
    case 'OpiateOverdose':
      return Math.floor(Math.random() * 20) + 50; // 50 - 69 bpm
    case 'Asthma':
    case 'Anaphylaxis':
      return Math.floor(Math.random() * 30) + 110; // 110 - 139 bpm
    case 'CHF':
      return Math.floor(Math.random() * 25) + 100; // 100 - 124 bpm
    case 'COPD':
      return Math.floor(Math.random() * 20) + 90; // 90 - 109 bpm
    case 'SVT':
      return Math.floor(Math.random() * 40) + 160; // 160 - 199 bpm
    case 'VFibArrest':
      return 0;
    case 'STEMI':
    case 'Normal':
    default:
      return Math.floor(Math.random() * 40) + 60; // 60 - 99 bpm
  }
};

export const generateBloodPressure = (pathology: ClinicalPathology): { systolic: number, diastolic: number } => {
  switch (pathology) {
    case 'Anaphylaxis':
      return {
        systolic: Math.floor(Math.random() * 20) + 70, // 70-89
        diastolic: Math.floor(Math.random() * 20) + 40  // 40-59
      };
    case 'CHF':
      return {
        systolic: Math.floor(Math.random() * 40) + 160, // 160-199
        diastolic: Math.floor(Math.random() * 20) + 90  // 90-109
      };
    case 'OpiateOverdose':
      return {
        systolic: Math.floor(Math.random() * 30) + 90, // 90-119
        diastolic: Math.floor(Math.random() * 20) + 50  // 50-69
      };
    case 'VFibArrest':
      return { systolic: 0, diastolic: 0 };
    case 'SVT':
      return {
        systolic: Math.floor(Math.random() * 20) + 80, // 80-99 (often borderline hypotensive)
        diastolic: Math.floor(Math.random() * 10) + 50  // 50-59
      };
    case 'STEMI':
    case 'Normal':
    case 'Asthma':
    case 'COPD':
    default:
      return {
        systolic: Math.floor(Math.random() * 40) + 110, // 110-149
        diastolic: Math.floor(Math.random() * 20) + 70  // 70-89
      };
  }
};

export const generateGCS = (pathology: ClinicalPathology): number => {
  switch (pathology) {
    case 'OpiateOverdose':
      return Math.floor(Math.random() * 5) + 3; // GCS 3-7
    case 'Anaphylaxis':
      return Math.random() > 0.5 ? 15 : Math.floor(Math.random() * 7) + 8;
    case 'VFibArrest':
      return 3;
    default:
      return 15; // Assume awake/alert unless specified
  }
};

export const generateVitals = (pathology: ClinicalPathology, age: number) => {
  return {
    rr: generateRespiratoryRate(pathology),
    hr: generateHeartRate(pathology, age),
    bp: generateBloodPressure(pathology),
    gcs: generateGCS(pathology),
    spo2: pathology === 'Normal' ? 98 : (pathology === 'VFibArrest' ? 0 : Math.floor(Math.random() * 15) + 85) // 85-99 for pathological, 0 for dead
  };
};
