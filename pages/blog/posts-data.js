// ============================================================
// MANIFEST DO BLOG — adicione novos posts aqui
// ============================================================
// Campos:
//   id       : número único, incremente a cada novo post
//   titulo   : título do artigo
//   data     : "AAAA-MM-DD"
//   status   : (opcional) "published" | "draft" | "archived" | "unlisted"
//   publishAt: (opcional) data/hora ISO para agendar publicação futura
//   unlisted : (opcional) true para manter fora da listagem do blog
//   listed   : (opcional) false para manter fora da listagem do blog
//   categoria: ex. "Tecnologia", "Gestão Pública", "Inovação"
//   resumo   : texto curto para o card (máx. 160 caracteres)
//   arquivo  : caminho relativo a partir de /pages/blog/ → "posts/nome-do-post.html"
//   imagem   : (opcional) caminho relativo → "posts/imagens/nome.jpg"
//              se omitida, usa imagem padrão do blog
// ============================================================

const posts = [
    {
        id: 29,
        titulo: "Caso de sucesso: aumento de conversao e reducao de churn com operacao integrada",
        data: "2026-04-28",
        status: "published",
        publishAt: "2026-04-28T09:00:00-03:00",
        categoria: "Setor Privado",
        resumo: "Empresa B2B integrou CRM, atendimento e automacao e avancou conversao, receita recorrente e retencao.",
        arquivo: "posts/caso-setor-privado-aumento-conversao-reducao-churn.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><polyline points="46,138 90,120 134,102 178,84 222,70 266,54" fill="none" stroke="#00ff88" stroke-width="2.5"/><circle cx="266" cy="54" r="4" fill="#00ff88"/><text x="160" y="160" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Conversao + Retencao</text></svg>'
    },
    {
        id: 28,
        titulo: "Caso de sucesso: reducao de filas e ganho de SLA no atendimento ao cidadao",
        data: "2026-04-27",
        status: "published",
        publishAt: "2026-04-27T09:00:00-03:00",
        categoria: "Setor Publico",
        resumo: "Orgao municipal reduziu espera, elevou resolucao no prazo e melhorou satisfacao com jornada integrada.",
        arquivo: "posts/caso-setor-publico-reducao-filas-sla-cidadao.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="44" y="46" width="232" height="18" rx="8" fill="rgba(232,234,240,.14)"/><rect x="44" y="74" width="232" height="18" rx="8" fill="rgba(232,234,240,.14)"/><rect x="44" y="102" width="232" height="18" rx="8" fill="rgba(232,234,240,.14)"/><rect x="44" y="102" width="170" height="18" rx="8" fill="rgba(0,255,136,.3)"/><text x="160" y="160" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Fila menor, SLA maior</text></svg>'
    },
    {
        id: 27,
        titulo: "Seguranca da informacao em operacoes de atendimento sem friccao",
        data: "2026-04-26",
        status: "published",
        publishAt: "2026-04-26T09:00:00-03:00",
        categoria: "Setor Privado",
        resumo: "Proteja dados com controle por contexto, auditoria e resposta a incidente sem travar a experiencia.",
        arquivo: "posts/seguranca-informacao-operacoes-atendimento-sem-friccao.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><path d="M160 46 L210 66 V100 C210 124 190 144 160 156 C130 144 110 124 110 100 V66 Z" fill="rgba(0,229,255,.18)" stroke="#00e5ff"/><rect x="146" y="92" width="28" height="24" rx="5" fill="rgba(0,255,136,.35)"/><text x="160" y="168" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Seguranca sem atrito</text></svg>'
    },
    {
        id: 26,
        titulo: "LGPD aplicada ao atendimento publico: menos risco, mais confianca",
        data: "2026-04-25",
        status: "published",
        publishAt: "2026-04-25T09:00:00-03:00",
        categoria: "Setor Publico",
        resumo: "Governanca de dados com minimizacao, trilha de auditoria e politica viva para atendimento publico.",
        arquivo: "posts/lgpd-aplicada-atendimento-publico-risco-confianca.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="84" y="52" width="152" height="96" rx="12" fill="rgba(0,229,255,.14)" stroke="#00e5ff"/><rect x="118" y="38" width="84" height="28" rx="8" fill="rgba(0,255,136,.2)"/><text x="160" y="107" text-anchor="middle" fill="#00ff88" font-size="12" font-weight="700">LGPD</text><text x="160" y="164" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Confianca + Controle</text></svg>'
    },
    {
        id: 25,
        titulo: "Integracao CRM + Omnichannel + Marketing: construa um Funil Vivo",
        data: "2026-04-24",
        status: "published",
        publishAt: "2026-04-24T09:00:00-03:00",
        categoria: "Setor Privado",
        resumo: "Integre canais e times para operar funil com score dinamico, handoff claro e conversao por etapa.",
        arquivo: "posts/integracao-crm-omnichannel-marketing-funil-vivo.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><circle cx="92" cy="84" r="28" fill="rgba(0,229,255,.2)"/><circle cx="160" cy="84" r="28" fill="rgba(0,255,136,.2)"/><circle cx="228" cy="84" r="28" fill="rgba(77,124,255,.2)"/><text x="160" y="160" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">CRM + Omnichannel + MKT</text></svg>'
    },
    {
        id: 24,
        titulo: "Indicadores de atendimento publico para decisao de gestao",
        data: "2026-04-23",
        status: "published",
        publishAt: "2026-04-23T09:00:00-03:00",
        categoria: "Setor Publico",
        resumo: "Monitore resposta, resolucao e SLA por secretaria para agir cedo e melhorar desempenho publico.",
        arquivo: "posts/indicadores-atendimento-publico-decisao-gestao.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="62" y="118" width="24" height="40" fill="rgba(0,229,255,.3)"/><rect x="98" y="98" width="24" height="60" fill="rgba(0,255,136,.3)"/><rect x="134" y="78" width="24" height="80" fill="rgba(77,124,255,.3)"/><rect x="170" y="90" width="24" height="68" fill="rgba(255,45,149,.22)"/><text x="204" y="156" fill="#00ff88" font-size="11" font-weight="700">Gestao orientada</text></svg>'
    },
    {
        id: 23,
        titulo: "SLA comercial como diferencial competitivo",
        data: "2026-04-22",
        status: "published",
        publishAt: "2026-04-22T09:00:00-03:00",
        categoria: "Setor Privado",
        resumo: "Converta rapidez de resposta em vantagem comercial com metas por etapa e monitoramento ativo.",
        arquivo: "posts/sla-comercial-como-diferencial-competitivo.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><circle cx="160" cy="100" r="48" fill="rgba(0,229,255,.14)" stroke="#00e5ff"/><line x1="160" y1="100" x2="160" y2="72" stroke="#00ff88" stroke-width="3"/><line x1="160" y1="100" x2="186" y2="112" stroke="#00ff88" stroke-width="3"/><text x="160" y="164" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">SLA como vantagem</text></svg>'
    },
    {
        id: 22,
        titulo: "Acessibilidade digital em servicos publicos: foco no fluxo completo",
        data: "2026-04-21",
        status: "published",
        publishAt: "2026-04-21T09:00:00-03:00",
        categoria: "Setor Publico",
        resumo: "Acessibilidade de ponta a ponta: linguagem clara, navegacao inclusiva e jornada sem barreiras.",
        arquivo: "posts/acessibilidade-digital-servicos-publicos-operacional.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><circle cx="160" cy="74" r="14" fill="rgba(0,255,136,.35)"/><line x1="160" y1="90" x2="160" y2="132" stroke="#00ff88" stroke-width="4"/><line x1="122" y1="106" x2="198" y2="106" stroke="#00ff88" stroke-width="4"/><line x1="160" y1="132" x2="132" y2="160" stroke="#00ff88" stroke-width="4"/><line x1="160" y1="132" x2="188" y2="160" stroke="#00ff88" stroke-width="4"/><text x="160" y="176" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Servico publico inclusivo</text></svg>'
    },
    {
        id: 21,
        titulo: "App Mobile Corporativo para Operacao de Campo em Tempo Real",
        data: "2026-04-20",
        status: "published",
        publishAt: "2026-04-20T09:00:00-03:00",
        categoria: "Setor Privado",
        resumo: "Digitalize o campo com tarefas guiadas, evidencia estruturada e KPI em tempo real para decisao rapida.",
        arquivo: "posts/app-mobile-corporativo-operacao-campo.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="112" y="34" width="96" height="132" rx="12" fill="rgba(0,229,255,.14)" stroke="#00e5ff"/><rect x="124" y="52" width="72" height="12" rx="6" fill="rgba(232,234,240,.14)"/><rect x="124" y="72" width="72" height="12" rx="6" fill="rgba(0,255,136,.3)"/><rect x="124" y="92" width="72" height="12" rx="6" fill="rgba(77,124,255,.3)"/><rect x="124" y="112" width="72" height="12" rx="6" fill="rgba(255,45,149,.22)"/><text x="160" y="152" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Campo em Tempo Real</text></svg>'
    },
    {
        id: 20,
        titulo: "ChatBot Publico com triagem inteligente",
        data: "2026-04-19",
        status: "published",
        publishAt: "2026-04-19T09:00:00-03:00",
        categoria: "Setor Publico",
        resumo: "Classifique demandas por urgencia e servico para escalar ao humano no momento certo.",
        arquivo: "posts/chatbot-publico-triagem-inteligente.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="52" y="52" width="96" height="62" rx="10" fill="rgba(0,229,255,.16)" stroke="#00e5ff"/><rect x="170" y="52" width="98" height="62" rx="10" fill="rgba(0,255,136,.16)" stroke="#00ff88"/><line x1="148" y1="84" x2="170" y2="84" stroke="#00ff88"/><circle cx="82" cy="82" r="6" fill="#00ff88"/><circle cx="118" cy="82" r="6" fill="#00ff88"/><text x="160" y="152" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Triagem Inteligente</text></svg>'
    },
    {
        id: 19,
        titulo: "E-commerce orientado a margem com Inteligencia de Conversao",
        data: "2026-04-18",
        status: "published",
        publishAt: "2026-04-18T09:00:00-03:00",
        categoria: "Setor Privado",
        resumo: "Conecte mix, CRM e campanha para aumentar conversao preservando margem real.",
        arquivo: "posts/ecommerce-orientado-margem-inteligencia-conversao.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="46" y="44" width="228" height="16" rx="8" fill="rgba(232,234,240,.14)"/><rect x="46" y="44" width="122" height="16" rx="8" fill="rgba(0,229,255,.3)"/><rect x="46" y="72" width="228" height="16" rx="8" fill="rgba(232,234,240,.14)"/><rect x="46" y="72" width="174" height="16" rx="8" fill="rgba(0,255,136,.3)"/><polyline points="54,136 94,116 134,104 174,84 214,76 254,62" fill="none" stroke="#00ff88" stroke-width="2.5"/><text x="196" y="154" fill="#00ff88" font-size="11" font-weight="700">Conversao com Margem</text></svg>'
    },
    {
        id: 18,
        titulo: "Plataforma de Atendimento ao Cidadao com Jornada Unica",
        data: "2026-04-17",
        status: "published",
        publishAt: "2026-04-17T09:00:00-03:00",
        categoria: "Setor Publico",
        resumo: "Unifique canais, protocolo e acompanhamento para entregar transparencia e previsibilidade ao cidadao.",
        arquivo: "posts/plataforma-atendimento-cidadao-jornada-unica.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="44" y="40" width="232" height="26" rx="8" fill="rgba(0,229,255,.16)"/><rect x="44" y="76" width="232" height="18" rx="8" fill="rgba(232,234,240,.14)"/><rect x="44" y="102" width="232" height="18" rx="8" fill="rgba(232,234,240,.14)"/><rect x="44" y="128" width="232" height="18" rx="8" fill="rgba(232,234,240,.14)"/><circle cx="58" cy="85" r="3" fill="#00ff88"/><circle cx="58" cy="111" r="3" fill="#00ff88"/><circle cx="58" cy="137" r="3" fill="#00ff88"/><text x="174" y="157" fill="#00ff88" font-size="11" font-weight="700">Jornada Unica</text></svg>'
    },
    {
        id: 17,
        titulo: "Automacao de Marketing com jornada de conversao",
        data: "2026-04-16",
        categoria: "Setor Privado",
        resumo: "Automatize com inteligencia: segmentacao, lead scoring e jornada para escalar conversao com previsibilidade.",
        arquivo: "posts/automacao-marketing-jornada-conversao.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="44" y="42" width="232" height="14" rx="7" fill="rgba(232,234,240,.14)"/><rect x="44" y="42" width="152" height="14" rx="7" fill="rgba(0,255,136,.3)"/><rect x="44" y="68" width="232" height="14" rx="7" fill="rgba(232,234,240,.14)"/><rect x="44" y="68" width="188" height="14" rx="7" fill="rgba(77,124,255,.3)"/><circle cx="72" cy="128" r="14" fill="rgba(0,229,255,.2)"/><circle cx="126" cy="128" r="14" fill="rgba(0,255,136,.2)"/><circle cx="180" cy="128" r="14" fill="rgba(77,124,255,.2)"/><text x="210" y="156" fill="#00ff88" font-size="11" font-weight="700">Jornada + Score</text></svg>'
    },
    {
        id: 16,
        titulo: "Sistema de Agendamento e reducao de filas",
        data: "2026-04-16",
        categoria: "Setor Publico",
        resumo: "Organize demanda, reduza espera e melhore atendimento com agendamento digital e confirmacoes automaticas.",
        arquivo: "posts/sistema-agendamento-reducao-filas.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="46" y="40" width="228" height="38" rx="8" fill="rgba(0,229,255,.16)"/><line x1="46" y1="54" x2="274" y2="54" stroke="rgba(232,234,240,.35)"/><rect x="46" y="90" width="108" height="18" rx="8" fill="rgba(0,255,136,.28)"/><rect x="166" y="90" width="108" height="18" rx="8" fill="rgba(77,124,255,.28)"/><rect x="46" y="116" width="228" height="12" rx="6" fill="rgba(232,234,240,.14)"/><rect x="46" y="116" width="176" height="12" rx="6" fill="rgba(0,255,136,.32)"/><text x="156" y="156" fill="#00ff88" font-size="11" font-weight="700">Agenda sem Filas</text></svg>'
    },
    {
        id: 15,
        titulo: "Analytics e Relatorios para decisao comercial",
        data: "2026-04-16",
        categoria: "Setor Privado",
        resumo: "Conecte dashboards e rituais de decisao para transformar dados comerciais em acao de crescimento.",
        arquivo: "posts/analytics-relatorios-decisao-comercial.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="52" y="120" width="24" height="40" fill="rgba(0,229,255,.3)"/><rect x="88" y="94" width="24" height="66" fill="rgba(0,255,136,.3)"/><rect x="124" y="72" width="24" height="88" fill="rgba(77,124,255,.3)"/><rect x="160" y="102" width="24" height="58" fill="rgba(255,45,149,.25)"/><polyline points="52,98 88,86 124,64 160,78 196,58 232,50" fill="none" stroke="#00ff88" stroke-width="2.5"/><text x="184" y="156" fill="#00ff88" font-size="11" font-weight="700">Dashboards + Insight</text></svg>'
    },
    {
        id: 14,
        titulo: "App Mobile do Cidadao para servicos essenciais",
        data: "2026-04-16",
        categoria: "Setor Publico",
        resumo: "Leve servicos publicos para o celular com notificacoes, protocolos e solicitacoes em fluxo simples.",
        arquivo: "posts/app-mobile-cidadao-servicos-essenciais.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="112" y="36" width="96" height="128" rx="12" fill="rgba(0,229,255,.14)" stroke="#00e5ff"/><rect x="124" y="52" width="72" height="14" rx="6" fill="rgba(232,234,240,.16)"/><rect x="124" y="76" width="72" height="14" rx="6" fill="rgba(0,255,136,.28)"/><rect x="124" y="100" width="72" height="14" rx="6" fill="rgba(77,124,255,.28)"/><circle cx="160" cy="146" r="6" fill="rgba(232,234,240,.3)"/><text x="76" y="156" fill="#00ff88" font-size="11" font-weight="700">Servico no Celular</text></svg>'
    },
    {
        id: 13,
        titulo: "Chatbot inteligente 24/7 com integracao a CRM",
        data: "2026-04-16",
        categoria: "Setor Privado",
        resumo: "Automacao com contexto: bot integrado ao CRM para atender melhor e qualificar leads com eficiencia.",
        arquivo: "posts/chatbot-24h-integracao-crm.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="54" y="52" width="92" height="64" rx="10" fill="rgba(0,229,255,.16)" stroke="#00e5ff"/><circle cx="82" cy="82" r="6" fill="#00ff88"/><circle cx="118" cy="82" r="6" fill="#00ff88"/><rect x="170" y="52" width="96" height="64" rx="10" fill="rgba(0,255,136,.16)" stroke="#00ff88"/><line x1="146" y1="84" x2="170" y2="84" stroke="#00ff88"/><text x="160" y="150" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Bot + CRM</text></svg>'
    },
    {
        id: 12,
        titulo: "Gestao de Protocolos com rastreabilidade ponta a ponta",
        data: "2026-04-16",
        categoria: "Setor Publico",
        resumo: "Ganhe controle de processos com numeracao automatica, tramitacao digital e historico completo.",
        arquivo: "posts/gestao-protocolos-rastreabilidade.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="44" y="40" width="232" height="28" rx="8" fill="rgba(0,229,255,.14)"/><rect x="44" y="78" width="232" height="20" rx="8" fill="rgba(232,234,240,.14)"/><rect x="44" y="106" width="232" height="20" rx="8" fill="rgba(232,234,240,.14)"/><rect x="44" y="134" width="232" height="20" rx="8" fill="rgba(232,234,240,.14)"/><circle cx="58" cy="88" r="3" fill="#00ff88"/><circle cx="58" cy="116" r="3" fill="#00ff88"/><circle cx="58" cy="144" r="3" fill="#00ff88"/><text x="178" y="157" fill="#00ff88" font-size="11" font-weight="700">Tramitacao Rastreavel</text></svg>'
    },
    {
        id: 11,
        titulo: "Centro de Contato Omnichannel com SLA real",
        data: "2026-04-16",
        categoria: "Setor Privado",
        resumo: "Integre canais e monitore SLA em tempo real para escalar atendimento com qualidade e consistencia.",
        arquivo: "posts/centro-contato-omnichannel-sla.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="44" y="44" width="92" height="20" rx="8" fill="rgba(0,229,255,.26)"/><rect x="148" y="44" width="64" height="20" rx="8" fill="rgba(0,255,136,.26)"/><rect x="220" y="44" width="56" height="20" rx="8" fill="rgba(77,124,255,.26)"/><rect x="44" y="80" width="232" height="14" rx="7" fill="rgba(232,234,240,.14)"/><rect x="44" y="80" width="184" height="14" rx="7" fill="rgba(0,255,136,.3)"/><rect x="44" y="104" width="232" height="14" rx="7" fill="rgba(232,234,240,.14)"/><rect x="44" y="104" width="146" height="14" rx="7" fill="rgba(0,229,255,.3)"/><text x="160" y="156" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Omnichannel + SLA</text></svg>'
    },
    {
        id: 10,
        titulo: "Portal de Transparencia com linguagem cidada",
        data: "2026-04-16",
        categoria: "Setor Publico",
        resumo: "Transparencia efetiva: dados publicos claros, pesquisaveis e compreensiveis para qualquer cidadao.",
        arquivo: "posts/portal-transparencia-linguagem-cidada.html",
        svg: '<svg viewBox="0 0 320 200" style="width:100%;height:100%;display:block"><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,.62)" stroke="#00e5ff"/><rect x="44" y="40" width="112" height="36" rx="8" fill="rgba(0,229,255,.16)"/><rect x="164" y="40" width="112" height="36" rx="8" fill="rgba(0,255,136,.16)"/><rect x="44" y="90" width="232" height="14" rx="7" fill="rgba(232,234,240,.15)"/><rect x="44" y="90" width="172" height="14" rx="7" fill="rgba(0,255,136,.32)"/><rect x="44" y="114" width="232" height="14" rx="7" fill="rgba(232,234,240,.15)"/><rect x="44" y="114" width="148" height="14" rx="7" fill="rgba(0,229,255,.32)"/><text x="160" y="156" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Transparencia Clara</text></svg>'
    },
    {
        id: 9,
        titulo: "CRM Avancado: previsibilidade comercial e receita recorrente",
        data: "2026-04-16",
        categoria: "Setor Privado",
        resumo: "CRM maduro conecta marketing, vendas e atendimento para escalar conversao e receita recorrente com previsibilidade.",
        arquivo: "posts/crm-avancado-receita-recorrente.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-crm-card" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"></stop><stop offset="100%" stop-color="#00ff88" stop-opacity="0.75"></stop></linearGradient></defs><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,0.62)" stroke="url(#grad-crm-card)" stroke-width="1.5"></rect><rect x="44" y="40" width="232" height="16" rx="8" fill="rgba(232,234,240,0.14)"></rect><rect x="44" y="40" width="118" height="16" rx="8" fill="rgba(0,229,255,0.3)"></rect><rect x="44" y="68" width="232" height="16" rx="8" fill="rgba(232,234,240,0.14)"></rect><rect x="44" y="68" width="164" height="16" rx="8" fill="rgba(0,255,136,0.3)"></rect><rect x="44" y="96" width="232" height="16" rx="8" fill="rgba(232,234,240,0.14)"></rect><rect x="44" y="96" width="196" height="16" rx="8" fill="rgba(77,124,255,0.28)"></rect><circle cx="66" cy="146" r="14" fill="rgba(0,229,255,0.18)" stroke="#00e5ff"></circle><circle cx="114" cy="146" r="14" fill="rgba(0,255,136,0.18)" stroke="#00ff88"></circle><circle cx="162" cy="146" r="14" fill="rgba(77,124,255,0.18)" stroke="#4d7cff"></circle><text x="224" y="150" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Pipeline + Retencao</text></svg>'
    },
    {
        id: 8,
        titulo: "Ouvidoria Digital orientada por dados: da reclamacao a melhoria publica",
        data: "2026-04-16",
        categoria: "Setor Publico",
        resumo: "Modernize a ouvidoria com workflow digital, leitura de tendencia e indicadores para melhorar servicos publicos.",
        arquivo: "posts/ouvidoria-digital-dados-governanca.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-ouv-card" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"></stop><stop offset="100%" stop-color="#00ff88" stop-opacity="0.75"></stop></linearGradient></defs><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,0.62)" stroke="url(#grad-ouv-card)" stroke-width="1.5"></rect><rect x="44" y="42" width="112" height="36" rx="8" fill="rgba(0,229,255,0.16)" stroke="#00e5ff"></rect><rect x="164" y="42" width="112" height="36" rx="8" fill="rgba(0,255,136,0.16)" stroke="#00ff88"></rect><rect x="44" y="90" width="232" height="14" rx="7" fill="rgba(232,234,240,0.15)"></rect><rect x="44" y="90" width="176" height="14" rx="7" fill="rgba(0,255,136,0.32)"></rect><rect x="44" y="114" width="232" height="14" rx="7" fill="rgba(232,234,240,0.15)"></rect><rect x="44" y="114" width="148" height="14" rx="7" fill="rgba(0,229,255,0.32)"></rect><rect x="44" y="138" width="232" height="14" rx="7" fill="rgba(232,234,240,0.15)"></rect><rect x="44" y="138" width="204" height="14" rx="7" fill="rgba(77,124,255,0.3)"></rect><text x="160" y="166" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Ouvidoria com Inteligencia</text></svg>'
    },
    {
        id: 7,
        titulo: "Governanca de Portfolio de Projetos: Priorizar, Executar e Entregar",
        data: "2026-04-16",
        categoria: "Gestao Estrategica",
        resumo: "Sem governanca, o portfolio vira fila de urgencias. Organize prioridades e execute com previsibilidade usando a iDialog.",
        arquivo: "posts/governanca-portfolio-projetos.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-portfolio-card" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"></stop><stop offset="100%" stop-color="#00ff88" stop-opacity="0.75"></stop></linearGradient></defs><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,0.62)" stroke="url(#grad-portfolio-card)" stroke-width="1.5"></rect><rect x="44" y="40" width="232" height="16" rx="8" fill="rgba(232,234,240,0.14)"></rect><rect x="44" y="40" width="170" height="16" rx="8" fill="rgba(0,255,136,0.28)"></rect><rect x="44" y="66" width="232" height="16" rx="8" fill="rgba(232,234,240,0.14)"></rect><rect x="44" y="66" width="132" height="16" rx="8" fill="rgba(0,229,255,0.28)"></rect><rect x="44" y="92" width="232" height="16" rx="8" fill="rgba(232,234,240,0.14)"></rect><rect x="44" y="92" width="198" height="16" rx="8" fill="rgba(77,124,255,0.28)"></rect><rect x="44" y="124" width="108" height="42" rx="8" fill="rgba(0,229,255,0.15)" stroke="#00e5ff"></rect><rect x="168" y="124" width="108" height="42" rx="8" fill="rgba(0,255,136,0.15)" stroke="#00ff88"></rect><text x="160" y="156" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Portfolio em Governanca</text></svg>'
    },
    {
        id: 6,
        titulo: "Gestao de Projetos de Alta Performance: Execute com Clareza e Ritmo",
        data: "2026-04-16",
        categoria: "Gestao Estrategica",
        resumo: "Uma ferramenta poderosa para tirar projetos do plano e levar ate a entrega com dashboard, timeline, tarefas e alertas inteligentes.",
        arquivo: "posts/gestao-projetos-alta-performance.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-project-card" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"></stop><stop offset="100%" stop-color="#00ff88" stop-opacity="0.75"></stop></linearGradient></defs><rect x="24" y="18" width="272" height="164" rx="12" fill="rgba(10,10,15,0.62)" stroke="url(#grad-project-card)" stroke-width="1.5"></rect><rect x="44" y="40" width="52" height="30" rx="6" fill="rgba(0,229,255,0.2)"></rect><rect x="104" y="40" width="52" height="30" rx="6" fill="rgba(0,255,136,0.2)"></rect><rect x="164" y="40" width="52" height="30" rx="6" fill="rgba(77,124,255,0.2)"></rect><rect x="224" y="40" width="52" height="30" rx="6" fill="rgba(255,45,149,0.18)"></rect><rect x="44" y="86" width="232" height="12" rx="6" fill="rgba(232,234,240,0.16)"></rect><rect x="44" y="108" width="210" height="12" rx="6" fill="rgba(232,234,240,0.16)"></rect><rect x="44" y="130" width="232" height="10" rx="5" fill="rgba(77,124,255,0.18)"></rect><rect x="44" y="130" width="160" height="10" rx="5" fill="#00ff88"></rect><text x="214" y="154" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Projetos + Tarefas + Timeline</text></svg>'
    },
    {
        id: 5,
        titulo: "Plano de Viabilidade Tecnico Economico Financeiro: Decidir Antes de Investir",
        data: "2026-04-16",
        categoria: "Gestao Estrategica",
        resumo: "Validar antes de investir e decisao inteligente. Conheca o estudo de viabilidade da iDialog com foco tecnico, economico e financeiro.",
        arquivo: "posts/plano-viabilidade-tecnico-economico-financeiro.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-viab-card" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"></stop><stop offset="100%" stop-color="#00ff88" stop-opacity="0.75"></stop></linearGradient></defs><rect x="24" y="20" width="272" height="160" rx="12" fill="rgba(10,10,15,0.62)" stroke="url(#grad-viab-card)" stroke-width="1.5"></rect><rect x="44" y="118" width="24" height="44" rx="5" fill="rgba(0,229,255,0.25)"></rect><rect x="78" y="96" width="24" height="66" rx="5" fill="rgba(0,255,136,0.25)"></rect><rect x="112" y="82" width="24" height="80" rx="5" fill="rgba(77,124,255,0.25)"></rect><rect x="146" y="106" width="24" height="56" rx="5" fill="rgba(255,45,149,0.2)"></rect><polyline points="42,126 76,110 110,96 144,86 178,72 212,66 246,54 278,44" fill="none" stroke="#00ff88" stroke-width="2.5"></polyline><circle cx="212" cy="66" r="3" fill="#00ff88"></circle><circle cx="246" cy="54" r="3" fill="#00ff88"></circle><circle cx="278" cy="44" r="3" fill="#00ff88"></circle><text x="214" y="154" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">VPL / TIR / Payback</text></svg>'
    },
    {
        id: 4,
        titulo: "Análise SWOT: Estratégia Real Começa no Diagnóstico",
        data: "2026-04-16",
        categoria: "Gestão Estratégica",
        resumo: "Quem decide melhor executa melhor. Conheça a ferramenta SWOT da iDialog e transforme diagnóstico em ação estratégica.",
        arquivo: "posts/analise-swot-estrategia-real.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-swot-card" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"></stop><stop offset="100%" stop-color="#00ff88" stop-opacity="0.75"></stop></linearGradient></defs><rect x="28" y="18" width="264" height="164" rx="12" fill="rgba(10,10,15,0.62)" stroke="url(#grad-swot-card)" stroke-width="1.5"></rect><line x1="160" y1="34" x2="160" y2="166" stroke="rgba(232,234,240,0.23)"></line><line x1="44" y1="100" x2="276" y2="100" stroke="rgba(232,234,240,0.23)"></line><rect x="44" y="34" width="108" height="58" rx="8" fill="rgba(0,255,136,0.14)" stroke="#00ff88"></rect><rect x="168" y="34" width="108" height="58" rx="8" fill="rgba(255,45,149,0.12)" stroke="#ff2d95"></rect><rect x="44" y="108" width="108" height="58" rx="8" fill="rgba(0,229,255,0.14)" stroke="#00e5ff"></rect><rect x="168" y="108" width="108" height="58" rx="8" fill="rgba(77,124,255,0.14)" stroke="#4d7cff"></rect><text x="98" y="68" text-anchor="middle" fill="#00ff88" font-size="11" font-weight="700">Forcas</text><text x="222" y="68" text-anchor="middle" fill="#ff2d95" font-size="11" font-weight="700">Fraquezas</text><text x="98" y="142" text-anchor="middle" fill="#00e5ff" font-size="11" font-weight="700">Oportunidades</text><text x="222" y="142" text-anchor="middle" fill="#4d7cff" font-size="11" font-weight="700">Ameacas</text></svg>'
    },
    {
        id: 3,
        titulo: "Revista Para Concursos: Aprovado Resolve Questões",
        data: "2026-04-16",
        categoria: "Concursos Públicos",
        resumo: "A melhor forma de aprovação é resolver questões com método. Conheça a Revista para Concursos da iDialog e acelere sua evolução.",
        arquivo: "posts/revista-concursos-questoes.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-revista" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"></stop><stop offset="100%" stop-color="#00ff88" stop-opacity="0.75"></stop></linearGradient></defs><rect x="30" y="24" width="260" height="152" rx="12" fill="rgba(10,10,15,0.62)" stroke="url(#grad-revista)" stroke-width="1.5"></rect><rect x="52" y="48" width="220" height="18" rx="7" fill="rgba(0,229,255,0.2)"></rect><rect x="52" y="78" width="14" height="14" rx="3" fill="rgba(0,255,136,0.3)" stroke="#00ff88"></rect><path d="M55 85 L59 89 L63 82" stroke="#00ff88" stroke-width="2" fill="none"></path><rect x="74" y="79" width="170" height="12" rx="6" fill="rgba(232,234,240,0.18)"></rect><rect x="52" y="102" width="14" height="14" rx="3" fill="rgba(0,255,136,0.3)" stroke="#00ff88"></rect><path d="M55 109 L59 113 L63 106" stroke="#00ff88" stroke-width="2" fill="none"></path><rect x="74" y="103" width="150" height="12" rx="6" fill="rgba(232,234,240,0.18)"></rect><rect x="52" y="126" width="14" height="14" rx="3" fill="rgba(255,45,149,0.25)" stroke="#ff2d95"></rect><path d="M55 129 L63 137 M63 129 L55 137" stroke="#ff2d95" stroke-width="1.8"></path><rect x="74" y="127" width="132" height="12" rx="6" fill="rgba(232,234,240,0.18)"></rect></svg>'
    },
    {
        id: 2,
        titulo: "Planejamento Estratégico: Do Conceito à Execução",
        data: "2026-04-16",
        categoria: "Gestão Estratégica",
        resumo: "Empresas que planejam crescem 30% mais rápido. Descubra a importância do planejamento estratégico e como a ferramenta iDialog transforma estratégia em ação.",
        arquivo: "posts/planejamento-estrategico.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-plan" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#00ff88" stop-opacity="0.4"></stop><stop offset="100%" stop-color="#00e5ff" stop-opacity="0.9"></stop></linearGradient></defs><rect x="20" y="120" width="24" height="60" fill="url(#grad-plan)" opacity="0.6"></rect><rect x="56" y="90" width="24" height="90" fill="url(#grad-plan)" opacity="0.75"></rect><rect x="92" y="50" width="24" height="130" fill="url(#grad-plan)" opacity="0.9"></rect><rect x="128" y="30" width="24" height="150" fill="url(#grad-plan)"></rect><rect x="164" y="10" width="24" height="170" fill="url(#grad-plan)"></rect><circle cx="176" cy="10" r="4" fill="#00ff88"></circle><path d="M180 20 L195 5" stroke="#00ff88" stroke-width="2.5" fill="none"></path><polygon points="195,5 191,10 198,8" fill="#00ff88"></polygon><line x1="20" y1="180" x2="200" y2="180" stroke="rgba(232,234,240,0.3)" stroke-width="1.5"></line></svg>'
    },
    {
        id: 1,
        titulo: "Bem-vindo ao Blog da iDialog",
        data: "2026-04-15",
        categoria: "Novidades",
        resumo: "Conheça o novo blog da iDialog, nossa empresa e serviços em uma apresentação interativa que define o padrão das próximas publicações.",
        arquivo: "posts/bem-vindo-ao-blog.html",
        svg: '<svg viewBox="0 0 320 200" style="width: 100%; height: 100%; display: block;"><defs><linearGradient id="grad-welcome" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00e5ff" stop-opacity="0.85"></stop><stop offset="100%" stop-color="#00ff88" stop-opacity="0.7"></stop></linearGradient></defs><rect x="30" y="30" width="260" height="140" rx="12" fill="rgba(10,10,15,0.6)" stroke="url(#grad-welcome)" stroke-width="1.5"></rect><circle cx="70" cy="70" r="20" fill="rgba(0,229,255,0.18)" stroke="url(#grad-welcome)"></circle><rect x="110" y="55" width="150" height="12" rx="6" fill="rgba(0,229,255,0.22)"></rect><rect x="110" y="75" width="120" height="8" rx="4" fill="rgba(232,234,240,0.18)"></rect><rect x="50" y="110" width="220" height="45" rx="8" fill="rgba(77,124,255,0.12)" stroke="url(#grad-welcome)"></rect><path d="M70 135 C110 115, 140 150, 190 125 C210 112, 230 125, 250 105" stroke="#00ff88" stroke-width="2.5" fill="none"></path><circle cx="250" cy="105" r="3" fill="#00ff88"></circle></svg>'
    }
    // Adicione novos posts acima desta linha, inserindo ao início da lista
    // Exemplo:
    // {
    //     id: 2,
    //     titulo: "Título do Novo Post",
    //     data: "2026-04-16",
    //     status: "published",
    //     publishAt: "2026-04-20T09:00:00-03:00",
    //     unlisted: false,
    //     categoria: "Tecnologia",
    //     resumo: "Resumo breve com até 160 caracteres...",
    //     arquivo: "posts/nome-do-arquivo.html",
    //     imagem: "posts/imagens/nome.jpg"
    // },
];
