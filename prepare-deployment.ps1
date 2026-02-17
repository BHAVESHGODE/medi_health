# MediHealth - Quick Deployment Commands

# Step 1: Initialize Git (if not already initialized)
Write-Host "Initializing Git repository..." -ForegroundColor Cyan
git init

# Step 2: Add .gitignore
Write-Host "Creating .gitignore..." -ForegroundColor Cyan

# Step 3: Add all files
Write-Host "Adding files to Git..." -ForegroundColor Cyan
git add .

# Step 4: Commit
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit - MediHealth Hospital Management System"

# Step 5: Instructions for GitHub
Write-Host "`n================================" -ForegroundColor Green
Write-Host "NEXT STEPS:" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Go to https://github.com and create a new repository" -ForegroundColor Yellow
Write-Host "2. Name it: medihealth" -ForegroundColor Yellow
Write-Host "3. DO NOT initialize with README" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. After creating, run these commands:" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/medihealth.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "5. Then follow the DEPLOYMENT_GUIDE.md for Vercel and Render setup!" -ForegroundColor Green
Write-Host ""
