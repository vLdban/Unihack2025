-- Drop the policy that exposes all columns
DROP POLICY IF EXISTS "Users can view verification questions only" ON public.challenge_verification;

-- No policies needed - only service role (edge function) should access this table
-- The edge function will verify answers server-side without exposing them to clients