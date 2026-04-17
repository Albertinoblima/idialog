# Backend Ferramentas iDialog

API em Flask para a área de Ferramentas com:

- Login e cadastro por empresa
- Painel da empresa com logo e dados institucionais
- Cadastro de planejamento estratégico
- Exportação de planejamento em DOCX, PDF e Excel

## Requisitos

- Python 3.10+
- SQLite3 (incluído no Python)

## Instalação Local

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate

pip install -r requirements.txt
```

## Executar Localmente

```bash
python app.py
```

A API sobe em `http://127.0.0.1:5001`.

A página web de Ferramentas usa por padrão `http://127.0.0.1:5001/api`.

### Teste rápido

```bash
curl http://127.0.0.1:5001/api/health
```

Resposta esperada:

```json
{"status": "ok", "service": "idialog-tools-api"}
```

## Template Excel (XLSM)

Por padrão o exportador tenta usar esta planilha como template:

`C:\Users\alber\Downloads\PlanejamentoEstrategico iDialog - A3P Holding.xlsm`

Se quiser usar outro template, configure:

```powershell
# Windows PowerShell
$env:IDIALOG_PLANNING_TEMPLATE="C:\caminho\seu-template.xlsm"
python app.py

# Linux/Mac
export IDIALOG_PLANNING_TEMPLATE="/caminho/seu-template.xlsm"
python app.py
```

Quando o arquivo não existe, a API gera um `.xlsx` padrão.

## Variáveis de Ambiente

### Desenvolvimento

```bash
# Opcional - secret key (padrão: idialog-dev-secret-key)
$env:IDIALOG_SECRET_KEY="sua-chave-super-secreta"
python app.py
```

### Produção (Railway/Render)

Defina no painel da plataforma:

- `IDIALOG_SECRET_KEY`: chave segura para tokens JWT
- `IDIALOG_PLANNING_TEMPLATE`: (opcional) caminho do template XLSM

## Estrutura do Banco de Dados

A API cria automaticamente 3 tabelas:

- **companies** - Dados das empresas (nome, CNPJ, logo, etc.)
- **users** - Usuários admin por empresa
- **strategic_plans** - Planejamentos estratégicos

Banco fica em: `backend/idialog_tools.db`

## API Endpoints

### Autenticação

- `POST /api/auth/register` - Cadastro de empresa
- `POST /api/auth/login` - Login

### Perfil

- `GET /api/me` - Dados do usuário logado

### Empresa

- `PUT /api/company` - Atualizar dados
- `POST /api/company/logo` - Upload de logo

### Planejamento

- `GET /api/plans` - Listar planejamentos
- `POST /api/plans` - Criar planejamento
- `PUT /api/plans/<id>` - Atualizar planejamento
- `DELETE /api/plans/<id>` - Excluir planejamento
- `GET /api/plans/<id>/export/docx` - Exportar DOCX
- `GET /api/plans/<id>/export/pdf` - Exportar PDF
- `GET /api/plans/<id>/export/excel` - Exportar Excel/XLSM

## Deploy no Railway

1. Conecte seu repositório GitHub ao Railway
2. Railroad automaticamente detectará:
   - `Procfile` (instrução de start)
   - `runtime.txt` (versão Python)
   - `requirements.txt` (dependências)

3. Após deploy, você terá uma URL como:

   ```
   https://seu-projeto.railway.app
   ```

4. Configure no frontend:
   - Abra `/pages/ferramentas/index.html`
   - Campo "API": `https://seu-projeto.railway.app/api`
   - Clique "Conectar"

## Segurança

- Senhas são hasheadas com werkzeug.security
- Tokens JWT com expiração de 7 dias
- CORS habilitado para frontend
- Max upload de logo: 5MB
- Apenas PNG, JPG, JPEG, WebP permitidos

## Troubleshooting

**Erro: "no such table"**

- Banco não foi inicializado; a API faz automaticamente no primeiro run

**Erro: "CORS blocked"**

- Verifique o header `Origin` no navegador
- API está configurada para aceitar qualquer origem

**Logo não aparece**

- Verifique se a pasta `backend/uploads/` foi criada
- Verifique permissões de escrita no servidor

---

📖 Ver também: [DEPLOY.md](../DEPLOY.md) para instruções completas de deployment
