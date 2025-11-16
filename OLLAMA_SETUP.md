# Configurare Ollama pentru AI Chat

## Pași pentru instalare și configurare

### 1. Verifică instalarea Ollama
Deschide PowerShell și verifică dacă Ollama este instalat:
```powershell
ollama --version
```

### 2. Descarcă un model AI (dacă nu l-ai făcut deja)
Pentru a utiliza funcția de chat, ai nevoie de un model AI. Recomandăm Llama 2:

```powershell
ollama pull llama2
```

Alte modele disponibile:
- `ollama pull mistral` - Model Mistral (mai rapid)
- `ollama pull llama2:13b` - Llama 2 13B (mai mare și mai precis)
- `ollama pull codellama` - Specializat pentru cod

### 3. Pornește serverul Ollama
Înainte de a folosi aplicația, pornește serverul Ollama:

```powershell
ollama serve
```

**Important:** Lasă acest terminal deschis în timp ce folosești aplicația!

### 4. Testează API-ul Ollama
Într-un alt terminal PowerShell, testează dacă API-ul funcționează:

```powershell
curl http://localhost:11434/api/generate -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"model":"llama2","prompt":"Salut!","stream":false}'
```

### 5. Pornește aplicația React
```powershell
npm run dev
```

### 6. Accesează pagina de chat
Navighează la: `http://localhost:5173/ai-chat`

## Modificarea modelului

Dacă vrei să folosești alt model, editează fișierul `src/pages/AiChat.tsx`:

```typescript
// Linia ~55
body: JSON.stringify({
  model: 'mistral', // Schimbă aici modelul
  prompt: ...
```

## Troubleshooting

### Eroare: "Eroare la comunicarea cu Ollama"
**Soluție:** Verifică dacă serverul Ollama rulează cu `ollama serve`

### Eroare: "model not found"
**Soluție:** Descarcă modelul cu `ollama pull llama2`

### Port ocupat
**Soluție:** Ollama folosește portul 11434. Verifică dacă alt serviciu îl folosește:
```powershell
netstat -ano | findstr :11434
```

### Răspunsuri lente
**Soluție:** 
- Folosește un model mai mic: `ollama pull llama2:7b`
- Verifică resursele sistemului (RAM, CPU)

## Modele recomandate

| Model | Dimensiune | Viteză | Calitate | Use Case |
|-------|-----------|--------|----------|----------|
| llama2 | ~4GB | Medie | Bună | General purpose |
| mistral | ~4GB | Rapidă | Foarte bună | Chat rapid |
| llama2:13b | ~7GB | Lentă | Excelentă | Răspunsuri detaliate |
| codellama | ~4GB | Medie | Bună | Întrebări tehnice |

## Comenzi utile Ollama

```powershell
# Listează modelele instalate
ollama list

# Șterge un model
ollama rm llama2

# Vezi utilizarea resurselor
ollama ps

# Oprește serverul (Ctrl+C în terminalul cu ollama serve)
```

## Configurare avansată

### Modifică temperatura răspunsurilor (creativitate)
```typescript
body: JSON.stringify({
  model: 'llama2',
  prompt: ...,
  options: {
    temperature: 0.8  // 0 = precis, 1 = creativ
  }
})
```

### Adaugă context de sistem
```typescript
prompt: `[INST] <<SYS>>
Ești un asistent expert în sustenabilitate și mediu. 
Răspunde mereu în limba română.
<</SYS>>

${input} [/INST]`
```
