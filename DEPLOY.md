# 🚀 Deploy iDialog - Frontend + Backend

## 📋 Pré-requisitos

- Git instalado
- Conta no GitHub
- Conta no Railway (<https://railway.app>)

---

## 1️⃣ Push para GitHub

```powershell
# Abra PowerShell no diretório c:\DEV\iDialog

cd c:\DEV\iDialog

# Verificar se git está inicializado
git status

# Se não estiver, inicializar:
git init
git branch -M main

# Configurar seu email e nome do Git (primeira vez)
git config user.email "seu-email@exemplo.com"
git config user.name "Seu Nome"

# Adicionar repositório remoto
git remote add origin https://github.com/Albertinoblima/idialog.git

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "feat: Adiciona modulo Ferramentas com autenticacao, painel de empresa e planejamento estrategico"

# Fazer push
git push -u origin main
```

---

## 2️⃣ Setup Railway (Backend Automático)

### Passo 1: Conectar GitHub ao Railway

1. Acesse <https://railway.app>
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Autorize o Railway a acessar seus repositórios
6. Selecione `Albertinoblima/idialog`

### Passo 2: Configuração Automática

Railway vai automaticamente:

- Detectar o `Procfile`
- Ler o `runtime.txt` (Python 3.11.8)
- Instalar dependências do `requirements.txt`
- Fazer deploy automático

### Passo 3: Variáveis de Ambiente

Após o deploy, configure no Railway:

- Vá em "Variables"
- Adicione: `IDIALOG_SECRET_KEY` com um valor seguro
- (Opcional) `IDIALOG_PLANNING_TEMPLATE` se quiser usar template Excel customizado

### Passo 4: URL da API

Após deploy bem-sucedido:

1. Vá em "Domains" no Railway
2. Copie a URL gerada (ex: `https://seu-projeto.railway.app`)
3. Na página Ferramentas (`/pages/ferramentas/index.html`):
   - Altere o campo "API" de `http://127.0.0.1:5001/api` para `https://seu-projeto.railway.app/api`
   - Clique em "Conectar"

---

## 3️⃣ GitHub Pages (Frontend - Automático)

Seu repositório já está configurado para GitHub Pages:

1. Acesse <https://github.com/Albertinoblima/idialog/settings/pages>
2. Verifique se está ativado
3. Seu site estará em: `https://Albertinoblima.github.io/idialog/`

**Toda vez que fizer push:**

- Frontend atualiza automaticamente em segundos (GitHub Pages)
- Backend atualiza em ~2-5 minutos (Railway)

---

## ✅ Checklist Final

- [ ] Código no GitHub
- [ ] Railway conectado e fazendo deploy
- [ ] URL da API configurada na página Ferramentas
- [ ] Testar login em staging
- [ ] Testar criação de empresa
- [ ] Testar exportação de documento

---

## 🔄 Fluxo de Atualização Futuros

```bash
# Fazer mudanças localmente
git add .
git commit -m "mensagem descritiva"
git push

# Railway e GitHub Pages atualizam automaticamente!
```

---

## 🆘 Troubleshooting

**Backend não inicia no Railway?**

- Verifique os Logs no Railway
- Confirme que `Procfile` está no root do projeto
- Verifique variáveis de ambiente

**API não conecta?**

- Teste a URL direto no navegador: `https://seu-projeto.railway.app/api/health`
- Confirme que o campo API está com `https://` e não `http://`
- Verifique CORS (deve estar permitido)

**Frontend não atualiza?**

- Limpe cache: `Ctrl+Shift+Delete` e recarregue
- Aguarde até 5 minutos para GitHub Pages reprocessar
- Verifique branch `main` tem as mudanças

---

## 📞 Documentação Útil

- Railway: <https://docs.railway.app/>
- GitHub Pages: <https://docs.github.com/en/pages>
- Flask: <https://flask.palletsprojects.com/>
