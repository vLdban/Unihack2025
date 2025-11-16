-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  total_points INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  completed_challenges INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL,
  icon TEXT NOT NULL,
  verification_question TEXT,
  verification_answer TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Everyone can view challenges
CREATE POLICY "Challenges are viewable by everyone"
  ON public.challenges FOR SELECT
  USING (true);

-- Create completions table
CREATE TABLE public.completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
  verification_method TEXT NOT NULL CHECK (verification_method IN ('photo', 'question')),
  verified BOOLEAN DEFAULT false,
  verification_data JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- Enable RLS
ALTER TABLE public.completions ENABLE ROW LEVEL SECURITY;

-- Users can view their own completions
CREATE POLICY "Users can view their own completions"
  ON public.completions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own completions
CREATE POLICY "Users can insert their own completions"
  ON public.completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Everyone can view rewards
CREATE POLICY "Rewards are viewable by everyone"
  ON public.rewards FOR SELECT
  USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample challenges
INSERT INTO public.challenges (title, description, category, points, icon, verification_question, verification_answer, date)
VALUES 
  ('Folosește o sticlă reutilizabilă', 'Astăzi evită sticlele de plastic de unică folosință. Folosește propria ta sticlă reutilizabilă și contribuie la reducerea deșeurilor din plastic!', 'Reciclare', 20, '♻️', 'Ce tip de sticlă ai folosit astăzi?', 'reutilizabil', CURRENT_DATE),
  ('Mergi pe jos sau cu bicicleta', 'Evită folosirea mașinii pentru distanțe scurte. Alege să mergi pe jos sau cu bicicleta pentru a reduce poluarea.', 'Transport Verde', 25, '🚴', 'Cum ai călătorit astăzi?', 'bicicleta', CURRENT_DATE + INTERVAL '1 day');

-- Insert sample rewards
INSERT INTO public.rewards (level, title, description, company, value, icon)
VALUES 
  (1, 'Voucher Altex 50 RON', 'Discount de 50 RON pentru produse eco-friendly', 'Altex', '50 RON', '🎁'),
  (2, 'Voucher eMAG 75 RON', 'Voucher pentru produse eco și articole reutilizabile', 'eMAG', '75 RON', '🎁'),
  (3, 'Voucher Decathlon 100 RON', 'Discount pentru echipament sport și outdoor sustenabil', 'Decathlon', '100 RON', '🎁'),
  (4, 'Voucher Carrefour 150 RON', 'Voucher pentru produse bio și eco-friendly', 'Carrefour', '150 RON', '🎁'),
  (5, 'Voucher IKEA 200 RON', 'Discount pentru mobilier și produse sustenabile', 'IKEA', '200 RON', '🎁');

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();