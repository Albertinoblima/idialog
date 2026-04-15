// ─── STATE ────────────────────────────────────────────────────────────────
const S = {
  round: 1, queue: [], idx: 0, answered: false,
  results: [], failIds: new Set(), seen: new Set(),
  voice: null, speaking: false
};
const LETTERS = ['A', 'B', 'C', 'D'];

// ─── BUILD QUEUE ─────────────────────────────────────────────────────────
function buildQueue() {
  if (S.round === 1) return [...ALL];
  const failRetry = ALL.filter(q => S.failIds.has(q.id) && !S.seen.has(q.id + '_r' + S.round));
  if (failRetry.length) return failRetry;
  return ALL.filter(q => S.seen.has(q.id + '_r1') && S.failIds.has(q.id));
}

function startRound() {
  S.queue = buildQueue();
  if (!S.queue.length) { showScore(); return; }
  S.idx = 0; S.answered = false; S.results = S.round === 1 ? [] : S.results;
  updateRoundInfo();
  renderMap();
  renderQ();
}

function updateRoundInfo() {
  const info = document.getElementById('round-info');
  if (info) {
    info.textContent = S.round === 1
      ? `Rodada 1 · ${S.queue.length} questões`
      : `Rodada ${S.round} · Praticando ${S.failIds.size} área(s) com erro · ${S.queue.length} questão(ões)`;
  }
}

// ─── MAP ─────────────────────────────────────────────────────────────────
function renderMap() {
  const map = document.getElementById('q-map');
  map.innerHTML = S.queue.map((q, i) => {
    const r = S.results.find(x => x.id === q.id);
    let cls = 'qm-dot';
    if (i === S.idx) cls += ' cur';
    else if (r && r.correct) cls += ' ok';
    else if (r && !r.correct) cls += ' err';
    return `<div class="${cls}" onclick="jumpTo(${i})" title="${TOPICS[q.topic]} — Q${i + 1}">${i + 1}</div>`;
  }).join('');
}

function jumpTo(i) {
  if (i >= S.idx) return;
  S.idx = i; S.answered = false; renderQ();
}

// ─── RENDER QUESTION ──────────────────────────────────────────────────────
function renderQ() {
  stopVoice();
  const q = S.queue[S.idx];
  const tc = TOPIC_COLOR[q.topic] || { bg: '#E6F1FB', c: '#0C447C' };
  const difLabel = { l: 'Básico', m: 'Intermediário', h: 'Avançado' }[q.dif];
  const difClass = { l: 'dif-l', m: 'dif-m', h: 'dif-h' }[q.dif];
  const pct = Math.round((S.idx / S.queue.length) * 100);

  document.getElementById('prog-txt').textContent = `Questão ${S.idx + 1} de ${S.queue.length}`;
  document.getElementById('prog-pct').textContent = `${pct}%`;
  document.getElementById('prog-fill').style.width = `${pct}%`;

  updateStats();
  renderMap();

  // Banner adaptativo
  const banner = S.round > 1
    ? `<div class="adaptive-banner"><span class="ab-icon">🔁</span><div class="ab-text"><strong>Modo adaptativo — Rodada ${S.round}:</strong> Praticando questões das áreas onde você errou.</div></div>`
    : '';

  document.getElementById('question-area').innerHTML = `
    ${banner}
    <div class="q-card">
      <div class="q-meta">
        <span class="q-num">Q${S.idx + 1}/${S.queue.length}</span>
        <span class="q-topic" style="background:${tc.bg};color:${tc.c}">${TOPICS[q.topic]}</span>
        <span class="difficulty ${difClass}">${difLabel}</span>
      </div>
      <div class="q-text">${q.text}</div>
      <div class="opts" id="opts-wrap">
        ${q.opts.map((o, i) => `
          <button class="opt" id="opt-${i}" onclick="doAnswer(${i})">
            <span class="opt-letter">${LETTERS[i]}</span>
            <span class="opt-text">${o}</span>
          </button>`).join('')}
      </div>
    </div>
    <div class="feedback" id="feedback"></div>
    <div class="nav-row">
      <span class="nav-info">${S.queue.length - S.idx - 1} questão(ões) restante(s)</span>
      <button class="btn-next" id="btn-next" onclick="doNext()" disabled>
        ${S.idx < S.queue.length - 1 ? 'Próxima →' : 'Ver resultado'}
      </button>
    </div>`;
}

// ─── ANSWER ───────────────────────────────────────────────────────────────
function doAnswer(chosen) {
  if (S.answered) return;
  S.answered = true;
  const q = S.queue[S.idx];
  const correct = chosen === q.ans;

  // Mark as seen
  S.seen.add(q.id + '_r' + S.round);

  // Record result
  const existing = S.results.find(r => r.id === q.id);
  if (existing) { existing.correct = correct; existing.chosen = chosen; }
  else S.results.push({ id: q.id, topic: q.topic, correct, chosen, text: q.text });

  if (!correct) S.failIds.add(q.id);
  else S.failIds.delete(q.id);

  // Style opts
  for (let i = 0; i < q.opts.length; i++) {
    const b = document.getElementById(`opt-${i}`);
    if (!b) continue;
    b.disabled = true; b.onclick = null;
    if (i === q.ans) b.classList.add('correct');
    else if (i === chosen && !correct) b.classList.add('wrong');
    else b.classList.add('dimmed');
  }

  // Render feedback
  const fb = document.getElementById('feedback');
  const tc = TOPIC_COLOR[q.topic] || { bg: '#E6F1FB', c: '#0C447C' };
  const altErrors = q.erros.map((e, i) => {
    if (i === q.ans) return '';
    return `<div class="alt-error-item"><span class="ae-letter">${LETTERS[i]}</span><span class="ae-text">${e}</span></div>`;
  }).join('');

  fb.innerHTML = `
    <div class="fb-header">
      <div class="fb-verdict">
        <div class="fb-icon ${correct ? 'fi-ok' : 'fi-err'}">${correct ? '✓' : '✗'}</div>
        <span class="fb-title ${correct ? 'ft-ok' : 'ft-err'}">${correct ? 'Resposta correta!' : 'Incorreto — alternativa ' + LETTERS[q.ans] + ' é a correta'}</span>
      </div>
      <div class="fb-actions">
        <button class="fb-btn voice" id="voice-btn" onclick="speakFeedback()">▶ Ouvir</button>
      </div>
    </div>
    <div class="fb-section">
      <div class="fb-section-title">Explicação</div>
      <div class="fb-exp" id="fb-exp-text">${q.exp}</div>
    </div>
    ${q.tip ? `<div class="callout-mini ${q.tiptype || 'cm-gold'}"><strong>${q.tiptype === 'cm-red' ? 'Atenção:' : q.tiptype === 'cm-teal' ? 'Dica:' : q.tiptype === 'cm-purple' ? 'Exemplo:' : 'Macete:'}</strong> ${q.tip}</div>` : ''}
    ${altErrors ? `<div class="fb-section" style="margin-top:.75rem"><div class="fb-section-title">Por que as outras alternativas estão erradas</div><div class="alt-errors">${altErrors}</div></div>` : ''}`;

  fb.classList.add('show');
  document.getElementById('btn-next').disabled = false;
  updateStats();
}

function speakFeedback() {
  if (!window.speechSynthesis) return;
  const btn = document.getElementById('voice-btn');
  if (S.speaking) { stopVoice(); return; }
  const q = S.queue[S.idx];
  const expEl = document.getElementById('fb-exp-text');

  // Construir narração completa: explicação + dica + por que cada alternativa errada está incorreta
  const parts = [];
  if (expEl) parts.push('Explicação: ' + expEl.textContent);
  if (q.tip) parts.push('Dica: ' + q.tip);
  q.erros.forEach((e, i) => {
    if (i !== q.ans && e) {
      parts.push('Alternativa ' + LETTERS[i] + ' está errada porque: ' + e);
    }
  });

  let text = parts.join('. ').substring(0, 5000);
  S.voice = new SpeechSynthesisUtterance(text);
  S.voice.lang = 'pt-BR'; S.voice.rate = 0.88;
  S.voice.onstart = () => { S.speaking = true; if (btn) { btn.textContent = '⏹ Parar'; btn.classList.add('playing'); } };
  S.voice.onend = () => { S.speaking = false; if (btn) { btn.textContent = '▶ Ouvir'; btn.classList.remove('playing'); } };
  S.voice.onerror = () => { S.speaking = false; };
  window.speechSynthesis.speak(S.voice);
}

function stopVoice() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  S.speaking = false;
  document.querySelectorAll('.voice').forEach(b => { b.textContent = '▶ Ouvir'; b.classList.remove('playing'); });
}

// ─── NEXT ─────────────────────────────────────────────────────────────────
function doNext() {
  stopVoice();
  if (S.idx < S.queue.length - 1) { S.idx++; S.answered = false; renderQ(); }
  else showScore();
}

// ─── STATS ────────────────────────────────────────────────────────────────
function updateStats() {
  const total = S.results.length;
  const ok = S.results.filter(r => r.correct).length;
  const err = total - ok;
  const pct = total ? Math.round(ok / total * 100) : 0;
  document.getElementById('s-total').textContent = total;
  document.getElementById('s-ok').textContent = ok;
  document.getElementById('s-err').textContent = err;
  document.getElementById('s-pct').textContent = total ? pct + '%' : '—';
}

// ─── SCORE ────────────────────────────────────────────────────────────────
function showScore() {
  stopVoice();
  document.getElementById('app').style.display = 'none';
  const sc = document.getElementById('score-screen');
  sc.style.display = 'block';

  const total = S.results.length;
  const ok = S.results.filter(r => r.correct).length;
  const pct = Math.round(ok / total * 100);

  let scoreColor = '#0D7A5C', msg = '', sub = '';
  if (pct >= 80) { scoreColor = '#0D7A5C'; msg = 'Excelente domínio da matéria!'; sub = 'Você está muito bem preparado para o próximo concurso!'; }
  else if (pct >= 60) { scoreColor = '#A06B10'; msg = 'Bom desempenho — aprofunde os erros.'; sub = 'Revise os tópicos indicados abaixo e pratique mais questões.'; }
  else { scoreColor = '#B83232'; msg = 'Continue estudando — você consegue!'; sub = 'Foque nas áreas com erro e use o modo adaptativo para reforçar.'; }

  // Área analysis
  const areaMap = {};
  ALL.forEach(q => { if (!areaMap[q.topic]) areaMap[q.topic] = { ok: 0, total: 0 }; });
  S.results.forEach(r => {
    if (!areaMap[r.topic]) areaMap[r.topic] = { ok: 0, total: 0 };
    areaMap[r.topic].total++;
    if (r.correct) areaMap[r.topic].ok++;
  });

  const areaCards = Object.entries(areaMap)
    .filter(([, v]) => v.total > 0)
    .map(([k, v]) => {
      const ap = Math.round(v.ok / v.total * 100);
      const tc = TOPIC_COLOR[k] || { bg: '#E6F1FB', c: '#0C447C' };
      const bclass = ap >= 70 ? 'dif-l' : ap >= 40 ? 'dif-m' : 'dif-h';
      const blabel = ap >= 70 ? 'Dominada' : ap >= 40 ? 'Revisar' : 'Foco aqui';
      const fillcolor = ap >= 70 ? '#0D7A5C' : ap >= 40 ? '#A06B10' : '#B83232';
      return `<div class="area-card">
        <div class="ac-head">
          <div class="ac-name" style="color:${tc.c}">${TOPICS[k]}</div>
          <span class="ac-badge ${bclass}">${blabel}</span>
        </div>
        <div class="ac-bar"><div class="ac-fill" style="width:${ap}%;background:${fillcolor}"></div></div>
        <div class="ac-score">${v.ok}/${v.total} · ${ap}%</div>
      </div>`;
    }).join('');

  const erradas = S.results.filter(r => !r.correct);
  const canRetry = S.failIds.size > 0;
  const reviewList = erradas.map(r => {
    const q = ALL.find(x => x.id === r.id);
    if (!q) return '';
    const tc = TOPIC_COLOR[q.topic] || { bg: '#E6F1FB', c: '#0C447C' };
    return `<div class="rv-item">
      <div class="rv-meta">
        <span class="rv-icon">✗</span>
        <span class="rv-num">${q.id}</span>
        <span class="rv-topic" style="background:${tc.bg};color:${tc.c}">${TOPICS[q.topic]}</span>
      </div>
      <div class="rv-q">${q.text}</div>
      <div class="rv-ans wrong">Você marcou: <strong>${LETTERS[r.chosen]}</strong> — Correta: <strong>${LETTERS[q.ans]}</strong> — ${q.opts[q.ans]}</div>
    </div>`;
  }).join('');

  sc.innerHTML = `
    <div class="score-hero">
      <div class="score-pct" style="color:${scoreColor}">${pct}%</div>
      <div class="score-pct-label">${ok} de ${total} questões corretas</div>
      <div class="score-msg">${msg}</div>
      <div class="score-sub">${sub}</div>
    </div>

    <div class="area-grid">${areaCards}</div>

    ${canRetry ? `<div class="retry-section">
      <div class="retry-title">Modo Adaptativo</div>
      <div class="retry-desc">Você errou questões em <strong>${S.failIds.size}</strong> tópico(s). O modo adaptativo irá focar exatamente nos pontos onde você precisa melhorar, com questões diferentes sobre os mesmos temas.</div>
      <div class="score-actions">
        <button class="sact gold" onclick="doRetry()">↺ Praticar erros (Rodada ${S.round + 1})</button>
        <button class="sact prim" onclick="doRestart()">⟳ Reiniciar simulado completo</button>
        <button class="sact" onclick="scrollToReview()">📋 Ver questões erradas</button>
      </div>
    </div>` : `<div class="retry-section">
      <div class="retry-title">Parabéns!</div>
      <div class="retry-desc">Você acertou todas as questões desta rodada. Tente reiniciar o simulado completo ou volte à revista de estudos para revisar o conteúdo teórico.</div>
      <div class="score-actions">
        <button class="sact prim" onclick="doRestart()">⟳ Novo simulado</button>
      </div>
    </div>`}

    ${erradas.length ? `<div class="review-list" id="review-anchor">
      <div style="font-family:var(--font-h);font-size:1.3rem;font-weight:700;margin-bottom:.75rem">Revisão das questões erradas</div>
      ${reviewList}
    </div>` : ''}`;
}

function doRetry() {
  S.round++;
  document.getElementById('app').style.display = 'block';
  document.getElementById('score-screen').style.display = 'none';
  S.idx = 0; S.answered = false;
  startRound();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function doRestart() {
  S.round = 1; S.idx = 0; S.answered = false;
  S.results = []; S.failIds = new Set(); S.seen = new Set();
  document.getElementById('app').style.display = 'block';
  document.getElementById('score-screen').style.display = 'none';
  startRound();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToReview() {
  const el = document.getElementById('review-anchor');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleDark() {
  const d = document.documentElement;
  if (d.hasAttribute('data-dark')) d.removeAttribute('data-dark');
  else d.setAttribute('data-dark', '');
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = d.hasAttribute('data-dark') ? '☀️ Modo claro' : '🌙 Modo escuro';
}

// ─── INIT ─────────────────────────────────────────────────────────────────
startRound();
