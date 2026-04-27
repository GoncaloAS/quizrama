/**
 * Smoke test: cada `<script src=…>` e `<link rel="stylesheet" href=…>`
 * em index.html aponta para um ficheiro que existe.
 *
 * Apanha typos ou ficheiros eliminados acidentalmente durante refactors.
 * Exclui URLs externos (http://, https://).
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..', '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const refs = [];
const scriptRe = /<script[^>]+src\s*=\s*["']([^"']+)["']/g;
const linkRe = /<link[^>]+href\s*=\s*["']([^"']+)["']/g;
let m;
while ((m = scriptRe.exec(html))) refs.push(m[1]);
while ((m = linkRe.exec(html))) refs.push(m[1]);

const missing = [];
for (const ref of refs) {
  if (/^https?:\/\//.test(ref)) continue;
  const file = path.join(ROOT, ref);
  if (!fs.existsSync(file)) missing.push(ref);
}
assert.deepStrictEqual(missing, [],
  `Ficheiros referenciados pelo index.html mas inexistentes: ${missing.join(', ')}`);

assert.ok(refs.length >= 4, `Esperava >=4 referências de assets, encontrei ${refs.length}`);
