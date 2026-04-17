#!/usr/bin/env powershell

# Setup Script para iDialog - Development & Deployment
# Executa: .\setup.ps1

param(
    [ValidateSet("dev", "push", "clean")]
    [string]$Action = "dev"
)

function Write-Header {
    param([string]$Text)
    Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
    Write-Host $Text -ForegroundColor Cyan
    Write-Host ("=" * 60) -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Text)
    Write-Host "✓ $Text" -ForegroundColor Green
}

function Write-Error {
    param([string]$Text)
    Write-Host "✗ $Text" -ForegroundColor Red
}

function Test-Git {
    try {
        $version = git --version
        Write-Success "Git encontrado: $version"
        return $true
    }
    catch {
        Write-Error "Git não encontrado. Instale em: https://git-scm.com"
        return $false
    }
}

function Test-Python {
    try {
        $version = python --version
        Write-Success "Python encontrado: $version"
        return $true
    }
    catch {
        Write-Error "Python não encontrado. Instale em: https://www.python.org"
        return $false
    }
}

function Setup-Dev {
    Write-Header "Configurando ambiente de desenvolvimento"

    if (-not (Test-Git)) { return }
    if (-not (Test-Python)) { return }

    # Criar venv
    Write-Host "`nCriando ambiente virtual Python..." -ForegroundColor Yellow
    if (Test-Path "backend\.venv") {
        Write-Host "Ambiente virtual já existe, pulando..." -ForegroundColor Yellow
    }
    else {
        python -m venv backend\.venv
        Write-Success "Ambiente virtual criado"
    }

    # Ativar venv e instalar dependências
    Write-Host "`nAtivando ambiente virtual..." -ForegroundColor Yellow
    & "backend\.venv\Scripts\Activate.ps1"
    
    Write-Host "`nInstalando dependências..." -ForegroundColor Yellow
    pip install -q -r backend/requirements.txt
    Write-Success "Dependências instaladas"

    Write-Header "✅ Setup de desenvolvimento completo!"
    Write-Host "Para iniciar o backend, execute:" -ForegroundColor Yellow
    Write-Host "  cd backend" -ForegroundColor Cyan
    Write-Host "  .\.venv\Scripts\Activate.ps1" -ForegroundColor Cyan
    Write-Host "  python app.py" -ForegroundColor Cyan
}

function Push-GitHub {
    Write-Header "Preparando push para GitHub"

    if (-not (Test-Git)) { return }

    # Verificar se é um repo git
    if (-not (Test-Path ".git")) {
        Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
        git init
        git branch -M main
    }

    # Verificar remote
    $hasRemote = git remote get-url origin 2>$null
    if (-not $hasRemote) {
        Write-Host "Adicionando repositório remoto..." -ForegroundColor Yellow
        git remote add origin https://github.com/Albertinoblima/idialog.git
        Write-Success "Repositório remoto adicionado"
    }

    # Status
    Write-Host "`nStatus atual:" -ForegroundColor Yellow
    git status

    # Confirmar antes de fazer push
    $confirm = Read-Host "`n🔄 Fazer push para GitHub? (s/n)"
    if ($confirm -ne "s") {
        Write-Host "Operação cancelada." -ForegroundColor Yellow
        return
    }

    # Add, commit, push
    Write-Host "`nAdicionando arquivos..." -ForegroundColor Yellow
    git add .
    
    Write-Host "Fazendo commit..." -ForegroundColor Yellow
    $message = Read-Host "Mensagem do commit (default: 'Update iDialog')"
    if (-not $message) { $message = "Update iDialog" }
    
    git commit -m $message
    
    Write-Host "Fazendo push..." -ForegroundColor Yellow
    git push -u origin main
    
    Write-Success "Push completo!"
    Write-Header "📋 Próximo Passo"
    Write-Host "1. Vá em: https://railway.app" -ForegroundColor Cyan
    Write-Host "2. Faça login com GitHub" -ForegroundColor Cyan
    Write-Host "3. Crie novo projeto a partir do repositório" -ForegroundColor Cyan
    Write-Host "`nVer detalhes completos em: DEPLOY.md" -ForegroundColor Yellow
}

function Clean-Project {
    Write-Header "Limpando arquivos temporários"

    $itemsToRemove = @(
        "backend\.venv",
        "backend\__pycache__",
        "backend\idialog_tools.db",
        "backend\uploads\*"
    )

    foreach ($item in $itemsToRemove) {
        if (Test-Path $item) {
            Remove-Item -Path $item -Recurse -Force
            Write-Success "Removido: $item"
        }
    }

    Write-Host "`n✓ Limpeza completa" -ForegroundColor Green
}

# Main
switch ($Action) {
    "dev" { Setup-Dev }
    "push" { Push-GitHub }
    "clean" { Clean-Project }
    default { Setup-Dev }
}

Write-Host "`n"
