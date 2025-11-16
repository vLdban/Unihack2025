-- Setează nivelul și punctele utilizatorului
-- ÎNLOCUIEȘTE 'YOUR_USER_ID' cu ID-ul tău real din tabela auth.users

UPDATE profiles
SET 
  current_level = 10,
  total_points = 1000,
  completed_challenges = 20
WHERE id = 'YOUR_USER_ID';

-- Pentru a găsi USER_ID-ul tău, rulează mai întâi:
-- SELECT id, email FROM auth.users;
