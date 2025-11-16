# Welcome to Green&Go - Eco Platform

## 🌱 Despre Proiect

**Green&Go** este o platformă interactivă de sustenabilitate care permite utilizatorilor să completeze provocări eco-friendly, să acumuleze puncte, să câștige premii și să comunice cu un asistent AI local despre sustenabilitate.


## ✨ Funcționalități Principale

### 🎯 Daily Challenges
- Provocări zilnice eco-friendly
- Verificare cu fotografie sau răspuns text
- Integrare AI pentru validare (Supabase Edge Functions)
- Sistem de puncte și nivele

### 🤖 AI Chat (NOU!)
- Chat local cu Ollama
- Expert în sustenabilitate și mediu
- 100% privacy (rulează local)
- Fără costuri API
- Răspunsuri în limba română

### 🎁 Rewards System
- Magazin de premii eco-friendly
- Exchange puncte pentru produse reale
- Tracking achizițiilor

### 💼 Green Jobs
- Platformă de joburi eco-friendly
- Joburi promovate și nepromovate
- Detalii complete pentru fiecare job

### 📝 Blog Eco
- Articole despre sustenabilitate
- Sistem de comentarii
- Creează și partajează conținut

## 🚀 Quick Start

### Instalare dependințe

```sh
npm install
```

### Pornire aplicație

```sh
npm run dev
```

### Setup AI Chat cu Ollama

#### Windows PowerShell:
```powershell
.\start-ollama.ps1
```

#### Manual:
```powershell
# Terminal 1: Pornește Ollama
ollama serve

# Terminal 2: Pornește aplicația
npm run dev
```

📚 **Ghid complet:** Vezi `TESTING_GUIDE.md` și `AI_CHAT_GUIDE.md`

## 📁 Structura Proiectului

```
src/
├── pages/
│   ├── Index.tsx          # Pagina principală
│   ├── AiChat.tsx         # 🤖 Chat cu AI (NOU!)
│   ├── Rewards.tsx        # Magazin premii
│   ├── Jobs.tsx           # Joburi eco
│   ├── Blog.tsx           # Blog
│   └── Auth.tsx           # Autentificare
├── components/
│   ├── DailyChallenge.tsx # Provocări zilnice
│   ├── Hero.tsx           # Hero section
│   ├── TopNavBar.tsx      # Navigare
│   └── ui/                # Componente UI (shadcn)
└── integrations/
    └── supabase/          # Client Supabase

supabase/
├── functions/
│   └── verify-challenge/  # Edge Function pentru AI
└── migrations/            # Database schema

Scripturi AI:
├── start-ollama.ps1       # Script PowerShell
├── start-ollama.bat       # Script Batch
├── AI_CHAT_GUIDE.md       # Ghid complet AI Chat
├── OLLAMA_SETUP.md        # Setup Ollama
└── TESTING_GUIDE.md       # Ghid testare
```

## 🛠️ Tehnologii Folosite

### Frontend
- **Vite** - Build tool rapid
- **React** - UI framework
- **TypeScript** - Type safety
- **shadcn-ui** - Componente UI moderne
- **Tailwind CSS** - Styling
- **Lucide React** - Iconițe

### Backend & Services
- **Supabase** - Database, Auth, Edge Functions
- **PostgreSQL** - Database
- **Ollama** - AI local (llama2, mistral, etc.)

### AI & ML
- **Ollama** - Local AI inference
- **Llama 2** - Model AI principal
- **OpenAI API** - Verificare provocări (în Edge Function)

## 📊 Database Schema

### Tabele Principale:
- `profiles` - Profiluri utilizatori (puncte, nivel, badges)
- `challenges` - Provocări zilnice
- `completions` - Completări provocări
- `rewards` - Premii disponibile
- `user_rewards` - Achizițiile utilizatorilor
- `green_jobs` - Joburi eco-friendly
- `blog_posts` - Articole blog
- `comments` - Comentarii

## 🔐 Configurare Supabase

1. Creează proiect Supabase: https://supabase.com
2. Rulează migrările din `supabase/migrations/`
3. Configurează Edge Function pentru `verify-challenge`
4. Setează variabilele de mediu (vezi `.env.example`)

## 🤖 Configurare Ollama (AI Chat)

### Instalare Ollama

**Windows:**
Descarcă de la: https://ollama.ai/download

**Verificare instalare:**
```powershell
ollama --version
```

### Descarcă model AI

```powershell
# Model recomandat (4GB)
ollama pull llama2

# Alternative:
ollama pull mistral     # Mai rapid
ollama pull llama2:13b  # Mai precis (7GB)
```

### Pornire server

```powershell
ollama serve
```

**Port:** 11434 (implicit)

### Testare API

```powershell
curl http://localhost:11434/api/generate -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"model":"llama2","prompt":"Salut!","stream":false}'
```

📚 **Ghid complet:** `AI_CHAT_GUIDE.md`

## 🧪 Testare

### Test funcționalități de bază:
```sh
npm run dev
```

### Test AI Chat:
1. Pornește Ollama: `ollama serve`
2. Pornește app: `npm run dev`
3. Navighează: `http://localhost:5173/ai-chat`
4. Testează un mesaj

📋 **Checklist complet:** `TESTING_GUIDE.md`

## 📱 Pagini Disponibile

| Rută | Descriere |
|------|-----------|
| `/` | Pagina principală (Dashboard) |
| `/auth` | Autentificare / Înregistrare |
| `/ai-chat` | 🤖 Chat cu AI (NOU!) |
| `/rewards` | Magazin premii |
| `/jobs` | Joburi eco-friendly |
| `/blog` | Blog sustenabilitate |
| `/blog/:id` | Articol individual |

## 🎨 Design System

### Culori Principale:
- **Primary:** Verde eco (#10b981)
- **Secondary:** Albastru cer
- **Accent:** Galben solar

### Componente shadcn:
- Card, Button, Input
- Dialog, Tabs, Badge
- ScrollArea, Avatar
- Toast notifications (Sonner)

## 🔄 Workflow Git

```sh
# Clone repository
git clone <YOUR_GIT_URL>

# Create branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add: descriere feature"

# Push changes
git push origin feature/my-feature
```

## 📦 Build pentru Producție

```sh
# Build optimizat
npm run build

# Preview build local
npm run preview
```

## 🌍 Deploy

### Opțiunea 1: Lovable (Recomandat)
1. Deschide [Lovable Project](https://lovable.dev/projects/034a263a-854c-4017-82e0-3d011e26ea3e)
2. Click Share → Publish

### Opțiunea 2: Vercel/Netlify
```sh
# Install CLI
npm i -g vercel

# Deploy
vercel
```

### Opțiunea 3: Custom Server
```sh
npm run build
# Upload folder `dist/` pe server
```

## 🔗 Custom Domain

Pentru a conecta un domeniu custom:
1. Navighează la Project > Settings > Domains
2. Click Connect Domain
3. Urmează instrucțiunile

📚 [Setting up custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## ⚙️ Variabile de Mediu

Creează fișier `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🐛 Troubleshooting

### AI Chat nu funcționează
✅ Verifică dacă Ollama rulează: `ollama serve`  
✅ Verifică dacă modelul e descărcat: `ollama list`  
✅ Testează API-ul: vezi `TESTING_GUIDE.md`

### Erori Supabase
✅ Verifică variabilele de mediu  
✅ Verifică dacă Edge Functions sunt deployed  
✅ Verifică Row Level Security (RLS) policies

### Build errors
✅ Șterge `node_modules` și reinstalează: `npm i`  
✅ Curăță cache: `npm run clean` (dacă există)

## 📚 Documentație Adițională

- `AI_CHAT_GUIDE.md` - Ghid complet AI Chat cu Ollama
- `OLLAMA_SETUP.md` - Setup detaliat Ollama
- `TESTING_GUIDE.md` - Ghid testare pas cu pas

## 🤝 Contribuții

Contribuțiile sunt binevenite! 

1. Fork repository
2. Creează branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add: AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Deschide Pull Request

## 📄 Licență

Acest proiect este pentru hackathon/educational purposes.

## 👥 Echipă

Dezvoltat cu ❤️ pentru un viitor mai verde 🌱

---

**Built with [Lovable](https://lovable.dev) | Powered by Ollama 🤖**
