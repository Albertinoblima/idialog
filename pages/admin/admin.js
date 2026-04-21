/* ═══════════════════════════════════════════════════
   iDialog CMS — Admin Panel v2 · admin.js
   WordPress-like: sidebar navigation, TinyMCE, GA4,
   GitHub/Monaco, media library, settings
═══════════════════════════════════════════════════ */
(function () {
    'use strict';

    // ── Config ────────────────────────────────────────────────────────────────
    const TOKEN_KEY = 'idialog-admin-token';
    const API_KEY = 'idialog-admin-api';
    const CURSOR_KEY = 'idialog-rocket-cursor-settings';

    const state = {
        token: localStorage.getItem(TOKEN_KEY) || '',
        apiBase: localStorage.getItem(API_KEY) || 'https://idialog-production.up.railway.app/api',
        contents: [],
        widgets: [],
        media: [],
        monacoEditor: null,
        monacoModel: null,
        currentFileSha: null,
        currentFilePath: null,
        monacoUnsaved: false,
        confirmCallback: null,
        tinyInit: false,
        chartDaily: null,
        chartSources: null,
    };

    // ── API helper ───────────────────────────────────────────────────────────
    async function api(method, path, body) {
        const opts = { method, headers: { 'Content-Type': 'application/json' } };
        if (state.token) opts.headers['Authorization'] = 'Bearer ' + state.token;
        if (body !== undefined) opts.body = JSON.stringify(body);
        const res = await fetch(state.apiBase + path, opts);
        if (res.status === 204) return {};
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || data.error || 'Erro ' + res.status);
        return data;
    }

    // ── Toast ────────────────────────────────────────────────────────────────
    function toast(msg, type) {
        type = type || 'success';
        var icons = { success: 'fa-circle-check', error: 'fa-circle-exclamation', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
        var el = document.createElement('div');
        el.className = 'toast toast-' + type;
        el.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i>' + escHtml(msg);
        document.getElementById('toast-container').appendChild(el);
        setTimeout(function () {
            el.classList.add('toast-out');
            el.addEventListener('animationend', function () { el.remove(); });
        }, 3500);
    }

    // ── Utility ──────────────────────────────────────────────────────────────
    function escHtml(s) {
        if (typeof s !== 'string') return '';
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    function fmtDate(str) {
        if (!str) return '—';
        var d = new Date(str);
        return isNaN(d) ? str : d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    function fmtNum(n) {
        if (n == null) return '—';
        return Number(n).toLocaleString('pt-BR');
    }
    function slugify(s) {
        return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
    }
    function statusBadge(s) {
        var map = { published: ['badge-published', 'Publicado'], draft: ['badge-draft', 'Rascunho'], archived: ['badge-archived', 'Arquivado'], scheduled: ['badge-scheduled', 'Agendado'] };
        var pair = map[s] || ['badge-draft', s || '?'];
        return '<span class="badge ' + pair[0] + '">' + escHtml(pair[1]) + '</span>';
    }
    function typeBadge(t) {
        var map = { blog_post: 'Post', page: 'Página', simulado: 'Simulado' };
        return '<span class="badge badge-draft">' + escHtml(map[t] || t) + '</span>';
    }
    function showConfirm(title, msg, cb) {
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = msg;
        state.confirmCallback = cb;
        openModal('modal-confirm');
    }

    // ── Modal ────────────────────────────────────────────────────────────────
    function openModal(id) { document.getElementById(id).removeAttribute('hidden'); }
    function closeModal(id) { document.getElementById(id).setAttribute('hidden', ''); }

    document.addEventListener('click', function (e) {
        var t = e.target.closest('[data-close-modal]');
        if (t) closeModal(t.dataset.closeModal);
        if (e.target.classList.contains('modal-backdrop')) {
            var modal = e.target.closest('.wp-modal');
            if (modal) closeModal(modal.id);
        }
    });
    document.getElementById('btn-confirm-cancel').addEventListener('click', function () { closeModal('modal-confirm'); });
    document.getElementById('btn-confirm-ok').addEventListener('click', function () {
        closeModal('modal-confirm');
        if (typeof state.confirmCallback === 'function') state.confirmCallback();
    });

    // ── Auth ─────────────────────────────────────────────────────────────────
    var authView = document.getElementById('auth-view');
    var adminShell = document.getElementById('admin-shell');
    var loginErr = document.getElementById('login-error');
    var loginBtn = document.getElementById('login-btn');

    async function restoreSession() {
        if (!state.token) { showAuth(); return; }
        try {
            var me = await api('GET', '/me');
            showShell(me.email || 'Admin');
        } catch (e) {
            localStorage.removeItem(TOKEN_KEY);
            state.token = '';
            showAuth();
        }
    }

    function showAuth() {
        authView.removeAttribute('hidden');
        adminShell.setAttribute('hidden', '');
    }

    function showShell(email) {
        authView.setAttribute('hidden', '');
        adminShell.removeAttribute('hidden');
        document.getElementById('sidebar-username').textContent = email || 'Admin';
        loadDashboard();
    }

    document.getElementById('login-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        loginErr.setAttribute('hidden', '');
        loginBtn.disabled = true;
        loginBtn.querySelector('.btn-text').textContent = 'Entrando…';
        try {
            var email = document.getElementById('login-email').value.trim();
            var password = document.getElementById('login-password').value;
            var data = await api('POST', '/auth/login', { email: email, password: password });
            state.token = data.token;
            localStorage.setItem(TOKEN_KEY, data.token);
            showShell(email);
        } catch (err) {
            loginErr.textContent = err.message || 'Credenciais inválidas';
            loginErr.removeAttribute('hidden');
        } finally {
            loginBtn.disabled = false;
            loginBtn.querySelector('.btn-text').textContent = 'Entrar';
        }
    });

    document.getElementById('btn-logout').addEventListener('click', function () {
        localStorage.removeItem(TOKEN_KEY);
        state.token = '';
        showAuth();
    });

    // ── Sidebar navigation ───────────────────────────────────────────────────
    var tabTitles = {
        dashboard: 'Dashboard',
        posts: 'Posts · Blog',
        'post-editor': 'Editor de Post',
        pages: 'Editor de Páginas HTML',
        media: 'Biblioteca de Mídia',
        analytics: 'Analytics · GA4',
        widgets: 'Widgets · Publicidade',
        appearance: 'Aparência',
        settings: 'Configurações'
    };

    function switchTab(name) {
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        document.querySelectorAll('.nav-item').forEach(function (a) { a.classList.remove('active'); });
        var panel = document.getElementById('tab-' + name);
        if (panel) panel.classList.add('active');
        var navItem = document.querySelector('.nav-item[data-tab="' + name + '"]');
        if (navItem) navItem.classList.add('active');
        document.getElementById('topbar-title').textContent = tabTitles[name] || name;
        if (name === 'posts') loadPosts();
        else if (name === 'analytics') loadAnalytics();
        else if (name === 'widgets') loadWidgets();
        else if (name === 'media') loadMedia();
        else if (name === 'pages') loadPagesTab();
        else if (name === 'appearance') loadAppearanceTab();
        else if (name === 'settings') loadSettings();
        closeMobileSidebar();
    }

    document.querySelectorAll('.nav-item[data-tab]').forEach(function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); switchTab(a.dataset.tab); });
    });

    document.addEventListener('click', function (e) {
        var qc = e.target.closest('[data-tab]:not(.nav-item)');
        if (qc) switchTab(qc.dataset.tab);
        var gt = e.target.closest('[data-goto]');
        if (gt) {
            var g = gt.dataset.goto;
            if (g === 'posts-new') { switchTab('post-editor'); openPostEditor(null); }
            else if (g === 'settings-github') { switchTab('settings'); document.getElementById('settings-github').scrollIntoView({ behavior: 'smooth' }); }
            else if (g === 'settings-analytics') { switchTab('settings'); document.getElementById('settings-analytics').scrollIntoView({ behavior: 'smooth' }); }
        }
    });

    var sidebarEl = document.getElementById('admin-sidebar');
    var overlayEl = document.getElementById('sidebar-overlay');
    document.getElementById('sidebar-toggle').addEventListener('click', function () {
        sidebarEl.classList.add('open');
        overlayEl.classList.add('active');
    });
    overlayEl.addEventListener('click', closeMobileSidebar);
    function closeMobileSidebar() {
        sidebarEl.classList.remove('open');
        overlayEl.classList.remove('active');
    }

    // ── Dashboard ────────────────────────────────────────────────────────────
    async function loadDashboard() {
        document.getElementById('dash-date').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        try {
            var results = await Promise.allSettled([
                api('GET', '/content'),
                api('GET', '/widgets'),
                api('GET', '/media')
            ]);
            var items = (results[0].value && results[0].value.items) || [];
            var widgets = (results[1].value && results[1].value.widgets) || [];
            var files = (results[2].value && results[2].value.files) || [];
            state.contents = items;
            state.widgets = widgets;
            state.media = files;

            var pub = items.filter(function (i) { return i.status === 'published'; }).length;
            var sched = items.filter(function (i) { return i.status === 'scheduled'; }).length;
            var draft = items.filter(function (i) { return i.status === 'draft'; }).length;
            document.getElementById('kpi-total').textContent = fmtNum(items.length);
            document.getElementById('kpi-published').textContent = fmtNum(pub);
            document.getElementById('kpi-scheduled').textContent = fmtNum(sched);
            document.getElementById('kpi-drafts').textContent = fmtNum(draft);
            document.getElementById('kpi-widgets').textContent = fmtNum(widgets.filter(function (w) { return w.is_active; }).length);
            document.getElementById('kpi-media').textContent = fmtNum(files.length);

            var recent = items.slice(0, 8);
            var tbody = document.getElementById('dash-recent-tbody');
            if (!recent.length) {
                tbody.innerHTML = '<tr><td colspan="5" class="table-empty">Nenhum conteúdo cadastrado ainda.</td></tr>';
            } else {
                tbody.innerHTML = recent.map(function (item) {
                    return '<tr>' +
                        '<td><strong>' + escHtml(item.title || '(sem título)') + '</strong></td>' +
                        '<td>' + typeBadge(item.content_type) + '</td>' +
                        '<td>' + statusBadge(item.status) + '</td>' +
                        '<td>' + fmtDate(item.updated_at || item.published_at || item.created_at) + '</td>' +
                        '<td class="table-actions"><button class="btn btn-ghost btn-sm" onclick="adminEditPost(' + item.id + ')"><i class="fas fa-pen"></i></button></td>' +
                        '</tr>';
                }).join('');
            }
        } catch (err) {
            toast('Erro ao carregar dashboard: ' + err.message, 'error');
        }
    }

    window.adminEditPost = function (id) {
        var item = state.contents.find(function (i) { return i.id === id; });
        if (item) { switchTab('post-editor'); openPostEditor(item); }
    };

    // ── Posts list ───────────────────────────────────────────────────────────
    var allPosts = [];

    async function loadPosts() {
        var tbody = document.getElementById('posts-tbody');
        tbody.innerHTML = '<tr><td colspan="6" class="table-empty"><i class="fas fa-spinner fa-spin"></i> Carregando...</td></tr>';
        try {
            var data = await api('GET', '/content');
            allPosts = data.items || [];
            state.contents = allPosts;
            renderPostsTable();
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Erro: ' + escHtml(err.message) + '</td></tr>';
        }
    }

    function renderPostsTable() {
        var search = (document.getElementById('posts-search').value || '').toLowerCase();
        var fSt = document.getElementById('posts-filter-status').value;
        var fTy = document.getElementById('posts-filter-type').value;
        var tbody = document.getElementById('posts-tbody');

        var list = allPosts.filter(function (i) {
            if (search && !(i.title || '').toLowerCase().includes(search)) return false;
            if (fSt && i.status !== fSt) return false;
            if (fTy && i.content_type !== fTy) return false;
            return true;
        });

        if (!list.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Nenhum item encontrado.</td></tr>';
            return;
        }
        tbody.innerHTML = list.map(function (item) {
            return '<tr>' +
                '<td><strong>' + escHtml(item.title || '(sem título)') + '</strong><br><small style="color:var(--txt3)">' + escHtml(item.slug || '') + '</small></td>' +
                '<td>' + typeBadge(item.content_type) + '</td>' +
                '<td>' + statusBadge(item.status) + '</td>' +
                '<td><small>' + escHtml(item.category || '—') + '</small></td>' +
                '<td><small>' + fmtDate(item.published_at || item.created_at) + '</small></td>' +
                '<td class="table-actions">' +
                '<button class="btn btn-ghost btn-sm" onclick="postsEdit(' + item.id + ')" title="Editar"><i class="fas fa-pen"></i></button>' +
                '<button class="btn btn-danger btn-sm" onclick="postsDelete(' + item.id + ')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                '</td>' +
                '</tr>';
        }).join('');
    }

    ['posts-search', 'posts-filter-status', 'posts-filter-type'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', renderPostsTable);
    });

    window.postsEdit = function (id) {
        var item = allPosts.find(function (i) { return i.id === id; });
        switchTab('post-editor');
        openPostEditor(item || null);
    };
    window.postsDelete = function (id) {
        var item = allPosts.find(function (i) { return i.id === id; });
        showConfirm('Excluir post', 'Excluir "' + (item ? item.title : 'este post') + '"? Esta ação não pode ser desfeita.', async function () {
            try {
                await api('DELETE', '/content/' + id);
                toast('Post excluído.');
                loadPosts();
            } catch (err) { toast('Erro ao excluir: ' + err.message, 'error'); }
        });
    };

    document.getElementById('btn-new-post').addEventListener('click', function () {
        switchTab('post-editor');
        openPostEditor(null);
    });
    document.getElementById('btn-back-to-posts').addEventListener('click', function () { switchTab('posts'); });

    // ── Post editor ──────────────────────────────────────────────────────────
    function openPostEditor(item) {
        document.getElementById('editing-post-id').value = item ? item.id : '';
        document.getElementById('post-editor-title').textContent = item ? ('Editar: ' + (item.title || '')) : 'Novo Post';
        document.getElementById('post-title').value = item ? (item.title || '') : '';
        document.getElementById('post-slug').value = item ? (item.slug || '') : '';
        document.getElementById('post-status').value = item ? (item.status || 'draft') : 'draft';
        document.getElementById('post-type').value = item ? (item.content_type || 'blog_post') : 'blog_post';
        document.getElementById('post-category').value = item ? (item.category || '') : '';
        document.getElementById('post-summary').value = item ? (item.summary || '') : '';
        document.getElementById('post-seo-desc').value = item ? (item.meta_description || '') : '';
        document.getElementById('post-keywords').value = item ? (item.meta_keywords || '') : '';
        document.getElementById('post-canonical').value = item ? (item.canonical_url || '') : '';
        document.getElementById('post-cover-path').value = item ? (item.cover_image_url || '') : '';
        document.getElementById('seo-desc-count').textContent = ((item && item.meta_description) ? item.meta_description.length : 0) + '/160';

        var pubAt = (item && item.published_at) ? new Date(item.published_at).toISOString().slice(0, 16) : '';
        document.getElementById('post-published-at').value = pubAt;

        var previewWrap = document.getElementById('cover-preview-wrap');
        var uploadWrap = document.getElementById('cover-upload-wrap');
        var previewImg = document.getElementById('cover-preview-img');
        if (item && item.cover_image_url) {
            previewImg.src = item.cover_image_url;
            previewWrap.removeAttribute('hidden');
            uploadWrap.setAttribute('hidden', '');
        } else {
            previewWrap.setAttribute('hidden', '');
            uploadWrap.removeAttribute('hidden');
        }

        var pvLink = document.getElementById('post-preview-link');
        var pvWrap = document.getElementById('post-preview-wrap');
        if (item && item.slug) {
            pvLink.href = '../../pages/blog/posts/' + item.slug + '.html';
            pvWrap.removeAttribute('hidden');
        } else {
            pvWrap.setAttribute('hidden', '');
        }

        if (!item) {
            document.getElementById('post-delete-wrap').setAttribute('hidden', '');
        } else {
            document.getElementById('post-delete-wrap').removeAttribute('hidden');
        }

        var bodyVal = item ? (item.body_html || item.content || '') : '';
        if (state.tinyInit && typeof tinymce !== 'undefined' && tinymce.get('post-body-html')) {
            tinymce.get('post-body-html').setContent(bodyVal);
        } else {
            document.getElementById('post-body-html').value = bodyVal;
        }
    }

    document.getElementById('post-seo-desc').addEventListener('input', function () {
        document.getElementById('seo-desc-count').textContent = this.value.length + '/160';
    });
    document.getElementById('post-title').addEventListener('input', function () {
        if (!document.getElementById('editing-post-id').value) {
            document.getElementById('post-slug').value = slugify(this.value);
        }
    });
    document.getElementById('btn-slug-reset').addEventListener('click', function () {
        document.getElementById('post-slug').value = slugify(document.getElementById('post-title').value);
    });

    document.getElementById('cover-file-input').addEventListener('change', async function () {
        var file = this.files[0];
        if (!file) return;
        var fd = new FormData();
        fd.append('file', file);
        try {
            var res = await fetch(state.apiBase + '/media/upload', { method: 'POST', headers: { Authorization: 'Bearer ' + state.token }, body: fd });
            var data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Erro upload');
            document.getElementById('post-cover-path').value = data.url;
            document.getElementById('cover-preview-img').src = data.url;
            document.getElementById('cover-preview-wrap').removeAttribute('hidden');
            document.getElementById('cover-upload-wrap').setAttribute('hidden', '');
            toast('Imagem de capa salva.');
        } catch (err) { toast('Erro no upload: ' + err.message, 'error'); }
    });
    document.getElementById('btn-remove-cover').addEventListener('click', function () {
        document.getElementById('post-cover-path').value = '';
        document.getElementById('cover-preview-img').src = '';
        document.getElementById('cover-preview-wrap').setAttribute('hidden', '');
        document.getElementById('cover-upload-wrap').removeAttribute('hidden');
    });

    async function savePost(status) {
        var id = document.getElementById('editing-post-id').value;
        var title = document.getElementById('post-title').value.trim();
        if (!title) { toast('O título é obrigatório.', 'warning'); return; }

        var bodyHtml = document.getElementById('post-body-html').value;
        if (state.tinyInit && typeof tinymce !== 'undefined' && tinymce.get('post-body-html')) {
            bodyHtml = tinymce.get('post-body-html').getContent();
        }

        var pubAtVal = document.getElementById('post-published-at').value;
        var finalStatus = status || document.getElementById('post-status').value;
        var payload = {
            title: title,
            slug: document.getElementById('post-slug').value.trim() || slugify(title),
            content_type: document.getElementById('post-type').value,
            status: finalStatus,
            context: 'blog',
            category: document.getElementById('post-category').value,
            summary: document.getElementById('post-summary').value,
            body_html: bodyHtml,
            cover_image_url: document.getElementById('post-cover-path').value,
            meta_description: document.getElementById('post-seo-desc').value,
            meta_keywords: document.getElementById('post-keywords').value,
            canonical_url: document.getElementById('post-canonical').value,
            published_at: pubAtVal ? new Date(pubAtVal).toISOString() : (finalStatus === 'published' ? new Date().toISOString() : null)
        };

        var saveBtn = document.getElementById('btn-publish-post');
        saveBtn.disabled = true;
        try {
            if (id) {
                await api('PUT', '/content/' + id, payload);
                toast('Post atualizado!');
            } else {
                var resp = await api('POST', '/content', payload);
                document.getElementById('editing-post-id').value = resp.id || '';
                document.getElementById('post-delete-wrap').removeAttribute('hidden');
                toast('Post criado!');
            }
            await loadPosts();
        } catch (err) {
            toast('Erro ao salvar: ' + err.message, 'error');
        } finally {
            saveBtn.disabled = false;
        }
    }

    document.getElementById('btn-save-draft').addEventListener('click', function () { savePost('draft'); });
    document.getElementById('btn-publish-post').addEventListener('click', function () { savePost('published'); });
    document.getElementById('btn-delete-post').addEventListener('click', function () {
        var id = document.getElementById('editing-post-id').value;
        if (!id) return;
        showConfirm('Excluir post', 'Deseja excluir este post? A ação não pode ser desfeita.', async function () {
            try {
                await api('DELETE', '/content/' + id);
                toast('Post excluído.');
                switchTab('posts');
                loadPosts();
            } catch (err) { toast('Erro: ' + err.message, 'error'); }
        });
    });

    function initTinyMCE() {
        if (state.tinyInit || typeof tinymce === 'undefined') return;
        state.tinyInit = true;
        tinymce.init({
            selector: '#post-body-html',
            height: 450,
            menubar: false,
            language: 'pt_BR',
            plugins: 'lists link image media table code fullscreen wordcount',
            toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media | table | code fullscreen',
            promotion: false
        });
    }
    document.getElementById('btn-new-post').addEventListener('click', function () { setTimeout(initTinyMCE, 100); });

    // ── Pages (GitHub + Monaco) ──────────────────────────────────────────────
    var ghConfig = null;

    async function loadPagesTab() {
        try {
            ghConfig = await api('GET', '/github/config');
            if (!ghConfig.repo_owner || !ghConfig.repo_name) {
                document.getElementById('pages-not-configured').removeAttribute('hidden');
                document.getElementById('pages-ui').style.display = 'none';
            } else {
                document.getElementById('pages-not-configured').setAttribute('hidden', '');
                document.getElementById('pages-ui').style.display = '';
                loadFileTree();
            }
        } catch (e) {
            document.getElementById('pages-not-configured').removeAttribute('hidden');
        }
    }

    async function loadFileTree() {
        var treeEl = document.getElementById('file-tree');
        treeEl.innerHTML = '<div class="tree-loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
        try {
            var data = await api('POST', '/github/proxy', {
                method: 'GET',
                path: 'git/trees/' + (ghConfig.branch || 'main') + '?recursive=1'
            });
            var files = (data.tree || []).filter(function (f) { return f.type === 'blob' && /\.(html|css|js|json|md|txt)$/i.test(f.path); });
            renderFileTree(files);
        } catch (err) {
            treeEl.innerHTML = '<div class="tree-loading" style="color:var(--red)"><i class="fas fa-circle-exclamation"></i> ' + escHtml(err.message) + '</div>';
        }
    }

    function renderFileTree(files) {
        var search = document.getElementById('tree-search').value.toLowerCase();
        var list = search ? files.filter(function (f) { return f.path.toLowerCase().includes(search); }) : files;
        var treeEl = document.getElementById('file-tree');
        if (!list.length) { treeEl.innerHTML = '<div class="tree-loading">Nenhum arquivo encontrado.</div>'; return; }
        treeEl.innerHTML = list.map(function (f) {
            var icon = f.path.endsWith('.html') ? 'fa-file-code' : f.path.endsWith('.css') ? 'fa-file-lines' : f.path.endsWith('.js') ? 'fa-file-code' : 'fa-file';
            return '<div class="tree-item" data-path="' + escHtml(f.path) + '"><i class="fas ' + icon + '"></i>' + escHtml(f.path) + '</div>';
        }).join('');
        treeEl.querySelectorAll('.tree-item').forEach(function (item) {
            item.addEventListener('click', function () { openFileInMonaco(item.dataset.path); });
        });
        window._treeFiles = files;
    }

    document.getElementById('tree-search').addEventListener('input', function () {
        if (window._treeFiles) renderFileTree(window._treeFiles);
    });
    document.getElementById('btn-refresh-tree').addEventListener('click', loadFileTree);

    document.getElementById('btn-new-file').addEventListener('click', function () {
        openModal('modal-new-file');
        document.getElementById('new-file-path').value = '';
        document.getElementById('new-file-error').setAttribute('hidden', '');
    });

    document.getElementById('btn-create-file').addEventListener('click', async function () {
        var rawPath = (document.getElementById('new-file-path').value || '').trim().replace(/^\//, '');
        var errEl = document.getElementById('new-file-error');
        if (!rawPath) { errEl.textContent = 'Informe o caminho do arquivo.'; errEl.removeAttribute('hidden'); return; }
        if (!/\.(html|css|js|json|md|txt)$/i.test(rawPath)) { errEl.textContent = 'Extensão não permitida. Use .html, .css, .js, .json, .md ou .txt'; errEl.removeAttribute('hidden'); return; }
        if (/[^\w\-./]/.test(rawPath)) { errEl.textContent = 'Caminho inválido. Use apenas letras, números, -, _ e /'; errEl.removeAttribute('hidden'); return; }
        var btn = document.getElementById('btn-create-file');
        btn.disabled = true;
        try {
            var encoded = btoa('');
            await api('POST', '/github/proxy', {
                method: 'PUT',
                path: 'contents/' + rawPath,
                body: {
                    message: 'admin: create ' + rawPath,
                    content: encoded,
                    branch: ghConfig.branch || 'main'
                }
            });
            toast('Arquivo criado: ' + rawPath);
            closeModal('modal-new-file');
            await loadFileTree();
            openFileInMonaco(rawPath);
        } catch (err) {
            errEl.textContent = 'Erro: ' + err.message;
            errEl.removeAttribute('hidden');
        } finally { btn.disabled = false; }
    });

    async function openFileInMonaco(path, force) {
        if (state.monacoUnsaved && !force) {
            var _doOpen = path;
            showConfirm('Alterações não salvas', 'Há alterações não salvas. Deseja descartar e abrir outro arquivo?', function () { openFileInMonaco(_doOpen, true); });
            return;
        }
        document.querySelectorAll('.tree-item').forEach(function (i) { i.classList.remove('active'); });
        var activeItem = document.querySelector('.tree-item[data-path="' + path.replace(/"/g, '\\"') + '"]');
        if (activeItem) activeItem.classList.add('active');

        document.getElementById('monaco-placeholder').setAttribute('hidden', '');
        document.getElementById('monaco-editor-wrap').removeAttribute('hidden');
        document.getElementById('monaco-filename').textContent = path;
        document.getElementById('monaco-status').textContent = 'Carregando…';
        document.getElementById('monaco-unsaved').setAttribute('hidden', '');
        state.monacoUnsaved = false;
        state.currentFilePath = path;

        try {
            var data = await api('POST', '/github/proxy', {
                method: 'GET',
                path: 'contents/' + path
            });
            var content = atob(data.content.replace(/\n/g, ''));
            state.currentFileSha = data.sha;
            document.getElementById('monaco-status').textContent = path + ' — ' + content.length + ' bytes';
            await ensureMonaco();
            var lang = path.endsWith('.html') ? 'html' : path.endsWith('.css') ? 'css' : path.endsWith('.js') ? 'javascript' : path.endsWith('.json') ? 'json' : 'plaintext';
            if (state.monacoEditor) {
                var newModel = window.monaco.editor.createModel(content, lang);
                state.monacoEditor.setModel(newModel);
                if (state.monacoModel) state.monacoModel.dispose();
                state.monacoModel = newModel;
            } else {
                state.monacoEditor = window.monaco.editor.create(document.getElementById('monaco-editor-container'), {
                    value: content, language: lang,
                    theme: 'vs', automaticLayout: true, fontSize: 13,
                    minimap: { enabled: false }, wordWrap: 'on'
                });
                state.monacoEditor.onDidChangeModelContent(function () {
                    state.monacoUnsaved = true;
                    document.getElementById('monaco-unsaved').removeAttribute('hidden');
                });
            }
        } catch (err) {
            document.getElementById('monaco-status').textContent = 'Erro: ' + err.message;
            toast('Erro ao abrir arquivo: ' + err.message, 'error');
        }
    }

    function ensureMonaco() {
        if (window.monaco) return Promise.resolve();
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs/loader.js';
            script.onload = function () {
                window.require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs' } });
                window.require(['vs/editor/editor.main'], function () { window.monaco = monaco; resolve(); });
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    document.getElementById('btn-monaco-save').addEventListener('click', saveFileViaGitHub);

    async function saveFileViaGitHub() {
        if (!state.monacoEditor || !state.currentFilePath) return;
        var content = state.monacoEditor.getValue();
        var encoded = btoa(unescape(encodeURIComponent(content)));
        var btn = document.getElementById('btn-monaco-save');
        btn.disabled = true;
        document.getElementById('monaco-status').textContent = 'Salvando…';
        try {
            await api('POST', '/github/proxy', {
                method: 'PUT',
                path: 'contents/' + state.currentFilePath,
                body: {
                    message: 'admin: update ' + state.currentFilePath,
                    content: encoded,
                    sha: state.currentFileSha,
                    branch: ghConfig.branch || 'main'
                }
            });
            state.monacoUnsaved = false;
            document.getElementById('monaco-unsaved').setAttribute('hidden', '');
            document.getElementById('monaco-status').textContent = 'Salvo em ' + new Date().toLocaleTimeString('pt-BR');
            toast('Arquivo publicado no GitHub!');
            var updated = await api('POST', '/github/proxy', {
                method: 'GET',
                path: 'contents/' + state.currentFilePath
            });
            state.currentFileSha = updated.sha;
        } catch (err) {
            document.getElementById('monaco-status').textContent = 'Erro: ' + err.message;
            toast('Erro ao salvar: ' + err.message, 'error');
        } finally {
            btn.disabled = false;
        }
    }

    document.getElementById('btn-monaco-preview').addEventListener('click', function () {
        if (state.currentFilePath && ghConfig) {
            var siteBase = 'https://idialog.com.br';
            var urlMap = {
                'index.html': '/',
                'pages/': '/pages/'
            };
            var fp = state.currentFilePath;
            var url;
            if (fp === 'index.html') url = siteBase + '/';
            else if (fp.startsWith('pages/') && fp.endsWith('.html')) url = siteBase + '/' + fp.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
            else url = 'https://raw.githubusercontent.com/' + ghConfig.repo_owner + '/' + ghConfig.repo_name + '/' + (ghConfig.branch || 'main') + '/' + fp;
            window.open(url, '_blank', 'noopener');
        }
    });

    document.getElementById('btn-monaco-history').addEventListener('click', function () {
        if (state.currentFilePath && ghConfig) {
            var url = 'https://github.com/' + ghConfig.repo_owner + '/' + ghConfig.repo_name + '/commits/' + (ghConfig.branch || 'main') + '/' + state.currentFilePath;
            window.open(url, '_blank', 'noopener');
        } else {
            toast('Selecione um arquivo primeiro.', 'warning');
        }
    });

    // ── Media library ────────────────────────────────────────────────────────
    async function loadMedia() {
        var grid = document.getElementById('media-grid');
        grid.innerHTML = '<div class="media-loading"><i class="fas fa-spinner fa-spin"></i> Carregando...</div>';
        try {
            var data = await api('GET', '/media');
            state.media = data.files || [];
            renderMediaGrid();
        } catch (err) {
            grid.innerHTML = '<div class="media-loading" style="color:var(--red)">Erro: ' + escHtml(err.message) + '</div>';
        }
    }

    function renderMediaGrid() {
        var filter = document.getElementById('media-filter').value;
        var search = document.getElementById('media-search').value.toLowerCase();
        var grid = document.getElementById('media-grid');
        var list = state.media.filter(function (f) {
            if (filter === 'image' && !(f.mime_type && f.mime_type.startsWith('image/'))) return false;
            if (filter === 'video' && !(f.mime_type && f.mime_type.startsWith('video/'))) return false;
            if (search && !f.filename.toLowerCase().includes(search)) return false;
            return true;
        });
        if (!list.length) { grid.innerHTML = '<div class="media-loading">Nenhum arquivo encontrado.</div>'; return; }
        grid.innerHTML = list.map(function (f) {
            var isImg = f.mime_type && f.mime_type.startsWith('image/');
            var thumb = isImg
                ? '<img class="media-thumb" src="' + escHtml(f.url) + '" alt="' + escHtml(f.filename) + '" loading="lazy">'
                : '<div class="media-thumb-icon"><i class="fas fa-' + (f.mime_type && f.mime_type.startsWith('video/') ? 'film' : 'file') + '"></i></div>';
            return '<div class="media-item" data-filename="' + escHtml(f.filename) + '">' +
                thumb +
                '<div class="media-item-overlay">' +
                '<button class="btn btn-ghost btn-sm" onclick="mediaCopy(\'' + escHtml(f.url) + '\')" title="Copiar URL"><i class="fas fa-copy"></i></button>' +
                '<button class="btn btn-danger btn-sm" onclick="mediaDelete(\'' + escHtml(f.filename) + '\')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                '</div>' +
                '<div class="media-item-footer" title="' + escHtml(f.filename) + '">' + escHtml(f.filename) + '</div>' +
                '</div>';
        }).join('');
    }

    ['media-filter', 'media-search'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', renderMediaGrid);
    });

    window.mediaCopy = function (url) {
        navigator.clipboard.writeText(url).then(
            function () { toast('URL copiada!'); },
            function () { toast('Falha ao copiar', 'error'); }
        );
    };
    window.mediaDelete = function (filename) {
        showConfirm('Excluir arquivo', 'Excluir "' + filename + '"? Esta ação não pode ser desfeita.', async function () {
            try {
                await api('DELETE', '/media/' + encodeURIComponent(filename));
                toast('Arquivo excluído.');
                loadMedia();
            } catch (err) { toast('Erro: ' + err.message, 'error'); }
        });
    };

    async function uploadFiles(fileList) {
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            var fd = new FormData();
            fd.append('file', file);
            try {
                var res = await fetch(state.apiBase + '/media/upload', { method: 'POST', headers: { Authorization: 'Bearer ' + state.token }, body: fd });
                var data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Erro upload');
                toast('Upload: ' + file.name);
            } catch (err) { toast('Erro: ' + err.message, 'error'); }
        }
        loadMedia();
    }

    document.getElementById('media-upload-input').addEventListener('change', function () { uploadFiles(this.files); this.value = ''; });

    var dropzone = document.getElementById('media-dropzone');
    dropzone.addEventListener('dragover', function (e) { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', function () { dropzone.classList.remove('dragover'); });
    dropzone.addEventListener('drop', function (e) { e.preventDefault(); dropzone.classList.remove('dragover'); uploadFiles(e.dataTransfer.files); });
    dropzone.addEventListener('click', function () { document.getElementById('media-upload-input').click(); });

    // ── Analytics (GA4) ──────────────────────────────────────────────────────
    async function loadAnalytics() {
        try {
            var cfg = await api('GET', '/analytics/config');
            if (!cfg.has_service_account && !cfg.ga4_property_id) {
                document.getElementById('analytics-not-configured').removeAttribute('hidden');
                return;
            }
            document.getElementById('analytics-not-configured').setAttribute('hidden', '');
        } catch (e) { return; }

        try {
            var data = await api('GET', '/analytics/ga4');
            var ov = data.overview || {};
            document.getElementById('ga-users').textContent = fmtNum(ov.active_users || ov.users);
            document.getElementById('ga-pageviews').textContent = fmtNum(ov.page_views || ov.pageviews);
            document.getElementById('ga-sessions').textContent = fmtNum(ov.sessions);
            var dur = ov.avg_session_duration;
            document.getElementById('ga-duration').textContent = dur ? (Math.floor(dur / 60) + 'm ' + (dur % 60 | 0) + 's') : '—';

            if (state.chartDaily) { state.chartDaily.destroy(); state.chartDaily = null; }
            var daily = data.daily_chart || [];
            var ctx1 = document.getElementById('chart-daily').getContext('2d');
            state.chartDaily = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: daily.map(function (d) { return d.date; }),
                    datasets: [{ label: 'Pageviews', data: daily.map(function (d) { return d.value; }), borderColor: '#2271b1', backgroundColor: 'rgba(34,113,177,.1)', tension: .3, fill: true, pointRadius: 2 }]
                },
                options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });

            if (state.chartSources) { state.chartSources.destroy(); state.chartSources = null; }
            var sources = data.sources || [];
            var ctx2 = document.getElementById('chart-sources').getContext('2d');
            var srcColors = ['#2271b1', '#00a32a', '#b8860b', '#7e5dc4', '#d63638', '#d97706', '#50575e', '#0c3a6e'];
            state.chartSources = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: sources.map(function (s) { return s.source; }),
                    datasets: [{ data: sources.map(function (s) { return s.value; }), backgroundColor: srcColors, borderWidth: 2 }]
                },
                options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } } }
            });

            var pages = data.top_pages || [];
            var tbody = document.getElementById('analytics-pages-tbody');
            tbody.innerHTML = pages.length
                ? pages.map(function (p, i) { return '<tr><td>' + (i + 1) + '</td><td>' + escHtml(p.page) + '</td><td>' + fmtNum(p.pageviews) + '</td><td>' + fmtNum(p.users) + '</td></tr>'; }).join('')
                : '<tr><td colspan="4" class="table-empty">Nenhum dado disponível.</td></tr>';
        } catch (err) {
            toast('Erro ao carregar analytics: ' + err.message, 'error');
        }
    }

    // ── Widgets ──────────────────────────────────────────────────────────────
    async function loadWidgets() {
        var tbody = document.getElementById('widgets-tbody');
        tbody.innerHTML = '<tr><td colspan="6" class="table-empty"><i class="fas fa-spinner fa-spin"></i> Carregando...</td></tr>';
        try {
            var data = await api('GET', '/widgets');
            state.widgets = data.widgets || [];
            renderWidgetsTable();
        } catch (err) {
            tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Erro: ' + escHtml(err.message) + '</td></tr>';
        }
    }

    function renderWidgetsTable() {
        var tbody = document.getElementById('widgets-tbody');
        if (!state.widgets.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Nenhum widget cadastrado.</td></tr>';
            return;
        }
        tbody.innerHTML = state.widgets.map(function (w) {
            return '<tr>' +
                '<td><strong>' + escHtml(w.name) + '</strong></td>' +
                '<td>' + escHtml(w.placement || '—') + '</td>' +
                '<td><span class="badge ' + (w.type === 'code' ? 'badge-code' : 'badge-image') + '">' + escHtml(w.type || '—') + '</span></td>' +
                '<td>' + escHtml(w.scope || 'all') + '</td>' +
                '<td><span class="badge ' + (w.is_active ? 'badge-active' : 'badge-inactive') + '">' + (w.is_active ? 'Ativo' : 'Inativo') + '</span></td>' +
                '<td class="table-actions">' +
                '<button class="btn btn-ghost btn-sm" onclick="widgetEdit(' + w.id + ')" title="Editar"><i class="fas fa-pen"></i></button>' +
                '<button class="btn btn-danger btn-sm" onclick="widgetDelete(' + w.id + ')" title="Excluir"><i class="fas fa-trash"></i></button>' +
                '</td>' +
                '</tr>';
        }).join('');
    }

    document.getElementById('btn-new-widget').addEventListener('click', function () { openWidgetModal(null); });
    window.widgetEdit = function (id) { openWidgetModal(state.widgets.find(function (w) { return w.id === id; }) || null); };
    window.widgetDelete = function (id) {
        var w = state.widgets.find(function (w) { return w.id === id; });
        showConfirm('Excluir widget', 'Excluir "' + (w ? w.name : '') + '"?', async function () {
            try { await api('DELETE', '/widgets/' + id); toast('Widget excluído.'); loadWidgets(); }
            catch (err) { toast('Erro: ' + err.message, 'error'); }
        });
    };

    function openWidgetModal(w) {
        document.getElementById('widget-modal-title').textContent = w ? 'Editar Widget' : 'Novo Widget';
        document.getElementById('editing-widget-id').value = w ? w.id : '';
        document.getElementById('wg-name').value = w ? (w.name || '') : '';
        document.getElementById('wg-title').value = w ? (w.title || '') : '';
        document.getElementById('wg-placement').value = w ? (w.placement || 'top_banner') : 'top_banner';
        document.getElementById('wg-scope').value = w ? (w.scope || 'all') : 'all';
        document.getElementById('wg-type').value = w ? (w.type || 'image') : 'image';
        document.getElementById('wg-target-url').value = w ? (w.target_url || '') : '';
        document.getElementById('wg-alt-text').value = w ? (w.alt_text || '') : '';
        document.getElementById('wg-order').value = w ? (w.display_order !== undefined ? w.display_order : 0) : 0;
        document.getElementById('wg-active').checked = w ? w.is_active !== false : true;
        document.getElementById('wg-embed-code').value = w ? (w.embed_code || '') : '';
        document.getElementById('wg-media-path').value = w ? (w.media_path || '') : '';
        toggleWidgetTypeFields(w ? (w.type || 'image') : 'image');
        if (w && w.media_path) {
            document.getElementById('wg-media-preview').src = w.media_path;
            document.getElementById('wg-media-preview-wrap').removeAttribute('hidden');
            document.getElementById('wg-upload-wrap').setAttribute('hidden', '');
        } else {
            document.getElementById('wg-media-preview-wrap').setAttribute('hidden', '');
            document.getElementById('wg-upload-wrap').removeAttribute('hidden');
        }
        openModal('modal-widget');
    }

    function toggleWidgetTypeFields(type) {
        document.getElementById('wg-image-section').style.display = type === 'image' ? '' : 'none';
        document.getElementById('wg-code-section').style.display = type === 'code' ? '' : 'none';
    }
    document.getElementById('wg-type').addEventListener('change', function () { toggleWidgetTypeFields(this.value); });

    document.getElementById('wg-media-input').addEventListener('change', async function () {
        var file = this.files[0]; if (!file) return;
        var fd = new FormData(); fd.append('file', file);
        try {
            var res = await fetch(state.apiBase + '/media/upload', { method: 'POST', headers: { Authorization: 'Bearer ' + state.token }, body: fd });
            var data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Erro');
            document.getElementById('wg-media-path').value = data.url;
            document.getElementById('wg-media-preview').src = data.url;
            document.getElementById('wg-media-preview-wrap').removeAttribute('hidden');
            document.getElementById('wg-upload-wrap').setAttribute('hidden', '');
            toast('Mídia do widget salva.');
        } catch (err) { toast('Erro: ' + err.message, 'error'); }
    });
    document.getElementById('btn-remove-widget-media').addEventListener('click', function () {
        document.getElementById('wg-media-path').value = '';
        document.getElementById('wg-media-preview').src = '';
        document.getElementById('wg-media-preview-wrap').setAttribute('hidden', '');
        document.getElementById('wg-upload-wrap').removeAttribute('hidden');
    });

    document.getElementById('btn-save-widget').addEventListener('click', async function () {
        var id = document.getElementById('editing-widget-id').value;
        var name = document.getElementById('wg-name').value.trim();
        if (!name) { toast('Nome é obrigatório.', 'warning'); return; }
        var payload = {
            name: name,
            title: document.getElementById('wg-title').value,
            placement: document.getElementById('wg-placement').value,
            scope: document.getElementById('wg-scope').value,
            type: document.getElementById('wg-type').value,
            target_url: document.getElementById('wg-target-url').value,
            alt_text: document.getElementById('wg-alt-text').value,
            display_order: parseInt(document.getElementById('wg-order').value) || 0,
            is_active: document.getElementById('wg-active').checked,
            embed_code: document.getElementById('wg-embed-code').value,
            media_path: document.getElementById('wg-media-path').value
        };
        try {
            if (id) { await api('PUT', '/widgets/' + id, payload); toast('Widget atualizado!'); }
            else { await api('POST', '/widgets', payload); toast('Widget criado!'); }
            closeModal('modal-widget');
            loadWidgets();
        } catch (err) { toast('Erro: ' + err.message, 'error'); }
    });

    // ── Appearance (rocket cursor) ───────────────────────────────────────────
    var APPEARANCE_SLIDERS = [
        { key: 'scale', label: 'Tamanho do foguete', min: 0.5, max: 3, step: 0.1, def: 1 },
        { key: 'glow', label: 'Brilho do foguete', min: 0, max: 40, step: 1, def: 15 },
        { key: 'tailWidth', label: 'Largura da cauda', min: 1, max: 10, step: 1, def: 3 },
        { key: 'tailLength', label: 'Comprimento da cauda', min: 5, max: 50, step: 1, def: 20 },
        { key: 'smokeSize', label: 'Tamanho da fumaça', min: 1, max: 20, step: 1, def: 6 },
        { key: 'trailDensity', label: 'Densidade do rastro', min: 1, max: 20, step: 1, def: 5 }
    ];
    var appearanceValues = {};

    function loadAppearanceTab() {
        var saved = JSON.parse(localStorage.getItem(CURSOR_KEY) || '{}');
        var grid = document.getElementById('appearance-grid');
        grid.innerHTML = APPEARANCE_SLIDERS.map(function (s) {
            var val = saved[s.key] !== undefined ? saved[s.key] : s.def;
            appearanceValues[s.key] = val;
            return '<div><div class="appearance-slider-row">' +
                '<label>' + escHtml(s.label) + '</label>' +
                '<input type="range" min="' + s.min + '" max="' + s.max + '" step="' + s.step + '" value="' + val + '" data-key="' + s.key + '">' +
                '<span class="slider-val" id="av-' + s.key + '">' + val + '</span>' +
                '</div></div>';
        }).join('');
        grid.querySelectorAll('input[type="range"]').forEach(function (inp) {
            inp.addEventListener('input', function () {
                appearanceValues[this.dataset.key] = parseFloat(this.value);
                document.getElementById('av-' + this.dataset.key).textContent = this.value;
            });
        });
    }

    document.getElementById('btn-save-appearance').addEventListener('click', function () {
        localStorage.setItem(CURSOR_KEY, JSON.stringify(appearanceValues));
        toast('Aparência salva!');
    });

    // ── Settings ─────────────────────────────────────────────────────────────
    async function loadSettings() {
        try {
            var data = await api('GET', '/settings/company');
            var cfg = data.settings || data;
            document.getElementById('cfg-company-name').value = cfg.company_name || cfg.name || '';
            document.getElementById('cfg-company-email').value = cfg.company_email || cfg.email || '';
            document.getElementById('cfg-company-phone').value = cfg.company_phone || cfg.phone || '';
            document.getElementById('cfg-company-address').value = cfg.company_address || cfg.address || '';
            if (cfg.logo_url) {
                document.getElementById('company-logo-preview').src = cfg.logo_url;
                document.getElementById('company-logo-preview').removeAttribute('hidden');
            }
        } catch (e) { /* no company settings yet */ }

        try {
            var acfg = await api('GET', '/analytics/config');
            document.getElementById('cfg-ga4-mid').value = acfg.ga4_measurement_id || '';
            document.getElementById('cfg-ga4-pid').value = acfg.ga4_property_id || '';
        } catch (e) { /* ok */ }

        try {
            var gcfg = await api('GET', '/github/config');
            document.getElementById('cfg-gh-owner').value = gcfg.repo_owner || '';
            document.getElementById('cfg-gh-repo').value = gcfg.repo_name || '';
            document.getElementById('cfg-gh-branch').value = gcfg.branch || 'main';
        } catch (e) { /* ok */ }
    }

    document.getElementById('btn-save-company').addEventListener('click', async function () {
        try {
            await api('PUT', '/settings/company', {
                company_name: document.getElementById('cfg-company-name').value,
                company_email: document.getElementById('cfg-company-email').value,
                company_phone: document.getElementById('cfg-company-phone').value,
                company_address: document.getElementById('cfg-company-address').value
            });
            toast('Dados da empresa salvos!');
        } catch (err) { toast('Erro: ' + err.message, 'error'); }
    });

    document.getElementById('company-logo-input').addEventListener('change', async function () {
        var file = this.files[0]; if (!file) return;
        var fd = new FormData(); fd.append('file', file);
        try {
            var res = await fetch(state.apiBase + '/media/upload', { method: 'POST', headers: { Authorization: 'Bearer ' + state.token }, body: fd });
            var data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Erro');
            await api('PUT', '/settings/company', { logo_url: data.url });
            document.getElementById('company-logo-preview').src = data.url;
            document.getElementById('company-logo-preview').removeAttribute('hidden');
            toast('Logo atualizado!');
        } catch (err) { toast('Erro: ' + err.message, 'error'); }
    });

    document.getElementById('btn-save-analytics').addEventListener('click', async function () {
        var jsonRaw = document.getElementById('cfg-ga4-json').value.trim();
        var payload = {
            ga4_measurement_id: document.getElementById('cfg-ga4-mid').value.trim(),
            ga4_property_id: document.getElementById('cfg-ga4-pid').value.trim()
        };
        if (jsonRaw) {
            try { JSON.parse(jsonRaw); } catch (e) { toast('JSON da conta de serviço inválido.', 'error'); return; }
            payload.service_account_json = jsonRaw;
        }
        try {
            await api('PUT', '/analytics/config', payload);
            toast('Configuração GA4 salva!');
        } catch (err) { toast('Erro: ' + err.message, 'error'); }
    });

    document.getElementById('btn-test-analytics').addEventListener('click', async function () {
        try {
            await api('GET', '/analytics/ga4');
            toast('Conexão GA4 funcionando!');
        } catch (err) { toast('Erro GA4: ' + err.message, 'error'); }
    });

    document.getElementById('btn-save-github').addEventListener('click', async function () {
        var pat = document.getElementById('cfg-gh-pat').value.trim();
        var payload = {
            repo_owner: document.getElementById('cfg-gh-owner').value.trim(),
            repo_name: document.getElementById('cfg-gh-repo').value.trim(),
            branch: document.getElementById('cfg-gh-branch').value.trim() || 'main'
        };
        if (pat) payload.github_pat = pat;
        try {
            await api('PUT', '/github/config', payload);
            toast('Configuração GitHub salva!');
        } catch (err) { toast('Erro: ' + err.message, 'error'); }
    });

    document.getElementById('btn-test-github').addEventListener('click', async function () {
        try {
            var cfg = await api('GET', '/github/config');
            if (!cfg.repo_owner) { toast('Configuração incompleta.', 'warning'); return; }
            await api('POST', '/github/proxy', { method: 'GET', path: 'repos/' + cfg.repo_owner + '/' + cfg.repo_name });
            toast('Conexão GitHub funcionando!');
        } catch (err) { toast('Erro GitHub: ' + err.message, 'error'); }
    });

    document.getElementById('btn-change-password').addEventListener('click', async function () {
        var oldPw = document.getElementById('cfg-old-password').value;
        var newPw = document.getElementById('cfg-new-password').value;
        var confPw = document.getElementById('cfg-confirm-password').value;
        if (!oldPw || !newPw) { toast('Preencha todos os campos.', 'warning'); return; }
        if (newPw.length < 8) { toast('Nova senha deve ter pelo menos 8 caracteres.', 'warning'); return; }
        if (newPw !== confPw) { toast('Senhas não conferem.', 'warning'); return; }
        try {
            await api('POST', '/auth/change-password', { old_password: oldPw, new_password: newPw });
            toast('Senha alterada com sucesso!');
            ['cfg-old-password', 'cfg-new-password', 'cfg-confirm-password'].forEach(function (id) { document.getElementById(id).value = ''; });
        } catch (err) { toast('Erro: ' + err.message, 'error'); }
    });

    // ── Boot ─────────────────────────────────────────────────────────────────
    restoreSession();

})();
