-- Update reward prices to 20 RON, 50 RON, and 200 RON
DELETE FROM public.rewards;

INSERT INTO public.rewards (level, title, description, company, value, icon)
VALUES
  (10, 'Voucher 20 RON', 'Voucher de 20 RON pentru produse eco-friendly', 'Partener', '20 RON', '🎁'),
  (20, 'Voucher 50 RON', 'Voucher de 50 RON pentru produse eco-friendly', 'Partener', '50 RON', '🎁'),
  (30, 'Voucher 200 RON', 'Voucher de 200 RON pentru produse eco-friendly (cel mai mare)', 'Partener', '200 RON', '🏆');
