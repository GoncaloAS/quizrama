#!/usr/bin/env bash
# Validação rápida: syntax check de todos os JS + smoke tests.
# Usa-se após cada extracção do refactor.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▸ syntax check (node --check) em todos os .js…"
fail=0
while IFS= read -r f; do
  if ! node --check "$f" 2>&1; then
    echo "  ✗ $f"
    fail=1
  fi
done < <(find . -type f -name '*.js' -not -path './node_modules/*' -not -path './.git/*')

if [ "$fail" -ne 0 ]; then
  echo "FAIL: alguns ficheiros .js têm erro de sintaxe."
  exit 1
fi
echo "  ok."

echo "▸ smoke tests…"
node tests/smoke/run-all.js
