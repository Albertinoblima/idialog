# iDialog - Site Institucional

Site institucional da iDialog, empresa especializada em soluções de comunicação e tecnologia para serviços públicos e empresas privadas.

## 🚀 Estrutura do Projeto

```text
iDialog/
├── index.html                  # Página inicial
├── pages/                      # Páginas do site
│   ├── sobre.html             # Sobre a empresa
│   ├── casos-de-sucesso.html  # Casos de Sucesso
│   ├── equipe.html           # Equipe da empresa
│   ├── contato.html          # Formulário de contato
│   └── servicos/             # Seções de serviços
│       ├── publicos/         # Serviços públicos
│       │   └── index.html
│       └── privados/         # Empresas privadas
│           └── index.html
├── components/               # Componentes reutilizáveis
│   ├── header.html          # Cabeçalho com navegação
│   └── footer.html          # Rodapé
├── assets/                  # Recursos estáticos
│   ├── css/
│   │   ├── style.css       # Estilos principais
│   │   └── responsive.css  # Estilos responsivos
│   ├── js/
│   │   ├── main.js        # JavaScript principal
│   │   └── components.js  # Carregamento de componentes
│   └── images/            # Imagens e logos
└── docs/                  # Documentação
```

## 📋 Páginas e Funcionalidades

### Página Inicial (`index.html`)

- Hero section com apresentação da empresa
- Overview dos serviços (Públicos e Privados)
- Preview sobre a empresa
- Call-to-action para contato

### Sobre (`pages/sobre.html`)

- História da empresa
- Missão, visão e valores
- Diferenciais e vantagens
- Estatísticas da empresa

### Serviços Públicos (`pages/servicos/publicos/index.html`)

- Atendimento ao Cidadão
- Ouvidoria Digital
- Portal de Transparência
- Gestão de Protocolos
- Sistema de Agendamento
- ChatBot Inteligente

### Empresas Privadas (`pages/servicos/privados/index.html`)

- CRM Avançado
- Chatbots Inteligentes
- Centro de Contato
- Analytics e Relatórios
- Soluções E-commerce
- Automação de Marketing

### Casos de Sucesso (`pages/casos-de-sucesso.html`)

- Resultados reais de projetos entregues
- Filtros por setor (público/privado)
- Links para PDFs completos
- Depoimentos de clientes

### Equipe (`pages/equipe.html`)

- Liderança da empresa
- Equipe de desenvolvimento
- Design e UX
- Cultura organizacional

### Contato (`pages/contato.html`)

- Formulário de contato
- Informações de contato
- Horário de atendimento
- FAQ
- Mapa de localização

## 🎨 Design e Tecnologias

### Design System

- **Cores Principais**:
  - Azul: `#1273EB` (primária)
  - Cinza claro: `#f8f9fa` (secundária)
  - Laranja: `#ff6b35` (destaque)

- **Tipografia**: Inter (Google Fonts)
- **Ícones**: Font Awesome 6

### Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, Custom Properties
- **JavaScript ES6+**: Componentes modulares
- **Responsive Design**: Mobile-first

### Recursos Implementados

- ✅ Design responsivo
- ✅ Navegação com dropdown
- ✅ Componentes reutilizáveis
- ✅ Formulário de contato
- ✅ Filtros no portfólio
- ✅ FAQ com accordion
- ✅ Carregamento dinâmico de componentes

## 🚀 Como Executar

### Servidor Local

```bash
# Python 3
python -m http.server 8000

# Node.js (com live-server)
npx live-server

# PHP
php -S localhost:8000
```

### VS Code Live Server

1. Instale a extensão "Live Server"
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

## 📁 Estrutura de Arquivos Detalhada

### CSS

- `style.css`: Estilos principais, layout, componentes
- `responsive.css`: Media queries e adaptações mobile

### JavaScript

- `main.js`: Funcionalidades principais, interações
- `components.js`: Sistema de carregamento de componentes

### Componentes

- `header.html`: Navegação principal com dropdown
- `footer.html`: Links, contato e redes sociais

## 🔧 Personalização

### Adicionando Nova Página

1. Crie o arquivo HTML na pasta `pages/`
2. Inclua os placeholders para header e footer:

```html
<!-- Header Placeholder -->
<div id="header-placeholder"></div>

<!-- Conteúdo da página -->

<!-- Footer Placeholder -->
<div id="footer-placeholder"></div>

<!-- JavaScript -->
<script src="../assets/js/main.js"></script>
<script src="../assets/js/components.js"></script>
```

1. Adicione o link no menu (`components/header.html`)

### Modificando Cores

Edite as variáveis CSS em `assets/css/style.css`:

```css
:root {
    --primary-color: #1273EB;
    --secondary-color: #f8f9fa;
    --accent-color: #ff6b35;
    /* ... outras variáveis */
}
```

## 📱 Responsividade

O site foi desenvolvido com abordagem mobile-first:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 SEO e Performance

### Otimizações Implementadas

- Meta tags descritivas
- Estrutura semântica HTML5
- Atributos alt em imagens
- Loading otimizado de recursos
- CSS e JS minificados (quando necessário)

### Acessibilidade

- Contraste adequado de cores
- Navegação por teclado
- Labels em formulários
- Atributos ARIA quando necessários

## 📄 Licença

Este projeto é propriedade da iDialog. Todos os direitos reservados.

## 📞 Contato

- **Email**: <contato@idialog.com.br>
- **Telefone**: (11) 9999-9999
- **Site**: [www.idialog.com.br](http://www.idialog.com.br)

---

Desenvolvido com ❤️ pela equipe iDialog
