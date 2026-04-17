import re
import os
import glob

BASE = r'C:\DEV\iDialog'

# ============================================================
# CSS UTILITIES BLOCK (to insert in revista_concurso.html style)
# ============================================================
REVISTA_CSS_UTILS = """
    /* ── UTILITY CLASSES (replaces inline styles) ── */

    /* Sidebar dots */
    .sb-dot--penal  { background: #C0392B; }
    .sb-dot--logico { background: #534AB7; }
    .sb-dot--adm    { background: #0D7A5C; }
    .sb-dot--const  { background: #1A5CA8; }
    .sb-dot--civil  { background: #993C1D; }
    .sb-dot--sim    { background: #C9982A; }

    /* Flashcard front themes */
    .fc-front--crimson     { background: #8B1A1A; }
    .fc-front--teal-deep   { background: #0D4A38; }
    .fc-front--purple-deep { background: #2C1654; }
    .fc-front--green-deep  { background: #1A4A2C; }
    .fc-front--blue-dark   { background: #1A3048; }
    .fc-front--wine        { background: #3A1A1A; }
    .fc-front--emerald     { background: #0A3A28; }
    .fc-front--indigo      { background: #26215C; }
    .fc-front--navy        { background: #0A2A40; }
    .fc-front--maroon      { background: #3A1010; }
    .fc-front--cobalt      { background: #0D2E50; }
    .fc-front--amber-dark  { background: #3A2800; }
    .fc-front--midnight    { background: #0D2D50; }
    .fc-front--umber       { background: #2A1A0A; }
    .fc-front--forest      { background: #0A2A1A; }
    .fc-front--ruby        { background: #3A0A0A; }

    /* Flashcard tag color themes */
    .fc-tag--red-dark    { background: rgba(192,57,43,.3);   color: #FFAAAA; }
    .fc-tag--red         { background: rgba(255,100,100,.25); color: #FFB0B0; }
    .fc-tag--red-mid     { background: rgba(255,120,120,.2);  color: #FFAAAA; }
    .fc-tag--red-light   { background: rgba(255,100,100,.2);  color: #FFAAAA; }
    .fc-tag--teal-light  { background: rgba(100,220,180,.2);  color: #90FFD8; }
    .fc-tag--teal        { background: rgba(100,220,160,.2);  color: #90FFB8; }
    .fc-tag--blue        { background: rgba(100,160,255,.2);  color: #A8C8FF; }
    .fc-tag--purple      { background: rgba(180,150,255,.2);  color: #D0BFFF; }
    .fc-tag--purple-light{ background: rgba(180,160,255,.2);  color: #C8B8FF; }
    .fc-tag--purple-mid  { background: rgba(200,180,255,.2);  color: #D0C0FF; }
    .fc-tag--purple-soft { background: rgba(200,180,255,.2);  color: #C8B8FF; }
    .fc-tag--amber       { background: rgba(240,180,50,.2);   color: #FFD080; }
    .fc-tag--gold        { background: rgba(255,200,100,.2);  color: #FFD880; }
    .fc-tag--danger      { background: var(--red-pale); color: var(--red); border: 1px solid var(--red-border); }

    /* Table cell utilities */
    .td-teal     { color: var(--teal); }
    .td-red      { color: var(--red); }
    .td-teal-bold{ color: var(--teal); font-weight: 600; }
    .td-red-bold { color: var(--red);  font-weight: 600; }
    .td-sm-muted { font-size: 11px; color: var(--text2); }
    .td-sm-red   { font-size: 11px; color: var(--red); }

    /* Section CTA wrapper */
    .section-cta { text-align: right; margin: 1.5rem 0 2.5rem 0; }

    /* Simulado action buttons */
    .btn-simulado {
      display: inline-block;
      padding: 10px 22px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      font-family: var(--font-b);
      font-size: 15px;
      color: #fff;
      transition: background .2s;
    }
    .btn-simulado--penal  { background: #C0392B; box-shadow: 0 2px 8px rgba(192,57,43,.08); }
    .btn-simulado--logico { background: #534AB7; box-shadow: 0 2px 8px rgba(83,74,183,.08); }
    .btn-simulado--adm    { background: #0D7A5C; box-shadow: 0 2px 8px rgba(13,122,92,.08); }
    .btn-simulado--const  { background: #1A5CA8; box-shadow: 0 2px 8px rgba(26,92,168,.08); }
    .btn-simulado--civil  { background: #993C1D; box-shadow: 0 2px 8px rgba(153,60,29,.08); }

    /* fc-kw compact text variants */
    .fc-kw--compact { font-size: 13px;   line-height: 1.4; }
    .fc-kw--sm      { font-size: 12.5px; line-height: 1.4; }

    /* Inline label badges */
    .badge-false { margin-top: 4px; background: rgba(255,80,80,.25); padding: 2px 6px; border-radius: 4px; color: #FFB0B0; }
    .badge-not   { margin-top: 4px; background: rgba(255,80,80,.3);  padding: 2px 6px; border-radius: 4px; }
    .badge-equiv { margin-top: 4px; background: rgba(50,180,120,.3); padding: 2px 6px; border-radius: 4px; color: #003320; }
    .note-muted  { margin-top: 4px; font-style: italic; color: #A8BDD0; }
    .note-italic { margin-top: 4px; font-style: italic; }

    /* Comment color variants */
    .comment--amber { color: #FFE08A; }
    .comment--teal  { color: #90FFB8; }

    /* Separator lines */
    .sep-top { border-top: 1px solid rgba(255,255,255,.12); padding-top: 4px; margin-top: 2px; }

    /* Flex tag rows */
    .tag-row    { display: flex; flex-wrap: wrap; gap: .5rem; margin: .5rem 0 1rem; }
    .tag-row--sm{ display: flex; flex-wrap: wrap; gap: .5rem; margin: .5rem 0; }

    /* Schema box size variants */
    .schema-box--w90  { min-width: 90px; }
    .schema-box--w150 { min-width: 150px; }
    .schema-box--w190 { min-width: 190px; }
    .schema-box--mw420{ max-width: 420px; }

    /* Schema arrow */
    .schema-arrow--xl { font-size: 1.4rem; }

    /* Strong large */
    .fs-xl { font-size: 20px; }

    /* comp-cell color borders */
    .comp-cell--navy { border-color: #0A1628; }
    .comp-cell--blue { border-color: #185FA5; }
    .comp-cell--teal { border-color: #0D7A5C; }

    /* Mobile nav button sizing */
    .btn-nav-xs { flex: 1; justify-content: center; font-size: 11px; }
"""

# Same block for revista.css (for index_backup.html)
REVISTA_CSS_APPEND = """

    /* ── UTILITY CLASSES (replaces inline styles in index_backup.html) ── */

    .sb-dot--penal  { background: #C0392B; }
    .sb-dot--logico { background: #534AB7; }
    .sb-dot--adm    { background: #0D7A5C; }
    .sb-dot--const  { background: #1A5CA8; }
    .sb-dot--civil  { background: #993C1D; }
    .sb-dot--sim    { background: #C9982A; }

    .fc-front--crimson     { background: #8B1A1A; }
    .fc-front--teal-deep   { background: #0D4A38; }
    .fc-front--purple-deep { background: #2C1654; }
    .fc-front--green-deep  { background: #1A4A2C; }
    .fc-front--blue-dark   { background: #1A3048; }
    .fc-front--wine        { background: #3A1A1A; }
    .fc-front--emerald     { background: #0A3A28; }
    .fc-front--indigo      { background: #26215C; }
    .fc-front--navy        { background: #0A2A40; }
    .fc-front--maroon      { background: #3A1010; }
    .fc-front--cobalt      { background: #0D2E50; }
    .fc-front--amber-dark  { background: #3A2800; }
    .fc-front--midnight    { background: #0D2D50; }
    .fc-front--umber       { background: #2A1A0A; }
    .fc-front--forest      { background: #0A2A1A; }
    .fc-front--ruby        { background: #3A0A0A; }

    .fc-tag--red-dark    { background: rgba(192,57,43,.3);   color: #FFAAAA; }
    .fc-tag--red         { background: rgba(255,100,100,.25); color: #FFB0B0; }
    .fc-tag--red-mid     { background: rgba(255,120,120,.2);  color: #FFAAAA; }
    .fc-tag--red-light   { background: rgba(255,100,100,.2);  color: #FFAAAA; }
    .fc-tag--teal-light  { background: rgba(100,220,180,.2);  color: #90FFD8; }
    .fc-tag--teal        { background: rgba(100,220,160,.2);  color: #90FFB8; }
    .fc-tag--blue        { background: rgba(100,160,255,.2);  color: #A8C8FF; }
    .fc-tag--purple      { background: rgba(180,150,255,.2);  color: #D0BFFF; }
    .fc-tag--purple-light{ background: rgba(180,160,255,.2);  color: #C8B8FF; }
    .fc-tag--purple-mid  { background: rgba(200,180,255,.2);  color: #D0C0FF; }
    .fc-tag--purple-soft { background: rgba(200,180,255,.2);  color: #C8B8FF; }
    .fc-tag--amber       { background: rgba(240,180,50,.2);   color: #FFD080; }
    .fc-tag--gold        { background: rgba(255,200,100,.2);  color: #FFD880; }
    .fc-tag--danger      { background: var(--red-pale); color: var(--red); border: 1px solid var(--red-border); }

    .td-teal     { color: var(--teal); }
    .td-red      { color: var(--red); }
    .td-teal-bold{ color: var(--teal); font-weight: 600; }
    .td-red-bold { color: var(--red);  font-weight: 600; }
    .td-sm-muted { font-size: 11px; color: var(--text2); }
    .td-sm-red   { font-size: 11px; color: var(--red); }

    .section-cta { text-align: right; margin: 1.5rem 0 2.5rem 0; }

    .btn-simulado {
        display: inline-block;
        padding: 10px 22px;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        font-family: var(--font-b);
        font-size: 15px;
        color: #fff;
        transition: background .2s;
    }
    .btn-simulado--penal  { background: #C0392B; box-shadow: 0 2px 8px rgba(192,57,43,.08); }
    .btn-simulado--logico { background: #534AB7; box-shadow: 0 2px 8px rgba(83,74,183,.08); }
    .btn-simulado--adm    { background: #0D7A5C; box-shadow: 0 2px 8px rgba(13,122,92,.08); }
    .btn-simulado--const  { background: #1A5CA8; box-shadow: 0 2px 8px rgba(26,92,168,.08); }
    .btn-simulado--civil  { background: #993C1D; box-shadow: 0 2px 8px rgba(153,60,29,.08); }

    .fc-kw--compact { font-size: 13px;   line-height: 1.4; }
    .fc-kw--sm      { font-size: 12.5px; line-height: 1.4; }

    .badge-false { margin-top: 4px; background: rgba(255,80,80,.25); padding: 2px 6px; border-radius: 4px; color: #FFB0B0; }
    .badge-not   { margin-top: 4px; background: rgba(255,80,80,.3);  padding: 2px 6px; border-radius: 4px; }
    .badge-equiv { margin-top: 4px; background: rgba(50,180,120,.3); padding: 2px 6px; border-radius: 4px; color: #003320; }
    .note-muted  { margin-top: 4px; font-style: italic; color: #A8BDD0; }
    .note-italic { margin-top: 4px; font-style: italic; }

    .comment--amber { color: #FFE08A; }
    .comment--teal  { color: #90FFB8; }

    .sep-top { border-top: 1px solid rgba(255,255,255,.12); padding-top: 4px; margin-top: 2px; }

    .tag-row    { display: flex; flex-wrap: wrap; gap: .5rem; margin: .5rem 0 1rem; }
    .tag-row--sm{ display: flex; flex-wrap: wrap; gap: .5rem; margin: .5rem 0; }

    .schema-box--w90  { min-width: 90px; }
    .schema-box--w150 { min-width: 150px; }
    .schema-box--w190 { min-width: 190px; }
    .schema-box--mw420{ max-width: 420px; }

    .schema-arrow--xl { font-size: 1.4rem; }
    .fs-xl { font-size: 20px; }

    .comp-cell--navy { border-color: #0A1628; }
    .comp-cell--blue { border-color: #185FA5; }
    .comp-cell--teal { border-color: #0D7A5C; }

    .btn-nav-xs { flex: 1; justify-content: center; font-size: 11px; }
"""

# ============================================================
# HTML REPLACEMENTS (applied to both revista_concurso.html and index_backup.html)
# ============================================================
# Each tuple: (old_pattern, new_pattern, use_regex)
HTML_REPLACEMENTS = [
    # sb-dot colors
    ('class="sb-dot" style="background:#C0392B"', 'class="sb-dot sb-dot--penal"', False),
    ('class="sb-dot" style="background:#534AB7"', 'class="sb-dot sb-dot--logico"', False),
    ('class="sb-dot" style="background:#0D7A5C"', 'class="sb-dot sb-dot--adm"', False),
    ('class="sb-dot" style="background:#1A5CA8"', 'class="sb-dot sb-dot--const"', False),
    ('class="sb-dot" style="background:#993C1D"', 'class="sb-dot sb-dot--civil"', False),
    ('class="sb-dot" style="background:#C9982A"', 'class="sb-dot sb-dot--sim"', False),

    # fc-tag color combos
    ('class="fc-tag" style="background:rgba(192,57,43,.3);color:#FFAAAA"', 'class="fc-tag fc-tag--red-dark"', False),
    ('class="fc-tag" style="background:rgba(255,100,100,.25);color:#FFB0B0"', 'class="fc-tag fc-tag--red"', False),
    ('class="fc-tag" style="background:rgba(100,220,180,.2);color:#90FFD8"', 'class="fc-tag fc-tag--teal-light"', False),
    ('class="fc-tag" style="background:rgba(180,150,255,.2);color:#D0BFFF"', 'class="fc-tag fc-tag--purple"', False),
    ('class="fc-tag" style="background:rgba(100,220,160,.2);color:#90FFB8"', 'class="fc-tag fc-tag--teal"', False),
    ('class="fc-tag" style="background:rgba(100,160,255,.2);color:#A8C8FF"', 'class="fc-tag fc-tag--blue"', False),
    ('class="fc-tag" style="background:rgba(255,120,120,.2);color:#FFAAAA"', 'class="fc-tag fc-tag--red-mid"', False),
    ('class="fc-tag" style="background:rgba(180,160,255,.2);color:#C8B8FF"', 'class="fc-tag fc-tag--purple-light"', False),
    ('class="fc-tag" style="background:rgba(240,180,50,.2);color:#FFD080"', 'class="fc-tag fc-tag--amber"', False),
    ('class="fc-tag" style="background:rgba(200,180,255,.2);color:#D0C0FF"', 'class="fc-tag fc-tag--purple-mid"', False),
    ('class="fc-tag" style="background:rgba(200,180,255,.2);color:#C8B8FF"', 'class="fc-tag fc-tag--purple-soft"', False),
    ('class="fc-tag" style="background:rgba(255,200,100,.2);color:#FFD880"', 'class="fc-tag fc-tag--gold"', False),
    ('class="fc-tag" style="background:rgba(255,100,100,.2);color:#FFAAAA"', 'class="fc-tag fc-tag--red-light"', False),
    ('class="fc-tag"\n                        style="background:rgba(100,220,160,.2);color:#90FFB8"', 'class="fc-tag fc-tag--teal"', False),
    ('class="fc-tag"\n                        style="background:rgba(180,160,255,.2);color:#C8B8FF"', 'class="fc-tag fc-tag--purple-light"', False),
    ('class="fc-tag"\n                        style="background:rgba(100,160,255,.2);color:#A8C8FF"', 'class="fc-tag fc-tag--blue"', False),
    ('class="fc-tag"\n                        style="background:rgba(200,180,255,.2);color:#D0C0FF"', 'class="fc-tag fc-tag--purple-mid"', False),
    ('class="fc-tag"\n                        style="background:rgba(200,180,255,.2);color:#C8B8FF"', 'class="fc-tag fc-tag--purple-soft"', False),
    ('class="fc-tag"\n                    style="background:var(--red-pale);color:var(--red);border:1px solid var(--red-border);"', 'class="fc-tag fc-tag--danger"', False),

    # fc-front backgrounds
    ('class="fc-front" style="background:#8B1A1A;"', 'class="fc-front fc-front--crimson"', False),
    ('class="fc-front" style="background:#0D4A38;"', 'class="fc-front fc-front--teal-deep"', False),
    ('class="fc-front" style="background:#2C1654;"', 'class="fc-front fc-front--purple-deep"', False),
    ('class="fc-front" style="background:#1A4A2C;"', 'class="fc-front fc-front--green-deep"', False),
    ('class="fc-front" style="background:#1A3048;"', 'class="fc-front fc-front--blue-dark"', False),
    ('class="fc-front" style="background:#3A1A1A;"', 'class="fc-front fc-front--wine"', False),
    ('class="fc-front" style="background:#0A3A28;"', 'class="fc-front fc-front--emerald"', False),
    ('class="fc-front" style="background:#26215C;"', 'class="fc-front fc-front--indigo"', False),
    ('class="fc-front" style="background:#0A2A40;"', 'class="fc-front fc-front--navy"', False),
    ('class="fc-front" style="background:#3A1010;"', 'class="fc-front fc-front--maroon"', False),
    ('class="fc-front" style="background:#0D2E50;"', 'class="fc-front fc-front--cobalt"', False),
    ('class="fc-front" style="background:#3A2800;"', 'class="fc-front fc-front--amber-dark"', False),
    ('class="fc-front" style="background:#0D2D50;"', 'class="fc-front fc-front--midnight"', False),
    ('class="fc-front" style="background:#2A1A0A;"', 'class="fc-front fc-front--umber"', False),
    ('class="fc-front" style="background:#0A2A1A;"', 'class="fc-front fc-front--forest"', False),
    ('class="fc-front" style="background:#3A0A0A;"', 'class="fc-front fc-front--ruby"', False),

    # td cells
    ('<td style="color:var(--teal)">', '<td class="td-teal">', False),
    ('<td style="color:var(--red)">', '<td class="td-red">', False),
    ('<td style="color:var(--teal);font-weight:600;">', '<td class="td-teal-bold">', False),
    ('<td style="color:var(--red);font-weight:600;">', '<td class="td-red-bold">', False),
    ('<td style="font-size:11px;color:var(--text2)">', '<td class="td-sm-muted">', False),
    ('<td style="font-size:11px;color:var(--red)">', '<td class="td-sm-red">', False),

    # section CTA
    ('<div style="text-align:right;margin:1.5rem 0 2.5rem 0;">', '<div class="section-cta">', False),

    # btn-simulado
    ('            style="background:#C0392B;color:#fff;padding:10px 22px;border-radius:8px;font-weight:600;text-decoration:none;font-family:var(--font-b);font-size:15px;box-shadow:0 2px 8px rgba(192,57,43,0.08);transition:background .2s;"',
     '            class="btn-simulado btn-simulado--penal"', False),
    ('            style="background:#534AB7;color:#fff;padding:10px 22px;border-radius:8px;font-weight:600;text-decoration:none;font-family:var(--font-b);font-size:15px;box-shadow:0 2px 8px rgba(83,74,183,0.08);transition:background .2s;"',
     '            class="btn-simulado btn-simulado--logico"', False),
    ('            style="background:#0D7A5C;color:#fff;padding:10px 22px;border-radius:8px;font-weight:600;text-decoration:none;font-family:var(--font-b);font-size:15px;box-shadow:0 2px 8px rgba(13,122,92,0.08);transition:background .2s;"',
     '            class="btn-simulado btn-simulado--adm"', False),
    ('            style="background:#1A5CA8;color:#fff;padding:10px 22px;border-radius:8px;font-weight:600;text-decoration:none;font-family:var(--font-b);font-size:15px;box-shadow:0 2px 8px rgba(26,92,168,0.08);transition:background .2s;"',
     '            class="btn-simulado btn-simulado--const"', False),
    ('            style="background:#993C1D;color:#fff;padding:10px 22px;border-radius:8px;font-weight:600;text-decoration:none;font-family:var(--font-b);font-size:15px;box-shadow:0 2px 8px rgba(153,60,29,0.08);transition:background .2s;"',
     '            class="btn-simulado btn-simulado--civil"', False),

    # In index_backup.html the button may have a different indent (12 spaces)
    ('        style="background:#C0392B;color:#fff;padding:10px 22px;border-radius:8px;font-weight:600;text-decoration:none;font-family:var(--font-b);font-size:15px;box-shadow:0 2px 8px rgba(192,57,43,0.08);transition:background .2s;"',
     '        class="btn-simulado btn-simulado--penal"', False),

    # fc-kw compact
    ('<div class="fc-kw" style="font-size:13px;line-height:1.4;">', '<div class="fc-kw fc-kw--compact">', False),
    ('<div class="fc-kw" style="font-size:12.5px;line-height:1.4;">', '<div class="fc-kw fc-kw--sm">', False),

    # small badges
    ('style="margin-top:4px;background:rgba(255,80,80,.25);padding:2px 6px;border-radius:4px;color:#FFB0B0;"',
     'class="badge-false"', False),
    ('style="margin-top:4px;background:rgba(255,80,80,.3);padding:2px 6px;border-radius:4px;"',
     'class="badge-not"', False),
    ('style="margin-top:4px;background:rgba(50,180,120,.3);padding:2px 6px;border-radius:4px;color:#003320;"',
     'class="badge-equiv"', False),
    ('style="margin-top:4px;font-style:italic;color:#A8BDD0;"',
     'class="note-muted"', False),
    ('style="margin-top:4px;font-style:italic;"',
     'class="note-italic"', False),

    # comment spans
    ('class="comment" style="color:#FFE08A;"', 'class="comment comment--amber"', False),
    ('class="comment" style="color:#90FFB8;"', 'class="comment comment--teal"', False),

    # sep-top
    ('style="border-top:1px solid rgba(255,255,255,.12);padding-top:4px;margin-top:2px;"',
     'class="sep-top"', False),

    # tag rows
    ('<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin:.5rem 0 1rem;">',
     '<div class="tag-row">', False),
    ('<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin:.5rem 0;">',
     '<div class="tag-row--sm">', False),
    ('<div style="display:flex;flex-wrap:wrap;gap:.5rem;margin:.5rem 0 1rem">',
     '<div class="tag-row">', False),

    # schema boxes min-width
    ('class="schema-box sb-navy" style="min-width:150px;"', 'class="schema-box sb-navy schema-box--w150"', False),
    ('class="schema-box sb-amber" style="min-width:90px;"', 'class="schema-box sb-amber schema-box--w90"', False),
    ('class="schema-box sb-red" style="min-width:150px;"', 'class="schema-box sb-red schema-box--w150"', False),
    ('class="schema-box sb-navy" style="min-width:190px;"', 'class="schema-box sb-navy schema-box--w190"', False),
    ('class="schema-box sb-blue" style="min-width:190px;"', 'class="schema-box sb-blue schema-box--w190"', False),
    ('class="schema-box sb-amber" style="min-width:190px;"', 'class="schema-box sb-amber schema-box--w190"', False),
    ('class="schema-box sb-teal" style="max-width:420px;"', 'class="schema-box sb-teal schema-box--mw420"', False),

    # schema arrow
    ('class="schema-arrow" style="font-size:1.4rem;"', 'class="schema-arrow schema-arrow--xl"', False),

    # strong large
    ('<strong style="font-size:20px;">', '<strong class="fs-xl">', False),

    # comp-cell borders
    ('class="comp-cell sb-navy" style="border-color:#0A1628"', 'class="comp-cell sb-navy comp-cell--navy"', False),
    ('class="comp-cell sb-blue" style="border-color:#185FA5"', 'class="comp-cell sb-blue comp-cell--blue"', False),
    ('class="comp-cell sb-teal" style="border-color:#0D7A5C"', 'class="comp-cell sb-teal comp-cell--teal"', False),

    # mobile nav buttons
    ('style="flex:1;justify-content:center;font-size:11px"', 'class="btn-nav-xs"', False),
]

# ============================================================
# PROCESS REVISTA_CONCURSO.HTML
# ============================================================
revista_path = os.path.join(BASE, 'pages', 'revista_concurso', 'Modelos e planejamentos', 'revista_concurso.html')

with open(revista_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Insert CSS utilities before closing </style>
insert_marker = '    ::-webkit-scrollbar-thumb {\n      background: var(--paper2);\n      border-radius: 3px;\n    }\n  </style>'
if insert_marker in content:
    content = content.replace(
        insert_marker,
        '    ::-webkit-scrollbar-thumb {\n      background: var(--paper2);\n      border-radius: 3px;\n    }\n' + REVISTA_CSS_UTILS + '\n  </style>'
    )
    print("CSS utilities inserted in revista_concurso.html")
else:
    print("WARNING: Could not find CSS insertion marker in revista_concurso.html")

# Apply HTML replacements
count = 0
for old, new, is_regex in HTML_REPLACEMENTS:
    if is_regex:
        new_content = re.sub(old, new, content)
    else:
        new_content = content.replace(old, new)
    if new_content != content:
        count += content.count(old)
        content = new_content

print(f"Applied {count} HTML replacements in revista_concurso.html")

with open(revista_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("revista_concurso.html saved.")

# ============================================================
# PROCESS INDEX_BACKUP.HTML
# ============================================================
backup_path = os.path.join(BASE, 'pages', 'revista_concurso', 'index_backup.html')

with open(backup_path, 'r', encoding='utf-8') as f:
    backup = f.read()

count = 0
for old, new, is_regex in HTML_REPLACEMENTS:
    if is_regex:
        new_content = re.sub(old, new, backup)
    else:
        new_content = backup.replace(old, new)
    if new_content != backup:
        count += backup.count(old)
        backup = new_content

print(f"Applied {count} HTML replacements in index_backup.html")

with open(backup_path, 'w', encoding='utf-8') as f:
    f.write(backup)
print("index_backup.html saved.")

# ============================================================
# ADD UTILITIES TO REVISTA.CSS
# ============================================================
revista_css_path = os.path.join(BASE, 'pages', 'revista_concurso', 'assets', 'css', 'revista.css')

with open(revista_css_path, 'r', encoding='utf-8') as f:
    css = f.read()

if 'sb-dot--penal' not in css:
    css = css + '\n' + REVISTA_CSS_APPEND
    with open(revista_css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print("Utility classes appended to revista.css")
else:
    print("Utility classes already in revista.css")

# ============================================================
# FIX .prog-fill style="width:0%" IN ALL SIMULADO FILES
# ============================================================
# .prog-fill already has width: 0% in CSS, remove redundant inline style
simulado_pattern = os.path.join(BASE, 'pages', 'revista_concurso', '**', '*.html')
simulado_files = glob.glob(simulado_pattern, recursive=True)

prog_count = 0
for fp in simulado_files:
    with open(fp, 'r', encoding='utf-8') as f:
        html = f.read()
    
    old = '<div class="prog-fill" id="prog-fill" style="width:0%"></div>'
    new = '<div class="prog-fill" id="prog-fill"></div>'
    
    if old in html:
        html = html.replace(old, new)
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(html)
        prog_count += 1
        print(f"  Fixed prog-fill in: {os.path.relpath(fp, BASE)}")

print(f"Fixed prog-fill in {prog_count} files.")
print("Done!")
