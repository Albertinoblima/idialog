// ===========================
// Auto-detecção da URL da API
// ===========================
(function () {
    /*
     * URL do backend Railway — atualize com a URL real do seu serviço.
     * Formato: https://<nome-do-servico>-production.up.railway.app
     * Para encontrar: Railway Dashboard → seu projeto → Settings → Domains
     */
    var RAILWAY_URL = 'https://idialog-production.up.railway.app';

    var saved = localStorage.getItem('idialog-tools-api');
    // Se o usuário configurou manualmente uma URL completa, mantém
    if (saved && saved !== '/api' && saved.startsWith('http')) return;

    var host = location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
        localStorage.setItem('idialog-tools-api', '/api');
    } else {
        localStorage.setItem('idialog-tools-api', RAILWAY_URL + '/api');
    }
})();

// ===========================
// Inicialização no DOM pronto (imagens inline)
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    initGlobalAccessibility();
    initClickableImages();
    initRocketCursor();
    scheduleAdWidgetsInit();
});

// ===========================
// Inicialização (após componentes carregados)
// ===========================
document.addEventListener('components:ready', function () {
    initGlobalAccessibility();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initHeaderScroll();
    scheduleAdWidgetsInit();
});

const A11Y_FONT_SCALES = [100, 108, 116];
const A11Y_STORAGE_KEYS = {
    fontScale: 'idialog-a11y-font-scale',
    contrast: 'idialog-a11y-contrast',
};
const A11Y_VOICE_PATTERNS = [
    /microsoft.*(antonio|francisca|brenda|humberto|leticia)/i,
    /google.*portugu[eê]s.*brasil/i,
    /(natural|neural|premium|online)/i,
];

const a11ySpeechState = {
    synth: window.speechSynthesis || null,
    voice: null,
    utterance: null,
    token: 0,
    mode: 'idle',
};

const vlibrasState = {
    loading: false,
    loadingPromise: null,
    loaded: false,
    active: false,
    error: false,
};

const adWidgetsState = {
    loading: false,
};

function getAdWidgetsContext() {
    const path = (window.location.pathname || '').toLowerCase();
    if (path.includes('/pages/ferramentas/')) {
        return '';
    }
    if (path.includes('/pages/blog/')) {
        return 'blog';
    }
    if (path.includes('/pages/revista_concurso/')) {
        return 'revista';
    }
    return 'site';
}

function getAdWidgetsApiBase() {
    const saved = localStorage.getItem('idialog-tools-api') || '/api';
    return saved.replace(/\/$/, '');
}

function scheduleAdWidgetsInit() {
    if (!getAdWidgetsContext()) {
        return;
    }

    window.clearTimeout(scheduleAdWidgetsInit._timer);
    scheduleAdWidgetsInit._timer = window.setTimeout(() => {
        initAdWidgets();
    }, 140);
}

async function initAdWidgets() {
    const context = getAdWidgetsContext();
    if (!context || adWidgetsState.loading) {
        return;
    }

    adWidgetsState.loading = true;

    try {
        const response = await fetch(`${getAdWidgetsApiBase()}/public/widgets?context=${encodeURIComponent(context)}`);
        if (!response.ok) {
            throw new Error(`Erro ${response.status}`);
        }

        const data = await response.json();
        renderAdWidgets(data.placements || {}, context);
    } catch (error) {
        clearAdWidgetSlots();
    } finally {
        adWidgetsState.loading = false;
    }
}

function clearAdWidgetSlots() {
    document.querySelectorAll('[data-idialog-ad-slot], [data-idialog-ad-sidebar]').forEach(node => {
        node.remove();
    });
}

function renderAdWidgets(placements, context) {
    clearAdWidgetSlots();

    const topBanner = createAdBand('top_banner', placements.top_banner || [], 'banner');
    const prefooterBanner = createAdBand('prefooter_banner', placements.prefooter_banner || [], 'banner');
    const contentSquares = (context === 'blog' || context === 'revista')
        ? createAdBand('content_square', (placements.content_square || []).slice(0, 3), 'square-grid')
        : null;
    const sidebarSquare = (context === 'blog' || context === 'revista')
        ? createAdBand('sidebar_square', (placements.sidebar_square || []).slice(0, 1), 'sidebar')
        : null;

    const headerAnchor = document.getElementById('header-placeholder') || document.querySelector('header');
    const footerAnchor = document.getElementById('footer-placeholder') || document.querySelector('footer');
    const mainElement = document.querySelector('main');

    if (topBanner) {
        if (headerAnchor && headerAnchor.parentNode) {
            headerAnchor.insertAdjacentElement('afterend', topBanner);
        } else if (mainElement) {
            mainElement.insertAdjacentElement('afterbegin', topBanner);
        }
    }

    if (contentSquares) {
        if (footerAnchor && footerAnchor.parentNode) {
            footerAnchor.insertAdjacentElement('beforebegin', contentSquares);
        } else if (mainElement) {
            mainElement.insertAdjacentElement('beforeend', contentSquares);
        }
    }

    if (prefooterBanner) {
        if (footerAnchor && footerAnchor.parentNode) {
            footerAnchor.insertAdjacentElement('beforebegin', prefooterBanner);
        } else if (mainElement) {
            mainElement.insertAdjacentElement('beforeend', prefooterBanner);
        }
    }

    if (sidebarSquare && document.body) {
        document.body.appendChild(sidebarSquare);
    }
}

function createAdBand(placement, widgets, variant) {
    if (!widgets.length) {
        return null;
    }

    const section = document.createElement('section');
    section.className = `idialog-ad-slot idialog-ad-slot-${placement} ${variant === 'sidebar' ? 'is-sidebar' : ''}`;
    section.setAttribute('data-idialog-ad-slot', placement);
    if (variant === 'sidebar') {
        section.setAttribute('data-idialog-ad-sidebar', placement);
    }

    const container = document.createElement('div');
    container.className = variant === 'sidebar' ? 'idialog-ad-sidebar-shell' : 'container';

    const frame = document.createElement('div');
    frame.className = `idialog-ad-frame is-${variant}`;

    const label = document.createElement('div');
    label.className = 'idialog-ad-label';
    label.textContent = 'Publicidade';
    frame.appendChild(label);

    const rail = document.createElement('div');
    rail.className = variant === 'square-grid' ? 'idialog-ad-grid' : 'idialog-ad-rail';

    widgets.forEach(widget => {
        rail.appendChild(createAdWidgetCard(widget, variant));
    });

    frame.appendChild(rail);
    container.appendChild(frame);
    section.appendChild(container);
    return section;
}

function createAdWidgetCard(widget, variant) {
    const wrapper = document.createElement('article');
    wrapper.className = `idialog-ad-card ${variant === 'square-grid' || variant === 'sidebar' ? 'is-square' : 'is-banner'}`;

    const title = document.createElement('div');
    title.className = 'idialog-ad-title';
    title.textContent = widget.title || 'Publicidade iDialog';
    wrapper.appendChild(title);

    const body = document.createElement('div');
    body.className = 'idialog-ad-body';

    if (widget.widget_type === 'code' && widget.embed_code) {
        body.innerHTML = widget.embed_code;
    } else {
        const media = document.createElement('img');
        media.className = 'idialog-ad-media';
        media.src = widget.media_url;
        media.alt = widget.alt_text || widget.title || 'Publicidade';
        media.loading = 'lazy';

        if (widget.target_url) {
            const anchor = document.createElement('a');
            anchor.href = widget.target_url;
            anchor.target = '_blank';
            anchor.rel = 'noopener sponsored';
            anchor.appendChild(media);
            body.appendChild(anchor);
        } else {
            body.appendChild(media);
        }
    }

    wrapper.appendChild(body);
    return wrapper;
}

// ===========================
// Global Accessibility Standard
// ===========================
function initGlobalAccessibility() {
    ensureAccessibilityStyles();
    ensureDocumentLanguage();
    ensureMainLandmark();
    ensureSkipLink();
    ensureNotificationLiveRegion();
    applySavedAccessibilityPreferences();
    initAccessibilityToolbar();
    labelIconOnlyControls();
    syncAccessibilityToolbarState();
}

function ensureAccessibilityStyles() {
    if (document.getElementById('idialog-a11y-style')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'idialog-a11y-style';
    style.textContent = `
        .a11y-skip-link {
            position: fixed;
            top: 12px;
            left: 12px;
            z-index: 2147483600;
            padding: 10px 14px;
            border-radius: 10px;
            background: rgba(10, 15, 28, 0.96);
            color: #f5fbff;
            border: 1px solid rgba(0, 229, 255, 0.45);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.01em;
            text-decoration: none;
            transform: translateY(-180%);
            transition: transform 0.2s ease;
        }

        .a11y-skip-link:focus,
        .a11y-skip-link:focus-visible {
            transform: translateY(0);
            outline: 2px solid #00e5ff;
            outline-offset: 2px;
        }

        :focus-visible {
            outline: 2px solid rgba(0, 229, 255, 0.92);
            outline-offset: 2px;
        }

        .sr-only-live {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
        }
    `;

    document.head.appendChild(style);
}

function ensureDocumentLanguage() {
    const html = document.documentElement;
    if (!html.getAttribute('lang')) {
        html.setAttribute('lang', 'pt-BR');
    }
}

function ensureMainLandmark() {
    const main = document.querySelector('main')
        || document.querySelector('.main-content')
        || document.querySelector('#main-content')
        || document.querySelector('#app')
        || document.querySelector('#sim-body')
        || document.querySelector('#view-study')
        || document.querySelector('#view-dashboard')
        || document.querySelector('#view-landing');
    if (!main) {
        return;
    }

    if (!main.id) {
        main.id = 'main-content';
    }

    if (!main.hasAttribute('tabindex')) {
        main.setAttribute('tabindex', '-1');
    }
}

function ensureSkipLink() {
    const target = document.querySelector('main')
        || document.querySelector('#main-content')
        || document.querySelector('.main-content')
        || document.querySelector('#app')
        || document.querySelector('#sim-body')
        || document.querySelector('#view-study')
        || document.querySelector('#view-dashboard')
        || document.querySelector('#view-landing');
    if (!target || document.querySelector('.a11y-skip-link')) {
        return;
    }

    if (!target.id) {
        target.id = 'main-content';
    }

    const skip = document.createElement('a');
    skip.className = 'a11y-skip-link';
    skip.href = `#${target.id}`;
    skip.textContent = 'Ir para o conteudo principal';
    document.body.insertBefore(skip, document.body.firstChild);
}

function ensureNotificationLiveRegion() {
    if (document.getElementById('a11y-live-region')) {
        return;
    }

    const region = document.createElement('div');
    region.id = 'a11y-live-region';
    region.className = 'sr-only-live';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    document.body.appendChild(region);
}

function announceForAssistiveTech(message) {
    if (!message) {
        return;
    }

    const region = document.getElementById('a11y-live-region');
    if (!region) {
        return;
    }

    region.textContent = '';
    window.setTimeout(() => {
        region.textContent = message;
    }, 20);
}

function labelIconOnlyControls() {
    const iconMap = {
        facebook: 'Facebook',
        instagram: 'Instagram',
        linkedin: 'LinkedIn',
        whatsapp: 'WhatsApp',
        youtube: 'YouTube',
        github: 'GitHub',
        gear: 'Configuracoes',
        gauge: 'Dashboard',
        camera: 'Adicionar foto',
        'book-open': 'Abrir conteudo',
        play: 'Iniciar',
        xmark: 'Fechar',
        bars: 'Abrir menu',
        'arrow-up': 'Voltar ao topo',
    };

    const controls = document.querySelectorAll('a, button');
    controls.forEach(control => {
        if (control.getAttribute('aria-label') || control.getAttribute('aria-labelledby')) {
            return;
        }

        const text = (control.textContent || '').replace(/\s+/g, ' ').trim();
        if (text) {
            return;
        }

        const icon = control.querySelector('i[class*="fa-"]');
        if (!icon) {
            return;
        }

        const className = icon.className || '';
        const hit = Object.keys(iconMap).find(key => className.includes(`fa-${key}`));
        if (hit) {
            control.setAttribute('aria-label', iconMap[hit]);
        }
    });
}

function applySavedAccessibilityPreferences() {
    applyStoredFontScale();
    applyStoredContrast();
}

function applyStoredFontScale() {
    let storedScale = 100;

    try {
        const saved = parseInt(localStorage.getItem(A11Y_STORAGE_KEYS.fontScale), 10);
        if (A11Y_FONT_SCALES.includes(saved)) {
            storedScale = saved;
        }
    } catch (error) {
        storedScale = 100;
    }

    document.documentElement.style.fontSize = storedScale === 100 ? '' : `${storedScale}%`;
    document.documentElement.setAttribute('data-a11y-font-scale', String(storedScale));
}

function applyStoredContrast() {
    let enabled = false;

    try {
        enabled = localStorage.getItem(A11Y_STORAGE_KEYS.contrast) === 'high';
    } catch (error) {
        enabled = false;
    }

    document.documentElement.classList.toggle('a11y-high-contrast', enabled);
    document.documentElement.setAttribute('data-a11y-contrast', enabled ? 'high' : 'default');
}

function initAccessibilityToolbar() {
    if (document.getElementById('a11y-toolbar')) {
        return;
    }

    const toolbar = document.createElement('div');
    toolbar.id = 'a11y-toolbar';
    toolbar.className = 'a11y-toolbar';
    toolbar.innerHTML = `
        <button
            id="a11y-toggle"
            class="a11y-toggle"
            type="button"
            aria-label="Abrir assistente de acessibilidade"
            aria-controls="a11y-panel"
            aria-expanded="false"
        >
            <img class="a11y-toggle-image" src="/public/images/a11y/assistente-matrix.png" alt="" aria-hidden="true">
        </button>

        <button
            id="a11y-vlibras-fab"
            class="a11y-fab a11y-fab-vlibras"
            type="button"
            aria-label="Ativar VLibras oficial"
            title="VLibras oficial"
        >
            <img class="a11y-fab-image" src="/public/images/a11y/vlibras.png" alt="" aria-hidden="true">
        </button>

        <section id="a11y-panel" class="a11y-panel" aria-label="Controles de acessibilidade" hidden>
            <div class="a11y-panel-header">
                <div>
                    <p class="a11y-eyebrow">Assistente Matrix</p>
                    <h2 class="a11y-panel-title">Leitura, contraste e Libras</h2>
                </div>
                <button type="button" class="a11y-close" id="a11y-close" aria-label="Fechar controles de acessibilidade">×</button>
            </div>

            <div class="a11y-group">
                <p class="a11y-group-title">Tamanho do texto</p>
                <div class="a11y-segmented" role="group" aria-label="Tamanho do texto">
                    <button type="button" class="a11y-chip" data-a11y-font="100">Padrão</button>
                    <button type="button" class="a11y-chip" data-a11y-font="108">Maior</button>
                    <button type="button" class="a11y-chip" data-a11y-font="116">Grande</button>
                </div>
            </div>

            <div class="a11y-group">
                <div class="a11y-inline-row">
                    <div>
                        <p class="a11y-group-title">Contraste</p>
                        <p class="a11y-helper">Realce sutil para leitura e foco.</p>
                    </div>
                    <button type="button" class="a11y-switch" id="a11y-contrast-toggle" aria-pressed="false">Ativar</button>
                </div>
            </div>

            <div class="a11y-group">
                <p class="a11y-group-title">Narração da página</p>
                <div class="a11y-actions" role="group" aria-label="Narração da página">
                    <button type="button" class="a11y-action-btn" id="a11y-read-toggle">Narrar</button>
                    <button type="button" class="a11y-action-btn" id="a11y-pause-toggle">Pausar</button>
                    <button type="button" class="a11y-action-btn" id="a11y-stop-toggle">Parar</button>
                </div>
                <p class="a11y-status" id="a11y-read-status">Pronto para narrar o conteúdo principal.</p>
            </div>
        </section>
    `;

    document.body.appendChild(toolbar);
    bindAccessibilityToolbarEvents(toolbar);
    resolveAccessibilityVoice();

    if (a11ySpeechState.synth && typeof a11ySpeechState.synth.addEventListener === 'function') {
        a11ySpeechState.synth.addEventListener('voiceschanged', resolveAccessibilityVoice, { once: true });
    }
}

function bindAccessibilityToolbarEvents(toolbar) {
    const toggleButton = toolbar.querySelector('#a11y-toggle');
    const closeButton = toolbar.querySelector('#a11y-close');
    const contrastButton = toolbar.querySelector('#a11y-contrast-toggle');
    const readButton = toolbar.querySelector('#a11y-read-toggle');
    const pauseButton = toolbar.querySelector('#a11y-pause-toggle');
    const stopButton = toolbar.querySelector('#a11y-stop-toggle');
    const vlibrasFab = toolbar.querySelector('#a11y-vlibras-fab');
    const fontButtons = toolbar.querySelectorAll('[data-a11y-font]');

    toggleButton.addEventListener('click', function () {
        setAccessibilityToolbarOpen(!toolbar.classList.contains('open'));
    });

    closeButton.addEventListener('click', function () {
        setAccessibilityToolbarOpen(false);
        toggleButton.focus();
    });

    contrastButton.addEventListener('click', function () {
        toggleHighContrast();
    });

    readButton.addEventListener('click', function () {
        togglePageNarration();
    });

    pauseButton.addEventListener('click', function () {
        togglePauseNarration();
    });

    stopButton.addEventListener('click', function () {
        stopPageNarration();
    });

    vlibrasFab.addEventListener('click', function () {
        toggleOfficialLibras();
    });

    fontButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const scale = parseInt(button.getAttribute('data-a11y-font'), 10);
            if (A11Y_FONT_SCALES.includes(scale)) {
                setFontScale(scale);
            }
        });
    });

    document.addEventListener('click', function (event) {
        if (!toolbar.classList.contains('open')) {
            return;
        }

        if (!toolbar.contains(event.target)) {
            setAccessibilityToolbarOpen(false);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') {
            return;
        }

        if (toolbar.classList.contains('open')) {
            setAccessibilityToolbarOpen(false);
            toggleButton.focus();
        }
    });
}

function setAccessibilityToolbarOpen(isOpen) {
    const toolbar = document.getElementById('a11y-toolbar');
    const panel = document.getElementById('a11y-panel');
    const toggleButton = document.getElementById('a11y-toggle');

    if (!toolbar || !panel || !toggleButton) {
        return;
    }

    toolbar.classList.toggle('open', isOpen);
    panel.hidden = !isOpen;
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function setFontScale(scale) {
    document.documentElement.style.fontSize = scale === 100 ? '' : `${scale}%`;
    document.documentElement.setAttribute('data-a11y-font-scale', String(scale));

    try {
        localStorage.setItem(A11Y_STORAGE_KEYS.fontScale, String(scale));
    } catch (error) {
        // Ignore storage failures.
    }

    syncAccessibilityToolbarState();
    announceForAssistiveTech(`Tamanho do texto ajustado para ${scale === 100 ? 'padrao' : scale === 108 ? 'maior' : 'grande'}.`);
}

function toggleHighContrast() {
    const enabled = !document.documentElement.classList.contains('a11y-high-contrast');
    document.documentElement.classList.toggle('a11y-high-contrast', enabled);
    document.documentElement.setAttribute('data-a11y-contrast', enabled ? 'high' : 'default');

    try {
        localStorage.setItem(A11Y_STORAGE_KEYS.contrast, enabled ? 'high' : 'default');
    } catch (error) {
        // Ignore storage failures.
    }

    syncAccessibilityToolbarState();
    announceForAssistiveTech(enabled ? 'Contraste reforcado ativado.' : 'Contraste reforcado desativado.');
}

function syncAccessibilityToolbarState() {
    const toolbar = document.getElementById('a11y-toolbar');
    if (!toolbar) {
        return;
    }

    const activeScale = parseInt(document.documentElement.getAttribute('data-a11y-font-scale') || '100', 10);
    toolbar.querySelectorAll('[data-a11y-font]').forEach(function (button) {
        const buttonScale = parseInt(button.getAttribute('data-a11y-font'), 10);
        button.classList.toggle('active', buttonScale === activeScale);
        button.setAttribute('aria-pressed', buttonScale === activeScale ? 'true' : 'false');
    });

    const contrastEnabled = document.documentElement.classList.contains('a11y-high-contrast');
    const contrastButton = toolbar.querySelector('#a11y-contrast-toggle');
    if (contrastButton) {
        contrastButton.classList.toggle('active', contrastEnabled);
        contrastButton.setAttribute('aria-pressed', contrastEnabled ? 'true' : 'false');
        contrastButton.textContent = contrastEnabled ? 'Ativado' : 'Ativar';
    }

    syncNarrationButtons();
    syncOfficialLibrasButtonState();
}

function syncOfficialLibrasButtonState() {
    const button = document.getElementById('a11y-vlibras-fab');
    if (!button) {
        return;
    }

    button.classList.toggle('active', vlibrasState.active);
    button.setAttribute('aria-pressed', vlibrasState.active ? 'true' : 'false');

    if (vlibrasState.loading) {
        button.classList.add('loading');
        button.disabled = true;
        button.setAttribute('aria-label', 'Carregando VLibras oficial');
        button.setAttribute('title', 'Carregando VLibras oficial');
        return;
    }

    button.classList.remove('loading');
    button.disabled = false;
    button.setAttribute('aria-label', vlibrasState.active ? 'Desativar VLibras oficial' : 'Ativar VLibras oficial');
    button.setAttribute('title', vlibrasState.active ? 'Desativar VLibras oficial' : 'Ativar VLibras oficial');

    if (vlibrasState.error && !vlibrasState.active) {
        announceForAssistiveTech('Nao foi possivel carregar o VLibras nesta rede ou navegador.');
    }
}

function getOrCreateVLibrasHost() {
    let host = document.querySelector('[data-a11y-vlibras-host="true"]');
    if (host) {
        return host;
    }

    host = document.createElement('div');
    host.setAttribute('data-a11y-vlibras-host', 'true');
    host.setAttribute('vw', '');
    host.className = 'enabled a11y-vlibras-host';
    host.innerHTML = `
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
            <div class="vw-plugin-top-wrapper"></div>
        </div>
    `;
    document.body.appendChild(host);
    return host;
}

function setVLibrasVisualState(isActive) {
    document.documentElement.classList.toggle('a11y-vlibras-active', Boolean(isActive));
}

function ensureVLibrasLoaded() {
    if (vlibrasState.loaded || (window.VLibras && window.VLibras.Widget)) {
        vlibrasState.loaded = true;
        return Promise.resolve();
    }

    if (vlibrasState.loading) {
        return vlibrasState.loadingPromise || Promise.resolve();
    }

    vlibrasState.loading = true;
    vlibrasState.error = false;
    syncOfficialLibrasButtonState();

    vlibrasState.loadingPromise = new Promise(function (resolve, reject) {
        const existing = document.querySelector('script[data-a11y-vlibras-script="true"]');
        if (existing) {
            existing.addEventListener('load', function () {
                vlibrasState.loaded = true;
                vlibrasState.loading = false;
                vlibrasState.loadingPromise = null;
                resolve();
            }, { once: true });
            existing.addEventListener('error', function () {
                vlibrasState.loading = false;
                vlibrasState.loadingPromise = null;
                vlibrasState.error = true;
                reject(new Error('Falha ao carregar script VLibras.'));
            }, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.async = true;
        script.setAttribute('data-a11y-vlibras-script', 'true');
        script.onload = function () {
            vlibrasState.loaded = true;
            vlibrasState.loading = false;
            vlibrasState.loadingPromise = null;
            resolve();
        };
        script.onerror = function () {
            vlibrasState.loading = false;
            vlibrasState.loadingPromise = null;
            vlibrasState.error = true;
            reject(new Error('Falha ao carregar script VLibras.'));
        };
        document.body.appendChild(script);
    });

    return vlibrasState.loadingPromise;
}

function tryOpenVLibrasUI() {
    const candidates = [
        '[vw-access-button]',
        '.vw-access-button',
        '[vw] [vw-access-button]',
    ];

    for (let index = 0; index < candidates.length; index += 1) {
        const element = document.querySelector(candidates[index]);
        if (element && typeof element.click === 'function') {
            element.click();
            return true;
        }
    }

    return false;
}

function openVLibrasWithRetries() {
    let attempts = 0;
    const maxAttempts = 8;

    function tick() {
        if (tryOpenVLibrasUI()) {
            return;
        }

        attempts += 1;
        if (attempts >= maxAttempts) {
            announceForAssistiveTech('VLibras carregado, mas o botao nao respondeu neste ambiente local.');
            return;
        }

        window.setTimeout(tick, 220);
    }

    window.setTimeout(tick, 180);
}

function toggleOfficialLibras() {
    if (vlibrasState.active) {
        vlibrasState.active = false;
        setVLibrasVisualState(false);
        syncOfficialLibrasButtonState();
        announceForAssistiveTech('VLibras desativado.');
        return;
    }

    ensureVLibrasLoaded().then(function () {
        const host = getOrCreateVLibrasHost();
        setVLibrasVisualState(true);

        if (!host.getAttribute('data-vlibras-initialized')) {
            if (!window.VLibras || !window.VLibras.Widget) {
                throw new Error('VLibras indisponível após carregamento.');
            }

            new window.VLibras.Widget('https://vlibras.gov.br/app');
            host.setAttribute('data-vlibras-initialized', 'true');
        }

        vlibrasState.active = true;
        vlibrasState.error = false;
        syncOfficialLibrasButtonState();
        announceForAssistiveTech('VLibras oficial ativado.');
        openVLibrasWithRetries();
    }).catch(function () {
        vlibrasState.active = false;
        setVLibrasVisualState(false);
        vlibrasState.error = true;
        syncOfficialLibrasButtonState();
        announceForAssistiveTech('Nao foi possivel ativar o VLibras neste momento. Se estiver local e sem internet, isso e esperado.');
    });
}

function togglePageNarration() {
    const synth = a11ySpeechState.synth;
    if (!synth) {
        updateNarrationStatus('Narração indisponível neste navegador.');
        return;
    }

    const readButton = document.getElementById('a11y-read-toggle');
    const isPlaying = readButton && readButton.getAttribute('data-state') === 'playing';
    if (isPlaying) {
        stopPageNarration();
        return;
    }

    const text = getNarratablePageText();
    if (!text) {
        updateNarrationStatus('Não encontrei texto principal suficiente para narrar.');
        return;
    }

    stopPageNarration(false);
    resolveAccessibilityVoice();
    const chunks = splitNarrationText(text, 260);
    const token = ++a11ySpeechState.token;

    updateNarrationStatus('Narração em andamento.');
    setNarrationMode('playing');
    speakNarrationChunks(chunks, token);
}

function togglePauseNarration() {
    const synth = a11ySpeechState.synth;
    const isPausedMode = a11ySpeechState.mode === 'paused';

    if (synth && (synth.paused || isPausedMode)) {
        synth.resume();
        updateNarrationStatus('Narração retomada.');
        setNarrationMode('playing');
        return;
    }

    if (!synth || !synth.speaking) {
        updateNarrationStatus('A narração não está pausada no momento.');
        return;
    }

    synth.pause();
    updateNarrationStatus('Narração pausada.');
    setNarrationMode('paused');
}

function stopPageNarration(announceStop = true) {
    const synth = a11ySpeechState.synth;
    a11ySpeechState.token += 1;

    if (synth) {
        synth.cancel();
    }

    a11ySpeechState.utterance = null;
    setNarrationMode('idle');
    updateNarrationStatus('Pronto para narrar o conteúdo principal.');

    if (announceStop) {
        announceForAssistiveTech('Narração interrompida.');
    }
}

function speakNarrationChunks(chunks, token) {
    const synth = a11ySpeechState.synth;
    if (!synth || !chunks.length) {
        stopPageNarration(false);
        return;
    }

    let currentIndex = 0;

    function finish() {
        if (token !== a11ySpeechState.token) {
            return;
        }

        a11ySpeechState.utterance = null;
        setNarrationMode('idle');
        updateNarrationStatus('Narração concluída.');
        announceForAssistiveTech('Narração concluida.');
    }

    function speakNext() {
        if (!synth || token !== a11ySpeechState.token) {
            return;
        }

        if (currentIndex >= chunks.length) {
            finish();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[currentIndex]);
        utterance.lang = a11ySpeechState.voice ? a11ySpeechState.voice.lang : 'pt-BR';
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;
        if (a11ySpeechState.voice) {
            utterance.voice = a11ySpeechState.voice;
        }

        utterance.onend = function () {
            currentIndex += 1;
            speakNext();
        };
        utterance.onerror = function () {
            stopPageNarration(false);
            updateNarrationStatus('Não foi possível concluir a narração.');
        };

        a11ySpeechState.utterance = utterance;
        synth.speak(utterance);
    }

    speakNext();
}

function setNarrationMode(mode) {
    a11ySpeechState.mode = mode;

    const readButton = document.getElementById('a11y-read-toggle');
    const pauseButton = document.getElementById('a11y-pause-toggle');
    const stopButton = document.getElementById('a11y-stop-toggle');
    if (!readButton || !pauseButton || !stopButton) {
        return;
    }

    readButton.setAttribute('data-state', mode);
    readButton.textContent = mode === 'playing' ? 'Parar leitura' : 'Narrar';
    pauseButton.textContent = mode === 'paused' ? 'Retomar' : 'Pausar';
    pauseButton.disabled = mode === 'idle';
    stopButton.disabled = mode === 'idle';
}

function syncNarrationButtons() {
    const synth = a11ySpeechState.synth;
    if (a11ySpeechState.mode === 'paused') {
        setNarrationMode('paused');
        return;
    }

    if (!synth || !synth.speaking) {
        setNarrationMode('idle');
        return;
    }

    setNarrationMode(synth.paused ? 'paused' : 'playing');
}

function updateNarrationStatus(message) {
    const status = document.getElementById('a11y-read-status');
    if (status) {
        status.textContent = message;
    }
}

function getNarratablePageText() {
    const main = document.querySelector('main') || document.querySelector('#main-content') || document.querySelector('.main-content') || document.body;
    const skipSelector = [
        '#a11y-toolbar',
        '.a11y-skip-link',
        '.header',
        '.footer',
        '#footer-placeholder',
        '#header-placeholder',
        'button',
        'script',
        'style',
        'noscript',
        'svg',
        'canvas',
        '[aria-hidden="true"]',
        '.voice-row',
        '.practice-btn',
    ].join(', ');
    const blockTags = new Set(['P', 'LI', 'DIV', 'TR', 'TH', 'TD', 'H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'SECTION', 'ARTICLE']);
    const parts = [];

    function walk(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.matches && node.matches(skipSelector)) {
                return;
            }

            if (node.hidden) {
                return;
            }

            if (window.getComputedStyle) {
                const computed = window.getComputedStyle(node);
                if (computed.display === 'none' || computed.visibility === 'hidden') {
                    return;
                }
            }

            const isBlock = blockTags.has(node.tagName);
            if (isBlock && parts.length) {
                const last = parts[parts.length - 1];
                if (last && !/[.?!]$/.test(last)) {
                    parts.push('.');
                }
            }

            Array.from(node.childNodes).forEach(walk);
            return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.replace(/\s+/g, ' ').trim();
            if (text) {
                parts.push(text);
            }
        }
    }

    walk(main);

    return sanitizeNarrationContent(parts.join(' ')).slice(0, 9000);
}

function sanitizeNarrationContent(text) {
    return text
        .replace(/https?:\/\/\S+/g, ' ')
        .replace(/[\u{1F300}-\u{1FAFF}]/gu, ' ')
        .replace(/\bArt\.?\s*(\d+)/gi, 'artigo $1')
        .replace(/\bCF\b/gi, 'Constituicao Federal')
        .replace(/\bSTF\b/gi, 'Supremo Tribunal Federal')
        .replace(/\bSTJ\b/gi, 'Superior Tribunal de Justica')
        .replace(/§\s*(\d+)/g, ' paragrafo $1 ')
        .replace(/\s+([,.;:!?])/g, '$1')
        .replace(/([,.;:!?]){2,}/g, '$1')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

function splitNarrationText(text, maxLength) {
    if (!text) {
        return [];
    }

    const chunks = [];
    const sentences = text.split(/(?<=[.!?])\s+/).map(function (sentence) {
        return sentence.trim();
    }).filter(Boolean);

    let currentChunk = '';
    sentences.forEach(function (sentence) {
        const candidate = currentChunk ? `${currentChunk} ${sentence}` : sentence;
        if (candidate.length <= maxLength) {
            currentChunk = candidate;
            return;
        }

        if (currentChunk) {
            chunks.push(currentChunk);
            currentChunk = '';
        }

        if (sentence.length <= maxLength) {
            currentChunk = sentence;
            return;
        }

        for (let index = 0; index < sentence.length; index += maxLength) {
            chunks.push(sentence.slice(index, index + maxLength));
        }
    });

    if (currentChunk) {
        chunks.push(currentChunk);
    }

    return chunks;
}

function resolveAccessibilityVoice() {
    const synth = a11ySpeechState.synth;
    if (!synth || typeof synth.getVoices !== 'function') {
        a11ySpeechState.voice = null;
        return;
    }

    const voices = synth.getVoices();
    if (!voices.length) {
        a11ySpeechState.voice = null;
        return;
    }

    a11ySpeechState.voice = voices
        .map(function (voice) {
            return { voice: voice, score: scoreAccessibilityVoice(voice) };
        })
        .sort(function (left, right) {
            return right.score - left.score;
        })[0].voice;
}

function scoreAccessibilityVoice(voice) {
    const name = (voice.name || '').toLowerCase();
    const lang = (voice.lang || '').toLowerCase();
    let score = 0;

    if (lang === 'pt-br') score += 420;
    else if (lang.startsWith('pt')) score += 260;
    else score -= 180;

    if (/google|microsoft|apple|samsung|nuance/i.test(name)) score += 45;
    if (!voice.localService) score += 15;

    A11Y_VOICE_PATTERNS.forEach(function (pattern) {
        if (pattern.test(name)) {
            score += 70;
        }
    });

    if (/compact|espeak|mbrola|test|demo/i.test(name)) score -= 220;
    return score;
}

// ===========================
// Imagens clicáveis
// ===========================
function initClickableImages() {
    document.querySelectorAll('img.clickable').forEach(function (img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            const link = img.getAttribute('data-link');
            if (link) window.location.href = link;
        });
    });
}

// ===========================
// Rocket Cursor (desktop)
// ===========================
const ROCKET_CURSOR_CONFIG_KEY = 'idialog-rocket-cursor-settings';

function sanitizeRocketCursorConfig(rawConfig) {
    const raw = rawConfig && typeof rawConfig === 'object' ? rawConfig : {};
    const toNumber = (value, fallback) => {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    };
    const clampValue = (value, min, max) => Math.max(min, Math.min(max, value));

    return {
        scale: clampValue(toNumber(raw.scale, 100), 50, 180),
        glow: clampValue(toNumber(raw.glow, 9), 0, 60),
        tail_width: clampValue(toNumber(raw.tail_width, 8), 4, 16),
        tail_length: clampValue(toNumber(raw.tail_length, 13), 8, 30),
        smoke_size: clampValue(toNumber(raw.smoke_size, 100), 60, 220),
        trail_density: clampValue(toNumber(raw.trail_density, 100), 40, 220),
    };
}

function getRocketCursorConfig() {
    try {
        const stored = localStorage.getItem(ROCKET_CURSOR_CONFIG_KEY);
        if (!stored) {
            return sanitizeRocketCursorConfig();
        }
        return sanitizeRocketCursorConfig(JSON.parse(stored));
    } catch (error) {
        return sanitizeRocketCursorConfig();
    }
}

function initRocketCursor() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isCoarsePointer) {
        return;
    }

    document.documentElement.classList.add('rocket-cursor-enabled');

    const rocket = document.createElement('div');
    rocket.id = 'rocket-cursor';
    rocket.setAttribute('aria-hidden', 'true');
    rocket.innerHTML = `
        <svg class="rocket-svg" viewBox="0 0 64 96" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
            <defs>
                <linearGradient id="rocketBodyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#d9e2ff" />
                    <stop offset="45%" stop-color="#9eb7ff" />
                    <stop offset="100%" stop-color="#5a84ff" />
                </linearGradient>
                <linearGradient id="rocketHeatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffb347" />
                    <stop offset="58%" stop-color="#ff8f1f" />
                    <stop offset="100%" stop-color="#ffd84d" />
                </linearGradient>
                <linearGradient id="rocketGasGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#7df9ff" />
                    <stop offset="55%" stop-color="#00e5ff" />
                    <stop offset="100%" stop-color="#4d7cff" />
                </linearGradient>
            </defs>
            <path d="M32 2 L44 19 L20 19 Z" fill="#f4f7ff" stroke="#2a3d66" stroke-width="0.9"/>
            <path d="M32 9 C48 21, 51 41, 46 60 C42 78, 22 78, 18 60 C13 41, 16 21, 32 9 Z" fill="url(#rocketBodyGrad)" stroke="#314673" stroke-width="1.05"/>
            <path d="M24 20 C26 15, 38 15, 40 20" fill="none" stroke="#dbe6ff" stroke-width="1.3" opacity="0.8"/>
            <path d="M24 58 C26 62, 38 62, 40 58" fill="none" stroke="#4c68b3" stroke-width="1.3" opacity="0.7"/>
            <path d="M32 15 L32 59" fill="none" stroke="#284177" stroke-width="0.7" opacity="0.55"/>
            <ellipse cx="32" cy="35" rx="9.4" ry="9.8" fill="#09101a" stroke="#8ab0ff" stroke-width="0.7"/>
            <ellipse cx="32" cy="35" rx="6.2" ry="6.6" fill="#00d4ff" opacity="0.92"/>
            <ellipse cx="30" cy="33.5" rx="2.2" ry="1.8" fill="#e9fbff" opacity="0.8"/>
            <path d="M18 56 L8 72 L22 69 Z" fill="#6f8de6" stroke="#2b3f6d" stroke-width="0.8"/>
            <path d="M46 56 L56 72 L42 69 Z" fill="#6f8de6" stroke="#2b3f6d" stroke-width="0.8"/>
            <path d="M32 68 L25 85 L32 94 L39 85 Z" fill="url(#rocketHeatGrad)" class="rocket-svg-flame"/>
            <path d="M32 72 L28.7 86 L32 91 L35.3 86 Z" fill="url(#rocketGasGrad)" class="rocket-svg-gas"/>
            <circle cx="32" cy="2" r="1.45" fill="#ffffff" opacity="0.96"/>
        </svg>
        <span class="rocket-burn"></span>
    `;

    document.body.appendChild(rocket);

    // Keep geometric constants centralized so click-point and smoke-origin stay aligned.
    const BASE_ROCKET_WIDTH = 21;
    const BASE_ROCKET_HEIGHT = 33;
    const BASE_ROCKET_TIP_Y = 0.7;
    const BASE_FLAME_END_Y = 32;

    let rocketConfig = getRocketCursorConfig();
    let ROCKET_WIDTH = BASE_ROCKET_WIDTH;
    let ROCKET_HEIGHT = BASE_ROCKET_HEIGHT;
    let ROCKET_TIP_Y = BASE_ROCKET_TIP_Y;
    let FLAME_END_Y = BASE_FLAME_END_Y;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let angle = 0;
    let targetAngle = 0;
    let prevX = x;
    let prevY = y;
    let prevSpeed = 0;
    let smoothedSpeed = 0;
    let smoothedThrust = 0;
    let visible = false;
    let lastTrailAt = 0;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function lerpAngleDeg(current, target, alpha) {
        const delta = ((target - current + 540) % 360) - 180;
        return current + delta * alpha;
    }

    function applyRocketCursorConfig(config) {
        rocketConfig = sanitizeRocketCursorConfig(config);

        const scale = rocketConfig.scale / 100;
        ROCKET_WIDTH = BASE_ROCKET_WIDTH * scale;
        ROCKET_HEIGHT = BASE_ROCKET_HEIGHT * scale;
        ROCKET_TIP_Y = BASE_ROCKET_TIP_Y * scale;
        FLAME_END_Y = BASE_FLAME_END_Y * scale;

        rocket.style.setProperty('--rocket-width', `${ROCKET_WIDTH.toFixed(2)}px`);
        rocket.style.setProperty('--rocket-height', `${ROCKET_HEIGHT.toFixed(2)}px`);
        rocket.style.setProperty('--rocket-tail-width', `${rocketConfig.tail_width.toFixed(2)}px`);
        rocket.style.setProperty('--rocket-tail-height', `${rocketConfig.tail_length.toFixed(2)}px`);
        rocket.style.setProperty('--rocket-glow-alpha', `${(rocketConfig.glow / 100).toFixed(3)}`);
    }

    applyRocketCursorConfig(rocketConfig);

    function setVisible(isVisible) {
        visible = isVisible;
        rocket.classList.toggle('visible', isVisible);
    }

    function emitTrail(speed, thrust) {
        const now = performance.now();
        const densityScale = rocketConfig.trail_density / 100;
        const emissionGap = Math.max(10, (36 - thrust * 18) / densityScale);
        if (now - lastTrailAt < emissionGap) {
            return;
        }
        lastTrailAt = now;

        const smoke = document.createElement('span');
        smoke.className = 'rocket-smoke';

        const radBack = (angle + 90) * Math.PI / 180;
        const tailDistance = (FLAME_END_Y - ROCKET_TIP_Y) + 3 + thrust * 9;
        const jitterX = (Math.random() - 0.5) * (2 + thrust * 2.8);
        const jitterY = (Math.random() - 0.5) * (2 + thrust * 2.8);
        const sx = x + Math.cos(radBack) * tailDistance + jitterX;
        const sy = y + Math.sin(radBack) * tailDistance + jitterY;

        const smokeSizeScale = rocketConfig.smoke_size / 100;
        const size = clamp((3 + speed * 0.1 + thrust * 5.8) * smokeSizeScale, 2.4, 20);
        const duration = clamp(460 + thrust * 210 - speed * 4, 300, 740);
        const drift = 4 + thrust * 8;
        const driftX = Math.cos(radBack) * drift + (Math.random() - 0.5) * 5;
        const driftY = Math.sin(radBack) * drift + (Math.random() - 0.5) * 5;

        smoke.style.left = `${sx}px`;
        smoke.style.top = `${sy}px`;
        smoke.style.width = `${size}px`;
        smoke.style.height = `${size}px`;
        smoke.style.animationDuration = `${duration}ms`;
        smoke.style.setProperty('--smoke-dx', `${driftX.toFixed(2)}px`);
        smoke.style.setProperty('--smoke-dy', `${driftY.toFixed(2)}px`);

        document.body.appendChild(smoke);
        smoke.addEventListener('animationend', function () {
            smoke.remove();
        });

        if (Math.random() < 0.42 + thrust * 0.35) {
            const ember = document.createElement('span');
            ember.className = 'rocket-ember';
            ember.style.left = `${sx + (Math.random() - 0.5) * 4}px`;
            ember.style.top = `${sy + (Math.random() - 0.5) * 4}px`;
            ember.style.animationDuration = `${clamp(180 + Math.random() * 160 - thrust * 50, 110, 340)}ms`;
            document.body.appendChild(ember);
            ember.addEventListener('animationend', function () {
                ember.remove();
            });
        }
    }

    window.addEventListener('mousemove', function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        setVisible(true);
    });

    window.addEventListener('mousedown', function () {
        rocket.classList.add('boost');
    });

    window.addEventListener('mouseup', function () {
        rocket.classList.remove('boost');
    });

    window.addEventListener('mouseleave', function () {
        setVisible(false);
    });

    window.addEventListener('blur', function () {
        setVisible(false);
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            setVisible(false);
        }
    });

    window.addEventListener('storage', function (event) {
        if (event.key !== ROCKET_CURSOR_CONFIG_KEY) {
            return;
        }
        applyRocketCursorConfig(getRocketCursorConfig());
    });

    window.addEventListener('idialog:rocket-config-updated', function (event) {
        const config = event && event.detail ? event.detail : getRocketCursorConfig();
        applyRocketCursorConfig(config);
    });

    document.addEventListener('mouseover', function (e) {
        const interactive = e.target.closest('a, button, .btn, .nav-link, .dropdown-link, input, textarea, select, label, [role="button"]');
        rocket.classList.toggle('interactive', Boolean(interactive));
    });

    function animate() {
        // Keep rocket tip exactly on real cursor position so click point matches the nose.
        x = targetX;
        y = targetY;

        const vx = x - prevX;
        const vy = y - prevY;
        const rawSpeed = Math.hypot(vx, vy);
        smoothedSpeed += (rawSpeed - smoothedSpeed) * 0.26;
        const speed = smoothedSpeed;
        const speedDelta = speed - prevSpeed;
        const speedNorm = clamp(speed / 8.5, 0, 1.8);
        const thrustRaw = clamp(speedNorm * 0.56 + speedDelta * 0.34, 0, 1.65);
        smoothedThrust += (thrustRaw - smoothedThrust) * 0.24;
        const thrust = smoothedThrust;

        if (rawSpeed > 0.08) {
            targetAngle = Math.atan2(vy, vx) * 180 / Math.PI + 90;
        }
        const turnLerp = clamp(0.13 + speed * 0.02, 0.13, 0.4);
        angle = lerpAngleDeg(angle, targetAngle, turnLerp);

        rocket.style.left = `${(x - ROCKET_WIDTH / 2).toFixed(2)}px`;
        rocket.style.top = `${(y - ROCKET_TIP_Y).toFixed(2)}px`;
        rocket.style.transform = `rotate(${angle.toFixed(2)}deg)`;
        rocket.style.setProperty('--rocket-speed', Math.min(1.65, speed / 14).toFixed(3));
        rocket.style.setProperty('--rocket-thrust', thrust.toFixed(3));
        rocket.style.setProperty('--flame-rate', `${Math.round(220 - thrust * 80)}ms`);
        rocket.classList.toggle('thrusting', thrust > 0.28);

        if (visible && speed > 0.2) {
            emitTrail(speed, thrust);
        }

        prevX = x;
        prevY = y;
        prevSpeed = speed;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// ===========================
// Smooth Scrolling
// ===========================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// Header Scroll Effect
// ===========================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove shadow based on scroll position
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// ===========================
// Contact Form
// ===========================
function initContactForm() {
    const contactForm = document.getElementById('contactForm') || document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => { formObject[key] = value; });

            if (!validateForm(formObject)) return;

            // Monta mensagem para o WhatsApp
            const lines = [
                '📋 *Novo contato via site iDialog*',
                '',
                `*Nome:* ${formObject.name || ''}`,
                `*Email:* ${formObject.email || ''}`,
                formObject.phone ? `*Telefone:* ${formObject.phone}` : '',
                formObject.company ? `*Empresa:* ${formObject.company}` : '',
                formObject.service ? `*Serviço:* ${formObject.service}` : '',
                formObject.budget ? `*Orçamento:* ${formObject.budget}` : '',
                formObject.timeline ? `*Prazo:* ${formObject.timeline}` : '',
                formObject.subject ? `*Assunto:* ${formObject.subject}` : '',
                '',
                `*Mensagem:*\n${formObject.message || ''}`
            ].filter(Boolean).join('\n');

            const whatsappUrl = `https://wa.me/5587988568605?text=${encodeURIComponent(lines)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            showNotification('Redirecionando para o WhatsApp...', 'success');
            contactForm.reset();
        });
    }
}

function validateForm(data) {
    const errors = [];

    // Validate required fields
    if (!data.name || data.name.trim() === '') {
        errors.push('Nome é obrigatório');
    }

    if (!data.email || data.email.trim() === '') {
        errors.push('Email é obrigatório');
    } else if (!isValidEmail(data.email)) {
        errors.push('Email inválido');
    }

    if (!data.subject || data.subject.trim() === '') {
        errors.push('Assunto é obrigatório');
    }

    if (!data.message || data.message.trim() === '') {
        errors.push('Mensagem é obrigatória');
    }

    // Show errors if any
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormLoading(loading) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');

    if (loading) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Enviar Mensagem';
    }
}

function showFormSuccess() {
    showNotification('Mensagem enviada com sucesso!', 'success');
}

function showFormErrors(errors) {
    const errorMessage = errors.join('<br>');
    showNotification(errorMessage, 'error');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.setAttribute('aria-label', 'Fechar notificacao');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });

    announceForAssistiveTech(message);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===========================
// Scroll Animations
// ===========================
function initScrollAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .stat, .about-text, .contact-item, .section-header'
    );

    animatedElements.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
}

// ===========================
// Utility Functions
// ===========================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get scroll position
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===========================
// Additional Features
// ===========================

// Back to top button (optional)
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Voltar ao topo');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (getScrollTop() > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    }, 100));

    // Scroll to top functionality
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addBackToTopButton, 1000);
});

// ===========================
// Error Handling
// ===========================
window.addEventListener('error', function (e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===========================
// Performance Monitoring
// ===========================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page Load Time: ${pageLoadTime}ms`);
        }, 0);
    });
}
