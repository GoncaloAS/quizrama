# ANALYSIS — Estado actual do projecto

> Snapshot da Fase 1 (Discovery). Lê o projecto sem alterar código.

---

## 1. Identificação do projecto

- **Nome**: OS Quiz / "Quizrama"
- **Domínio**: Aplicação web estática para estudo de Sistemas de Operações (FCUP 2025/2026)
- **Tipo**: Single-Page App estática (1 ficheiro HTML, sem servidor) + 1 script Node.js auxiliar (gerador de guia .docx)

## 2. Stack técnico

| Item | Estado |
|---|---|
| Linguagem | HTML5 + CSS3 + JavaScript (ES2020, vanilla, sem TypeScript) |
| Framework UI | **Nenhum** (DOM puro, sem React/Vue/etc.) |
| Build system | **Nenhum** (não há bundler nem transpiler — abre-se `index.html` directamente no browser) |
| Package manager | **Não inicializado** (não existe `package.json` nem `node_modules`) |
| Runtime auxiliar | Node.js v20.20.2 / npm 10.8.2 (apenas para `os_guide.js`) |
| Linter / formatter | **Nenhum** configurado |
| Testes | **Nenhuns** |
| CI/CD | **Nenhum** (`.github/`, `.gitlab-ci.yml`, etc. ausentes) |
| Git | Inicializado, branch `main`, remote `origin/main` configurado |

## 3. Pontos de entrada

| Entry point | Como correr | O que faz |
|---|---|---|
| `index.html` | Abrir num browser (`file://` ou servidor estático qualquer) | App de quiz interactiva |
| `os_guide.js` | `node os_guide.js` (depende de `docx` em runtime — não instalado) | Gera `OS_Improved_Study_Guide.docx` |

## 4. Inventário de ficheiros (raiz)

| Ficheiro | Linhas | Tamanho | Natureza |
|---|---:|---:|---|
| `index.html` | **1003** | 37 KB | App (HTML + CSS + JS misturados) |
| `output.js` | **540** | 690 KB | Dados — `const ALL = [...]` com 538 perguntas (1 linha por pergunta) |
| `os_guide.js` | **1372** | 105 KB | Script Node.js gerador de .docx |
| `perguntas_quiz.md` | 2366 | 93 KB | Conteúdo — perguntas em Markdown (fonte humana, não importada pela app) |
| `sistemas_operacoes_estudo__2_.html` | 6067 | 223 KB | Conteúdo — guia de estudo de referência (linkado dos enunciados) |
| `sistemas_operacoes_estudo__2_.md` | 3927 | 154 KB | Conteúdo — versão MD do guia |
| `Dockerfile.refactor` | 17 | 414 B | Imagem Docker para correr Claude Code (meta-ficheiro, não da app) |
| `.DS_Store` | — | 6 KB | Lixo macOS — candidato a `.gitignore` |

## 5. Ficheiros >500 linhas (ordem decrescente)

1. `sistemas_operacoes_estudo__2_.html` — 6067 linhas — **conteúdo de referência** (não-refactor)
2. `sistemas_operacoes_estudo__2_.md` — 3927 linhas — **conteúdo** (não-refactor)
3. `perguntas_quiz.md` — 2366 linhas — **conteúdo** (não-refactor)
4. `os_guide.js` — **1372 linhas** — god file (script gerador)
5. `index.html` — **1003 linhas** — god file (app inteira num só ficheiro)
6. `output.js` — 540 linhas — dados; 1 entrada por linha; refactor opcional (split por tópico)

→ **Alvos reais de refactor**: `index.html` e `os_guide.js`. `output.js` é dados (1 linha por registo) — split por tópico fica para futuro.

## 6. Dependências externas

### Browser (`index.html` + `output.js`)
- `fonts.googleapis.com` — fontes Syne e JetBrains Mono (CDN)
- `localStorage` — persistência de progresso (API nativa)
- Sem `<script src="https://...">` de bibliotecas externas; tudo vanilla.

### Node (`os_guide.js`)
- `docx` (npm) — única dependência, importada via `require('docx')`
- `fs` (built-in)

> ⚠️ Ausência de `package.json` significa que correr `os_guide.js` exige `npm install docx` ad-hoc. **Será corrigido na Fase 5** com criação de `package.json` mínimo.

## 7. Mapa de dependências internas (5 ficheiros principais)

```
index.html  ──<script src>──▶  output.js
                                  └─ const ALL = [[topic, id, qHtml, opts, correctIdx, expHtml, hint], …]
index.html  ──link href──▶  sistemas_operacoes_estudo__2_.html  (links em explicações abrem em nova tab)

os_guide.js  ──require──▶  docx (npm)
            ──fs.writeFileSync──▶  OS_Improved_Study_Guide.docx
```

`os_guide.js` é completamente **independente** do resto da app. São efectivamente dois sub-projectos partilhando a mesma raiz.

## 8. God files — responsabilidades misturadas

### `index.html` (1003 linhas)

Mistura **3 linguagens** e **~10 responsabilidades**:

| # | Responsabilidade | Linhas aprox. |
|---|---|---:|
| 1 | HTML estrutural (topbar, sidebar, main, scoreboard, modal, toast) | 1–10, 415–571 |
| 2 | CSS — design tokens (`:root` variables) | 11–26 |
| 3 | CSS — layout (`shell`, `sidebar`, `main`) | 27–100 |
| 4 | CSS — componentes (botões, cartões, opções, heatmap, modal, toast) | 100–414 |
| 5 | JS — mapa de cores por tópico (`TOPIC_COLORS`) | 607–637 |
| 6 | JS — estado global (`state`) e persistência (`localStorage`) | 639–644, 968–992 |
| 7 | JS — render (questão, opções, stats, heatmap) | 727–875 |
| 8 | JS — lógica de quiz (`select`, `showResult`, `restartQuiz`, `retryWrong`) | 795–931 |
| 9 | JS — filtros por tópico (`buildTopicFilter`, `setFilter`, `mkTBtn`) | 663–722 |
| 10 | JS — keyboard / drawer mobile / toast / boot | 938–1001 |

### `os_guide.js` (1372 linhas)

| # | Responsabilidade | Linhas aprox. |
|---|---|---:|
| 1 | Imports + paleta de cores | 1–26 |
| 2 | Helpers de texto inline (`b`, `t`, `mono`) | 28–31 |
| 3 | Helpers de parágrafos / headings / spacers | 33–63 |
| 4 | Helpers de tabela (`cell`, `hdrCell`, `tbl`, `row`, `infoBox`, `warningBox`, `successBox`) | 65–135 |
| 5 | 10 diagramas ASCII-as-table (process states, memory layout, Gantt, MLQ, MLFQ, RAG, dining philosophers, I/O flow, context switch) | 137–514 |
| 6 | Document assembly — capa + capítulos 1 a 8 (massa do ficheiro) | 519–1356 |
| 7 | Helper duplicado declarado no fim (`hdrHead`) | 1361–1363 |
| 8 | Pack + write + tratamento de erros | 1365–1371 |

## 9. Estado dos testes

**Inexistentes.** Nenhuma framework de testes configurada. Smoke tests serão criados na Fase 3 (sintaxe Node + carga DOM mínima via JSDOM, ou apenas `node --check`).

## 10. Estado do build / arranque

- **App web**: arranca abrindo `index.html` num browser. Verificação: `node --check output.js` passa, `index.html` é um único ficheiro válido. Não foi executado em browser real durante a discovery (ambiente headless).
- **Script docx**: `node --check os_guide.js` passa. Não foi executado ponta-a-ponta porque exigiria `npm install docx` (~5 MB) — só será corrido após a Fase 3 instalar a dependência sob `package.json`.

## 11. Observações relevantes para o refactor

- Não há sistema de módulos no browser (`<script>` simples, não `type="module"`). Refactor deve preservar isto ou introduzir `type="module"` explicitamente. **Decisão na Fase 2**: usar carregamento ordenado de `<script>` clássico para evitar mudar o modelo de execução; manter o globais já existentes (`state`, `ALL`, etc.) com ordem de carga determinística.
- `output.js` define o global `ALL` que `index.html` usa directamente. Refactor não pode mudar este nome sem alterar comportamento.
- `os_guide.js` declara `hdrHead` no fim do ficheiro mas usa-o numa tabela (linha 1346) — funciona porque `function` é hoisted. Já é um cheiro de código.
- `os_guide.js` tem TODO implícito: comentário "Fix missing helper" (linha 1360) sugere que `hdrHead` foi adicionado a posteriori.
- `.DS_Store` está em untracked — adicionar a `.gitignore`.
- `Dockerfile.refactor` é meta-ferramenta para esta sessão; deve ficar.

## 12. TODOs / bugs visíveis (registar mas NÃO corrigir)

- Linha 989 de `index.html` força `state.optionOrder = ALL.map(()=>[0,1,2,3])` em `loadState()` — comentário diz "Force unshuffled option order". Isto torna o `optionOrder` em `state` (linha 653) inerte. Não é bug, é dead code intencional.
- `os_guide.js` linha 1361 `hdrHead` tem chamada em 1346 mas a função delega 100% para `hdrCell` — **redundante**. Anotar como simplificação para a Fase 4.
- `index.html` carrega `output.js` antes do código inline — ordem é correcta (`ALL` já existe ao executar boot), mas qualquer split de JS tem de manter esta invariante.

---

**Conclusão**: projecto pequeno-médio, vanilla, sem testes nem build. Refactor é principalmente **decomposição de god files** em módulos coerentes — não há lógica complexa nem dependências circulares para resolver. Risco baixo desde que a ordem de carregamento dos scripts e os nomes globais públicos (`ALL`, funções `onclick="..."` referenciadas no HTML) sejam preservados.
