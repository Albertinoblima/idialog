# Revista de Estudos TJPE — Estrutura do Projeto

Plataforma de estudos para o concurso do Tribunal de Justiça de Pernambuco (TJPE), Técnico Judiciário, Banca IBFC.

---

## Estrutura de Pastas

```
/
├── index.html                          # Revista principal (entrada do site)
├── README.md                           # Este arquivo
│
├── materias/                           # Uma pasta por disciplina
│   │
│   ├── direito-processual-penal/
│   │   ├── simulado.html               # Simulado da matéria
│   │   └── reforco/                    # Módulos de reforço por tópico
│   │       ├── inquerito-policial.html
│   │       ├── prisao-flagrante.html
│   │       ├── prisao-cautelar.html
│   │       ├── provas.html
│   │       ├── nulidades.html
│   │       └── acao-penal.html
│   │
│   ├── raciocinio-logico/
│   │   ├── simulado.html
│   │   └── reforco/                    # (a criar: negacoes, conectivos, etc.)
│   │
│   ├── direito-administrativo/
│   │   ├── simulado.html
│   │   └── reforco/                    # (a criar: LIMPE, atos adm., licitações)
│   │
│   ├── direito-constitucional/
│   │   ├── simulado.html
│   │   └── reforco/                    # (a criar: direitos fundamentais, CF/88)
│   │
│   └── direito-civil/
│       ├── simulado.html
│       └── reforco/                    # (a criar: contratos, responsabilidade)
│
└── assets/                             # Recursos compartilhados (futuro)
    ├── css/                            # Folhas de estilo globais
    ├── js/                             # Scripts compartilhados
    └── img/                            # Imagens e ícones
```

---

## Roadmap do Site

### Fase 1 — Conteúdo (atual)

- [x] Revista principal (`index.html`) com 5 matérias
- [x] Simulados por matéria
- [x] Módulos de reforço para Direito Processual Penal
- [ ] Módulos de reforço para as demais matérias

### Fase 2 — Separação de Recursos ✅

- [x] Extrair CSS inline para `assets/css/revista.css`
- [x] Extrair JavaScript para `assets/js/revista.js`
- [x] Extrair CSS compartilhado dos simulados/reforços para `assets/css/practice.css`
- [x] Extrair engine JS compartilhada para `assets/js/practice-engine.js`
- [x] Adicionar botão "← Revista" em todos os simulados e reforços
- [x] Corrigir fences Markdown em 6 arquivos HTML

### Fase 3 — Site Estático

- [ ] `index.html` → página inicial com cards de matérias
- [ ] Navegação breadcrumb dentro de cada matéria
- [ ] Botão "Voltar à Revista" em simulados e reforços
- [ ] Modo escuro persistente (localStorage)
- [ ] Progresso do usuário (localStorage)

### Fase 4 — Backend / Hospedagem

- [ ] GitHub Pages (hospedagem gratuita)
- [ ] Domínio personalizado (ex: estuda-tjpe.com.br)
- [ ] Analytics de acesso (Plausible ou Google Analytics)
- [ ] Sistema de favoritos e anotações

---

## Convenções de Nomenclatura

| Tipo de arquivo     | Padrão                               | Exemplo                          |
|---------------------|--------------------------------------|----------------------------------|
| Entrada da matéria  | `materias/{slug}/index.html`         | `materias/direito-civil/index.html` |
| Simulado            | `materias/{slug}/simulado.html`      | `materias/direito-civil/simulado.html` |
| Módulo de reforço   | `materias/{slug}/reforco/{topico}.html` | `materias/direito-civil/reforco/contratos.html` |
| CSS global          | `assets/css/{nome}.css`             | `assets/css/revista.css`         |
| JS global           | `assets/js/{nome}.js`               | `assets/js/revista.js`           |

---

## Matérias Cobertas

| Matéria                      | Simulado | Reforços disponíveis | Reforços planejados |
|------------------------------|:--------:|:--------------------:|:-------------------:|
| Direito Processual Penal     | ✅       | 6 módulos            | —                   |
| Raciocínio Lógico            | ✅       | —                    | Negações, Contagem  |
| Direito Administrativo       | ✅       | —                    | LIMPE, Licitações   |
| Direito Constitucional       | ✅       | —                    | CF/88, Direitos     |
| Direito Civil                | ✅       | —                    | Contratos, Resp.    |
