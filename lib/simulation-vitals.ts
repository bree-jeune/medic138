import { RespiratoryPathology } from './simulation-models';

/**
 * Dynamic Vitals Generation Engine
 * Generates initial vitals based on standard pathology presentations.
 * Models NREMT / NAEMT / AHA standard presentations.
 */

export const generateRespiratoryRate = (pathology: RespiratoryPathology): number => {
  switch (pathology) {
    case 'OpiateOverdose':
      // Bradypnea is a hallmark of opiate toxicity
      return Math.floor(Math.random() * 6) + 4; // 4 - 9 breaths per minute
    case 'Asthma':
    case 'Anaphylaxis':
    case 'CHF':
      // Tachypnea due to hypoxia/distress
      return Math.floor(Math.random() * 16) + 24; // 24 - 39 breaths per minute
    case 'COPD':
      // Chronic retainers often run slightly high, but acute exacerbations push it higher
      return Math.floor(Math.random() * 10) + 22; // 22 - 31 breaths per minute
    case 'Normal':
    default:
      return Math.floor(Math.random() * 8) + 12; // 12 - 19 breaths per minute
  }
};

export const generateHeartRate = (pathology: RespiratoryPathology, age: number): number => {
  // Base HR based on age (simplified adult model for now)
  let baseHr = age > 65 ? 80 : 70;

  switch (pathology) {
    case 'OpiateOverdose': // Often bradycardic or normal-low
      return Math.floor(Math.random() * 20) + 50; // 50 - 69 bpm
    case 'Asthma': // Tachycardic from work of breathing / hypoxia
    case 'Anaphylaxis': // Compensatory tachycardia for vasodilation
      return Math.floor(Math.random() * 30) + 110; // 110 - 139 bpm
    case 'CHF': // Sympathetic overdrive
      return Math.floor(Math.random() * 25) + 100; // 100 - 124 bpm
    case 'COPD':
      return Math.floor(Math.random() * 20) + 90; // 90 - 109 bpm
    case 'Normal':
    default:
      return Math.floor(Math.random() * 40) + 60; // 60 - 99 bpm
  }
};

export const generateBloodPressure = (pathology: RespiratoryPathology): { systolic: number, diastolic: number } => {
  switch (pathology) {
    case 'Anaphylaxis':
      // Distributive shock profile (hypotension, wide pulse pressure initially then narrow)
      return {
        systolic: Math.floor(Math.random() * 20) + 70, // 70-89
        diastolic: Math.floor(Math.random() * 20) + 40  // 40-59
      };
    case 'CHF':
      // Often hypertensive emergencies
      return {
        systolic: Math.floor(Math.random() * 40) + 160, // 160-199
        diastolic: Math.floor(Math.random() * 20) + 90  // 90-109
      };
    case 'OpiateOverdose':
      // Generally hypotensive or normotensive
      return {
        systolic: Math.floor(Math.random() * 30) + 90, // 90-119
        diastolic: Math.floor(Math.random() * 20) + 50  // 50-69
      };
    case 'Normal':
    case 'Asthma':
    case 'COPD':
    default:
      // Normotensive to mild hypertension from anxiety
      return {
        systolic: Math.floor(Math.random() * 30) + 110, // 110-139
        diastolic: Math.floor(Math.random() * 20) + 70  // 70-89
      };
  }
};

export const generateGCS = (pathology: RespiratoryPathology): number => {
  switch (pathology) {
    case 'OpiateOverdose':
      return Math.floor(Math.random() * 5) + 3; // GCS 3-7
    case 'Anaphylaxis':
      // Ranges from 15 down to 8 depending on severity of shock
      return Math.random() > 0.5 ? 15 : Math.floor(Math.random() * 7) + 8;
    default:
      return 15; // Assume awake/alert unless specified
  }
};

export const generateVitals = (pathology: RespiratoryPathology, age: number) => {
  return {
    rr: generateRespiratoryRate(pathology),
    hr: generateHeartRate(pathology, age),
    bp: generateBloodPressure(pathology),
    gcs: generateGCS(pathology),
    spo2: pathology === 'Normal' ? 98 : Math.floor(Math.random() * 15) + 75 // 75-89 for pathological
  };
};
