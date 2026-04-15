// ============================================================
// MANIFEST DO BLOG — adicione novos posts aqui
// ============================================================
// Campos:
//   id       : número único, incremente a cada novo post
//   titulo   : título do artigo
//   data     : "AAAA-MM-DD"
//   categoria: ex. "Tecnologia", "Gestão Pública", "Inovação"
//   resumo   : texto curto para o card (máx. 160 caracteres)
//   arquivo  : caminho relativo a partir de /pages/blog/ → "posts/nome-do-post.html"
//   imagem   : (opcional) caminho relativo → "posts/imagens/nome.jpg"
//              se omitida, usa imagem padrão do blog
// ============================================================

const posts = [
    {
        id: 1,
        titulo: "Bem-vindo ao Blog da iDialog",
        data: "2026-04-15",
        categoria: "Novidades",
        resumo: "Inauguramos nosso espaço de conteúdo. Aqui você encontrará artigos sobre tecnologia, gestão pública, inovação e muito mais.",
        arquivo: "posts/bem-vindo-ao-blog.html",
        imagem: ""
    }
    // Adicione novos posts acima desta linha, inserindo ao início da lista
    // Exemplo:
    // {
    //     id: 2,
    //     titulo: "Título do Novo Post",
    //     data: "2026-04-16",
    //     categoria: "Tecnologia",
    //     resumo: "Resumo breve com até 160 caracteres...",
    //     arquivo: "posts/nome-do-arquivo.html",
    //     imagem: "posts/imagens/nome.jpg"
    // },
];
