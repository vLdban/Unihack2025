-- Update rewards table to show rewards at levels 10, 20, 30, 40, 50
DELETE FROM public.rewards;

INSERT INTO public.rewards (level, title, description, company, value, icon)
VALUES 
  (10, 'Voucher Altex 40 RON', 'Discount de 50 RON pentru produse eco-friendly', 'Altex', '40 RON', '🎁'),
  (20, 'Voucher eMAG 60 RON', 'Voucher pentru produse eco și articole reutilizabile', 'eMAG', '60 RON', '🎁'),
  (30, 'Voucher Decathlon 80 RON', 'Discount pentru echipament sport și outdoor sustenabil', 'decathlon', '80 RON', '🎁'),
  (40, 'Voucher Carrefour 100 RON', 'Voucher pentru produse bio și eco-friendly', 'Carrefour', '100 RON', '🎁'),
  (50, 'Voucher IKEA 130 RON', 'Discount pentru mobilier și produse sustenabile', 'IKEA', '130 RON', '🎁'),
  (60, 'Voucher Mega Image 160 RON', 'Voucher pentru produse organice și locale', 'Mega Image', '160 RON', '🎁'),
  (70, 'Voucher Lidl 200 RON', 'Discount pentru produse eco-friendly', 'Lidl', '200 RON', '🎁'),
  (80, 'Voucher Hervis 240 RON', 'Discount pentru echipament outdoor sustenabil', 'Hervis', '240 RON', '🎁'),
  (90, 'Voucher Kaufland 300 RON', 'Voucher pentru produse bio și sustenabile', 'Kaufland', '300 RON', '🎁'),
  (100, 'Voucher Premium 500 RON', 'Voucher special pentru orice magazin partner eco-friendly!', 'Premium', '500 RON', '🏆');