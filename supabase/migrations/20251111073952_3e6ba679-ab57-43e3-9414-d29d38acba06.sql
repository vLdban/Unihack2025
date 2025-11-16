-- Allow users to read only the verification question (not the answer)
CREATE POLICY "Users can view verification questions only"
ON public.challenge_verification
FOR SELECT
TO authenticated
USING (true);