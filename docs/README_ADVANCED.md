# iDialog Website

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)

Site moderno e responsivo para iDialog - Soluções em comunicação e tecnologia.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js >= 16.0.0
- npm >= 8.0.0

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd idialog-website

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura do Projeto

```
idialog-website/
├── 📄 index.html                 # Página principal
├── 📄 package.json              # Configurações do projeto
├── 📄 .gitignore                # Arquivos ignorados pelo Git
├── 📄 .eslintrc.js               # Configuração do ESLint
├── 📄 .prettierrc                # Configuração do Prettier
├── 📄 .stylelintrc               # Configuração do Stylelint
├── 📄 README.md                  # Documentação
│
├── 📁 src/                       # Código fonte
│   ├── 📁 styles/               # Arquivos CSS de desenvolvimento
│   │   ├── 📄 main.css          # CSS principal
│   │   ├── 📄 components.css    # Estilos de componentes
│   │   └── 📄 responsive.css    # Media queries
│   └── 📁 scripts/              # Arquivos JS de desenvolvimento
│       ├── 📄 main.js           # JavaScript principal
│       ├── 📄 components.js     # Componentes JS
│       └── 📄 utils.js          # Utilitários
│
├── 📁 public/                    # Arquivos públicos
│   └── 📁 images/               # Imagens originais
│       ├── 🖼️ logo-original.png
│       └── 🖼️ favicon.ico
│
├── 📁 assets/                    # Arquivos compilados/otimizados
│   ├── 📁 css/                  # CSS compilado
│   ├── 📁 js/                   # JavaScript compilado
│   └── 📁 images/               # Imagens otimizadas
│
└── 📁 docs/                      # Documentação adicional
    ├── 📄 DEPLOYMENT.md         # Guia de deploy
    ├── 📄 CONTRIBUTING.md       # Guia de contribuição
    └── 📄 CHANGELOG.md          # Histórico de mudanças
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run serve        # Serve arquivos estáticos
```

### Build
```bash
npm run build        # Build completo para produção
npm run build:css    # Compila apenas CSS
npm run build:js     # Compila apenas JavaScript
```

### Qualidade de Código
```bash
npm run lint         # Executa linting completo
npm run lint:css     # Linting apenas CSS
npm run lint:js      # Linting apenas JavaScript
npm run format       # Formata código com Prettier
```

### Otimização
```bash
npm run optimize:images  # Otimiza imagens
```

## 🎨 Guia de Estilo

### CSS
- Use classes BEM para nomenclatura
- Organize propriedades por ordem lógica
- Use variáveis CSS para cores e espaçamentos
- Mobile-first approach

### JavaScript
- Use ES6+ features
- Preferir const/let sobre var
- Use arrow functions quando apropriado
- Documente funções complexas

### HTML
- Use HTML5 semântico
- Inclua atributos alt em imagens
- Use ARIA labels quando necessário

## 📱 Responsividade

### Breakpoints
- Mobile: < 576px
- Tablet: 576px - 991px  
- Desktop: > 992px

### Recursos Implementados
- ✅ Design mobile-first
- ✅ Imagens responsivas
- ✅ Menu mobile otimizado
- ✅ Tipografia fluida
- ✅ Grid system flexível

## ♿ Acessibilidade

- ✅ Navegação por teclado
- ✅ Contraste WCAG AA
- ✅ Semântica HTML5
- ✅ ARIA labels
- ✅ Screen reader friendly

## 🔧 Configuração de Desenvolvimento

### VSCode Extensions Recomendadas
- ESLint
- Prettier
- Stylelint
- Live Server
- Auto Rename Tag
- IntelliSense for CSS

### Settings.json Recomendado
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "css.validate": false,
  "stylelint.validate": ["css", "scss"],
  "eslint.validate": ["javascript"]
}
```

## 📈 Performance

### Métricas Alvo
- **Lighthouse Performance**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Otimizações Implementadas
- ✅ Minificação CSS/JS
- ✅ Compressão de imagens
- ✅ Lazy loading
- ✅ CSS crítico inline
- ✅ Preload de recursos importantes

## 🚀 Deploy

### Netlify
```bash
npm run build
# Deploy da pasta raiz
```

### Vercel
```bash
npm run build  
# Deploy automático via Git
```

### GitHub Pages
```bash
npm run build
# Push para branch gh-pages
```

## 🔄 Workflow de Desenvolvimento

1. **Feature Branch**: `git checkout -b feature/nova-funcionalidade`
2. **Desenvolvimento**: Edite arquivos em `src/`
3. **Teste**: `npm run lint && npm run build`
4. **Commit**: Use conventional commits
5. **Pull Request**: Para branch main
6. **Deploy**: Automático após merge

## 📞 Suporte

- **Email**: dev@idialog.com.br
- **Documentação**: [docs/](./docs/)
- **Issues**: Use GitHub Issues

## 📄 Licença

Este projeto é propriedade da iDialog. Todos os direitos reservados.

---

**Desenvolvido com ❤️ pela equipe iDialog**
