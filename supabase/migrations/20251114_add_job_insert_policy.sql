-- Add INSERT policy to job_announcements table
CREATE POLICY "Allow inserts to job_announcements"
  ON public.job_announcements
  FOR INSERT
  WITH CHECK (true);
