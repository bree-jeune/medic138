-- Medic 138 Database Schema (Supabase / Postgres)
-- Phase 1: Authentication, Profiles, and Simulation Tracking

-- 1. Profiles Table (extends Supabase Auth auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    certification_level TEXT CHECK (certification_level IN ('EMR', 'EMT', 'AEMT', 'Paramedic', 'Critical Care')),
    state_license_number TEXT,
    nremt_number TEXT,
    readiness_score INTEGER DEFAULT 1000 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- 2. Simulation Records Table (Tracks performance in the NREMT Engine)
CREATE TABLE public.simulation_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    scenario_id TEXT NOT NULL,
    score_achieved INTEGER NOT NULL,
    time_taken_ms BIGINT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.simulation_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sim records" 
    ON public.simulation_records FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sim records" 
    ON public.simulation_records FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- 3. CE (Continuing Education) Records
CREATE TABLE public.ce_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    topic TEXT NOT NULL,
    hours_awarded NUMERIC(4, 2) NOT NULL,
    certificate_url TEXT,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.ce_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own CE records" 
    ON public.ce_records FOR SELECT 
    USING (auth.uid() = user_id);

-- Trigger to create profile upon Auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
