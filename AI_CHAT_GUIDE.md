# 🤖 AI Chat cu Ollama - Ghid Complet

## 📋 Prezentare Generală

Am integrat un sistem de chat AI local folosind **Ollama** în aplicația Green&Go. Utilizatorii pot pune întrebări despre sustenabilitate, reciclare, energie regenerabilă și multe altele.

## 🚀 Pornire Rapidă

### Opțiunea 1: Script Automat (Recomandat)

**Windows PowerShell:**
```powershell
.\start-ollama.ps1
```

**Command Prompt:**
```cmd
start-ollama.bat
```

### Opțiunea 2: Manual

1. **Pornește serverul Ollama:**
```powershell
ollama serve
```

2. **Pornește aplicația React (în alt terminal):**
```powershell
npm run dev
```

3. **Accesează pagina de chat:**
```
http://localhost:5173/ai-chat
```

## 📁 Fișiere Noi Create

### 1. `src/pages/AiChat.tsx`
Pagina principală de chat cu AI care include:
- ✅ Interfață de chat modernă
- ✅ Istoric de conversații
- ✅ Întrebări sugerate
- ✅ Indicatori de încărcare
- ✅ Gestionare erori
- ✅ Design responsive

### 2. `src/App.tsx` (modificat)
- ✅ Adăugat import pentru `AiChat`
- ✅ Adăugat rută `/ai-chat`

### 3. `src/components/Hero.tsx` (modificat)
- ✅ Adăugat buton "Întreabă AI-ul" pentru acces rapid

### 4. `OLLAMA_SETUP.md`
Documentație completă pentru configurarea Ollama

### 5. `start-ollama.ps1` și `start-ollama.bat`
Scripturi pentru pornire automată

## 🎨 Caracteristici

### Interface Chat
- **Mesaje utilizator:** Aliniate la dreapta, culoare primară
- **Răspunsuri AI:** Aliniate la stânga, fundal muted
- **Avatar-uri:** Bot și User cu iconițe
- **Timestamp-uri:** Pentru fiecare mesaj
- **Auto-scroll:** La mesaje noi

### Funcționalități
1. **Trimitere mesaje:** Enter sau buton Send
2. **Întrebări sugerate:** Click pentru a completa automat
3. **Șterge chat:** Resetează conversația
4. **Indicatori de stare:** Loading spinner când AI se gândește
5. **Gestionare erori:** Mesaje clare dacă Ollama nu rulează

## 🔧 Configurare Tehnică

### Structura Request către Ollama

```typescript
{
  model: 'llama2',
  prompt: 'Context + întrebare utilizator',
  stream: false
}
```

### Context Trimis la AI

Fiecare request include:
- Rol de sistem (expert sustenabilitate)
- Istoric conversație
- Întrebarea curentă

### Gestionare Răspunsuri

```typescript
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

## 📊 Flow Complet

```
Utilizator scrie mesaj
    ↓
Se adaugă în state ca mesaj user
    ↓
Se trimite request la Ollama API
    ↓
Se afișează indicator loading
    ↓
Se primește răspuns de la Ollama
    ↓
Se adaugă în state ca mesaj assistant
    ↓
Auto-scroll la ultimul mesaj
```

## 🛠️ Personalizare

### Schimbă modelul AI

În `src/pages/AiChat.tsx`, linia ~58:

```typescript
model: 'llama2', // Schimbă în 'mistral', 'codellama', etc.
```

### Modifică prompt-ul de sistem

În `src/pages/AiChat.tsx`, linia ~61:

```typescript
prompt: `Ești un asistent AI expert în sustenabilitate...`
```

### Ajustează temperatura (creativitate)

Adaugă în body-ul request-ului:

```typescript
{
  model: 'llama2',
  prompt: '...',
  options: {
    temperature: 0.8  // 0-1, mai mare = mai creativ
  }
}
```

## 🎯 Întrebări Sugerate

Aplicația include 4 întrebări pre-definite:
1. Care sunt cele mai bune metode de reciclare?
2. Cum pot reduce amprenta de carbon?
3. Ce este energia regenerabilă?
4. Cum pot economisi energie acasă?

**Pentru a adăuga mai multe:**

În `src/pages/AiChat.tsx`, linia ~215, adaugă în array:

```typescript
[
  "Care sunt cele mai bune metode de reciclare?",
  "Întrebarea ta nouă aici",
  // ...
]
```

## ⚠️ Troubleshooting Comun

### 1. "Eroare la comunicarea cu Ollama"
**Cauză:** Serverul Ollama nu rulează  
**Soluție:**
```powershell
ollama serve
```

### 2. "Model not found"
**Cauză:** Modelul llama2 nu este descărcat  
**Soluție:**
```powershell
ollama pull llama2
```

### 3. Răspunsuri foarte lente
**Cauză:** Model prea mare pentru sistem  
**Soluție:**
```powershell
ollama pull mistral  # Model mai rapid
```

Apoi modifică în cod: `model: 'mistral'`

### 4. Port 11434 ocupat
**Cauză:** Alt serviciu folosește portul  
**Soluție:**
```powershell
netstat -ano | findstr :11434
taskkill /PID <PID> /F
```

## 📱 Responsive Design

Pagina este complet responsive:
- **Desktop:** Layout complet cu toate elementele
- **Tablet:** Mesaje adaptate la lățime
- **Mobile:** Butoane full-width, scroll optimizat

## 🔐 Securitate

### Avantaje Ollama Local:
- ✅ **Privacy:** Toate datele rămân local
- ✅ **Fără costuri API:** Nu necesită cheie OpenAI
- ✅ **Offline:** Funcționează fără internet
- ✅ **Control complet:** Poți alege modelul

### Considerații:
- ⚠️ Ollama trebuie să ruleze local (localhost:11434)
- ⚠️ CORS este permisiv pentru localhost
- ⚠️ Nu expune serverul Ollama pe internet

## 🚀 Îmbunătățiri Viitoare

Posibile extensii:
1. **Streaming responses:** Afișare text pe măsură ce se generează
2. **Salvare conversații:** În Supabase pentru istoric
3. **Multiple modele:** Utilizator alege modelul
4. **Voice input:** Speech-to-text
5. **Export conversații:** PDF/TXT
6. **Attachments:** Încărcare imagini pentru analiză
7. **Teme personalizate:** Dark/Light mode specific chat

## 📚 Resurse

- **Ollama:** https://ollama.ai
- **Modele disponibile:** https://ollama.ai/library
- **API Docs:** https://github.com/ollama/ollama/blob/main/docs/api.md

## ✅ Checklist Verificare

- [ ] Ollama instalat (`ollama --version`)
- [ ] Model descărcat (`ollama list`)
- [ ] Server pornit (`ollama serve`)
- [ ] Aplicație React pornită (`npm run dev`)
- [ ] Pagina accesibilă (`/ai-chat`)
- [ ] Chat funcțional (test mesaj)

## 🎉 Utilizare

1. **Navighează la pagina principală**
2. **Click pe "Întreabă AI-ul"** în Hero
3. **Scrie întrebarea ta** despre sustenabilitate
4. **Apasă Enter** sau click pe butonul Send
5. **Primește răspuns** de la AI în câteva secunde

**Enjoy chatting with your local AI! 🌱🤖**
