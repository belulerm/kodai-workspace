
-- Create enum for skill level
CREATE TYPE public.skill_level AS ENUM ('beginner', 'intermediate', 'master');

-- Add onboarding columns to profiles
ALTER TABLE public.profiles
  ADD COLUMN age INTEGER,
  ADD COLUMN skill_level public.skill_level,
  ADD COLUMN target_programming_language TEXT,
  ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT false;

-- Add check constraint for age (reasonable range)
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_age_check CHECK (age >= 6 AND age <= 120);
