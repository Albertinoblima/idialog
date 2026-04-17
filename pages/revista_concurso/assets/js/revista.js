const CHAPS = ['dpp', 'rl', 'da', 'dc', 'dcv'];
let synth = window.speechSynthesis;
let currentUtt = null;
let currentVoice = null;
let speakingToken = 0;
const voiceRateSteps = [0.5, 0.7, 0.9, 1.0, 1.2, 1.5, 2.0];
let voiceRateIdx = 2;
let voiceRate = voiceRateSteps[voiceRateIdx];
const fontSizeSteps = [12, 14, 16, 18, 20, 22];
let fontSizeIdx = 2;

const VOICE_PREFERRED_PATTERNS = [
    /microsoft.*(antonio|francisca|brenda|humberto|leticia)/i,
    /google.*portugu[eê]s.*brasil/i,
    /(natural|neural|premium|online)/i,
];

function showChapter(id) {
    CHAPS.forEach(c => {
        const el = document.getElementById('ch-' + c);
        if (el) el.classList.toggle('visible', c === id);
        const nb = document.getElementById('nav-' + c);
        if (nb) nb.classList.toggle('active', c === id);
        const mb = document.getElementById('mnav-' + c);
        if (mb) mb.classList.toggle('active', c === id);
    });
    stopVoice();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleArt(id) {
    const body = document.getElementById('body-' + id);
    const tog = document.getElementById('tog-' + id);
    if (!body) return;
    const open = body.classList.toggle('open');
    if (tog) tog.classList.toggle('open', open);
    // Manter aria-expanded sincronizado com o estado visual
    const header = document.querySelector(`.art-header[onclick*="'${id}'"]`);
    if (header) header.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function stopVoice() {
    speakingToken += 1;
    if (synth) { synth.cancel(); }
    currentUtt = null;
    document.querySelectorAll('.voice-btn').forEach(b => {
        b.textContent = '▶ Narrar seção';
        b.classList.remove('playing');
    });
    const pb = document.getElementById('btn-pause-voice');
    if (pb) { pb.textContent = '⏸ Pausar narração'; }
}

function pauseVoice() {
    if (!synth) return;
    const pb = document.getElementById('btn-pause-voice');
    if (synth.paused) {
        synth.resume();
        if (pb) pb.textContent = '⏸ Pausar narração';
    } else if (synth.speaking) {
        synth.pause();
        if (pb) pb.textContent = '▶ Retomar narração';
    }
}

function readSection(id) {
    const body = document.getElementById('body-' + id);
    if (!body) return;
    if (!window.speechSynthesis) return;

    const btn = document.getElementById('vbtn-' + id);
    const isAlreadyPlaying = btn && btn.classList.contains('playing');
    if (isAlreadyPlaying) {
        stopVoice();
        return;
    }

    stopVoice();
    resolveVoice();

    // Seletores de elementos que devem ser ignorados na narração (UI e conteúdo decorativo)
    const SKIP = '.voice-row, .fc-flip-hint, .schema-arrow, button, .practice-btn, .art-badges, .art-toggle, .point-marker';
    const BLOCK_TAGS = new Set(['P', 'LI', 'DIV', 'TR', 'TH', 'TD', 'H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'SECTION']);

    function buildText(el) {
        const parts = [];
        function walk(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches && node.matches(SKIP)) return;
                if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') return;
                if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG'].includes(node.tagName)) return;
                const isBlock = BLOCK_TAGS.has(node.tagName);
                if (isBlock && parts.length) {
                    const last = parts[parts.length - 1];
                    if (last && last !== '.' && !/[.?!]$/.test(last)) parts.push('.');
                }
                for (const child of node.childNodes) walk(child);
            } else if (node.nodeType === Node.TEXT_NODE) {
                const t = node.textContent.replace(/\s+/g, ' ').trim();
                if (t) parts.push(t);
            }
        }
        walk(el);
        return parts.join(' ')
            .replace(/\s+\./g, '.')
            .replace(/\.{2,}/g, '.')
            .replace(/\s+/g, ' ')
            .trim();
    }

    let text = buildText(body).substring(0, 8000);
    text = sanitizeNarrationText(text);
    const chunks = splitNarrationChunks(text, 260);
    if (!chunks.length) {
        return;
    }

    const token = speakingToken;
    if (btn) {
        btn.textContent = '⏹ Parar narração';
        btn.classList.add('playing');
    }

    speakChunks(chunks, token, btn, () => {
        if (btn) {
            btn.textContent = '▶ Narrar seção';
            btn.classList.remove('playing');
        }
    });
}

function resolveVoice() {
    if (!synth || typeof synth.getVoices !== 'function') {
        currentVoice = null;
        return;
    }

    const voices = synth.getVoices();
    if (!voices.length) {
        currentVoice = null;
        return;
    }

    currentVoice = voices
        .map(v => ({ voice: v, score: scoreVoice(v) }))
        .sort((a, b) => b.score - a.score)[0].voice;
}

function scoreVoice(voice) {
    const name = (voice.name || '').toLowerCase();
    const lang = (voice.lang || '').toLowerCase();
    let score = 0;

    if (lang === 'pt-br') score += 420;
    else if (lang.startsWith('pt')) score += 260;
    else score -= 180;

    if (/google|microsoft|apple|samsung|nuance/i.test(name)) score += 45;
    if (!voice.localService) score += 15;

    VOICE_PREFERRED_PATTERNS.forEach(pattern => {
        if (pattern.test(name)) score += 70;
    });

    if (/compact|espeak|mbrola|test|demo/i.test(name)) score -= 220;
    return score;
}

function sanitizeNarrationText(text) {
    return text
        .replace(/https?:\/\/\S+/g, ' ')
        .replace(/[\u{1F300}-\u{1FAFF}]/gu, ' ')
        .replace(/\bArt\.?\s*(\d+)/gi, 'artigo $1')
        .replace(/\barts\.\s*(\d+)/gi, 'artigos $1')
        .replace(/§\s*(\d+)/g, ' paragrafo $1 ')
        .replace(/\bCF\b/gi, 'Constituicao Federal')
        .replace(/\bSTF\b/gi, 'Supremo Tribunal Federal')
        .replace(/\bSTJ\b/gi, 'Superior Tribunal de Justica')
        .replace(/\bTJPE\b/gi, 'Tribunal de Justica de Pernambuco')
        .replace(/\bIBFC\b/gi, 'I B F C')
        .replace(/\s+([,.;:!?])/g, '$1')
        .replace(/([,.;:!?]){2,}/g, '$1')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

function splitNarrationChunks(text, maxLen) {
    if (!text) return [];

    const chunks = [];
    const sentences = text
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(Boolean);

    let current = '';
    sentences.forEach(sentence => {
        const candidate = current ? `${current} ${sentence}` : sentence;
        if (candidate.length <= maxLen) {
            current = candidate;
            return;
        }

        if (current) {
            chunks.push(current);
            current = '';
        }

        if (sentence.length <= maxLen) {
            current = sentence;
            return;
        }

        for (let i = 0; i < sentence.length; i += maxLen) {
            chunks.push(sentence.slice(i, i + maxLen));
        }
    });

    if (current) chunks.push(current);
    return chunks;
}

function speakChunks(chunks, token, btn, onDone) {
    let idx = 0;

    function finish() {
        currentUtt = null;
        if (token === speakingToken && typeof onDone === 'function') {
            onDone();
        }
    }

    function speakNext() {
        if (!synth || token !== speakingToken) {
            finish();
            return;
        }

        if (idx >= chunks.length) {
            finish();
            return;
        }

        currentUtt = new SpeechSynthesisUtterance(chunks[idx]);
        currentUtt.lang = currentVoice ? currentVoice.lang : 'pt-BR';
        currentUtt.rate = voiceRate;
        currentUtt.pitch = 1;
        currentUtt.volume = 1;
        if (currentVoice) {
            currentUtt.voice = currentVoice;
        }

        currentUtt.onend = () => {
            idx += 1;
            speakNext();
        };
        currentUtt.onerror = finish;

        synth.speak(currentUtt);
    }

    speakNext();
}

function askPractice(topic) {
    const msg = `Crie 10 questões no estilo IBFC com 4 alternativas (a, b, c, d) e gabarito comentado sobre: ${topic} — para o concurso de Técnico Judiciário do TJPE (Edital 01/2025). Após cada questão, indique a resposta correta e explique o erro de cada alternativa incorreta.`;
    if (window.parent && window.parent.postMessage) {
        window.parent.postMessage({ type: 'sendPrompt', text: msg }, '*');
    } else {
        alert('Copie o tema e peça questões no chat:\n\n' + topic);
    }
}

function toggleTheme() {
    const d = document.documentElement;
    const dark = d.getAttribute('data-theme') === 'dark';
    d.setAttribute('data-theme', dark ? '' : 'dark');
    const btn = document.querySelector('.ctrl-btn');
    if (btn) btn.textContent = dark ? '🌙 Modo escuro' : '☀️ Modo claro';
}

function changeFontSize(dir) {
    if (dir === 0) { fontSizeIdx = 2; }
    else { fontSizeIdx = Math.max(0, Math.min(fontSizeSteps.length - 1, fontSizeIdx + dir)); }
    const size = fontSizeSteps[fontSizeIdx];
    document.documentElement.style.fontSize = size === 16 ? '' : size + 'px';
    try { localStorage.setItem('rv-font', fontSizeIdx); } catch (e) { }
}

function changeVoiceRate(dir) {
    voiceRateIdx = Math.max(0, Math.min(voiceRateSteps.length - 1, voiceRateIdx + dir));
    voiceRate = voiceRateSteps[voiceRateIdx];
    const el = document.getElementById('voice-rate-val');
    if (el) el.textContent = voiceRate + '×';
    try { localStorage.setItem('rv-voice-rate', voiceRateIdx); } catch (e) { }
}

// Move cada botão "Narrar seção" para o cabeçalho da respectiva seção
document.querySelectorAll('.art-body').forEach(body => {
    const id = body.id.replace('body-', '');
    const vbtn = body.querySelector('.voice-btn');
    if (!vbtn) return;
    const header = document.querySelector(`.art-header[onclick*="'${id}'"]`);
    if (!header) return;
    const badges = header.querySelector('.art-badges');
    if (!badges) return;
    vbtn.id = 'vbtn-' + id;
    vbtn.setAttribute('onclick', `event.stopPropagation(); readSection('${id}')`);
    badges.insertBefore(vbtn, badges.firstChild);
});

document.querySelectorAll('.fc-card').forEach(card => {
    card.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') card.classList.toggle('flipped'); });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Cartão de memorização — clique para virar');
});

// Configurar ARIA para cabeçalhos colapsáveis dos artigos
document.querySelectorAll('.art-header').forEach(header => {
    const onclickAttr = header.getAttribute('onclick') || '';
    const match = onclickAttr.match(/toggleArt\('([^']+)'\)/);
    if (!match) return;
    const id = match[1];
    const body = document.getElementById('body-' + id);
    if (!body) return;
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', body.classList.contains('open') ? 'true' : 'false');
    header.setAttribute('aria-controls', 'body-' + id);
    header.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleArt(id); }
    });
});

// Ocultar ícones puramente decorativos dos leitores de tela
document.querySelectorAll('.art-toggle, .point-marker, .schema-arrow').forEach(el => {
    el.setAttribute('aria-hidden', 'true');
});

// Restaurar preferências salvas
(function () {
    try {
        const fi = parseInt(localStorage.getItem('rv-font'));
        if (!isNaN(fi) && fi >= 0 && fi < fontSizeSteps.length) {
            fontSizeIdx = fi;
            const size = fontSizeSteps[fi];
            if (size !== 16) document.documentElement.style.fontSize = size + 'px';
        }
        const vi = parseInt(localStorage.getItem('rv-voice-rate'));
        if (!isNaN(vi) && vi >= 0 && vi < voiceRateSteps.length) {
            voiceRateIdx = vi;
            voiceRate = voiceRateSteps[vi];
            const el = document.getElementById('voice-rate-val');
            if (el) el.textContent = voiceRate + '×';
        }
    } catch (e) { }
})();

if (synth && typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = resolveVoice;
}
resolveVoice();
