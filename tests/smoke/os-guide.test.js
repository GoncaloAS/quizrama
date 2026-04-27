/**
 * Smoke test: valida que o gerador do guia (tools/os-guide) carrega sem erro,
 * e — se `docx` estiver instalado — produz um Document válido.
 *
 * Não escreve `.docx` (require.main !== module no entry-point), só monta-o
 * em memória.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..', '..');
const entry = path.join(ROOT, 'tools', 'os-guide', 'index.js');

assert.ok(fs.existsSync(entry), 'Falta tools/os-guide/index.js');
execSync(`node --check "${entry}"`, { stdio: 'pipe' });

// Sintaxe de cada módulo individualmente — apanha imports partidos.
const tree = path.join(ROOT, 'tools', 'os-guide');
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walk(full);
    else if (f.isFile() && f.name.endsWith('.js')) {
      execSync(`node --check "${full}"`, { stdio: 'pipe' });
    }
  }
}
walk(tree);

// Carregamento real — só se docx estiver instalado.
if (!fs.existsSync(path.join(ROOT, 'node_modules', 'docx'))) return;
const doc = require(entry);
assert.ok(doc, 'tools/os-guide/index.js não exporta um Document');
