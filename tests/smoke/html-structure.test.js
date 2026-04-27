/**
 * Smoke test: valida que o HTML expõe todos os IDs/elementos
 * que o JavaScript da app referencia via `getElementById` ou `onclick="..."`.
 *
 * Apanha regressão típica: extrair JS para outro ficheiro mas esquecer
 * que um ID ou função global desapareceu.
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..', '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// IDs DOM lidos pelo JS (extraído da inspecção do código actual).
const REQUIRED_IDS = [
  'sidebar', 'sidebarBackdrop',
  'topicList', 'tFilter',
  'catBadge', 'qnumBadge', 'tIdx', 'tTot', 'pfill',
  'qtext', 'options',
  'explainer', 'expText', 'expNote',
  'tScore', 'tCorrect', 'tWrong',
  'ringFill',
  'wrongList', 'weakTopics',
  'heatmap',
  'streakBadge', 'streakNum',
  'rscore', 'rgrade', 'rsub', 'roverlay',
  'toast',
];

const missing = REQUIRED_IDS.filter(id => !new RegExp(`id\\s*=\\s*["']${id}["']`).test(html));
assert.deepStrictEqual(missing, [],
  `IDs em falta no HTML: ${missing.join(', ')}`);

// Funções globais referenciadas via onclick/onkeydown.
// Procuramos a *definição* (`function NAME(`) em qualquer ficheiro JS
// servido junto com o HTML — antes estavam todas em <script> inline,
// agora podem estar em qualquer módulo de assets/js/.
const REQUIRED_GLOBALS = [
  'toggleSidebar', 'toggleSection', 'confirmReset', 'restartQuiz',
  'select', 'jumpTo', 'next', 'prev', 'skip', 'retryWrong',
];

function collectJsSources(dir) {
  const sources = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) sources.push(...collectJsSources(full));
    else if (entry.isFile() && entry.name.endsWith('.js')) sources.push(full);
  }
  return sources;
}

const jsBundle = [html];
const assetsJs = path.join(ROOT, 'assets', 'js');
if (fs.existsSync(assetsJs)) {
  for (const file of collectJsSources(assetsJs)) {
    jsBundle.push(fs.readFileSync(file, 'utf8'));
  }
}
const allCode = jsBundle.join('\n');
const missingGlobals = REQUIRED_GLOBALS.filter(name =>
  !new RegExp(`function\\s+${name}\\s*\\(`).test(allCode));
assert.deepStrictEqual(missingGlobals, [],
  `Definições de funções globais em falta: ${missingGlobals.join(', ')}`);

// Verifica scripts carregados pelo HTML — pelo menos output.js tem de estar.
assert.ok(/<script[^>]+src\s*=\s*["'][^"']*output\.js["']/.test(html),
  'index.html não carrega output.js');
