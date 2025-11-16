# Configurare Google Gemini API pentru Verificarea Pozelor

## 1. Obține un API Key de la Google

1. Mergi la [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Autentifică-te cu contul tău Google
3. Click pe **"Get API Key"** sau **"Create API Key"**
4. Copiază API key-ul generat

## 2. Configurează API Key în Supabase

### Opțiunea A: Folosind Supabase CLI (Recomandat)

```bash
npx supabase secrets set GEMINI_API_KEY=your_api_key_here
```

### Opțiunea B: Prin Supabase Dashboard

1. Mergi la [Supabase Dashboard](https://supabase.com/dashboard)
2. Selectează proiectul tău
3. Navigează la **Settings** → **Edge Functions** → **Manage secrets**
4. Adaugă un nou secret:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** API key-ul tău de la Google

## 3. Deploy funcția Edge actualizată

```bash
npx supabase functions deploy verify-challenge
```

## 4. Testează funcția

După deploy, când încarci o poză pentru provocarea zilnică:
- Poza va fi trimisă la Google Gemini API
- AI-ul va analiza imaginea și va verifica dacă corespunde provocării
- Vei primi un răspuns cu `verified: true/false` și un mesaj explicativ

## Ce face Gemini API?

- **Analizează conținutul pozei** - identifică obiecte, acțiuni, context
- **Verifică relevanța** - compară conținutul cu descrierea provocării
- **Evaluare generoasă** - acceptă orice efort rezonabil către sustenabilitate
- **Răspuns în română** - oferă feedback clar în limba română

## Exemple de verificare

### Provocare: "Reciclează 3 obiecte"
- ✅ Poză cu sticle/hârtii în coșul de reciclare
- ✅ Poză cu materiale sortate pentru reciclare
- ❌ Poză cu mâncare sau activitate nerelacionată

### Provocare: "Plantează un copac"
- ✅ Poză cu plantare de copac/plantă
- ✅ Poză cu grădină/ghiveci nou
- ❌ Poză random fără legătură cu plantarea

## Costuri

- Google Gemini API oferă **1500 request-uri gratuite pe zi**
- După limita gratuită: ~$0.00025 per request
- Pentru aplicația ta, costurile vor fi minime

## Troubleshooting

### Eroare: "GEMINI_API_KEY not configured"
→ Asigură-te că ai setat secretul în Supabase

### Eroare: "AI verification failed"
→ Verifică că API key-ul este valid și activ

### Poze nu sunt verificate
→ Verifică că formatul pozei este corect (JPEG/PNG)
→ Verifică dimensiunea pozei (max 4MB recomandat)

## Note importante

- API key-ul trebuie să rămână SECRET - nu-l pune în cod sau git
- Funcția Edge rulează în cloud, nu local
- Modificările necesită redeploy: `npx supabase functions deploy verify-challenge`
