# Guia de Contribuição - iDialog

## 🤝 Como Contribuir

Obrigado por considerar contribuir para o projeto iDialog! Este documento fornece diretrizes para contribuições.

## 📋 Processo de Contribuição

### 1. Fork e Clone
```bash
git clone https://github.com/seu-usuario/idialog-website.git
cd idialog-website
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Ambiente de Desenvolvimento
```bash
npm run dev
```

### 4. Fazer Alterações
- Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
- Faça suas alterações seguindo os padrões de código
- Teste suas alterações: `npm run validate`

### 5. Commit e Push
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade
```

### 6. Criar Pull Request
- Abra um Pull Request no GitHub
- Descreva claramente as alterações feitas
- Aguarde a revisão

## 🎯 Padrões de Código

### HTML
- Use HTML5 semântico
- Adicione atributos `alt` em todas as imagens
- Mantenha indentação consistente (2 espaços)

### CSS
- Use BEM methodology para classes
- Prefira Flexbox/Grid ao invés de floats
- Mobile-first approach

### JavaScript
- Use ES6+ features
- Prefira `const`/`let` ao invés de `var`
- Adicione comentários em funções complexas

## 🧪 Testes

Execute os testes antes de submeter:
```bash
npm run test
npm run lint
```

## 📝 Convenções de Commit

Use conventional commits:
- `feat:` para novas funcionalidades
- `fix:` para correções de bugs
- `docs:` para documentação
- `style:` para formatação
- `refactor:` para refatoração
- `test:` para testes

## 🐛 Reportar Bugs

Para reportar bugs, crie uma issue com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)

## 💡 Sugerir Melhorias

Para sugerir melhorias:
- Abra uma issue com label "enhancement"
- Descreva a melhoria proposta
- Justifique o benefício

## 📞 Contato

Para dúvidas, entre em contato:
- Email: dev@idialog.com.br
- Issue no GitHub

---

**Obrigado por contribuir! 🚀**
