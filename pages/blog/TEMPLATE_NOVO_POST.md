<!-- 
=============================================================================
TEMPLATE PADRÃO PARA NOVAS MATÉRIAS DO BLOG iDialog
=============================================================================

Este arquivo documenta o padrão visual, estrutural e técnico para todas as 
novas matérias publicadas no blog. Use este template como guia.

ANTES DE CRIAR UMA NOVA MATÉRIA:
1. Leia este guia completamente
2. Copie a estrutura HTML abaixo
3. Atualize posts-data.js com os dados do novo post
4. Valide SEO usando ferramentas como Google Search Console

=============================================================================
ESTRUTURA TÉCNICA
=============================================================================

Diretório: pages/blog/posts/[nome-do-post].html

Arquivos compartilhados utilizados:
- src/styles/blog-post.css (estilos do blog)
- assets/js/blog-post.js (interações: reveal on scroll, detalhes, abas)

Classes CSS disponíveis:
- .blog-post-page (container principal)
- .blog-post-header (cabeçalho com breadcrumb, categoria, título, intro, meta)
- .blog-divider (divisor horizontal)
- .blog-hero-showcase (grid 2 colunas: painel + ilustração)
- .blog-stats-grid (grid de 3 cards com números/estatísticas)
- .blog-section (seção com título e subtítulo)
- .blog-service-grid (grid de cards de serviços/temas)
- .blog-tabs (abas interativas com aria-roles acessíveis)
- .blog-reveal (details/summary com "Ver explicação")
- .blog-quote (citação com estilo)
- .blog-cta-wrap (call-to-action final)
- .blog-post-footer (links para voltar ao blog e CTA)

Atributos para animação:
- data-reveal: Ativa reveal on scroll no elemento

=============================================================================
ESTRUTURA HTML MÍNIMA
=============================================================================

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Meta tags essenciais -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[Descrição até 160 caracteres]">
    <meta name="keywords" content="[palavra1, palavra2, palavra3]">
    <meta name="author" content="Albertino Bezerra Lima">
    <meta name="owner" content="Albertino Bezerra Lima - iDialog">
    <meta name="copyright" content="(c) 2026 Albertino Bezerra Lima - iDialog. Todos os direitos reservados.">
    <meta name="contact" content="albertinoblima@gmail.com">
    <meta name="robots" content="index, follow">
    <meta name="canonical" href="/pages/blog/posts/[nome].html">
    
    <!-- Open Graph para redes sociais -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="[Título]">
    <meta property="og:description" content="[Descrição]">
    <meta property="og:url" content="/pages/blog/posts/[nome].html">
    <meta property="og:image" content="/public/icon/1 iDialog icone.ico">
    
    <!-- Schema.org (essencial para SEO) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "[Título]",
        "description": "[Descrição]",
        "datePublished": "AAAA-MM-DD",
        "dateModified": "AAAA-MM-DD",
        "author": {
            "@type": "Person",
            "name": "Albertino Bezerra Lima",
            "email": "albertinoblima@gmail.com",
            "telephone": "+5587988568605"
        },
        "publisher": {
            "@type": "Organization",
            "name": "iDialog",
            "url": "https://www.idialog.com.br",
            "founder": {
                "@type": "Person",
                "name": "Albertino Bezerra Lima"
            }
        }
    }
    </script>
    
    <title>[Título] — Blog iDialog</title>
    
    <!-- Estilos -->
    <link rel="stylesheet" href="/src/styles/main.css">
    <link rel="stylesheet" href="/src/styles/responsive.css">
    <link rel="stylesheet" href="/src/styles/blog-post.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Exo+2:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>

<body>
    <canvas id="matrix-canvas"></canvas>
    <div id="header-placeholder"></div>

    <main>
        <article class="blog-post-page">
            <!-- CABEÇALHO -->
            <header class="blog-post-header" data-reveal>
                <p class="blog-post-breadcrumb">
                    <a href="/index.html"><i class="fas fa-home"></i> Início</a> &rsaquo;
                    <a href="/pages/blog/index.html">Blog</a> &rsaquo;
                    [Título da Matéria]
                </p>
                
                <span class="blog-post-category">
                    <i class="fas fa-[ícone]"></i> [Categoria]
                </span>
                <h1 class="blog-post-title">[Título Principal]</h1>
                
                <p class="blog-post-intro">
                    [Introdução impactante com 1-2 frases que venda a leitura]
                </p>
                
                <div class="blog-post-meta">
                    <span><i class="fas fa-calendar-alt"></i> [Dia] de [mês] de 2026</span>
                    <span><i class="fas fa-user"></i> Equipe iDialog</span>
                    <span><i class="fas fa-clock"></i> [X] min de leitura</span>
                </div>
            </header>
            
            <hr class="blog-divider">
            
            <!-- CONTEÚDO AQUI -->
            <!-- Use os componentes abaixo conforme sua estrutura -->
            
            <!-- CTA FINAL -->
            <section class="blog-cta-wrap" data-reveal>
                <h2>[Pergunta ou Afirmação Impactante]</h2>
                <p>[Descrição da ação desejada]</p>
                <div class="blog-cta-actions">
                    <a href="[URL1]" class="btn btn-primary">
                        <i class="fas fa-[ícone]"></i> [Texto CTA Primária]
                    </a>
                    <a href="[URL2]" class="btn btn-secondary">
                        <i class="fas fa-[ícone]"></i> [Texto CTA Secundária]
                    </a>
                </div>
            </section>
            
            <!-- FOOTER -->
            <footer class="blog-post-footer">
                <a href="/pages/blog/index.html" class="blog-post-footer-link">
                    <i class="fas fa-arrow-left"></i> Voltar para o Blog
                </a>
                <a href="/pages/contato.html" class="blog-post-footer-link">
                    Fale Conosco <i class="fas fa-arrow-right"></i>
                </a>
            </footer>
        </article>
    </main>
    
    <div id="footer-placeholder"></div>
    
    <script src="/assets/js/components.js"></script>
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/matrix.js"></script>
    <script src="/assets/js/blog-post.js"></script>
</body>
</html>
```

=============================================================================
COMPONENTES REUTILIZÁVEIS
=============================================================================

### 1. HERO COM PAINEL + ILUSTRAÇÃO

Use quando quiser apresentar conceito + visual side-by-side.

```html
<section class="blog-hero-showcase" data-reveal>
    <div class="blog-panel">
        <div class="blog-panel-content">
            <h2>Título</h2>
            <p>Conteúdo em parágrafos ou listas.</p>
        </div>
    </div>
    
    <div class="blog-panel blog-hero-vector" aria-hidden="true">
        <svg viewBox="0 0 380 300" role="presentation" focusable="false">
            <!-- Coloque SVG aqui -->
        </svg>
    </div>
</section>
```

### 2. GRID DE ESTATÍSTICAS

Use para destacar números/impacto.

```html
<section class="blog-stats-grid" data-reveal>
    <article class="blog-stat-card">
        <span class="blog-stat-number">[Número/Percentual]</span>
        <p class="blog-stat-label">[Descrição do impacto]</p>
    </article>
    <!-- Repita para 3 cards -->
</section>
```

### 3. SEÇÃO COM CARDS DE SERVIÇO

Use para listar temas, problemas ou benefícios.

```html
<section class="blog-section" data-reveal>
    <h2 class="blog-section-title">Título Principal</h2>
    <p class="blog-section-subtitle">Subtítulo descritivo</p>
    
    <div class="blog-service-grid">
        <article class="blog-service-card">
            <div class="blog-service-head">
                <span class="blog-service-icon"><i class="fas fa-[ícone]"></i></span>
                <h3>Título do Card</h3>
            </div>
            <p>Descrição do card.</p>
        </article>
        <!-- Repita para até 4 cards -->
    </div>
</section>
```

### 4. EXPANDÍVEIS (DETAILS/SUMMARY)

Use para conteúdo que pode ser expandido por clique.

```html
<div class="blog-reveal-list">
    <details class="blog-reveal">
        <summary>
            Pergunta ou Tema
            <span class="blog-summary-action">Ver explicação</span>
        </summary>
        <div class="blog-reveal-body">
            Conteúdo que será expandido/ocultado por clique.
        </div>
    </details>
</div>
```

### 5. ABAS INTERATIVAS

Use para separar conteúdo relacionado.

```html
<div class="blog-tabs" data-blog-tabs>
    <div class="blog-tabs-controls" role="tablist" aria-label="[Descrição]">
        <button class="blog-tab-btn" role="tab" data-tab-target="aba1">Aba 1</button>
        <button class="blog-tab-btn" role="tab" data-tab-target="aba2">Aba 2</button>
    </div>
    
    <section class="blog-tab-panel" data-tab-panel="aba1">
        Conteúdo da aba 1
    </section>
    
    <section class="blog-tab-panel" data-tab-panel="aba2" hidden>
        Conteúdo da aba 2
    </section>
</div>
```

### 6. CITAÇÃO/QUOTE

Use para destaque de frase impactante.

```html
<blockquote class="blog-quote">
    "Sua frase inspiradora aqui."
</blockquote>
```

=============================================================================
BOAS PRÁTICAS SEO
=============================================================================

1. **Meta Tags**
   - description: até 160 caracteres, com palavra-chave principal
   - keywords: 3-5 palavras-chave relevantes, separadas por vírgula
   - canonical: aponta para si mesma

2. **Heading Hierarchy**
   - H1: Apenas um, no título principal
   - H2: Títulos de seções principais
   - H3: Subtítulos dentro de cards/seções
   - Nunca pule níveis (ex: H1 → H3)

3. **Estrutura do Conteúdo**
   - Comece com problema/contexto
   - Apresente solução/conceitos
   - Mostre aplicação prática
   - Termine com CTA claro

4. **Schema.org**
   - BlogPosting obrigatório
   - Adicione SoftwareApplication se mencionar ferramenta
   - Inclua autor, data de publicação, descrição

5. **Palavras-chave**
   - Use naturalmente no H1, H2, primeira parágrafo
   - Não force ou abuse (spam)
   - Varie sinônimos e relacionadas

6. **Links Internos**
   - Link para outras matérias quando relevante
   - Link para página de ferramentas/contato
   - Use anchor text descritivo

7. **Imagens e SVG**
   - Sempre adicione alt text em imagens
   - Use role="presentation" e focusable="false" em SVG decorativo
   - Comprima imagens antes de fazer upload

=============================================================================
CHECKLIST ANTES DE PUBLICAR
=============================================================================

- [ ] Arquivo criado em pages/blog/posts/[nome].html
- [ ] Meta tags descritivas com keywords
- [ ] Schema.org BlogPosting preenchido
- [ ] Open Graph tags para redes sociais
- [ ] Heading hierarchy correta (H1, H2, H3...)
- [ ] Pelo menos uma imagem/SVG visual
- [ ] Componentes data-reveal em seções principais
- [ ] Mínimo 2 CTAs (uma no final, uma no rodapé)
- [ ] Links internos para páginas iDialog
- [ ] Spell check e gramática verificados
- [ ] Conteúdo testado em mobile (responsive)
- [ ] posts-data.js atualizado com novo post
- [ ] Arquivo não tem erros de sintaxe HTML

=============================================================================
ATUALIZAR posts-data.js
=============================================================================

Adicione no INÍCIO do array `posts`:

```javascript
{
    id: [número sequencial],
    titulo: "[Título da Matéria]",
    data: "AAAA-MM-DD",
    categoria: "[Categoria existente ou nova]",
    resumo: "[Máx 160 caracteres - texto para o card]",
    arquivo: "posts/[nome-do-arquivo].html",
    svg: "<svg viewBox='0 0 320 200'><!-- SVG inline aqui --></svg>",
    imagem: "[opcional - caminho para imagem de fallback]"
}
```

**Importante:**

- O campo `svg` é mais importante que `imagem` e aparecerá primeiro
- SVGs devem ter viewBox="0 0 320 200" para consistência visual
- Use cores da marca: #00e5ff (cyan), #00ff88 (green), #4d7cff (blue), #a855f7 (purple)
- Mantenha SVGs simples e rápidos para não impactar performance
- Se não tiver um SVG, a ferramenta usará um ícone FontAwesome da categoria

Exemplo de SVG simples para um novo post:

```svg
<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#00ff88" stop-opacity="0.4"></stop>
            <stop offset="100%" stop-color="#00e5ff" stop-opacity="0.9"></stop>
        </linearGradient>
    </defs>
    <!-- Adicione formas aqui -->
</svg>
```

Mantenha posts ordenados do mais recente para o mais antigo.

=============================================================================
ÍCONES FontAwesome RECOMENDADOS
=============================================================================

- fa-rocket (inovação, lançamentos)
- fa-chess-knight (estratégia)
- fa-chart-line (crescimento, análise)
- fa-lightbulb (ideias, insights)
- fa-gears (processos, execução)
- fa-users (equipe, colaboração)
- fa-shield (segurança, confiança)
- fa-target (objetivos, foco)
- fa-graduation-cap (aprendizado, educação)
- fa-landmark (instituições, governo)
- fa-building (empresas)

Use sempre com `<i class="fas fa-[ícone]"></i>`

=============================================================================
CATEGORIAS PADRÃO DO BLOG
=============================================================================

- Novidades
- Gestão Estratégica
- Tecnologia
- Gestão Pública
- Transformação Digital
- Concursos Públicos
- Inteligência de Negócios

Você pode criar novas conforme necessário.

=============================================================================
-->

<!-- Este arquivo é apenas documentação. Não inclua em produção. -->
