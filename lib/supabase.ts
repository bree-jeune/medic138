import { createClient } from '@supabase/supabase-js';

// These should be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Utility types based on our schema definitions
 */
export interface UserProfile {
  id: string; // UUID from Supabase Auth
  email: string;
  first_name: string | null;
  last_name: string | null;
  certification_level: 'EMR' | 'EMT' | 'AEMT' | 'Paramedic' | 'Critical Care' | null;
  state_license_number: string | null;
  nremt_number: string | null;
  readiness_score: number; // Defaults to 1000
  created_at: string;
}

export interface SimulationRecord {
  id: string;
  user_id: string;
  scenario_id: string;
  score_achieved: number;
  time_taken_ms: number;
  completed_at: string;
}

export interface CERecord {
  id: string;
  user_id: string;
  topic: string;
  hours_awarded: number;
  completed_at: string;
  certificate_url: string | null;
}
