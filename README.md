# iDialog - Site Moderno

## 📋 Sobre o Projeto

Site moderno e responsivo para a empresa iDialog, criado com tecnologias web atuais. Este projeto substitui completamente a estrutura WordPress anterior, oferecendo:

- ✅ **Performance otimizada**
- ✅ **Design responsivo e moderno**
- ✅ **Código limpo e manutenível**
- ✅ **SEO otimizado**
- ✅ **Acessibilidade (WCAG)**

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com Grid e Flexbox
- **JavaScript ES6+** - Interatividade e funcionalidades
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)

## 📁 Estrutura do Projeto

```
iDialog_New/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   ├── style.css       # Estilos principais
│   │   └── responsive.css  # Estilos responsivos
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   └── images/
│       ├── logo-sertaomix.png
│       └── conta-suspensa.png
└── README.md               # Este arquivo
```

## 🎨 Características do Design

### Paleta de Cores
- **Primária**: `#1273EB` (Azul)
- **Secundária**: `#f8f9fa` (Cinza claro)
- **Accent**: `#ff6b35` (Laranja)
- **Texto**: `#333` (Cinza escuro)

### Tipografia
- **Família**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

### Layout
- **Container máximo**: 1200px
- **Breakpoints responsivos**:
  - Mobile: < 576px
  - Tablet: 576px - 991px
  - Desktop: > 992px

## 📱 Recursos Implementados

### 🏠 **Homepage**
- Hero section com call-to-action
- Seção "Sobre Nós" com estatísticas
- Grid de serviços responsivo
- Formulário de contato funcional
- Footer completo com links sociais

### 🔧 **Funcionalidades JavaScript**
- Menu mobile responsivo
- Navegação suave (smooth scroll)
- Formulário com validação
- Animações de scroll
- Header que se esconde no scroll
- Botão "voltar ao topo"
- Notificações de feedback

### 📱 **Responsividade**
- Mobile-first design
- Grid responsivo
- Imagens adaptáveis
- Menu mobile otimizado
- Tipografia responsiva

### ♿ **Acessibilidade**
- Navegação por teclado
- Contraste adequado
- Alt text em imagens
- Semântica HTML5
- ARIA labels

## 🚀 Como Executar

### Opção 1: Servidor Local Simples
```bash
# Navegue até a pasta do projeto
cd iDialog_New

# Python 3
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000

# Acesse: http://localhost:8000
```

### Opção 2: Live Server (VS Code)
1. Instale a extensão "Live Server"
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### Opção 3: Node.js
```bash
# Instale o http-server globalmente
npm install -g http-server

# Execute na pasta do projeto
http-server

# Acesse o endereço mostrado no terminal
```

## 🔧 Personalização

### Alterar Cores
Edite as variáveis CSS em `assets/css/style.css`:
```css
:root {
    --primary-color: #1273EB;    /* Cor principal */
    --accent-color: #ff6b35;     /* Cor de destaque */
    --text-dark: #333;           /* Texto escuro */
}
```

### Adicionar Seções
1. Crie a estrutura HTML em `index.html`
2. Adicione os estilos em `assets/css/style.css`
3. Configure interatividade em `assets/js/main.js`

### Configurar Formulário
O formulário está preparado para integração com:
- PHP/backend próprio
- Formspree
- Netlify Forms
- EmailJS

## 📊 Performance

### Otimizações Implementadas
- ✅ Minificação de CSS/JS (pronto para produção)
- ✅ Imagens otimizadas
- ✅ Fontes com preload
- ✅ CSS crítico inline
- ✅ JavaScript assíncrono

### Métricas Esperadas
- **Performance Score**: 95+
- **Accessibility Score**: 95+
- **Best Practices Score**: 90+
- **SEO Score**: 95+

## 🌐 Deploy

### Netlify (Recomendado)
1. Conecte o repositório
2. Configure build settings:
   - Build command: (nenhum)
   - Publish directory: `/`

### Vercel
1. Importe o projeto
2. Deploy automático

### GitHub Pages
1. Ative GitHub Pages no repositório
2. Selecione branch `main`

## 📞 Próximos Passos

### 🔄 **Melhorias Sugeridas**
- [ ] Implementar CMS headless (Strapi/Sanity)
- [ ] Adicionar blog
- [ ] Integrar Google Analytics
- [ ] Adicionar PWA (Service Worker)
- [ ] Implementar internacionalização (i18n)

### 🎯 **Conteúdo**
- [ ] Adicionar cases de sucesso
- [ ] Galeria de projetos
- [ ] Depoimentos de clientes
- [ ] Página de equipe detalhada
- [ ] Blog de tecnologia

### 🔌 **Integrações**
- [ ] WhatsApp Business API
- [ ] Chat online (Crisp/Intercom)
- [ ] Google Maps integrado
- [ ] Newsletter (Mailchimp)

## 📄 Licença

Este projeto foi desenvolvido para a empresa iDialog. Todos os direitos reservados.

## 👨‍💻 Suporte

Para dúvidas ou suporte técnico:
- Email: contato@idialog.com.br
- Telefone: (00) 0000-0000

---

**Desenvolvido com ❤️ para iDialog**
