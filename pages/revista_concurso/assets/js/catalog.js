/* ════════════════════════════════════════════════════════════════════
   CATALOG — Catálogo completo de áreas, matérias, bancas e concursos
   Fonte única de verdade para todo o sistema Aprova Concursos.
   ════════════════════════════════════════════════════════════════════ */

window.CATALOG = (() => {
    'use strict';

    const areas = [
        { id: 'nucleo-comum', label: 'Núcleo Comum', icon: 'fa-solid fa-book', color: '#00e5ff' },
        { id: 'area-judiciaria', label: 'Área Judiciária', icon: 'fa-solid fa-gavel', color: '#a855f7' },
        { id: 'area-fiscal-controle', label: 'Área Fiscal e Controle', icon: 'fa-solid fa-chart-line', color: '#fbbf24' },
        { id: 'area-administrativa', label: 'Área Administrativa', icon: 'fa-solid fa-building', color: '#38bdf8' },
        { id: 'area-seguranca-publica', label: 'Segurança Pública', icon: 'fa-solid fa-shield-halved', color: '#ff6b6b' },
        { id: 'area-bancaria', label: 'Área Bancária', icon: 'fa-solid fa-landmark', color: '#00ff88' },
    ];

    const subjects = [
        // ── Núcleo Comum ──────────────────────────────────────────────
        { id: 'raciocinio-logico', label: 'Raciocínio Lógico', area: 'nucleo-comum', qFile: 'raciocinio-logico', hasContent: true, hasQuestions: true, hasReforco: true },
        { id: 'direito-administrativo', label: 'Direito Administrativo', area: 'nucleo-comum', qFile: 'dir-administrativo', hasContent: true, hasQuestions: true, hasReforco: false },
        { id: 'direito-constitucional', label: 'Direito Constitucional', area: 'nucleo-comum', qFile: 'dir-constitucional', hasContent: true, hasQuestions: true, hasReforco: false },
        { id: 'lingua-portuguesa', label: 'Língua Portuguesa', area: 'nucleo-comum', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'informatica', label: 'Informática', area: 'nucleo-comum', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },

        // ── Área Judiciária ───────────────────────────────────────────
        { id: 'direito-processual-penal', label: 'Direito Processual Penal', area: 'area-judiciaria', qFile: 'dir-processual-penal', hasContent: true, hasQuestions: true, hasReforco: false },
        { id: 'direito-civil', label: 'Direito Civil', area: 'area-judiciaria', qFile: 'dir-civil', hasContent: true, hasQuestions: true, hasReforco: false },
        { id: 'processo-civil', label: 'Processo Civil', area: 'area-judiciaria', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'direito-penal', label: 'Direito Penal', area: 'area-judiciaria', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'direito-eleitoral', label: 'Direito Eleitoral', area: 'area-judiciaria', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'direito-trabalho', label: 'Direito do Trabalho', area: 'area-judiciaria', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },

        // ── Área Fiscal e Controle ────────────────────────────────────
        { id: 'direito-tributario', label: 'Direito Tributário', area: 'area-fiscal-controle', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'contabilidade-geral', label: 'Contabilidade Geral', area: 'area-fiscal-controle', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'auditoria', label: 'Auditoria', area: 'area-fiscal-controle', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'afo-financas-publicas', label: 'AFO / Finanças Públicas', area: 'area-fiscal-controle', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'economia', label: 'Economia', area: 'area-fiscal-controle', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },

        // ── Área Administrativa ───────────────────────────────────────
        { id: 'administracao-geral', label: 'Administração Geral', area: 'area-administrativa', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'administracao-publica', label: 'Administração Pública', area: 'area-administrativa', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'gestao-pessoas', label: 'Gestão de Pessoas', area: 'area-administrativa', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'recursos-materiais', label: 'Recursos Materiais', area: 'area-administrativa', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'arquivologia', label: 'Arquivologia', area: 'area-administrativa', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },

        // ── Segurança Pública ─────────────────────────────────────────
        { id: 'criminologia', label: 'Criminologia', area: 'area-seguranca-publica', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'direitos-humanos', label: 'Direitos Humanos', area: 'area-seguranca-publica', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'legislacao-extravagante', label: 'Legislação Extravagante', area: 'area-seguranca-publica', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'medicina-legal', label: 'Medicina Legal', area: 'area-seguranca-publica', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },

        // ── Área Bancária ─────────────────────────────────────────────
        { id: 'conhecimentos-bancarios', label: 'Conhecimentos Bancários', area: 'area-bancaria', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'matematica-financeira', label: 'Matemática Financeira', area: 'area-bancaria', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
        { id: 'mercado-financeiro', label: 'Mercado Financeiro', area: 'area-bancaria', qFile: null, hasContent: false, hasQuestions: false, hasReforco: false },
    ];

    const bancas = [
        { id: 'ibfc', label: 'IBFC' },
        { id: 'cespe', label: 'CESPE / CEBRASPE' },
        { id: 'fcc', label: 'FCC' },
        { id: 'fgv', label: 'FGV' },
        { id: 'vunesp', label: 'VUNESP' },
        { id: 'cesgranrio', label: 'CESGRANRIO' },
        { id: 'consulplan', label: 'CONSULPLAN' },
        { id: 'quadrix', label: 'QUADRIX' },
    ];

    const concursos = [
        { id: 'tjpe-2025', label: 'TJPE 2025 — Técnico Judiciário', banca: 'ibfc', areas: ['nucleo-comum', 'area-judiciaria'] },
        { id: 'trf5-2025', label: 'TRF 5ª Região 2025', banca: 'ibfc', areas: ['nucleo-comum', 'area-judiciaria', 'area-administrativa'] },
        { id: 'tse-2025', label: 'TSE 2025', banca: 'cespe', areas: ['nucleo-comum', 'area-judiciaria', 'area-administrativa'] },
        { id: 'stf-2025', label: 'STF 2025', banca: 'cespe', areas: ['nucleo-comum', 'area-judiciaria'] },
        { id: 'inss-2025', label: 'INSS 2025 — Técnico do Seguro Social', banca: 'cespe', areas: ['nucleo-comum', 'area-administrativa'] },
        { id: 'caixa-2025', label: 'Caixa Econômica Federal 2025', banca: 'cesgranrio', areas: ['nucleo-comum', 'area-bancaria'] },
        { id: 'bb-2025', label: 'Banco do Brasil 2025', banca: 'cesgranrio', areas: ['nucleo-comum', 'area-bancaria'] },
        { id: 'receita-2025', label: 'Receita Federal 2025', banca: 'cespe', areas: ['nucleo-comum', 'area-fiscal-controle'] },
        { id: 'pcpe-2025', label: 'Polícia Civil PE 2025', banca: 'cespe', areas: ['nucleo-comum', 'area-judiciaria', 'area-seguranca-publica'] },
        { id: 'pf-2025', label: 'Polícia Federal 2025', banca: 'cespe', areas: ['nucleo-comum', 'area-judiciaria', 'area-seguranca-publica'] },
        { id: 'outro', label: 'Outro / Não definido', banca: null, areas: [] },
    ];

    // ── Chapter mapping (revista content) ───────────────────────────
    const chapterMap = {
        'direito-processual-penal': 'dpp',
        'raciocinio-logico': 'rl',
        'direito-administrativo': 'da',
        'direito-constitucional': 'dc',
        'direito-civil': 'dcv',
    };

    // ── Helpers ─────────────────────────────────────────────────────
    function getArea(id) { return areas.find(a => a.id === id); }
    function getSubject(id) { return subjects.find(s => s.id === id); }
    function getSubjectsByArea(areaId) { return subjects.filter(s => s.area === areaId); }
    function getAvailableSubjects() { return subjects.filter(s => s.hasQuestions || s.hasContent); }
    function getSubjectsForConcurso(concursoId) {
        const c = concursos.find(x => x.id === concursoId);
        if (!c || !c.areas.length) return subjects;
        return subjects.filter(s => c.areas.includes(s.area));
    }

    return { areas, subjects, bancas, concursos, chapterMap, getArea, getSubject, getSubjectsByArea, getAvailableSubjects, getSubjectsForConcurso };
})();
