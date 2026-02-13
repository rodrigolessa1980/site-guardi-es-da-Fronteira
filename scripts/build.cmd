@echo off
cd /d "%~dp0.."
node scripts/copy-assets.js
if errorlevel 1 exit /b 1
call npx vite build
