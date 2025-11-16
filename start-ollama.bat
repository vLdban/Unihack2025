@echo off
echo ================================================
echo     Green&Go - Ollama AI Chat Setup
echo ================================================
echo.

echo Verificare instalare Ollama...
ollama --version
if %errorlevel% neq 0 (
    echo.
    echo [EROARE] Ollama nu este instalat!
    echo Descarca Ollama de la: https://ollama.ai/download
    pause
    exit /b 1
)

echo.
echo Verificare model llama2...
ollama list | findstr llama2
if %errorlevel% neq 0 (
    echo.
    echo Model llama2 nu este instalat.
    echo Doresti sa descarci modelul llama2? (Aproximativ 4GB)
    choice /C YN /M "Apasa Y pentru Da sau N pentru Nu"
    if errorlevel 2 goto :skip_download
    if errorlevel 1 goto :download_model
)

:download_model
echo.
echo Descarcand modelul llama2...
ollama pull llama2
if %errorlevel% neq 0 (
    echo [EROARE] Descarcarea modelului a esuat!
    pause
    exit /b 1
)

:skip_download
echo.
echo ================================================
echo Pornesc serverul Ollama pe portul 11434...
echo IMPORTANT: Nu inchide acest terminal!
echo ================================================
echo.

ollama serve
