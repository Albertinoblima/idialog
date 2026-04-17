(function () {
    'use strict';

    const ROCKET_CURSOR_CONFIG_KEY = 'idialog-rocket-cursor-settings';
    const ADMIN_TOKEN_KEY = 'idialog-admin-token';
    const ADMIN_API_KEY = 'idialog-admin-api';

    const state = {
        token: localStorage.getItem(ADMIN_TOKEN_KEY) || '',
        apiBase: localStorage.getItem(ADMIN_API_KEY) || localStorage.getItem('idialog-tools-api') || '/api',
        contents: [],
        widgets: [],
        clockTimer: null,
    };

    const el = {
        authView: document.getElementById('auth-view'),
        dashboardView: document.getElementById('dashboard-view'),
        loginForm: document.getElementById('login-form'),
        contentForm: document.getElementById('content-form'),
        contentReset: document.getElementById('content-reset'),
        contentList: document.getElementById('content-list'),
        contentType: document.getElementById('content-type'),
        contentTitle: document.getElementById('content-title'),
        contentSlug: document.getElementById('content-slug'),
        contentPublishedAt: document.getElementById('content-published-at'),
        contentHtmlFields: document.getElementById('content-html-fields'),
        contentSimuladoFields: document.getElementById('content-simulado-fields'),
        contentCoverFile: document.getElementById('content-cover-file'),
        contentCoverPreview: document.getElementById('content-cover-preview'),
        contentStats: document.getElementById('content-stats'),
        scheduledList: document.getElementById('scheduled-list'),
        widgetForm: document.getElementById('widget-form'),
        widgetReset: document.getElementById('widget-reset'),
        widgetsList: document.getElementById('widgets-list'),
        widgetType: document.getElementById('widget-type'),
        widgetMediaFile: document.getElementById('widget-media-file'),
        widgetMediaFields: document.getElementById('widget-media-fields'),
        widgetCodeFields: document.getElementById('widget-code-fields'),
        widgetPreview: document.getElementById('widget-preview'),
        cursorForm: document.getElementById('cursor-form'),
        cursorReset: document.getElementById('cursor-reset'),
        cursorScale: document.getElementById('cursor-scale'),
        cursorScaleValue: document.getElementById('cursor-scale-value'),
        cursorGlow: document.getElementById('cursor-glow'),
        cursorGlowValue: document.getElementById('cursor-glow-value'),
        cursorTailWidth: document.getElementById('cursor-tail-width'),
        cursorTailWidthValue: document.getElementById('cursor-tail-width-value'),
        cursorTailLength: document.getElementById('cursor-tail-length'),
        cursorTailLengthValue: document.getElementById('cursor-tail-length-value'),
        cursorSmokeSize: document.getElementById('cursor-smoke-size'),
        cursorSmokeSizeValue: document.getElementById('cursor-smoke-size-value'),
        cursorTrailDensity: document.getElementById('cursor-trail-density'),
        cursorTrailDensityValue: document.getElementById('cursor-trail-density-value'),
        logoutBtn: document.getElementById('logout-btn'),
        toast: document.getElementById('toast'),
    };

    // ── Toast ─────────────────────────────────────────────────────────────────
    function showToast(message, isError) {
        if (!el.toast) {
            return;
        }
        el.toast.textContent = message;
        el.toast.style.borderColor = isError
            ? 'rgba(255, 80, 80, 0.45)'
            : 'rgba(0, 229, 255, 0.35)';
        el.toast.classList.add('show');
        window.clearTimeout(showToast._timer);
        showToast._timer = window.setTimeout(() => el.toast.classList.remove('show'), 2800);
    }

    // ── Utilities ─────────────────────────────────────────────────────────────
    function getApiBase() {
        return (state.apiBase || '').replace(/\/$/, '');
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function slugify(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-{2,}/g, '-');
    }

    function parseDateSafe(value) {
        if (!value) {
            return null;
        }
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return null;
        }
        return parsed;
    }

    function toDatetimeLocalValue(value) {
        const parsed = parseDateSafe(value);
        if (!parsed) {
            return '';
        }

        const year = parsed.getFullYear();
        const month = String(parsed.getMonth() + 1).padStart(2, '0');
        const day = String(parsed.getDate()).padStart(2, '0');
        const hour = String(parsed.getHours()).padStart(2, '0');
        const minute = String(parsed.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    function fromDatetimeLocalToIso(value) {
        const raw = String(value || '').trim();
        if (!raw) {
            return '';
        }

        const parsed = parseDateSafe(raw);
        if (!parsed) {
            throw new Error('Data/hora de publicacao invalida.');
        }

        return parsed.toISOString();
    }

    function formatDateTimePtBr(value) {
        const parsed = parseDateSafe(value);
        if (!parsed) {
            return '-';
        }

        return parsed.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    function isScheduledPublication(item) {
        if (!item || item.status !== 'published') {
            return false;
        }
        const parsed = parseDateSafe(item.published_at);
        return Boolean(parsed && parsed.getTime() > Date.now());
    }

    function formatCountdown(publishedAt) {
        const target = parseDateSafe(publishedAt);
        if (!target) {
            return '';
        }

        const diffMs = target.getTime() - Date.now();
        if (diffMs <= 0) {
            return 'publica em instantes';
        }

        const totalMinutes = Math.floor(diffMs / 60000);
        const days = Math.floor(totalMinutes / 1440);
        const hours = Math.floor((totalMinutes % 1440) / 60);
        const minutes = totalMinutes % 60;

        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0 || days > 0) parts.push(`${hours}h`);
        parts.push(`${minutes}min`);
        return `em ${parts.join(' ')}`;
    }

    function startClockTick() {
        if (state.clockTimer) {
            window.clearInterval(state.clockTimer);
        }

        state.clockTimer = window.setInterval(() => {
            renderContentLibrary();
            renderScheduledAgenda();
        }, 60000);
    }

    // ── HTTP ──────────────────────────────────────────────────────────────────
    async function request(path, options) {
        const headers = Object.assign({}, options && options.headers ? options.headers : {});
        if (state.token) {
            headers.Authorization = `Bearer ${state.token}`;
        }

        let response;
        try {
            response = await fetch(
                `${getApiBase()}${path}`,
                Object.assign({}, options || {}, { headers })
            );
        } catch (_err) {
            throw new Error(
                'Nao foi possivel conectar na API. Verifique a URL e se o backend esta online.'
            );
        }

        const contentType = response.headers.get('content-type') || '';

        if (!response.ok) {
            let errorMessage = `Erro ${response.status}`;
            if (contentType.includes('application/json')) {
                const data = await response.json();
                errorMessage = data.error || errorMessage;
            }
            throw new Error(errorMessage);
        }

        if (contentType.includes('application/json')) {
            return response.json();
        }

        return response;
    }

    // ── Auth / session ────────────────────────────────────────────────────────
    function setLoggedIn(loggedIn) {
        if (el.authView) {
            el.authView.hidden = loggedIn;
        }
        if (el.dashboardView) {
            el.dashboardView.hidden = !loggedIn;
        }
        // Hide site header/footer when admin dashboard is active
        var header = document.getElementById('header-placeholder');
        var footer = document.getElementById('footer-placeholder');
        if (header) header.hidden = loggedIn;
        if (footer) footer.hidden = loggedIn;
    }

    async function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(el.loginForm);

        try {
            const data = await request('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            });

            state.token = data.token;
            localStorage.setItem(ADMIN_TOKEN_KEY, state.token);
            await loadDashboard();
            showToast('Login realizado com sucesso.');
        } catch (error) {
            showToast(error.message, true);
        }
    }

    function handleLogout() {
        state.token = '';
        state.contents = [];
        state.widgets = [];
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setLoggedIn(false);
        showToast('Sessao encerrada.');
    }

    async function loadDashboard() {
        var loadingEl = document.getElementById('admin-loading');
        if (loadingEl) loadingEl.hidden = false;

        try {
            const [contentRes, widgetsRes] = await Promise.all([
                refreshContent(),
                refreshWidgets(),
            ]);
            populateKpis();
            setLoggedIn(true);
            switchToTab('dashboard');
        } catch (error) {
            throw error;
        } finally {
            if (loadingEl) loadingEl.hidden = true;
        }
    }

    function populateKpis() {
        var total = state.contents.length;
        var published = state.contents.filter(function (i) { return i.status === 'published'; }).length;
        var scheduled = state.contents.filter(function (i) { return isScheduledPublication(i); }).length;
        var drafts = state.contents.filter(function (i) { return i.status === 'draft'; }).length;
        var simulados = state.contents.filter(function (i) { return i.content_type === 'simulado'; }).length;
        var widgets = state.widgets.length;

        var map = {
            'kpi-total': total,
            'kpi-published': published,
            'kpi-scheduled': scheduled,
            'kpi-drafts': drafts,
            'kpi-widgets': widgets,
            'kpi-simulados': simulados,
        };
        Object.keys(map).forEach(function (id) {
            var e = document.getElementById(id);
            if (e) e.textContent = map[id];
        });
    }

    async function restoreSession() {
        if (!state.token) {
            setLoggedIn(false);
            return;
        }

        try {
            await loadDashboard();
        } catch (_err) {
            state.token = '';
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            setLoggedIn(false);
        }
    }

    // ── CMS ───────────────────────────────────────────────────────────────────
    function contentTypeLabel(value) {
        const labels = { page: 'Pagina', blog_post: 'Postagem', simulado: 'Simulado' };
        return labels[value] || value;
    }

    function contentStatusLabel(value) {
        const labels = { draft: 'Rascunho', published: 'Publicado', archived: 'Arquivado' };
        return labels[value] || value;
    }

    function effectiveStatusLabel(item) {
        if (isScheduledPublication(item)) {
            return 'Agendado';
        }
        return contentStatusLabel(item.status);
    }

    function effectiveStatusClass(item) {
        if (isScheduledPublication(item)) {
            return 'is-scheduled';
        }
        if (item.status === 'published') {
            return 'is-live';
        }
        if (item.status === 'archived') {
            return 'is-paused';
        }
        return '';
    }

    function scopeLabel(value) {
        const labels = {
            all: 'Site inteiro',
            site: 'Site institucional',
            blog: 'Blog',
            revista: 'Revista',
        };
        return labels[value] || value;
    }

    function renderContentStats() {
        if (!el.contentStats) {
            return;
        }

        const total = state.contents.length;
        const published = state.contents.filter(item => item.status === 'published').length;
        const drafts = state.contents.filter(item => item.status === 'draft').length;
        const scheduled = state.contents.filter(item => isScheduledPublication(item)).length;
        const simulados = state.contents.filter(item => item.content_type === 'simulado').length;

        el.contentStats.innerHTML = `
            <div class="cms-stat-card"><div class="cms-stat-label">Conteudos</div><div class="cms-stat-value">${total}</div></div>
            <div class="cms-stat-card"><div class="cms-stat-label">Publicados</div><div class="cms-stat-value">${published}</div></div>
            <div class="cms-stat-card"><div class="cms-stat-label">Agendados</div><div class="cms-stat-value">${scheduled}</div></div>
            <div class="cms-stat-card"><div class="cms-stat-label">Rascunhos</div><div class="cms-stat-value">${drafts}</div></div>
            <div class="cms-stat-card"><div class="cms-stat-label">Simulados</div><div class="cms-stat-value">${simulados}</div></div>
        `;
    }

    function renderContentLibrary() {
        if (!el.contentList) {
            return;
        }

        renderContentStats();

        if (!state.contents.length) {
            el.contentList.innerHTML = '<p>Nenhum conteudo cadastrado ate o momento.</p>';
            return;
        }

        el.contentList.innerHTML = state.contents.map(item => {
            const preview = item.cover_url
                ? `<img src="${item.cover_url}" alt="${escapeHtml(item.title)}">`
                : `<div class="content-item-preview-fallback">${contentTypeLabel(item.content_type)} sem capa</div>`;

            return `
                <div class="content-item" data-content-id="${item.id}">
                    <div class="content-item-header">
                        <div>
                            <div class="content-item-title">${escapeHtml(item.title)}</div>
                            <div class="widget-item-meta">
                                <span class="widget-chip">${contentTypeLabel(item.content_type)}</span>
                                <span class="widget-chip">${scopeLabel(item.context)}</span>
                                <span class="widget-chip ${effectiveStatusClass(item)}">${effectiveStatusLabel(item)}</span>
                                ${isScheduledPublication(item) ? `<span class="widget-chip is-scheduled">${formatCountdown(item.published_at)}</span>` : ''}
                            </div>
                        </div>
                        <div class="plan-item-actions">
                            <button type="button" class="mini-btn" data-action="edit">Editar</button>
                            <button type="button" class="mini-btn" data-action="status">${item.status === 'published' ? 'Despublicar' : 'Publicar'}</button>
                            <button type="button" class="mini-btn" data-action="open">Abrir</button>
                            <button type="button" class="mini-btn" data-action="delete">Excluir</button>
                        </div>
                    </div>
                    <div class="content-item-body">
                        <div class="content-item-copy">
                            <p><strong>Slug:</strong> ${escapeHtml(item.slug)}</p>
                            <p><strong>Categoria:</strong> ${escapeHtml(item.category || '-')}</p>
                            <p><strong>Publicacao:</strong> ${escapeHtml(formatDateTimePtBr(item.published_at))}</p>
                            <p><strong>URL:</strong> ${escapeHtml(item.preview_url || '-')}</p>
                            <p><strong>Resumo:</strong> ${escapeHtml(item.summary || 'Sem resumo editorial.')}</p>
                        </div>
                        <div class="content-item-preview">${preview}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderScheduledAgenda() {
        if (!el.scheduledList) {
            return;
        }

        const scheduled = state.contents
            .filter(item => isScheduledPublication(item))
            .sort((a, b) => (a.published_at || '').localeCompare(b.published_at || ''));

        if (!scheduled.length) {
            el.scheduledList.innerHTML = '<p>Nenhum conteudo com publicacao futura no momento.</p>';
            return;
        }

        el.scheduledList.innerHTML = scheduled.map(item => `
            <article class="scheduled-card" data-content-id="${item.id}">
                <div class="scheduled-head">
                    <div class="scheduled-title">${escapeHtml(item.title)}</div>
                    <span class="widget-chip is-scheduled">${formatCountdown(item.published_at)}</span>
                </div>
                <div class="scheduled-meta">
                    <div><strong>Publicacao:</strong> ${escapeHtml(formatDateTimePtBr(item.published_at))}</div>
                    <div><strong>Tipo:</strong> ${escapeHtml(contentTypeLabel(item.content_type))} | <strong>Contexto:</strong> ${escapeHtml(scopeLabel(item.context))}</div>
                    <div><strong>Slug:</strong> ${escapeHtml(item.slug)}</div>
                </div>
                <div class="scheduled-actions">
                    <button type="button" class="mini-btn" data-action="edit">Editar</button>
                    <button type="button" class="mini-btn" data-action="status">Despublicar</button>
                </div>
            </article>
        `).join('');
    }

    function syncContentFieldVisibility() {
        if (!el.contentType || !el.contentHtmlFields || !el.contentSimuladoFields) {
            return;
        }

        const isSimulado = el.contentType.value === 'simulado';
        el.contentHtmlFields.hidden = isSimulado;
        el.contentSimuladoFields.hidden = !isSimulado;
    }

    function setContentCoverPreview(mediaUrl, altText) {
        if (!el.contentCoverPreview) {
            return;
        }

        if (!mediaUrl) {
            el.contentCoverPreview.hidden = true;
            el.contentCoverPreview.removeAttribute('src');
            return;
        }

        el.contentCoverPreview.src = mediaUrl;
        el.contentCoverPreview.alt = altText || 'Preview da capa';
        el.contentCoverPreview.hidden = false;
    }

    function fillContentForm(item) {
        if (!el.contentForm || !item) {
            return;
        }

        el.contentForm.elements.content_id.value = item.id || '';
        el.contentForm.elements.current_cover_path.value = item.cover_path || '';
        el.contentForm.elements.content_type.value = item.content_type || 'page';
        el.contentForm.elements.status.value = item.status || 'draft';
        el.contentForm.elements.title.value = item.title || '';
        el.contentForm.elements.slug.value = item.slug || '';
        el.contentForm.elements.context.value = item.context || 'site';
        el.contentForm.elements.category.value = item.category || '';
        el.contentForm.elements.summary.value = item.summary || '';
        el.contentForm.elements.seo_title.value = item.seo_title || '';
        el.contentForm.elements.seo_description.value = item.seo_description || '';
        el.contentForm.elements.published_at.value = toDatetimeLocalValue(item.published_at);
        el.contentForm.elements.body_html.value = item.body_html || '';
        el.contentForm.elements.extra_json.value = JSON.stringify(item.extra || {}, null, 2);
        setContentCoverPreview(item.cover_url || '', item.title || 'Preview da capa');
        syncContentFieldVisibility();
        // Mark slug as manual to prevent overwrite when editing title
        if (el.contentSlug) {
            el.contentSlug.dataset.manual = item.slug ? 'true' : '';
        }
    }

    function clearContentForm() {
        if (!el.contentForm) {
            return;
        }

        el.contentForm.reset();
        el.contentForm.elements.content_id.value = '';
        el.contentForm.elements.current_cover_path.value = '';
        el.contentForm.elements.content_type.value = 'page';
        el.contentForm.elements.status.value = 'draft';
        el.contentForm.elements.context.value = 'site';
        el.contentForm.elements.published_at.value = '';
        setContentCoverPreview('', '');
        syncContentFieldVisibility();
    }

    async function refreshContent() {
        const response = await request('/content', { method: 'GET' });
        state.contents = response.items || [];
        renderContentLibrary();
        renderScheduledAgenda();
    }

    async function uploadContentCoverIfNeeded() {
        if (!el.contentCoverFile || !el.contentCoverFile.files || !el.contentCoverFile.files.length) {
            return null;
        }

        const payload = new FormData();
        payload.append('media', el.contentCoverFile.files[0]);
        return request('/content/media', { method: 'POST', body: payload });
    }

    function buildContentPayload(formData, uploadedCover) {
        const contentType = formData.get('content_type');
        const rawExtra = (formData.get('extra_json') || '').trim();
        let extra = {};
        if (contentType === 'simulado') {
            extra = rawExtra ? JSON.parse(rawExtra) : {};
        }

        const publishedAt = fromDatetimeLocalToIso(formData.get('published_at'));

        return {
            content_type: contentType,
            status: formData.get('status'),
            title: formData.get('title'),
            slug: slugify(formData.get('slug')),
            context: formData.get('context'),
            category: formData.get('category'),
            summary: formData.get('summary'),
            seo_title: formData.get('seo_title'),
            seo_description: formData.get('seo_description'),
            cover_path: uploadedCover && uploadedCover.cover_path
                ? uploadedCover.cover_path
                : formData.get('current_cover_path'),
            body_html: contentType === 'simulado' ? '' : formData.get('body_html'),
            extra: extra,
            published_at: publishedAt,
        };
    }

    function createContentUpdatePayload(item, overrides) {
        return Object.assign({
            content_type: item.content_type,
            status: item.status,
            title: item.title,
            slug: item.slug,
            context: item.context,
            category: item.category,
            summary: item.summary,
            seo_title: item.seo_title,
            seo_description: item.seo_description,
            cover_path: item.cover_path,
            body_html: item.body_html,
            extra: item.extra || {},
            published_at: item.published_at,
        }, overrides || {});
    }

    async function handleContentSave(event) {
        event.preventDefault();
        const formData = new FormData(el.contentForm);
        const contentId = formData.get('content_id');

        try {
            const uploadedCover = await uploadContentCoverIfNeeded();
            const payload = buildContentPayload(formData, uploadedCover);

            if (contentId) {
                await request(`/content/${contentId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Conteudo atualizado com sucesso.');
            } else {
                await request('/content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Conteudo criado com sucesso.');
            }

            clearContentForm();
            await refreshContent();
        } catch (error) {
            const message = error instanceof SyntaxError
                ? 'JSON do simulado invalido. Revise a estrutura.'
                : error.message;
            showToast(message, true);
        }
    }

    async function handleContentActions(event) {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        const action = target.dataset.action;
        if (!action) {
            return;
        }

        const wrapper = target.closest('.content-item, .scheduled-card');
        if (!wrapper) {
            return;
        }

        const contentId = wrapper.getAttribute('data-content-id');
        const item = state.contents.find(entry => String(entry.id) === String(contentId));
        if (!item) {
            return;
        }

        try {
            if (action === 'edit') {
                fillContentForm(item);
                showToast('Conteudo carregado para edicao.');
                return;
            }

            if (action === 'open') {
                if (item.status !== 'published') {
                    showToast('Publique o conteudo antes de abrir a URL publica.', true);
                    return;
                }
                if (isScheduledPublication(item)) {
                    showToast('Conteudo agendado. Aguarde a data/hora de publicacao.', true);
                    return;
                }
                const anchor = document.createElement('a');
                anchor.href = item.preview_url;
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                anchor.click();
                return;
            }

            if (action === 'status') {
                const nextStatus = item.status === 'published' ? 'draft' : 'published';
                await request(`/content/${item.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(createContentUpdatePayload(item, { status: nextStatus })),
                });
                await refreshContent();
                showToast(
                    nextStatus === 'published'
                        ? 'Conteudo publicado.'
                        : 'Conteudo movido para rascunho.'
                );
                return;
            }

            if (action === 'delete') {
                const confirmed = window.confirm('Deseja excluir este conteudo?');
                if (!confirmed) {
                    return;
                }
                await request(`/content/${item.id}`, { method: 'DELETE' });
                if (String(el.contentForm.elements.content_id.value) === String(item.id)) {
                    clearContentForm();
                }
                await refreshContent();
                showToast('Conteudo excluido.');
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    // ── Cursor ────────────────────────────────────────────────────────────────
    function sanitizeCursorConfig(rawConfig) {
        const raw = rawConfig && typeof rawConfig === 'object' ? rawConfig : {};
        const toNumber = (value, fallback) => {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : fallback;
        };
        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

        return {
            scale: clamp(toNumber(raw.scale, 100), 50, 180),
            glow: clamp(toNumber(raw.glow, 9), 0, 60),
            tail_width: clamp(toNumber(raw.tail_width, 8), 4, 16),
            tail_length: clamp(toNumber(raw.tail_length, 13), 8, 30),
            smoke_size: clamp(toNumber(raw.smoke_size, 100), 60, 220),
            trail_density: clamp(toNumber(raw.trail_density, 100), 40, 220),
        };
    }

    function getCursorConfigFromStorage() {
        try {
            const stored = localStorage.getItem(ROCKET_CURSOR_CONFIG_KEY);
            if (!stored) {
                return sanitizeCursorConfig();
            }
            return sanitizeCursorConfig(JSON.parse(stored));
        } catch (_err) {
            return sanitizeCursorConfig();
        }
    }

    function saveCursorConfig(config) {
        const normalized = sanitizeCursorConfig(config);
        localStorage.setItem(ROCKET_CURSOR_CONFIG_KEY, JSON.stringify(normalized));
        window.dispatchEvent(
            new CustomEvent('idialog:rocket-config-updated', { detail: normalized })
        );
    }

    function renderCursorConfigPreview(config) {
        if (!el.cursorScaleValue) {
            return;
        }

        el.cursorScaleValue.textContent = `${config.scale}%`;
        el.cursorGlowValue.textContent = `${config.glow}%`;
        el.cursorTailWidthValue.textContent = `${config.tail_width}px`;
        el.cursorTailLengthValue.textContent = `${config.tail_length}px`;
        el.cursorSmokeSizeValue.textContent = `${config.smoke_size}%`;
        el.cursorTrailDensityValue.textContent = `${config.trail_density}%`;
    }

    function fillCursorForm(config) {
        if (!el.cursorForm) {
            return;
        }

        el.cursorScale.value = String(config.scale);
        el.cursorGlow.value = String(config.glow);
        el.cursorTailWidth.value = String(config.tail_width);
        el.cursorTailLength.value = String(config.tail_length);
        el.cursorSmokeSize.value = String(config.smoke_size);
        el.cursorTrailDensity.value = String(config.trail_density);
        renderCursorConfigPreview(config);
    }

    function getCursorConfigFromForm() {
        return sanitizeCursorConfig({
            scale: el.cursorScale.value,
            glow: el.cursorGlow.value,
            tail_width: el.cursorTailWidth.value,
            tail_length: el.cursorTailLength.value,
            smoke_size: el.cursorSmokeSize.value,
            trail_density: el.cursorTrailDensity.value,
        });
    }

    function handleCursorInput() {
        const config = getCursorConfigFromForm();
        renderCursorConfigPreview(config);
        saveCursorConfig(config);
    }

    function handleCursorSave(event) {
        event.preventDefault();
        const config = getCursorConfigFromForm();
        saveCursorConfig(config);
        showToast('Cursor atualizado com sucesso.');
    }

    function handleCursorReset() {
        const defaults = sanitizeCursorConfig();
        fillCursorForm(defaults);
        saveCursorConfig(defaults);
        showToast('Cursor restaurado para o padrao.');
    }

    // ── Tabs / Navigation ──────────────────────────────────────────────────
    function handleTabSwitch(event) {
        var trigger = event.target.closest('.admin-nav-item[data-tab]') || event.target.closest('[data-tab-go]');
        if (!trigger) return;
        var tabName = trigger.dataset.tab || trigger.dataset.tabGo;
        if (!tabName) return;
        switchToTab(tabName);
        closeSidebar();
    }

    function switchToTab(tabName) {
        document.querySelectorAll('.admin-nav-item').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        document.querySelectorAll('.admin-shell .tab-content').forEach(function (tab) {
            tab.classList.remove('active');
        });
        var tabContent = document.getElementById('tab-' + tabName);
        if (tabContent) tabContent.classList.add('active');
    }

    function openSidebar() {
        var sidebar = document.getElementById('admin-sidebar');
        var overlay = document.getElementById('admin-overlay');
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('open');
    }

    function closeSidebar() {
        var sidebar = document.getElementById('admin-sidebar');
        var overlay = document.getElementById('admin-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
    }

    // ── Widgets CRUD ──────────────────────────────────────────────────────────
    function syncWidgetFieldVisibility() {
        if (!el.widgetType || !el.widgetMediaFields || !el.widgetCodeFields) return;
        var isCode = el.widgetType.value === 'code';
        el.widgetMediaFields.hidden = isCode;
        el.widgetCodeFields.hidden = !isCode;
    }

    async function refreshWidgets() {
        try {
            var response = await request('/widgets', { method: 'GET' });
            state.widgets = response.widgets || [];
            renderWidgets();
        } catch (_err) {
            state.widgets = [];
        }
    }

    function renderWidgets() {
        if (!el.widgetsList) return;
        if (!state.widgets.length) {
            el.widgetsList.innerHTML = '<p>Nenhum widget cadastrado.</p>';
            return;
        }
        el.widgetsList.innerHTML = state.widgets.map(function (w) {
            var statusClass = w.is_active ? 'is-live' : 'is-paused';
            var statusLabel = w.is_active ? 'Ativo' : 'Inativo';
            var placementLabels = {
                top_banner: 'Banner superior',
                prefooter_banner: 'Banner rodape',
                content_square: 'Quadrado conteudo',
                sidebar_square: 'Quadrado lateral',
            };
            return '<div class="content-item" data-widget-id="' + w.id + '">' +
                '<div class="content-item-header">' +
                '<div>' +
                '<div class="content-item-title">' + escapeHtml(w.name) + '</div>' +
                '<div class="widget-item-meta">' +
                '<span class="widget-chip">' + escapeHtml(placementLabels[w.placement] || w.placement) + '</span>' +
                '<span class="widget-chip">' + escapeHtml(w.scope || 'all') + '</span>' +
                '<span class="widget-chip ' + statusClass + '">' + statusLabel + '</span>' +
                '</div></div>' +
                '<div class="plan-item-actions">' +
                '<button type="button" class="mini-btn" data-action="edit-widget">Editar</button>' +
                '<button type="button" class="mini-btn" data-action="delete-widget">Excluir</button>' +
                '</div></div></div>';
        }).join('');
    }

    function fillWidgetForm(widget) {
        if (!el.widgetForm || !widget) return;
        el.widgetForm.elements.widget_id.value = widget.id || '';
        el.widgetForm.elements.current_media_path.value = widget.media_path || '';
        el.widgetForm.elements.name.value = widget.name || '';
        el.widgetForm.elements.title.value = widget.title || '';
        el.widgetForm.elements.placement.value = widget.placement || 'top_banner';
        el.widgetForm.elements.scope.value = widget.scope || 'all';
        el.widgetForm.elements.widget_type.value = widget.widget_type || 'image';
        el.widgetForm.elements.display_order.value = widget.display_order || 0;
        el.widgetForm.elements.target_url.value = widget.target_url || '';
        el.widgetForm.elements.alt_text.value = widget.alt_text || '';
        el.widgetForm.elements.embed_code.value = widget.embed_code || '';
        el.widgetForm.elements.is_active.checked = widget.is_active !== false;
        if (widget.media_url && el.widgetPreview) {
            el.widgetPreview.src = widget.media_url;
            el.widgetPreview.hidden = false;
        } else if (el.widgetPreview) {
            el.widgetPreview.hidden = true;
        }
        syncWidgetFieldVisibility();
    }

    function clearWidgetForm() {
        if (!el.widgetForm) return;
        el.widgetForm.reset();
        el.widgetForm.elements.widget_id.value = '';
        el.widgetForm.elements.current_media_path.value = '';
        if (el.widgetPreview) {
            el.widgetPreview.hidden = true;
            el.widgetPreview.removeAttribute('src');
        }
        syncWidgetFieldVisibility();
    }

    async function handleWidgetSave(event) {
        event.preventDefault();
        var formData = new FormData(el.widgetForm);
        var widgetId = formData.get('widget_id');

        try {
            var uploadedMedia = null;
            if (el.widgetMediaFile && el.widgetMediaFile.files && el.widgetMediaFile.files.length) {
                var mediaPayload = new FormData();
                mediaPayload.append('media', el.widgetMediaFile.files[0]);
                uploadedMedia = await request('/widgets/media', { method: 'POST', body: mediaPayload });
            }

            var widgetType = formData.get('widget_type');
            var payload = {
                name: formData.get('name'),
                title: formData.get('title'),
                placement: formData.get('placement'),
                scope: formData.get('scope'),
                widget_type: widgetType,
                media_path: uploadedMedia && uploadedMedia.media_path ? uploadedMedia.media_path : formData.get('current_media_path'),
                target_url: formData.get('target_url'),
                alt_text: formData.get('alt_text'),
                embed_code: widgetType === 'code' ? formData.get('embed_code') : '',
                display_order: Number(formData.get('display_order') || 0),
                is_active: formData.get('is_active') === 'on',
            };

            if (widgetId) {
                await request('/widgets/' + widgetId, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Widget atualizado.');
            } else {
                await request('/widgets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Widget criado.');
            }

            clearWidgetForm();
            await refreshWidgets();
            populateKpis();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleWidgetActions(event) {
        var target = event.target;
        if (!(target instanceof HTMLButtonElement)) return;
        var action = target.dataset.action;
        if (!action) return;
        var wrapper = target.closest('[data-widget-id]');
        if (!wrapper) return;
        var widgetId = wrapper.getAttribute('data-widget-id');
        var widget = state.widgets.find(function (w) { return String(w.id) === String(widgetId); });
        if (!widget) return;

        try {
            if (action === 'edit-widget') {
                fillWidgetForm(widget);
                showToast('Widget carregado para edicao.');
                return;
            }
            if (action === 'delete-widget') {
                if (!window.confirm('Excluir este widget?')) return;
                await request('/widgets/' + widget.id, { method: 'DELETE' });
                clearWidgetForm();
                await refreshWidgets();
                populateKpis();
                showToast('Widget excluido.');
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    // ── API Auto-detect ───────────────────────────────────────────────────────
    async function autoDetectApi() {
        var detected = localStorage.getItem('idialog-tools-api');
        if (detected && detected !== '/api') {
            state.apiBase = detected;
            localStorage.setItem(ADMIN_API_KEY, detected);
        }
        try {
            var resp = await fetch(state.apiBase + '/health', { method: 'GET' });
            if (resp.ok) return;
        } catch (_) { }
        showToast('Servidor nao respondeu. Verifique se o backend esta online.', true);
    }

    // ── Widgets CRUD ──────────────────────────────────────────────────────────
    function syncWidgetFieldVisibility() {
        if (!el.widgetType || !el.widgetMediaFields || !el.widgetCodeFields) return;
        var isCode = el.widgetType.value === 'code';
        el.widgetMediaFields.hidden = isCode;
        el.widgetCodeFields.hidden = !isCode;
    }

    async function refreshWidgets() {
        try {
            var response = await request('/widgets', { method: 'GET' });
            state.widgets = response.widgets || [];
            renderWidgets();
        } catch (_err) {
            state.widgets = [];
        }
    }

    function renderWidgets() {
        if (!el.widgetsList) return;
        if (!state.widgets.length) {
            el.widgetsList.innerHTML = '<p>Nenhum widget cadastrado.</p>';
            return;
        }
        el.widgetsList.innerHTML = state.widgets.map(function (w) {
            var statusClass = w.is_active ? 'is-live' : 'is-paused';
            var statusLabel = w.is_active ? 'Ativo' : 'Inativo';
            var placementLabels = {
                top_banner: 'Banner superior',
                prefooter_banner: 'Banner rodape',
                content_square: 'Quadrado conteudo',
                sidebar_square: 'Quadrado lateral',
            };
            return '<div class="content-item" data-widget-id="' + w.id + '">' +
                '<div class="content-item-header">' +
                '<div>' +
                '<div class="content-item-title">' + escapeHtml(w.name) + '</div>' +
                '<div class="widget-item-meta">' +
                '<span class="widget-chip">' + escapeHtml(placementLabels[w.placement] || w.placement) + '</span>' +
                '<span class="widget-chip">' + escapeHtml(w.scope || 'all') + '</span>' +
                '<span class="widget-chip ' + statusClass + '">' + statusLabel + '</span>' +
                '</div></div>' +
                '<div class="plan-item-actions">' +
                '<button type="button" class="mini-btn" data-action="edit-widget">Editar</button>' +
                '<button type="button" class="mini-btn" data-action="delete-widget">Excluir</button>' +
                '</div></div></div>';
        }).join('');
    }

    function fillWidgetForm(widget) {
        if (!el.widgetForm || !widget) return;
        el.widgetForm.elements.widget_id.value = widget.id || '';
        el.widgetForm.elements.current_media_path.value = widget.media_path || '';
        el.widgetForm.elements.name.value = widget.name || '';
        el.widgetForm.elements.title.value = widget.title || '';
        el.widgetForm.elements.placement.value = widget.placement || 'top_banner';
        el.widgetForm.elements.scope.value = widget.scope || 'all';
        el.widgetForm.elements.widget_type.value = widget.widget_type || 'image';
        el.widgetForm.elements.display_order.value = widget.display_order || 0;
        el.widgetForm.elements.target_url.value = widget.target_url || '';
        el.widgetForm.elements.alt_text.value = widget.alt_text || '';
        el.widgetForm.elements.embed_code.value = widget.embed_code || '';
        el.widgetForm.elements.is_active.checked = widget.is_active !== false;
        if (widget.media_url && el.widgetPreview) {
            el.widgetPreview.src = widget.media_url;
            el.widgetPreview.hidden = false;
        } else if (el.widgetPreview) {
            el.widgetPreview.hidden = true;
        }
        syncWidgetFieldVisibility();
    }

    function clearWidgetForm() {
        if (!el.widgetForm) return;
        el.widgetForm.reset();
        el.widgetForm.elements.widget_id.value = '';
        el.widgetForm.elements.current_media_path.value = '';
        if (el.widgetPreview) {
            el.widgetPreview.hidden = true;
            el.widgetPreview.removeAttribute('src');
        }
        syncWidgetFieldVisibility();
    }

    async function handleWidgetSave(event) {
        event.preventDefault();
        var formData = new FormData(el.widgetForm);
        var widgetId = formData.get('widget_id');

        try {
            var uploadedMedia = null;
            if (el.widgetMediaFile && el.widgetMediaFile.files && el.widgetMediaFile.files.length) {
                var mediaPayload = new FormData();
                mediaPayload.append('media', el.widgetMediaFile.files[0]);
                uploadedMedia = await request('/widgets/media', { method: 'POST', body: mediaPayload });
            }

            var widgetType = formData.get('widget_type');
            var payload = {
                name: formData.get('name'),
                title: formData.get('title'),
                placement: formData.get('placement'),
                scope: formData.get('scope'),
                widget_type: widgetType,
                media_path: uploadedMedia && uploadedMedia.media_path ? uploadedMedia.media_path : formData.get('current_media_path'),
                target_url: formData.get('target_url'),
                alt_text: formData.get('alt_text'),
                embed_code: widgetType === 'code' ? formData.get('embed_code') : '',
                display_order: Number(formData.get('display_order') || 0),
                is_active: formData.get('is_active') === 'on',
            };

            if (widgetId) {
                await request('/widgets/' + widgetId, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Widget atualizado.');
            } else {
                await request('/widgets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                showToast('Widget criado.');
            }

            clearWidgetForm();
            await refreshWidgets();
            populateKpis();
        } catch (error) {
            showToast(error.message, true);
        }
    }

    async function handleWidgetActions(event) {
        var target = event.target;
        if (!(target instanceof HTMLButtonElement)) return;
        var action = target.dataset.action;
        if (!action) return;
        var wrapper = target.closest('[data-widget-id]');
        if (!wrapper) return;
        var widgetId = wrapper.getAttribute('data-widget-id');
        var widget = state.widgets.find(function (w) { return String(w.id) === String(widgetId); });
        if (!widget) return;

        try {
            if (action === 'edit-widget') {
                fillWidgetForm(widget);
                showToast('Widget carregado para edicao.');
                return;
            }
            if (action === 'delete-widget') {
                if (!window.confirm('Excluir este widget?')) return;
                await request('/widgets/' + widget.id, { method: 'DELETE' });
                clearWidgetForm();
                await refreshWidgets();
                populateKpis();
                showToast('Widget excluido.');
            }
        } catch (error) {
            showToast(error.message, true);
        }
    }

    // ── API Auto-detect ───────────────────────────────────────────────────────
    async function autoDetectApi() {
        var detected = localStorage.getItem('idialog-tools-api');
        if (detected && detected !== '/api') {
            state.apiBase = detected;
            localStorage.setItem(ADMIN_API_KEY, detected);
        }
        try {
            var resp = await fetch(state.apiBase + '/health', { method: 'GET' });
            if (resp.ok) return;
        } catch (_) { }
        showToast('Servidor nao respondeu. Verifique se o backend esta online.', true);
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────────
    function bindEvents() {
        if (el.loginForm) {
            el.loginForm.addEventListener('submit', handleLogin);
        }
        if (el.logoutBtn) {
            el.logoutBtn.addEventListener('click', handleLogout);
        }
        if (el.contentForm) {
            el.contentForm.addEventListener('submit', handleContentSave);
        }
        if (el.contentReset) {
            el.contentReset.addEventListener('click', clearContentForm);
        }
        if (el.contentList) {
            el.contentList.addEventListener('click', handleContentActions);
        }
        if (el.scheduledList) {
            el.scheduledList.addEventListener('click', handleContentActions);
        }
        if (el.contentType) {
            el.contentType.addEventListener('change', syncContentFieldVisibility);
        }
        if (el.contentTitle) {
            el.contentTitle.addEventListener('input', () => {
                if (!el.contentSlug.dataset.manual || el.contentSlug.dataset.manual !== 'true') {
                    el.contentSlug.value = slugify(el.contentTitle.value);
                }
            });
        }
        if (el.contentSlug) {
            el.contentSlug.addEventListener('input', () => {
                el.contentSlug.dataset.manual = el.contentSlug.value ? 'true' : '';
                el.contentSlug.value = slugify(el.contentSlug.value);
            });
        }
        // Cover preview on file select
        if (el.contentCoverFile) {
            el.contentCoverFile.addEventListener('change', function () {
                if (el.contentCoverFile.files && el.contentCoverFile.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        setContentCoverPreview(e.target.result, 'Preview');
                    };
                    reader.readAsDataURL(el.contentCoverFile.files[0]);
                }
            });
        }

        // Widget events
        if (el.widgetForm) {
            el.widgetForm.addEventListener('submit', handleWidgetSave);
        }
        if (el.widgetReset) {
            el.widgetReset.addEventListener('click', clearWidgetForm);
        }
        if (el.widgetsList) {
            el.widgetsList.addEventListener('click', handleWidgetActions);
        }
        if (el.widgetType) {
            el.widgetType.addEventListener('change', syncWidgetFieldVisibility);
        }

        // Cursor events
        if (el.cursorForm) {
            el.cursorForm.addEventListener('submit', handleCursorSave);
        }
        if (el.cursorReset) {
            el.cursorReset.addEventListener('click', handleCursorReset);
        }

        [
            el.cursorScale,
            el.cursorGlow,
            el.cursorTailWidth,
            el.cursorTailLength,
            el.cursorSmokeSize,
            el.cursorTrailDensity,
        ].forEach(input => {
            if (input) {
                input.addEventListener('input', handleCursorInput);
            }
        });

        // Sidebar navigation
        document.querySelectorAll('.admin-nav-item[data-tab]').forEach(btn => {
            btn.addEventListener('click', handleTabSwitch);
        });
        // Quick cards on dashboard
        document.querySelectorAll('[data-tab-go]').forEach(card => {
            card.addEventListener('click', handleTabSwitch);
        });
        // Sidebar mobile toggle
        var sidebarToggle = document.getElementById('admin-sidebar-toggle');
        if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
        var adminOverlay = document.getElementById('admin-overlay');
        if (adminOverlay) adminOverlay.addEventListener('click', closeSidebar);
        // Mobile logout
        var logoutMobile = document.getElementById('logout-btn-mobile');
        if (logoutMobile) logoutMobile.addEventListener('click', handleLogout);
    }

    function init() {
        syncContentFieldVisibility();
        syncWidgetFieldVisibility();
        fillCursorForm(getCursorConfigFromStorage());
        startClockTick();
        bindEvents();
        autoDetectApi();
        restoreSession();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
