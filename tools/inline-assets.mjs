#!/usr/bin/env node
/**
 * Inlines the binary artwork into `client.js`.
 *
 * The Web client loads a plugin's client module as a single script, so the
 * shield, the wordmark lockup, and the car ghost travel inside it as data URLs.
 * Edit `client.template.js` (and `assets/build_assets.py` for the bitmaps), then
 * run `node tools/inline-assets.mjs` to regenerate `client.js` and `icon.svg`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => readFileSync(join(root, 'assets', name), 'utf8').trim();

const assets = {
  __SHIELD__: read('shield.png.b64'),
  __LOCKUP__: read('lockup.png.b64'),
  __LOCKUP_DARK__: read('lockup-dark.png.b64'),
  __CAR__: read('car-ghost.webp.b64'),
};

let client = readFileSync(join(root, 'client.template.js'), 'utf8');
for (const [token, payload] of Object.entries(assets)) {
  if (!client.includes(token)) throw new Error(`template is missing ${token}`);
  client = client.split(token).join(payload);
}
writeFileSync(join(root, 'client.js'), client);
console.log(`client.js written: ${(client.length / 1024).toFixed(0)} KiB`);

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Forza Ferrari Theme">
  <defs>
    <linearGradient id="track" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#008C45"/>
      <stop offset="0.5" stop-color="#F7F5EF"/>
      <stop offset="1" stop-color="#CD212A"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#08080A"/>
  <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="13.25" fill="none" stroke="#FF2E1A" stroke-opacity="0.55" stroke-width="1.5"/>
  <image x="17" y="9" width="30" height="38" href="data:image/png;base64,${assets.__SHIELD__}"/>
  <rect x="12" y="48" width="40" height="3" rx="1.5" fill="url(#track)"/>
  <rect x="12" y="54" width="26" height="3" rx="1.5" fill="#FF2E1A"/>
</svg>
`;
writeFileSync(join(root, 'icon.svg'), icon);
console.log(`icon.svg written: ${(icon.length / 1024).toFixed(0)} KiB`);
