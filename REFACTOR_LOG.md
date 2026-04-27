# REFACTOR_LOG — Sessão autónoma

> Log em português. Linha temporal do que foi feito, porquê, e o que ficou pendente.
> Este ficheiro é o que o utilizador lê de manhã.

---

## 2026-04-27 — Início da sessão

Utilizador pediu refactor autónomo (~8h) de um projecto vanilla web app + script Node.js, de god files monolíticos para arquitectura limpa estilo open-source. Princípios: não quebrar build, commits atómicos (depois cancelado a meio — ver abaixo), registar tudo, não corrigir bugs (só registar), não fazer push.

### Mudança de instruções a meio da sessão

Utilizador pediu durante a sessão: **não faças `git commit`, eu faço de manhã**. Implicações:
- Sem checkpoints atómicos. Reverter um passo individual passou a depender de `git restore <ficheiro>` (volta ao HEAD original `36801bc`) ou `rm` em ficheiros novos.
- A branch `refactor/clean-architecture` foi criada e estamos lá; ficou com working-tree dirty e tudo unstaged até o utilizador rever.
- Adoptei a regra: validar com `npm run validate` (syntax check + smoke tests) depois de cada extracção; em caso de falha, reverter de imediato.
- O git deste container não tinha `user.email` configurado. Para evitar mexer em config, fica para o utilizador acrescentar identidade local antes de commitar.

---

### Fase 1 — Discovery (concluída)

Descrito em detalhe em `ANALYSIS.md`. Resumo:

- **Stack identificada**: app web estática vanilla (HTML+CSS+JS num ficheiro só) + 1 script Node.js auxiliar (`os_guide.js`) que gera `.docx`. Sem build, sem testes, sem CI, sem `package.json`.
- **God files**:
  - `index.html` (1003 linhas) — mistura HTML + CSS + JS com ~10 responsabilidades distintas.
  - `os_guide.js` (1372 linhas) — script Node misturando helpers, diagramas e ~8 capítulos de conteúdo.
- **Não-refactor (conteúdo)**: `perguntas_quiz.md`, `sistemas_operacoes_estudo__2_.{md,html}`. Material de estudo, ficaram intactos.
- **Dados**: `output.js` (540 linhas, 690 KB) — 1 entrada por linha. Refactor inicial: deixar como está. Posteriormente split por tópico a pedido do utilizador (ver Fase 4-D).

#### Bugs / code smells observados (NÃO corrigidos — só registo)

- `index.html` linha 989 (originalmente, agora em `assets/js/core/storage.js`) força `state.optionOrder = ALL.map(()=>[0,1,2,3])` em `loadState()`, neutralizando o shuffle de opções. Aparenta intencional (comentário "explanations reference (A)/(B)/(C)/(D) by source order"). Ficou.
- `os_guide.js` tinha `hdrHead` (linha 1361) que era só um wrapper redundante de `hdrCell` — comentário "Fix missing helper" indica patch ad-hoc. **Eliminado durante o refactor** via `s/hdrHead(/hdrCell(/g` no conteúdo dos capítulos (mudança segura: idêntica semântica).
- `index.html` declarava `hdrHead` depois da chamada — funcionava por hoisting, má higiene. Resolvido pela eliminação acima.
- Não havia `.gitignore` — `.DS_Store` aparecia em untracked. Criado.

---

### Fase 2 — Plano de arquitectura (concluída)

Descrito em `ARCHITECTURE.md`. Decisões-chave:

- **App browser permanece vanilla**, sem bundler nem ESM. Split por múltiplos `<script>` clássicos com ordem determinística — preserva semântica de execução actual e mantém os `onclick="…"` no HTML a funcionar (`type="module"` partia isso).
- 3 camadas: `data` (estático) → `core` (state/storage, sem DOM) → `ui` (DOM) → `quiz` (casos de uso) → `boot`.
- `tools/os-guide/` para o script Node, dividido em `theme`, `primitives`, `tables`, `diagrams`, `content/chapter-NN-*.js`, `index.js`.
- `sistemas_operacoes_estudo__2_.html` permanece na raiz porque `output.js` referencia ~540 vezes via `target="_blank"` em links de explicação — mover quebraria todos.
- Não tocar em `output.js` na primeira passagem (ficou para Fase 4-D depois).

---

### Fase 3 — Safety net (concluída)

- Criada branch `refactor/clean-architecture`.
- Criado `.gitignore` (cobre `.DS_Store`, `node_modules`, `OS_Improved_Study_Guide.docx`, IDE).
- Criados smoke tests em `tests/smoke/`:
  - `output-data.test.js` — valida estrutura das 538 entradas de `ALL` (topic, id, question, 4 options, correctIdx, explanation, [hint]).
  - `html-structure.test.js` — valida que todos os IDs DOM e funções globais referenciados pelo HTML existem nos módulos JS.
  - `os-guide.test.js` — `node --check` no entry point e tentativa de `require()` (skip se `docx` não instalado).
  - `asset-refs.test.js` (adicionado mais tarde) — verifica que cada `<script src=…>` e `<link href=…>` em `index.html` aponta para um ficheiro que existe.
- Criado `tests/smoke/run-all.js` (runner sem framework — Node puro com `assert`).
- Criado `tests/validate.sh` (syntax check global + smoke tests — usado após cada extracção).
- **Baseline VERDE**: todos os smoke tests passam contra o estado actual.

Decisão: nada de Jest/Mocha/Vitest. Os tests usam só `assert` built-in para evitar adicionar dependência grande sem ganho proporcional num projecto deste tamanho.

---

### Fase 4-A — `index.html` (1003 → 183 linhas)

**Passo A — CSS** (1003 → 588 linhas no HTML):
- `assets/css/tokens.css` (33) — vars `:root`, reset, body, scrollbar global.
- `assets/css/layout.css` (173) — shell grid, topbar, sidebar, main, hamburger, drawer, media queries de layout.
- `assets/css/components.css` (217) — stat-chips, topic-list, wrong/weak, heatmap, qcard, options, explainer, nav-bar, btn, kbd, toast, roverlay, guide-btn.
- `<style>...</style>` substituído por 3 `<link rel="stylesheet">`.
- Validação: 118 selectors top-level antes / 118 depois (mesmas regras CSS).

**Passo B — JavaScript** (588 → 183 linhas no HTML):
- `assets/js/data/topic-colors.js` (37) — `TOPIC_COLORS`, `tc()`, `tb()`.
- `assets/js/core/state.js` (27) — `state`, `shuffle()`.
- `assets/js/core/storage.js` (33) — `saveState()`, `loadState()`, constante `STORAGE_KEY`.
- `assets/js/ui/toast.js` (10) — `showToast()`.
- `assets/js/ui/sidebar.js` (46) — drawer mobile + `toggleSection()` + listeners ESC/click-outside.
- `assets/js/ui/topic-filter.js` (68) — `buildTopicFilter()`, `mkTBtn()`, `setFilter()`, constante `TOPIC_ORDER`.
- `assets/js/ui/render.js` (77) — `currFP()` + `render()` (orquestra DOM da pergunta + opções + explainer).
- `assets/js/ui/stats.js` (61) — `updateStats()`, `updateHeatmap()`.
- `assets/js/ui/result.js` (28) — `showResult()`, `restartQuiz()`, constante `GRADES` extraída do array inline.
- `assets/js/quiz.js` (79) — `init()`, `select()`, `next/prev/skip()`, `jumpTo()`, `retryWrong()`, `confirmReset()`.
- `assets/js/keyboard.js` (21) — listener global de atalhos.
- `assets/js/boot.js` (12) — entry: `loadState()` ou `init()`.
- `<script>...</script>` inline substituído por 12 `<script src=…>` em ordem determinística (boot por último).

Mudança intencional não-comportamental: extraído array de grades de `showResult()` para constante `GRADES` (mesma estrutura, só renomeado de variável local para constante de módulo).

Smoke test `html-structure.test.js` actualizado: agora procura `function NAME(` em qualquer JS de `assets/js/`, em vez de procurar nomes literais no HTML (já não estão lá).

---

### Fase 4-B — `os_guide.js` (1372 linhas → módulos em `tools/os-guide/`)

Estrutura nova:
- `tools/os-guide/theme.js` (32 linhas) — paleta `C` + `b()`, `t()`, `mono()` (TextRun helpers).
- `tools/os-guide/primitives.js` (52) — `para`, `heading1/2/3`, `spacer`, `borders`, `noBorders`.
- `tools/os-guide/tables.js` (84) — `cell`, `hdrCell`, `tbl`, `row`, `infoBox`, `warningBox`, `successBox`.
- `tools/os-guide/diagrams.js` (327) — todos os 9 diagramas (process state, memory, Gantt, MLQ, MLFQ, RAG, dining philosophers, I/O flow, context switch).
- `tools/os-guide/content/cover.js` (36) — capa.
- `tools/os-guide/content/chapter-01-intro.js` (81)
- `tools/os-guide/content/chapter-02-startup.js` (150)
- `tools/os-guide/content/chapter-03-processes.js` (148)
- `tools/os-guide/content/chapter-04-scheduling.js` (164)
- `tools/os-guide/content/chapter-05-sync.js` (111)
- `tools/os-guide/content/chapter-06-classical-sync.js` (72)
- `tools/os-guide/content/chapter-07-deadlocks.js` (81)
- `tools/os-guide/content/chapter-08-quick-ref.js` (117)
- `tools/os-guide/index.js` (89) — assembleia do `Document` + `Packer.toBuffer` + `writeFileSync`.

Conteúdo de capítulos extraído via script Python que fatia `os_guide.js` por intervalo de linhas, aplica `s/hdrHead(/hdrCell(/g` (eliminado o alias redundante) e re-indenta para top-level. Verbatim no resto.

**Validação ponta-a-ponta**: corri `node tools/os-guide/index.js` antes e depois do refactor:
- Tamanho: baseline 43255 B → refactor 43252 B (diff 3 bytes / 0.007%).
- `document.xml` interno (após `unzip`): **byte-for-byte IDÊNTICO**.
- Os 3 bytes de diferença vêm de timestamps internos (core.xml ou settings.xml).

Smoke test `os-guide.test.js` reescrito: agora apanha o entry-point novo, faz `node --check` recursivo em `tools/os-guide/**/*.js`, e (se `docx` instalado) faz `require(entry)` para confirmar que o Document monta sem erro.

`os_guide.js` original removido.

### Fase 4-C — Movimentação de docs e setup

- `package.json` criado (declara dep `docx ^9.0.0`; scripts `test`, `validate`, `build:guide`). Justificação: era a única dependência runtime do `os_guide.js` original mas não havia manifesto.
- `node_modules/` instalado (22 packages, ~5 MB) — necessário para correr/validar o gerador de guia. Está em `.gitignore`.
- `perguntas_quiz.md` e `sistemas_operacoes_estudo__2_.md` movidos para `docs/`.
- `sistemas_operacoes_estudo__2_.html` **MANTIDO na raiz** porque `output.js` linka para ele 538 vezes em explicações; mover quebraria todos os links.

### Fase 4-D — Split de `output.js` por tópico (a pedido do utilizador, pós-sessão inicial)

Utilizador pediu: "*divide o output.js por tópico para ser mais fácil e formata o documento para que um humano consiga ler*".

Estado original: `output.js` com 540 linhas, **uma pergunta por linha** (1000–3000 caracteres por linha, ilegíveis em editor). 538 entradas, 19 tópicos.

Estrutura nova:
- `assets/js/data/questions/<slug>.js` (19 ficheiros): cada um declara `const Q_<NOME> = [...]`, **uma entrada por bloco multi-linha** (1 campo por linha; lista de 4 opções formatada como sub-array indentado).
- `output.js` reduzido a 37 linhas — orquestrador comentado que faz `const ALL = [].concat(Q_LINGUAGEM_C, Q_CONCEITOS_BASICOS, …)`. Define o global `ALL` que a app consome — interface inalterada.
- `index.html` carrega 19 `<script src="assets/js/data/questions/<slug>.js">` antes do `<script src="output.js">`. Ordem dos `<script>` define a ordem em `ALL` (igual à do baseline).

Tamanhos por tópico (linhas / nº de perguntas):

| ficheiro | linhas | perguntas |
|---|---:|---:|
| `processos.js` | 1074 | 76 |
| `sincronizacao.js` | 948 | 67 |
| `escalonamento.js` | 948 | 67 |
| `exame-parte-iii.js` | 682 | 48 |
| `linguagem-c.js` | 626 | 44 |
| `deadlocks.js` | 528 | 37 |
| `conceitos-basicos.js` | 500 | 35 |
| `ipc.js` | 486 | 34 |
| `exame-parte-ii.js` | 416 | 29 |
| `i-o-e-interrupcoes.js` | 304 | 21 |
| `system-calls.js` | 248 | 17 |
| `exame-parte-iv.js` | 276 | 19 |
| `treino-sinais.js` | 150 | 10 |
| `treino-fork.js` / `treino-pipes.js` / `treino-scheduling.js` | 122 cada | 8 cada |
| `exame-parte-v.js` | 92 | 6 |
| `exame-parte-i.js` / `exame-parte-vi.js` | 36 cada | 2 cada |

Os ficheiros maiores ultrapassam o limite simbólico de 500 linhas mas são **dados estruturados** com 1 pergunta por bloco de ~14 linhas (esquema fixo). Não são god files; são equivalente a CSVs com headers. Splittar mais (por sub-tópico) perderia a semântica.

**Mudanças induzidas:**
- `tests/smoke/output-data.test.js` — agora carrega todos os ficheiros de tópico + `output.js` num único `new Function(...)` (um só escopo léxico). `vm.runInContext` cria escopos separados por chamada e os `const Q_…` não cruzariam contextos.

**Validação:** 4/4 smoke tests passam. `ALL.length === 538`. Primeira entrada `id=1, topic="Linguagem C"`; última `id=538, topic="Treino · Sinais"` (igual ao baseline).

**Convenção lateral:** uso de `JSON.stringify` para serializar strings → ficheiros novos têm aspas duplas (em vez das simples do original). Funcionalmente idêntico, escapa correctamente HTML com aspas duplas (`<a href="…">`).

---

### Fase 5 — Polish (concluída)

- Criado `README.md` com descrição, stack, instruções de execução, smoke tests e geração do guia.
- Criado `CONTRIBUTING.md` com onde adicionar features, regra de dependência, convenções, workflow e decisões intencionais a não mexer.
- Passagem final em todos os ficheiros JS/CSS:
  - **Nenhum ficheiro de código >500 linhas** (excluindo dados em `assets/js/data/questions/` e conteúdo em `sistemas_operacoes_estudo__2_.html`).
  - Maior ficheiro de código: `tools/os-guide/diagrams.js` com 371 linhas.
  - Sem `console.log` de debug — só os intencionais no CLI runner (`tests/smoke/run-all.js`) e no entry-point do gerador (`tools/os-guide/index.js`, "Done!" / "Error:" — preserva mensagens originais).
  - Sem TODO/FIXME deixados no código.
- Smoke tests verdes; refactored `.docx` é byte-equivalente ao baseline (document.xml idêntico).

---

## Métricas finais (antes / depois)

| Métrica | Antes | Depois |
|---|---:|---:|
| Maior ficheiro de **código** (linhas) | 1372 (`os_guide.js`) | 371 (`tools/os-guide/diagrams.js`) |
| Ficheiros de **código** >500 linhas | 3 (`os_guide.js`, `index.html`, `output.js`) | 0 |
| `index.html` | 1003 linhas | 183 linhas (-82%) |
| `os_guide.js` | 1372 linhas (1 ficheiro) | dividido em 14 módulos (theme/primitives/tables/diagrams + 9 capítulos + index) |
| `output.js` | 540 linhas, 1 pergunta/linha (ilegível) | 37 linhas (orquestrador) + 19 ficheiros de tópico em `assets/js/data/questions/` (formatados, multi-linha por entrada) |
| Total de ficheiros de **código** (`.js`/`.css`/`.html`) | 3 | 38 |
| Smoke tests | 0 | 4 |
| Documentação técnica | 0 | 5 (README, ARCHITECTURE, CONTRIBUTING, ANALYSIS, REFACTOR_LOG) |
| Tamanho do `.docx` gerado | 43255 B | 43252 B (≡ byte-for-byte no `document.xml`) |

## Decisões importantes

1. **App browser permanece vanilla** (sem bundler, sem ESM). Split por múltiplos `<script>` clássicos preserva semântica e funções globais (`onclick="…"` no HTML não funcionariam com `type="module"`).
2. **`<script>` ordem é determinística**: questions data → app data → core → ui → quiz → keyboard → boot. Documentado em `ARCHITECTURE.md`.
3. **Preservar nomes públicos**: `ALL`, `state`, `select`, `next`, `prev`, `jumpTo`, `confirmReset`, `restartQuiz`, `toggleSidebar`, `toggleSection`, `retryWrong` — todos referenciados directamente pelo HTML, não podem ser renomeados sem actualizar HTML em paralelo.
4. **Helpers do `os-guide` ficam funções módulo (CommonJS)**, não classes — mantém estilo DSL existente, é puro builder de Document.
5. **Conteúdo dos capítulos extraído verbatim** (via script Python) — reduz risco de erro humano em centenas de linhas de tabelas. Apenas substituição automática `hdrHead → hdrCell` (alias redundante eliminado).
6. **`docx` instalado como dependência declarada** (`package.json` criado); era a única dep runtime do `os_guide.js` original mas não estava manifestada.
7. **Sem testes unitários por função** — o projecto é pequeno, smoke tests bastam para apanhar regressões catastróficas. Adicionar Jest/Vitest seria over-engineering.
8. **`sistemas_operacoes_estudo__2_.html` permanece na raiz** (não em `docs/`) porque é referenciado por ~540 hrefs em `output.js`.
9. **Sem commits durante a sessão** — utilizador pediu durante a sessão para não fazer commits, vai rever a working-tree de manhã.

## TODOs / Descobertas

### Code smells identificados (NÃO corrigidos por princípio "só mover/separar")

1. `assets/js/core/storage.js` `loadState()` força `state.optionOrder = ALL.map(()=>[0,1,2,3])`, neutralizando o shuffle de opções declarado em `state.js`. Comentário diz que é intencional ("explanations reference (A)/(B)/(C)/(D) by source order"). Decisão futura: ou remover `optionOrder` do estado (é morto), ou remover esta normalização e ajustar explicações. **Não toquei.**
2. `assets/js/quiz.js` `function skip(){next();}` é alias trivial. Mantido por ser referenciado pelo atalho `S` no `keyboard.js` semanticamente como "skip" (futuro: skip pode tornar-se diferente de next).

### Refactor opcional (não-crítico, não feito)

1. ~~**Split de `output.js` por tópico**~~ — feito posteriormente a pedido do utilizador (Fase 4-D).
2. **JSDoc / TypeScript** nos módulos `core/` e `ui/`. Estético, não funcional.

### Ideias para próximas sessões

1. **Automatizar publicação**: a app é estática, podia ser servida via GitHub Pages com 1 workflow YAML em `.github/workflows/`.
2. **PWA / offline mode**: adicionar `service-worker.js` para a app funcionar offline (já é estática, falta caching).
3. **Validador automático de entradas em `assets/js/data/questions/*.js`**: estender `output-data.test.js` para verificar que cada explicação só linka para anchors que existem em `sistemas_operacoes_estudo__2_.html`.
4. **Capa do `.docx` referencia "Chapters 1–2"** (em `tools/os-guide/content/cover.js`) mas o documento tem 8 capítulos. Pequena inconsistência de texto que estava no original; deixei verbatim.

## Como reverter

```bash
git checkout main         # volta ao estado antes do refactor (HEAD = 36801bc)
git branch -D refactor/clean-architecture   # apaga a branch
```

A branch `refactor/clean-architecture` foi criada mas **nenhum commit foi feito** (a pedido do utilizador). Toda a alteração está em working-tree, untracked + modified:

```bash
git status                # vê o diff completo da sessão
```

## Nota sobre `git status` — moves vs deletes

`git status` mostra `perguntas_quiz.md` e `sistemas_operacoes_estudo__2_.md` como **deleted**. **Não estão perdidos** — foram movidos para `docs/` e aparecem em untracked. Quando fizeres `git add` aos novos paths E ao delete simultaneamente, o git detecta automaticamente como rename. Análogo para `os_guide.js` (deleted) → `tools/os-guide/` (untracked); aqui foi reescrito em vários ficheiros, não é um rename atómico, mas funcionalmente equivalente. Idem para `output.js` (modificado) — foi simplificado para orquestrador, e as perguntas foram para os 19 ficheiros novos em `assets/js/data/questions/`.

## Plano de commits sugerido

Para fazer commits manualmente em chunks lógicos sugiro esta ordem (cada um é independente):

1. `.gitignore` + `package.json` + `package-lock.json` + setup docs (ANALYSIS, ARCHITECTURE, REFACTOR_LOG, README, CONTRIBUTING).
2. CSS extraído (`assets/css/*.css`) + remover `<style>` em `index.html`.
3. JS extraído (`assets/js/{data,core,ui}/*.js` + quiz/keyboard/boot) + remover `<script>` inline em `index.html`.
4. `tools/os-guide/` (helpers + content + index.js) + remover `os_guide.js`.
5. `tests/` + `mv perguntas_quiz.md docs/` + `mv sistemas_operacoes_estudo__2_.md docs/`.
6. `assets/js/data/questions/*.js` + simplificação de `output.js` para orquestrador + adição dos 19 `<script>` em `index.html`.

## Próximos passos sugeridos para o utilizador

1. **Configurar identidade git local** antes de commitar (ou exportar `GIT_AUTHOR_*` env vars).
2. **Rever** `git status` e `git diff` na branch.
3. **Abrir `index.html` num browser real** — os smoke tests não cobrem visualização. Verificar:
   - Quiz arranca e mostra pergunta 1.
   - Botões de tópicos no sidebar funcionam.
   - Atalhos `1/2/3/4`, `←/→`, `S`, `R` funcionam.
   - Reset funciona.
   - `localStorage` persiste entre reloads.
   - Drawer mobile funciona em viewport <900px.
4. **Correr `npm run build:guide`** e abrir `OS_Improved_Study_Guide.docx` — comparar com versão anterior.
5. **Decidir sobre os code smells** registados em §"Code smells identificados".
6. **Fazer commits** em chunks (sugestão na §"Plano de commits sugerido").
