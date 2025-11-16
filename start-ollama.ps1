# Green&Go - Ollama AI Chat Setup Script

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "     Green&Go - Ollama AI Chat Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verifică instalarea Ollama
Write-Host "Verificare instalare Ollama..." -ForegroundColor Yellow
try {
    $version = ollama --version
    Write-Host "✓ Ollama este instalat: $version" -ForegroundColor Green
} catch {
    Write-Host "✗ Ollama nu este instalat!" -ForegroundColor Red
    Write-Host "Descarcă Ollama de la: https://ollama.ai/download" -ForegroundColor Yellow
    Read-Host "Apasă Enter pentru a ieși"
    exit 1
}

Write-Host ""

# Verifică modelul llama2
Write-Host "Verificare model llama2..." -ForegroundColor Yellow
$models = ollama list
if ($models -match "llama2") {
    Write-Host "✓ Modelul llama2 este instalat" -ForegroundColor Green
} else {
    Write-Host "✗ Modelul llama2 nu este instalat" -ForegroundColor Red
    $response = Read-Host "Dorești să descarci modelul llama2? (Aproximativ 4GB) [Y/N]"
    
    if ($response -eq "Y" -or $response -eq "y") {
        Write-Host ""
        Write-Host "Descărcare model llama2..." -ForegroundColor Yellow
        ollama pull llama2
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Modelul llama2 a fost descărcat cu succes!" -ForegroundColor Green
        } else {
            Write-Host "✗ Descărcarea modelului a eșuat!" -ForegroundColor Red
            Read-Host "Apasă Enter pentru a ieși"
            exit 1
        }
    } else {
        Write-Host "Poți descărca modelul mai târziu cu: ollama pull llama2" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Pornesc serverul Ollama pe portul 11434..." -ForegroundColor Green
Write-Host "IMPORTANT: Nu închide acest terminal!" -ForegroundColor Red
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Pornește serverul
ollama serve
