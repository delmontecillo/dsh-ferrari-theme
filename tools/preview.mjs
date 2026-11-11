#!/usr/bin/env node
/**
 * Renders a static preview of the theme outside the app.
 *
 * It pulls the real `TOKENS` table and the real `CSS` string out of
 * `client.template.js`, paints them over a mock of the DSH Web chrome (rail,
 * banner row, hero, composer, turn rail), and writes Light and Dark pages.
 * This is a design harness only; nothing here ships in the plugin.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'client.template.js'), 'utf8');

/* --- pull the token table out and evaluate it ------------------------- */
const start = source.indexOf('const TOKENS = {');
const end = source.indexOf('\n    };', start);
if (start < 0 || end < 0) throw new Error('TOKENS block not found');
const tokensSrc = source.slice(start + 'const TOKENS = '.length, end + '\n    }'.length);
const b64 = (file, mime) =>
  `data:${mime};base64,` + readFileSync(join(root, 'assets', `${file}.b64`), 'utf8').trim();
const TOKENS = new Function(
  'SHIELD',
  'LOCKUP',
  'LOCKUP_DARK',
  'CAR',
  `const m = (light, dark) => ({ light, dark });\nreturn (${tokensSrc});`,
)(
  b64('shield.png', 'image/png'),
  b64('lockup.png', 'image/png'),
  b64('lockup-dark.png', 'image/png'),
  b64('car-ghost.webp', 'image/webp'),
);

/* --- pull the stylesheet out ----------------------------------------- */
const cssStart = source.indexOf('const CSS = String.raw`');
const cssEnd = source.indexOf('`;', cssStart);
if (cssStart < 0 || cssEnd < 0) throw new Error('CSS block not found');
let css = source.slice(cssStart + 'const CSS = String.raw`'.length, cssEnd);
css = css
  .replaceAll('${SHIELD}', '../assets/shield.png')
  .replaceAll('${LOCKUP}', '../assets/lockup.png')
  .replaceAll('${CAR}', '../assets/car-ghost.webp');

const vars = (mode) =>
  Object.entries(TOKENS)
    .map(([name, value]) => `  ${name}: ${value[mode]};`)
    .join('\n');

const page = (mode) => `<!doctype html>
<html lang="en" data-f1-ribbon>
<head>
<meta charset="utf-8">
<title>Forza Ferrari preview (${mode})</title>
<style>
:root {
${vars(mode)}
  --f1-display: "Bahnschrift SemiCondensed", "Bahnschrift", "Segoe UI", sans-serif;
}
* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
body {
  font-family: "Segoe UI Variable Text", "Segoe UI", sans-serif;
  font-size: 14px;
  display: flex;
  overflow: hidden;
}
button { font: inherit; }
[class*="sidebarCol"] { width: 268px; flex: none; display: flex; flex-direction: column; }
[class*="sidebarCol"] > [data-slot="sidebar"] > [class*="root"] { flex: 1; display: flex; flex-direction: column; gap: 2px; padding: 10px 10px 12px; }
.brandRow { display: flex; align-items: center; gap: 10px; padding: 6px 8px 10px; }
.brandMark { width: 22px; height: 22px; border-radius: 6px; background: #F2C200; }
button[class*="newSession"] { width: 100%; height: 38px; padding: 0 12px; cursor: pointer; }
[class*="newSessionContent"], [class*="newSessionLabel"] { display: flex; align-items: center; justify-content: space-between; width: 100%; }
[role="treeitem"] { padding: 8px 10px; border-radius: 7px; cursor: pointer; color: var(--dsw-alias-label-secondary); }
.sidebarFoot { margin-top: auto; display: flex; flex-direction: column; gap: 6px; padding-top: 12px; color: var(--dsw-alias-label-tertiary); font-size: 12px; }
[class*="centerCol"] { flex: 1; min-width: 0; display: flex; flex-direction: column; position: relative; }
[class*="frame"] { flex: 1; display: flex; min-height: 0; }
[data-conversation-content] { flex: 1; min-height: 0; }
[data-phase="hero"] { padding: 74px 56px 26px; }
[class*="headline"] { margin: 0 0 10px; font-size: 42px; line-height: 1.04; letter-spacing: -0.03em; }
.heroSub { margin: 0; color: var(--dsw-alias-label-tertiary); font-size: 15px; max-width: 46ch; }
.heroPlateWrap { margin-bottom: 26px; }
.fishHitbox { display: inline-flex; align-items: center; justify-content: center; }
[data-composer-seat] { padding: 0 34px 18px; }
[data-composer-card] { min-height: 116px; padding: 16px 16px 10px; display: flex; flex-direction: column; gap: 10px; }
[data-composer-placeholder] { color: var(--dsw-alias-label-tertiary); }
.composerTools { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: var(--dsw-alias-label-tertiary); font-size: 12px; }
.toolChip { border: 1px solid var(--dsw-alias-border-l2); border-radius: 6px; padding: 3px 8px; }
button[aria-label="Send message"] { width: 32px; height: 32px; border: 0; cursor: pointer; color: #fff; font-size: 15px; }
.composerDock { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 6px 4px 0; }
.marks { position: absolute; right: 4px; top: 96px; display: flex; flex-direction: column; gap: 7px; }
.mark { position: relative; height: 2px; width: 20px; }
.mark::before { content: ""; position: absolute; left: 0; top: 0; width: 18px; height: 2px; border-radius: 1px; }
</style>
<style>${css}</style>
</head>
<body ${mode === 'dark' ? 'data-ds-dark-theme' : ''}>
  <div class="sidebarCol">
    <div data-slot="sidebar" class="root">
      <div class="brandRow">
        <span class="brandMark"></span>
        <span class="f1-wordmark" role="img" aria-label="Scuderia Ferrari"></span>
      </div>
      <button class="newSession" type="button"><span class="newSessionContent"><span class="newSessionLabel">New session</span><kbd>⌘N</kbd></span></button>
      <div role="treeitem" aria-selected="false">Rosso Corsa tokens</div>
      <div role="treeitem" aria-selected="true">Tyres and strategy</div>
      <div role="treeitem" aria-selected="false">Monza setup notes</div>
      <div role="treeitem" aria-selected="false">Wind tunnel correlation</div>
      <div class="sidebarFoot"><span>Settings</span><span>Appearance</span></div>
    </div>
  </div>
  <div class="centerCol">
    <div class="frame">
      <div data-conversation-content>
        <div data-phase="hero">
          <div class="heroPlateWrap"><span class="fishHitbox"><img class="f1-crest" src="../assets/shield.png" width="34" height="43" alt=""></span></div>
          <h1 class="headline">What can I help with?</h1>
          <p class="heroSub">Rosso Corsa, carbon, and the crest on every surface.</p>
        </div>
        <div data-composer-seat>
          <div data-composer-card>
            <div data-composer-placeholder>Message DeepSeek…</div>
            <div class="composerTools">
              <span class="toolChip">DeepSeek V4 Flash</span>
              <button aria-label="Send message" type="button">↑</button>
            </div>
          </div>
          <div class="composerDock">
            <span class="f1-pit"><img class="f1-pit__crest" src="../assets/shield.png" alt=""><span class="f1-pit__bars"><span class="f1-pit__bar f1-pit__bar--green"></span><span class="f1-pit__bar f1-pit__bar--white"></span><span class="f1-pit__bar f1-pit__bar--red"></span></span><span class="f1-pit__label">Scuderia Ferrari</span><span class="f1-pit__dot"></span><span class="f1-pit__number">№16</span><span class="f1-pit__checker"></span></span>
            <span>2.1k tokens</span>
          </div>
        </div>
      </div>
      <div class="marks">
        <div class="mark markActive"></div>
        <div class="mark"></div>
        <div class="mark"></div>
        <div class="mark"></div>
      </div>
    </div>
  </div>
  <div class="f1-art" aria-hidden="true">
    <div class="f1-art__shield"></div>
    <div class="f1-art__car"></div>
    <div class="f1-art__checker"></div>
  </div>
  <script>
    // The real client paints --f1-tick from the rail; mirror it here.
    const marks = [...document.querySelectorAll('.marks > .mark')];
    const active = marks.findIndex((el) => el.className.includes('markActive'));
    marks.forEach((el, i) => {
      const mix = active < 0 ? 55 : Math.max(0, 100 - Math.abs(i - active) * 17);
      el.style.setProperty('--f1-tick', mix + '%');
    });
    // data-f1-theme is set by the plugin at runtime.
    document.body.setAttribute('data-f1-theme', 'forza');
  </script>
</body>
</html>`;

mkdirSync(join(root, 'preview'), { recursive: true });
for (const mode of ['light', 'dark']) {
  writeFileSync(join(root, 'preview', `mock-${mode}.html`), page(mode));
  console.log(`preview/mock-${mode}.html`);
}
