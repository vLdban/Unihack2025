-- Create protected table for challenge verification data
CREATE TABLE public.challenge_verification (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  verification_answer text,
  verification_question text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS but don't add any policies - only service role can access
ALTER TABLE public.challenge_verification ENABLE ROW LEVEL SECURITY;

-- Migrate existing verification data
INSERT INTO public.challenge_verification (challenge_id, verification_answer, verification_question)
SELECT id, verification_answer, verification_question
FROM public.challenges
WHERE verification_answer IS NOT NULL OR verification_question IS NOT NULL;

-- Remove verification columns from public challenges table
ALTER TABLE public.challenges DROP COLUMN IF EXISTS verification_answer;
ALTER TABLE public.challenges DROP COLUMN IF EXISTS verification_question;