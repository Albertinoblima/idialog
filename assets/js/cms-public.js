(function () {
    function getApiBase() {
        const saved = localStorage.getItem('idialog-tools-api') || 'http://127.0.0.1:5001/api';
        return saved.replace(/\/$/, '');
    }

    async function fetchJson(path) {
        const response = await fetch(`${getApiBase()}${path}`);
        if (!response.ok) {
            throw new Error(`Erro ${response.status}`);
        }
        return response.json();
    }

    function formatDate(value) {
        if (!value) {
            return '';
        }

        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return value;
        }

        return parsed.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    }

    function getSlugFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return (params.get('slug') || '').trim();
    }

    async function fetchContentList(options) {
        const params = new URLSearchParams();
        if (options && options.type) params.set('type', options.type);
        if (options && options.context) params.set('context', options.context);
        if (options && options.limit) params.set('limit', String(options.limit));
        const data = await fetchJson(`/public/content?${params.toString()}`);
        return data.items || [];
    }

    async function fetchContentBySlug(slug) {
        const data = await fetchJson(`/public/content/${encodeURIComponent(slug)}`);
        return data.item;
    }

    async function renderRevistaHighlights() {
        const path = (window.location.pathname || '').toLowerCase();
        if (!path.includes('/pages/revista_concurso/index.html')) {
            return;
        }

        try {
            const items = await fetchContentList({ type: 'simulado', context: 'revista', limit: 4 });
            if (!items.length || document.getElementById('cms-simulados-revista')) {
                return;
            }

            const section = document.createElement('section');
            section.id = 'cms-simulados-revista';
            section.className = 'cms-spotlight-section';
            section.innerHTML = `
                <div class="container">
                    <div class="cms-spotlight-head">
                        <div>
                            <div class="cms-spotlight-kicker">Painel Editorial</div>
                            <h2 class="section-title">Simulados publicados no CMS</h2>
                            <p class="hero-subtitle">Gerencie seus simulados no painel e publique novas rodadas sem mexer manualmente em arquivos da revista.</p>
                        </div>
                    </div>
                    <div class="cms-spotlight-grid">
                        ${items.map(item => `
                            <a class="cms-spotlight-card" href="${item.preview_url}">
                                <div class="cms-spotlight-type">Simulado</div>
                                <h3>${escapeHtml(item.title)}</h3>
                                <p>${escapeHtml(item.summary || 'Simulado administrado pelo painel iDialog.')}</p>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;

            const footer = document.getElementById('footer-placeholder');
            const main = document.querySelector('main');
            if (footer) {
                footer.insertAdjacentElement('beforebegin', section);
            } else if (main) {
                main.insertAdjacentElement('beforeend', section);
            }
        } catch (error) {
            console.warn('Nao foi possivel renderizar simulados do CMS na revista.', error);
        }
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    window.iDialogCMS = {
        getApiBase,
        formatDate,
        getSlugFromUrl,
        fetchContentList,
        fetchContentBySlug,
    };

    document.addEventListener('DOMContentLoaded', renderRevistaHighlights);
})();