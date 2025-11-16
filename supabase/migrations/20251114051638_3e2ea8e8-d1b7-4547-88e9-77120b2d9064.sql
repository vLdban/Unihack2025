-- Create job_announcements table
CREATE TABLE public.job_announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  location TEXT NOT NULL,
  is_promoted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_announcements ENABLE ROW LEVEL SECURITY;

-- Create policies for job announcements
CREATE POLICY "Job announcements are viewable by everyone" 
ON public.job_announcements 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own announcements" 
ON public.job_announcements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own announcements" 
ON public.job_announcements 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own announcements" 
ON public.job_announcements 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_job_announcements_updated_at
BEFORE UPDATE ON public.job_announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();