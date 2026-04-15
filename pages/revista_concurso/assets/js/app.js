/* ════════════════════════════════════════════════════════════════════
   APP — Controller principal do SPA Aprova Concursos
   Gerencia views, perfil, dashboard e integração entre módulos.
   ════════════════════════════════════════════════════════════════════ */

window.App = (() => {
    'use strict';

    const VIEWS = ['landing', 'profile', 'dashboard', 'study'];
    let currentView = 'landing';

    // ── View Router ─────────────────────────────────────────────────
    function goTo(view) {
        if (!VIEWS.includes(view)) return;
        VIEWS.forEach(v => {
            const el = document.getElementById('view-' + v);
            if (el) el.style.display = (v === view) ? '' : 'none';
        });
        currentView = view;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (view === 'dashboard') renderDashboard();
        if (view === 'profile') populateProfileForm();
        if (view === 'study') {
            // Ensure first chapter is visible
            if (typeof showChapter === 'function') {
                const active = document.querySelector('.chapter.visible');
                if (!active) showChapter('dpp');
            }
        }
    }

    function goBack() {
        if (Student.isRegistered()) goTo('dashboard');
        else goTo('landing');
    }

    // ── Init — decide qual view mostrar ─────────────────────────────
    function init() {
        // Check URL hash
        const hash = window.location.hash.replace('#', '');
        if (VIEWS.includes(hash)) {
            goTo(hash);
        } else if (Student.isRegistered()) {
            goTo('dashboard');
        } else {
            goTo('landing');
        }

        // Listen to hash changes
        window.addEventListener('hashchange', () => {
            const h = window.location.hash.replace('#', '');
            if (VIEWS.includes(h)) goTo(h);
        });
    }

    // ── Profile Form ────────────────────────────────────────────────
    function populateProfileForm() {
        const profile = Student.loadProfile();
        const isEdit = profile && profile.name;

        // Populate concursos dropdown
        const selConc = document.getElementById('pf-concurso');
        if (selConc && selConc.options.length <= 1) {
            CATALOG.concursos.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.label;
                selConc.appendChild(opt);
            });
        }

        // Populate bancas dropdown
        const selBanca = document.getElementById('pf-banca');
        if (selBanca && selBanca.options.length <= 1) {
            CATALOG.bancas.forEach(b => {
                const opt = document.createElement('option');
                opt.value = b.id;
                opt.textContent = b.label;
                selBanca.appendChild(opt);
            });
        }

        // Fill form if editing
        if (isEdit) {
            document.getElementById('pf-name').value = profile.name || '';
            document.getElementById('pf-email').value = profile.email || '';
            document.getElementById('pf-phone').value = profile.phone || '';
            if (selConc) selConc.value = profile.targetConcurso || '';
            if (selBanca) selBanca.value = profile.targetBanca || '';

            if (profile.photo) {
                const img = document.getElementById('photo-preview');
                const ph = document.getElementById('photo-placeholder');
                if (img) { img.src = profile.photo; img.style.display = 'block'; }
                if (ph) ph.style.display = 'none';
            }

            const btnDel = document.getElementById('btn-delete-profile');
            if (btnDel) btnDel.style.display = '';
        }

        // Render areas selector
        renderAreasSelector(profile);
    }

    function renderAreasSelector(profile) {
        const container = document.getElementById('areas-selector');
        if (!container) return;

        const selectedAreas = (profile && profile.selectedAreas) || [];
        const selectedSubjects = (profile && profile.selectedSubjects) || [];

        container.innerHTML = CATALOG.areas.map(area => {
            const subjects = CATALOG.getSubjectsByArea(area.id);
            const areaChecked = selectedAreas.includes(area.id);
            return `
        <div class="area-selector-block">
          <label class="area-toggle">
            <input type="checkbox" name="area" value="${area.id}" ${areaChecked ? 'checked' : ''} onchange="App.toggleArea('${area.id}', this.checked)">
            <i class="${area.icon}" style="color:${area.color}"></i>
            <span>${area.label}</span>
            <span class="area-count">${subjects.length} matérias</span>
          </label>
          <div class="subjects-list" id="subjects-${area.id}" ${areaChecked ? '' : 'style="display:none"'}>
            ${subjects.map(s => {
                const checked = selectedSubjects.includes(s.id);
                const available = s.hasContent || s.hasQuestions;
                return `<label class="subject-check ${available ? '' : 'coming-soon'}">
                <input type="checkbox" name="subject" value="${s.id}" ${checked ? 'checked' : ''} ${available ? '' : 'disabled'}>
                <span>${s.label}</span>
                ${!available ? '<span class="soon-badge">Em breve</span>' : ''}
                ${s.hasQuestions ? '<span class="has-badge has-quiz"><i class="fa-solid fa-circle-question"></i></span>' : ''}
                ${s.hasReforco ? '<span class="has-badge has-reforco"><i class="fa-solid fa-dumbbell"></i></span>' : ''}
              </label>`;
            }).join('')}
          </div>
        </div>`;
        }).join('');
    }

    function toggleArea(areaId, checked) {
        const subList = document.getElementById('subjects-' + areaId);
        if (subList) subList.style.display = checked ? '' : 'none';
        if (checked) {
            // Auto-select available subjects
            subList.querySelectorAll('input[name="subject"]:not(:disabled)').forEach(cb => cb.checked = true);
        } else {
            subList.querySelectorAll('input[name="subject"]').forEach(cb => cb.checked = false);
        }
    }

    function onConcursoChange() {
        const concursoId = document.getElementById('pf-concurso').value;
        const concurso = CATALOG.concursos.find(c => c.id === concursoId);

        // Auto-set banca
        if (concurso && concurso.banca) {
            document.getElementById('pf-banca').value = concurso.banca;
        }

        // Auto-select areas for this concurso
        if (concurso && concurso.areas.length) {
            CATALOG.areas.forEach(area => {
                const cb = document.querySelector(`input[name="area"][value="${area.id}"]`);
                if (cb) {
                    cb.checked = concurso.areas.includes(area.id);
                    toggleArea(area.id, cb.checked);
                }
            });
        }
    }

    function handlePhoto(event) {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 500000) {
            alert('Imagem muito grande. Use uma foto menor que 500KB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById('photo-preview');
            const ph = document.getElementById('photo-placeholder');
            if (img) { img.src = e.target.result; img.style.display = 'block'; }
            if (ph) ph.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    function saveProfile(event) {
        event.preventDefault();

        const selectedAreas = Array.from(document.querySelectorAll('input[name="area"]:checked')).map(cb => cb.value);
        const selectedSubjects = Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(cb => cb.value);
        const photoImg = document.getElementById('photo-preview');

        const data = {
            name: document.getElementById('pf-name').value.trim(),
            email: document.getElementById('pf-email').value.trim(),
            phone: document.getElementById('pf-phone').value.trim(),
            photo: (photoImg && photoImg.style.display !== 'none') ? photoImg.src : '',
            targetConcurso: document.getElementById('pf-concurso').value,
            targetBanca: document.getElementById('pf-banca').value,
            selectedAreas: selectedAreas,
            selectedSubjects: selectedSubjects,
        };

        if (!data.name) {
            alert('Por favor, informe seu nome.');
            return;
        }

        if (Student.isRegistered()) {
            Student.updateProfile(data);
        } else {
            Student.register(data);
        }

        goTo('dashboard');
    }

    function confirmDeleteProfile() {
        if (confirm('Tem certeza que deseja excluir seu perfil? Todo o seu progresso será perdido.')) {
            Student.deleteProfile();
            goTo('landing');
        }
    }

    // ── Dashboard ───────────────────────────────────────────────────
    function renderDashboard() {
        const profile = Student.loadProfile();
        const progress = Student.loadProgress();
        if (!profile) return;

        // Greeting
        const greeting = document.getElementById('dash-greeting');
        const hour = new Date().getHours();
        const timeGreet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
        if (greeting) greeting.textContent = `${timeGreet}, ${profile.name.split(' ')[0]}!`;

        // Avatar
        const avatar = document.getElementById('dash-avatar');
        if (avatar && profile.photo) {
            avatar.innerHTML = `<img src="${sanitizeUrl(profile.photo)}" alt="Foto">`;
        }

        // Streak
        const streakEl = document.getElementById('dash-streak');
        if (streakEl) {
            const today = new Date().toISOString().slice(0, 10);
            if (progress.lastStudyDate === today) {
                streakEl.innerHTML = `<i class="fa-solid fa-fire" style="color:#fbbf24"></i> ${progress.streak} dia(s) de estudo consecutivo`;
            } else if (progress.streak > 0) {
                streakEl.innerHTML = `<i class="fa-solid fa-clock" style="color:#8b93a8"></i> Continue estudando para manter sua sequência!`;
            } else {
                streakEl.innerHTML = `<i class="fa-solid fa-play" style="color:#00e5ff"></i> Comece a estudar hoje!`;
            }
        }

        // Quick stats
        setTextContent('ds-total', progress.totalQuestions);
        setTextContent('ds-correct', progress.totalCorrect);
        setTextContent('ds-accuracy', progress.totalQuestions > 0 ? Math.round(progress.totalCorrect / progress.totalQuestions * 100) + '%' : '—');
        setTextContent('ds-streak', progress.streak);

        // Performance by subject
        renderPerformance(progress);

        // Recommendations
        renderRecommendations();

        // Recent activity
        renderActivity(progress);

        // Quick access
        renderQuickAccess(profile);
    }

    function renderPerformance(progress) {
        const container = document.getElementById('dash-performance');
        if (!container) return;

        const entries = Object.entries(progress.bySubject);
        if (!entries.length) {
            container.innerHTML = '<div class="dash-empty"><i class="fa-solid fa-chart-pie"></i><p>Responda algumas questões para ver seu desempenho aqui.</p></div>';
            return;
        }

        container.innerHTML = entries.map(([subId, data]) => {
            const meta = CATALOG.getSubject(subId);
            const label = meta ? meta.label : subId;
            const pct = data.total > 0 ? Math.round(data.correct / data.total * 100) : 0;
            const area = meta ? CATALOG.getArea(meta.area) : null;
            const color = area ? area.color : '#00e5ff';
            const statusClass = pct >= 70 ? 'perf-good' : pct >= 50 ? 'perf-ok' : 'perf-weak';
            const statusLabel = pct >= 70 ? 'Dominada' : pct >= 50 ? 'Revisar' : 'Foco aqui';
            return `<div class="perf-row">
        <div class="perf-info">
          <span class="perf-name">${escapeHtml(label)}</span>
          <span class="perf-detail">${data.correct}/${data.total} · ${data.sessions} sessão(ões)</span>
        </div>
        <div class="perf-bar-wrap">
          <div class="perf-bar"><div class="perf-fill" style="width:${pct}%;background:${color}"></div></div>
          <span class="perf-pct">${pct}%</span>
        </div>
        <span class="perf-status ${statusClass}">${statusLabel}</span>
      </div>`;
        }).join('');
    }

    function renderRecommendations() {
        const container = document.getElementById('dash-recommendations');
        if (!container) return;

        const recs = Student.getStudyRecommendation();
        if (!recs.length) {
            container.innerHTML = '<div class="dash-empty"><i class="fa-solid fa-wand-magic-sparkles"></i><p>Complete seu perfil para receber recomendações.</p></div>';
            return;
        }

        const top = recs.slice(0, 6);
        container.innerHTML = top.map(r => {
            const icons = { critical: 'fa-circle-exclamation', high: 'fa-triangle-exclamation', new: 'fa-circle-plus', medium: 'fa-minus', low: 'fa-circle-check' };
            const colors = { critical: '#ff6b6b', high: '#fbbf24', new: '#00e5ff', medium: '#8b93a8', low: '#00ff88' };
            const labels = { critical: 'Prioridade máxima', high: 'Precisa de atenção', new: 'Não estudada', medium: 'Em progresso', low: 'Boa performance' };
            return `<div class="rec-item">
        <i class="fa-solid ${icons[r.priority]}" style="color:${colors[r.priority]}"></i>
        <div class="rec-info">
          <span class="rec-name">${escapeHtml(r.label)}</span>
          <span class="rec-detail">${labels[r.priority]}${r.accuracy !== null ? ' · ' + r.accuracy + '%' : ''}</span>
        </div>
        ${r.hasContent ? `<button class="rec-action" onclick="App.goToSubject('${r.id}')"><i class="fa-solid fa-book-open"></i></button>` : ''}
        ${r.hasQuestions ? `<button class="rec-action" onclick="window.location='simulador.html'"><i class="fa-solid fa-play"></i></button>` : ''}
      </div>`;
        }).join('');
    }

    function renderActivity(progress) {
        const container = document.getElementById('dash-activity');
        if (!container) return;

        const recent = Student.getRecentActivity(7);
        if (!recent.length) {
            container.innerHTML = '<div class="dash-empty"><i class="fa-solid fa-hourglass-start"></i><p>Suas sessões de estudo aparecerão aqui.</p></div>';
            return;
        }

        container.innerHTML = recent.slice(0, 8).map(h => {
            const meta = CATALOG.getSubject(h.subjectId);
            const label = meta ? meta.label : h.subjectId;
            const pct = h.total > 0 ? Math.round(h.correct / h.total * 100) : 0;
            const date = new Date(h.date);
            const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            return `<div class="activity-item">
        <span class="act-date">${dateStr}</span>
        <span class="act-name">${escapeHtml(label)}</span>
        <span class="act-result">${h.correct}/${h.total} (${pct}%)</span>
      </div>`;
        }).join('');
    }

    function renderQuickAccess(profile) {
        const container = document.getElementById('dash-quick-access');
        if (!container) return;

        const items = [
            { icon: 'fa-book-open', label: 'Revista de Estudos', desc: '5 disciplinas com conteúdo completo', action: "App.goTo('study')", color: '#00e5ff' },
            { icon: 'fa-play', label: 'Montar Simulado', desc: 'Escolha matérias e nível de dificuldade', action: "window.location='simulador.html'", color: '#a855f7' },
        ];

        // Add subject-specific shortcuts
        const available = CATALOG.getAvailableSubjects();
        const selected = profile.selectedSubjects || [];
        const relevant = available.filter(s => selected.includes(s.id)).slice(0, 4);
        relevant.forEach(s => {
            const chap = CATALOG.chapterMap[s.id];
            if (chap) {
                items.push({ icon: 'fa-file-lines', label: s.label, desc: 'Conteúdo teórico + flashcards', action: `App.goToSubject('${s.id}')`, color: CATALOG.getArea(s.area)?.color || '#00e5ff' });
            }
        });

        container.innerHTML = `<div class="quick-grid">${items.map(item =>
            `<button class="quick-card" onclick="${item.action}">
        <div class="quick-icon" style="--qc:${item.color}"><i class="fa-solid ${item.icon}"></i></div>
        <div class="quick-info"><span class="quick-label">${item.label}</span><span class="quick-desc">${item.desc}</span></div>
      </button>`
        ).join('')}</div>`;
    }

    function goToSubject(subjectId) {
        const chap = CATALOG.chapterMap[subjectId];
        if (chap) {
            goTo('study');
            setTimeout(() => { if (typeof showChapter === 'function') showChapter(chap); }, 100);
        }
    }

    // ── Utilities ───────────────────────────────────────────────────
    function setTextContent(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function sanitizeUrl(url) {
        if (typeof url !== 'string') return '';
        if (url.startsWith('data:image/')) return url;
        return '';
    }

    // ── Public API ──────────────────────────────────────────────────
    return {
        goTo, goBack, init,
        saveProfile, confirmDeleteProfile, handlePhoto,
        toggleArea, onConcursoChange,
        goToSubject,
        renderDashboard,
    };
})();

// ── Boot ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
