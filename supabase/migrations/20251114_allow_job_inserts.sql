-- Temporarily allow anonymous inserts to job_announcements
DROP POLICY IF EXISTS "Users can create their own announcements" ON public.job_announcements;

CREATE POLICY "Allow anonymous job creation" 
ON public.job_announcements 
FOR INSERT 
WITH CHECK (true);
