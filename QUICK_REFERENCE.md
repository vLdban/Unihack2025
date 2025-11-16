# 🚀 Quick Reference - AI Chat

## Comenzi Rapide

### Setup Inițial (O singură dată)
```powershell
# 1. Descarcă model
ollama pull llama2

# 2. Verifică instalare
ollama list
```

### Pornire Zilnică (De fiecare dată)
```powershell
# Terminal 1: Pornește Ollama
ollama serve

# Terminal 2: Pornește aplicația
npm run dev

# Browser: Accesează
http://localhost:5173/ai-chat
```

### Comenzi Ollama Utile
```powershell
ollama list              # Vezi modelele instalate
ollama pull <model>      # Descarcă model nou
ollama rm <model>        # Șterge model
ollama ps                # Vezi procesele active
ollama --help            # Ajutor complet
```

## 🔧 Fișiere Cheie

| Fișier | Scop |
|--------|------|
| `src/pages/AiChat.tsx` | Pagina de chat |
| `start-ollama.ps1` | Script pornire Ollama |
| `AI_CHAT_GUIDE.md` | Ghid complet |
| `TESTING_GUIDE.md` | Ghid testare |

## 🎯 Rute Aplicație

| URL | Pagină |
|-----|--------|
| `/` | Dashboard |
| `/ai-chat` | Chat AI 🤖 |
| `/rewards` | Premii |
| `/jobs` | Joburi |
| `/blog` | Blog |

## ⚡ Troubleshooting Rapid

| Problem | Soluție |
|---------|---------|
| "Can't connect to Ollama" | `ollama serve` |
| "Model not found" | `ollama pull llama2` |
| Răspunsuri lente | Folosește `mistral` |
| Port 11434 ocupat | Oprește procesul vechi |

## 📊 Modele Recomandate

| Model | RAM | Viteză | Calitate |
|-------|-----|--------|----------|
| llama2 | 8GB | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| mistral | 8GB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| llama2:13b | 16GB | ⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🎨 Funcționalități Chat

- ✅ Mesaje în timp real
- ✅ Istoric conversație
- ✅ Întrebări sugerate
- ✅ Șterge chat
- ✅ Responsive design
- ✅ Timestamps
- ✅ Loading indicators

## 🔐 Port-uri

- **Ollama:** 11434
- **Vite Dev:** 5173
- **Supabase:** varies

## 💡 Tips

1. **Întrebări clare** = răspunsuri mai bune
2. **Context conversație** = păstrat automat
3. **Enter** = trimite mesaj
4. **Shift+Enter** = newline (nu funcționează momentan)

## 📞 Link-uri Rapide

- **Ollama Models:** https://ollama.ai/library
- **Ollama API Docs:** https://github.com/ollama/ollama/blob/main/docs/api.md
- **Supabase:** https://supabase.com

---

**Pro tip:** Adaugă `start-ollama.ps1` în Task Scheduler pentru pornire automată! 🚀
