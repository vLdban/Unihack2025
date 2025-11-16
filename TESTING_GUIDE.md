# 🧪 Testare Rapidă - AI Chat

## ✅ Checklist Pre-testare

Înainte de a testa funcția de chat, asigură-te că ai:

- [x] Ollama instalat pe sistem
- [ ] Model AI descărcat (llama2 recomandat)
- [ ] Server Ollama pornit
- [ ] Aplicație React pornită

## 🚀 Pași pentru Testare

### 1. Verifică instalarea Ollama

```powershell
ollama --version
```

**Output așteptat:**
```
ollama version is 0.x.x
```

### 2. Descarcă modelul (dacă nu e deja)

```powershell
ollama pull llama2
```

**Output așteptat:**
```
pulling manifest
pulling xxx... 100%
...
success
```

⏱️ **Timp estimat:** 3-5 minute (depinde de internet)

### 3. Pornește serverul Ollama

**Opțiunea A - Script automat:**
```powershell
.\start-ollama.ps1
```

**Opțiunea B - Manual:**
```powershell
ollama serve
```

**Output așteptat:**
```
Listening on 127.0.0.1:11434 (version 0.x.x)
```

⚠️ **IMPORTANT:** Lasă acest terminal deschis!

### 4. Pornește aplicația (într-un alt terminal)

```powershell
npm run dev
```

**Output așteptat:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 5. Testează API-ul Ollama (opțional)

Într-un al treilea terminal:

```powershell
$body = @{
    model = "llama2"
    prompt = "Salut!"
    stream = $false
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:11434/api/generate" -Method POST -Body $body -ContentType "application/json"
```

**Output așteptat:** Obiect JSON cu răspuns AI

### 6. Accesează aplicația

1. Deschide browser la: `http://localhost:5173`
2. Autentifică-te (dacă nu ești deja)
3. Click pe butonul **"Întreabă AI-ul"** din pagina principală

SAU

Accesează direct: `http://localhost:5173/ai-chat`

## 🧪 Teste de Funcționalitate

### Test 1: Mesaj Basic
1. Scrie în chat: `Salut!`
2. Apasă Enter sau click pe butonul Send
3. ✅ **Așteptat:** Răspuns de la AI în 2-5 secunde

### Test 2: Întrebare Sugerată
1. Click pe una din întrebările sugerate de jos
2. Click pe Send
3. ✅ **Așteptat:** Răspuns detaliat despre subiect

### Test 3: Întrebare Complexă
```
Care sunt cele mai eficiente metode de reducere a amprentei de carbon pentru o familie obișnuită?
```
✅ **Așteptat:** Răspuns structurat cu recomandări

### Test 4: Conversație Multi-turn
1. Întrebare: `Ce este energia regenerabilă?`
2. Răspuns AI...
3. Follow-up: `Poți să-mi dai exemple concrete?`
4. ✅ **Așteptat:** AI răspunde în context

### Test 5: Șterge Chat
1. Click pe butonul "Șterge Chat"
2. ✅ **Așteptat:** Conversația se resetează la mesajul inițial

### Test 6: Responsive
1. Redimensionează fereastra browser
2. ✅ **Așteptat:** UI-ul se adaptează (butoane, mesaje)

## 🐛 Troubleshooting Rapid

### Eroare: "Eroare la comunicarea cu Ollama"

**Cauză:** Server Ollama nu rulează

**Fix rapid:**
```powershell
# Terminal nou
ollama serve
```

---

### Eroare: "model 'llama2' not found"

**Cauză:** Model nedescarcat

**Fix rapid:**
```powershell
ollama pull llama2
```

---

### Mesaje foarte lente (>30 secunde)

**Cauză:** System resources sau model prea mare

**Fix rapid:** Folosește model mai mic
```powershell
ollama pull mistral
```

Apoi în `src/pages/AiChat.tsx`, linia 81:
```typescript
model: 'mistral',  // în loc de 'llama2'
```

---

### Port 11434 deja folosit

**Cauză:** Altă instanță Ollama rulează

**Fix rapid:**
```powershell
# Găsește procesul
netstat -ano | findstr :11434

# Oprește procesul (înlocuiește <PID> cu numărul din output)
taskkill /PID <PID> /F

# Pornește din nou
ollama serve
```

---

### Chat nu se încarcă / ecran alb

**Cauză:** Eroare JavaScript

**Fix rapid:**
1. Deschide Console (F12)
2. Verifică erorile
3. Reîmprospătează pagina (Ctrl+F5)

---

### Mesajele nu se scroll-ează automat

**Cauză:** Bug UI minor

**Fix rapid:** Scroll manual sau reîmprospătează pagina

## 📊 Verificare Performanță

### Timp de răspuns așteptat:

| Model | Hardware | Timp Răspuns |
|-------|----------|--------------|
| llama2 | CPU | 10-30s |
| llama2 | GPU | 2-5s |
| mistral | CPU | 5-15s |
| mistral | GPU | 1-3s |

### Utilizare resurse:

- **RAM:** 4-8GB în timpul rulării
- **CPU:** 50-100% în timpul generării
- **Disk:** ~4GB pentru model

## 🎯 Criterii de Succes

Funcția este operațională dacă:

- [x] ✅ Serverul Ollama pornește fără erori
- [x] ✅ Pagina /ai-chat se încarcă
- [x] ✅ Poți trimite mesaje
- [x] ✅ Primești răspunsuri de la AI
- [x] ✅ Istoricul conversației se păstrează
- [x] ✅ Butoanele funcționează (Send, Șterge)
- [x] ✅ Nu apar erori în Console

## 📸 Screenshot-uri Așteptate

### 1. Pagina Chat (Inițial)
- Header cu "Asistent AI Eco 🤖"
- Mesaj de bun venit de la AI
- Input gol
- 4 întrebări sugerate

### 2. După Primul Mesaj
- Mesaj utilizator (dreapta, albastru)
- Indicator "Se gândește..."
- (apoi) Răspuns AI (stânga, gri)

### 3. Conversație Activă
- Multiple mesaje user + AI
- Timestamp-uri
- Scroll bar (dacă >5 mesaje)

## 🔄 Reset Complet (dacă totul dă greș)

```powershell
# 1. Oprește tot
# Ctrl+C în terminalele cu Ollama și Vite

# 2. Șterge modelul și re-descarcă
ollama rm llama2
ollama pull llama2

# 3. Re-pornește serverul
ollama serve

# 4. (alt terminal) Re-pornește aplicația
npm run dev

# 5. Acesează /ai-chat în browser nou (incognito)
```

## 📞 Support

Dacă întâmpini probleme:

1. Verifică toate punctele din checklist
2. Citește secțiunea Troubleshooting
3. Verifică logs în terminal (ambele)
4. Verifică Console în browser (F12)

## 🎉 Test Final

Întreabă AI-ul:
```
Explică-mi în 3 propoziții ce înseamnă sustenabilitate.
```

Dacă primești un răspuns coerent în română despre sustenabilitate, **totul funcționează perfect!** 🎊

---

**Happy Testing! 🧪🤖🌱**
