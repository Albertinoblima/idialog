# Instruções para Publicação do Site iDialog na HostGator (ou qualquer hospedagem)

## 1. Estrutura de Pastas
- Envie todo o conteúdo da pasta do projeto para a pasta `public_html` do seu servidor.
- Mantenha a estrutura de diretórios:
  - `index.html` (na raiz)
  - `pages/` (todas as páginas internas)
  - `components/` (header.html, footer.html)
  - `assets/` (js, css, imagens)
  - `public/` (imagens, ícones, PDFs)
  - `src/` (styles, scripts)

## 2. Página Inicial
- O arquivo `index.html` deve estar na raiz do upload (ex: `public_html/index.html`).
- As páginas internas ficam em `public_html/pages/`.

## 3. Caminhos Relativos
- Todos os links, includes e scripts já usam caminhos relativos e funcionarão em qualquer hospedagem.

## 4. Não há dependência de backend
- O site é 100% estático (HTML, CSS, JS). Não precisa de PHP, Python, Node ou banco de dados.

## 5. Upload
- Use o Gerenciador de Arquivos do cPanel ou um cliente FTP (ex: FileZilla) para enviar todos os arquivos e pastas.
- Não esqueça de enviar as pastas `assets`, `components`, `public`, `src`, `pages` e todos os arquivos `.html`.

## 6. Teste após upload
- Acesse `https://seudominio.com.br/` para ver a página inicial.
- Acesse `https://seudominio.com.br/pages/sobre.html` para testar as páginas internas.
- Se algum componente (header/footer) não aparecer, confira se a estrutura de pastas foi mantida.

## 7. Dicas finais
- Para adicionar novas páginas, basta criar um novo `.html` na pasta `pages` e seguir o padrão dos includes.
- Para trocar imagens, substitua os arquivos na pasta `public/images` ou `public/portfolio/imagens portfolio`.
- Para editar textos, altere os arquivos `.html` diretamente.

---
Dúvidas? Basta pedir suporte para a equipe técnica da HostGator ou consultar o painel de ajuda do cPanel.

Site pronto para produção!
