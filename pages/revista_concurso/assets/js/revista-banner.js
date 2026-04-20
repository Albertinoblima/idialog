/**
 * revista-banner.js
 * Popup "Plataforma em Construção" — Aprova Concursos
 * Exibido 1× por sessão (sessionStorage).
 * Páginas: pages/revista_concurso/index.html + revista.html
 * Acessibilidade: role=dialog, aria-modal, focus-trap, ESC, backdrop-click.
 */
(function () {
    'use strict';

    var SESSION_KEY = 'aprova_construcao_shown';

    /* Exibir apenas 1× por sessão de navegação */
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, '1');

    /* ── Estilos ────────────────────────────────────────────────────── */
    function injectStyles() {
        var s = document.createElement('style');
        s.textContent = [
            /* Backdrop */
            '#ac-bd{',
            '  position:fixed;inset:0;z-index:99999;',
            '  background:rgba(10,10,15,.80);',
            '  -webkit-backdrop-filter:blur(5px);',
            '  backdrop-filter:blur(5px);',
            '  display:flex;align-items:center;justify-content:center;',
            '  padding:1rem;',
            '  animation:ac-fade .25s ease;',
            '}',
            '@keyframes ac-fade{from{opacity:0}to{opacity:1}}',
            '@keyframes ac-up{',
            '  from{opacity:0;transform:translateY(22px) scale(.97)}',
            '  to  {opacity:1;transform:none}',
            '}',

            /* Modal box — paleta editorial (funciona em ambos os fundos) */
            '#ac-modal{',
            '  background:#faf7f2;color:#1a1209;',
            '  border-radius:6px;',
            '  width:min(92vw,540px);',
            '  max-height:90dvh;overflow-y:auto;',
            '  box-shadow:0 24px 80px rgba(0,0,0,.50),0 0 0 1px rgba(184,134,11,.25);',
            '  position:relative;animation:ac-up .32s ease;',
            "  font-family:'DM Sans',system-ui,sans-serif;",
            '}',
            /* Barra dourada superior */
            '#ac-modal::before{',
            "  content:'';display:block;height:4px;",
            '  background:linear-gradient(90deg,#8b6508,#d4a017,#8b6508);',
            '  border-radius:6px 6px 0 0;',
            '}',

            /* Botão fechar */
            '#ac-close{',
            '  position:absolute;top:14px;right:16px;',
            '  background:none;border:none;cursor:pointer;',
            '  font-size:22px;color:#6b5b43;line-height:1;',
            '  padding:4px 7px;border-radius:4px;',
            '  transition:background .15s,color .15s;',
            '}',
            '#ac-close:hover,#ac-close:focus{background:#f2ede4;color:#1a1209;outline:none;}',

            /* Corpo */
            '#ac-body{padding:2rem 2rem 1.75rem;}',

            /* Ícone */
            '#ac-icon{',
            '  width:52px;height:52px;background:#1a1209;',
            '  border-radius:4px;display:flex;',
            '  align-items:center;justify-content:center;',
            '  margin-bottom:1.1rem;',
            '}',
            '#ac-icon i{font-size:1.4rem;color:#d4a017;}',

            /* Título */
            '#ac-modal h2{',
            "  font-family:'Playfair Display',Georgia,serif;",
            '  font-size:1.45rem;font-weight:700;',
            '  color:#1a1209;margin-bottom:.4rem;line-height:1.2;',
            '}',

            /* Badge de fase */
            '#ac-badge{',
            '  display:inline-flex;align-items:center;gap:.35rem;',
            '  background:#1a3a5c;color:#fff;',
            '  font-size:10px;font-weight:700;letter-spacing:.2em;',
            '  text-transform:uppercase;padding:4px 12px;',
            '  border-radius:2px;margin-bottom:1.15rem;',
            '}',

            /* Parágrafos */
            '.ac-p{',
            "  font-family:'EB Garamond',Georgia,serif;",
            '  font-size:1.05rem;color:#3d3020;',
            '  line-height:1.65;margin-bottom:.85rem;',
            '}',

            /* Box de destaque */
            '#ac-hl{',
            '  background:#f2ede4;border-left:4px solid #b8860b;',
            '  padding:.95rem 1.2rem;margin:1.1rem 0;',
            '  border-radius:0 4px 4px 0;',
            '}',
            '#ac-hl strong{',
            "  font-family:'Playfair Display',Georgia,serif;",
            '  font-size:1.05rem;font-weight:700;',
            '  color:#8b6508;display:block;margin-bottom:.35rem;',
            '}',
            '#ac-hl span{',
            "  font-family:'DM Sans',system-ui,sans-serif;",
            '  font-size:.87rem;color:#6b5b43;line-height:1.55;',
            '}',

            /* Ações */
            '#ac-actions{',
            '  display:flex;gap:.75rem;flex-wrap:wrap;',
            '  margin-top:1.5rem;padding-top:1.2rem;',
            '  border-top:1px solid #e8e0d2;',
            '}',

            /* CTA primário */
            '#ac-cta{',
            '  flex:1;min-width:140px;',
            '  background:#1a1209;color:#d4a017;',
            '  border:none;padding:.75rem 1.25rem;',
            "  font-family:'DM Sans',system-ui,sans-serif;",
            '  font-size:.875rem;font-weight:700;',
            '  letter-spacing:.06em;text-transform:uppercase;',
            '  cursor:pointer;border-radius:3px;',
            '  transition:background .15s;',
            '  display:flex;align-items:center;justify-content:center;gap:.5rem;',
            '}',
            '#ac-cta:hover,#ac-cta:focus{background:#3d3020;outline:none;}',

            /* CTA secundário */
            '#ac-dismiss{',
            '  background:none;border:1px solid #cfc3af;',
            '  color:#6b5b43;padding:.75rem 1.25rem;',
            "  font-family:'DM Sans',system-ui,sans-serif;",
            '  font-size:.875rem;font-weight:600;',
            '  cursor:pointer;border-radius:3px;',
            '  transition:border-color .15s,color .15s;',
            '  white-space:nowrap;',
            '}',
            '#ac-dismiss:hover,#ac-dismiss:focus{border-color:#8b6508;color:#1a1209;outline:none;}',

            /* ── Responsivo ────────────────────────────────────────── */
            /* Tablet */
            '@media(max-width:991px){',
            '  #ac-body{padding:1.75rem 1.75rem 1.5rem;}',
            '}',
            /* Mobile landscape / small tablet */
            '@media(max-width:640px){',
            '  #ac-body{padding:1.5rem 1.25rem 1.25rem;}',
            '  #ac-modal h2{font-size:1.25rem;}',
            '  #ac-actions{flex-direction:column;}',
            '  #ac-cta,#ac-dismiss{width:100%;justify-content:center;}',
            '  .ac-p{font-size:1rem;}',
            '}',
            /* Mobile pequeno */
            '@media(max-width:380px){',
            '  #ac-modal{border-radius:4px;}',
            '  #ac-body{padding:1.25rem 1rem 1rem;}',
            '  #ac-icon{width:44px;height:44px;}',
            '  #ac-icon i{font-size:1.1rem;}',
            '  #ac-badge{font-size:9px;padding:3px 9px;}',
            '}'
        ].join('\n');
        document.head.appendChild(s);
    }

    /* ── Markup ─────────────────────────────────────────────────────── */
    function injectMarkup() {
        var bd = document.createElement('div');
        bd.id = 'ac-bd';
        bd.setAttribute('role', 'dialog');
        bd.setAttribute('aria-modal', 'true');
        bd.setAttribute('aria-labelledby', 'ac-title');
        bd.setAttribute('aria-describedby', 'ac-desc');

        bd.innerHTML =
            '<div id="ac-modal">' +
            '  <button id="ac-close" aria-label="Fechar aviso">\u00d7</button>' +
            '  <div id="ac-body">' +
            '    <div id="ac-icon"><i class="fa-solid fa-screwdriver-wrench"></i></div>' +
            '    <h2 id="ac-title">Plataforma em Constru\u00e7\u00e3o</h2>' +
            '    <div id="ac-badge">' +
            '      <i class="fa-solid fa-circle-info"></i> Fase\u00a01 de Lan\u00e7amento' +
            '    </div>' +
            '    <p class="ac-p" id="ac-desc">' +
            '      O <strong>Aprova Concursos</strong> est\u00e1 sendo constru\u00eddo com dedica\u00e7\u00e3o.' +
            '      Nesta primeira fase, todo o conte\u00fado est\u00e1 organizado e focado na' +
            '      <strong>\u00c1rea Judici\u00e1ria</strong>.' +
            '    </p>' +
            '    <div id="ac-hl">' +
            '      <strong>' +
            '        <i class="fa-solid fa-scale-balanced"></i>\u00a0' +
            '        \u00c1rea Judici\u00e1ria \u2014 Dispon\u00edvel agora' +
            '      </strong>' +
            '      <span>' +
            '        D.\u00a0Processual\u00a0Penal\u00a0\u00b7 D.\u00a0Constitucional\u00a0\u00b7' +
            '        Direito\u00a0Civil\u00a0\u00b7 D.\u00a0Administrativo\u00a0\u00b7 Racioc\u00ednio\u00a0L\u00f3gico' +
            '      </span>' +
            '    </div>' +
            '    <p class="ac-p">' +
            '      Em breve, novas \u00e1reas e funcionalidades ser\u00e3o liberadas.' +
            '      Obrigado pela paci\u00eancia e confian\u00e7a!' +
            '    </p>' +
            '    <div id="ac-actions">' +
            '      <button id="ac-cta">' +
            '        <i class="fa-solid fa-book-open"></i> Explorar Conte\u00fado' +
            '      </button>' +
            '      <button id="ac-dismiss">Entendi</button>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        document.body.appendChild(bd);
        return bd;
    }

    /* ── Comportamento ──────────────────────────────────────────────── */
    var _prevOverflow = '';

    function closeBanner() {
        var bd = document.getElementById('ac-bd');
        if (!bd) return;
        bd.style.transition = 'opacity .2s';
        bd.style.opacity = '0';
        document.body.style.overflow = _prevOverflow;
        document.removeEventListener('keydown', onKey);
        setTimeout(function () {
            if (bd && bd.parentNode) bd.parentNode.removeChild(bd);
        }, 220);
    }

    function onKey(e) {
        if (e.key === 'Escape') { closeBanner(); return; }
        if (e.key === 'Tab') {
            var bd = document.getElementById('ac-bd');
            if (!bd) return;
            var btns = bd.querySelectorAll('button');
            var first = btns[0], last = btns[btns.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        }
    }

    function init() {
        injectStyles();
        var bd = injectMarkup();

        document.getElementById('ac-close').addEventListener('click', closeBanner);
        document.getElementById('ac-dismiss').addEventListener('click', closeBanner);
        document.getElementById('ac-cta').addEventListener('click', function () {
            closeBanner();
            /* Se estiver na SPA (index.html), navegar para o conteúdo de estudo */
            if (typeof App !== 'undefined' && typeof App.goTo === 'function') {
                setTimeout(function () { App.goTo('study'); }, 260);
            }
        });

        /* Fechar ao clicar fora do modal (no backdrop) */
        bd.addEventListener('click', function (e) {
            if (e.target === bd) closeBanner();
        });

        document.addEventListener('keydown', onKey);

        /* Bloquear scroll da página enquanto o popup está aberto */
        _prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        /* Foco inicial no botão fechar (acessibilidade) */
        setTimeout(function () {
            var closeBtn = document.getElementById('ac-close');
            if (closeBtn) closeBtn.focus();
        }, 60);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
