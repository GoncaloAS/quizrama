/**
 * Smoke test: valida estrutura de output.js (banco de perguntas).
 *
 * Esquema esperado de cada entrada:
 *   [topic, id, questionHtml, optionsArray(4), correctIdx(0-3), explanationHtml, hintHtml]
 *
 * NUNCA muda o esquema sem actualizar este teste E todos os consumidores.
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..', '..');

// O banco de perguntas está dividido por tópico em assets/js/data/questions/*.js.
// Cada ficheiro declara `const Q_<SLUG> = [...]`. O `output.js` orquestrador
// faz `const ALL = [].concat(Q_X, Q_Y, …)`. Para extrair ALL no Node, juntamos
// todos os ficheiros num único Function body (mesmo escopo léxico) e fazemos return.
const QUESTIONS_DIR = path.join(ROOT, 'assets', 'js', 'data', 'questions');
const topicFiles = fs.readdirSync(QUESTIONS_DIR).filter(f => f.endsWith('.js')).sort();
assert.ok(topicFiles.length > 0, 'Não encontrei ficheiros em assets/js/data/questions/');

const bundle =
  topicFiles.map(f => fs.readFileSync(path.join(QUESTIONS_DIR, f), 'utf8')).join('\n') +
  '\n' +
  fs.readFileSync(path.join(ROOT, 'output.js'), 'utf8') +
  '\n; return ALL;';
// eslint-disable-next-line no-new-func
const ALL = new Function(bundle)();

assert.ok(Array.isArray(ALL), 'ALL deve ser um array');
assert.ok(ALL.length > 100, `ALL deve ter >100 entradas, tem ${ALL.length}`);

const TOPICS = new Set();
for (let i = 0; i < ALL.length; i++) {
  const q = ALL[i];
  assert.ok(Array.isArray(q), `entrada #${i} não é array`);
  assert.ok(q.length >= 6 && q.length <= 7,
    `entrada #${i} tem ${q.length} campos (esperado 6 ou 7)`);
  const [topic, id, questionHtml, options, correctIdx, explanationHtml] = q;
  assert.strictEqual(typeof topic, 'string', `entrada #${i}: topic não é string`);
  assert.ok(topic.length > 0, `entrada #${i}: topic vazio`);
  assert.ok(['string', 'number'].includes(typeof id), `entrada #${i}: id deve ser string ou number`);
  assert.strictEqual(typeof questionHtml, 'string', `entrada #${i}: question não é string`);
  assert.ok(Array.isArray(options), `entrada #${i}: options não é array`);
  assert.strictEqual(options.length, 4, `entrada #${i}: options tem ${options.length} (esperado 4)`);
  options.forEach((o, j) => assert.strictEqual(typeof o, 'string',
    `entrada #${i}, opção ${j}: não é string`));
  const ci = typeof correctIdx === 'string' ? parseInt(correctIdx, 10) : correctIdx;
  assert.ok(ci >= 0 && ci <= 3, `entrada #${i}: correctIdx ${correctIdx} fora de [0..3]`);
  assert.strictEqual(typeof explanationHtml, 'string',
    `entrada #${i}: explanation não é string`);
  TOPICS.add(topic);
}

assert.ok(TOPICS.size >= 5, `Esperava >=5 tópicos distintos, encontrei ${TOPICS.size}`);
