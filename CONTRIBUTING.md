# CONTRIBUTING

## Onde adicionar coisas

| Mudança | Localização |
|---|---|
| Adicionar perguntas novas | `output.js` (mantém o esquema `[topic, id, html, [4 options], correctIdx, explanationHtml, hint?]`). Tópicos novos: também adicionar entrada em `assets/js/data/topic-colors.js` e em `TOPIC_ORDER` em `assets/js/ui/topic-filter.js`. |
| Mudar visual / layout | `assets/css/{tokens,layout,components}.css` — ver §Convenções CSS. |
| Lógica de estado / persistência | `assets/js/core/state.js` ou `core/storage.js`. **Não** introduzir DOM aqui. |
| Renderização de DOM | `assets/js/ui/*.js`. Lê de `state` e `ALL`; escreve no DOM. |
| Caso de uso (responder, navegar, reset) | `assets/js/quiz.js`. |
| Atalho de teclado novo | `assets/js/keyboard.js`. |
| Script gerador do guia (texto, diagramas) | `tools/os-guide/`. Conteúdo por capítulo em `content/chapter-NN-*.js`; helpers em `theme.js`/`primitives.js`/`tables.js`/`diagrams.js`. |

## Regra de dependência (browser)

```
boot.js → keyboard.js → quiz.js → ui/*.js → core/*.js → data/*.js
                                                ▲
                                          output.js (ALL)
```

- UI não chama `quiz.js`; o oposto sim.
- Core não toca DOM (testável em Node puro).
- Data é estático.

A ordem de carregamento dos `<script>` no `index.html` reflecte esta hierarquia. **`boot.js` tem de ser o último.**

## Convenções de código

- **JS**: 2 espaços, sem ponto e vírgula opcional (segue o estilo existente em `assets/js/`). `function foo(arg)` para definições de funções globais (assim ficam em `window.foo` para callbacks `onclick="foo(…)"` referenciados no HTML).
- **CSS**: organizado por secção (`/* COMPONENT */`), classes em kebab-case, design tokens em CSS custom properties no `:root`.
- **Ficheiros**: kebab-case (`topic-filter.js`, `chapter-04-scheduling.js`).
- **Constantes globais**: `SCREAMING_SNAKE_CASE` (`TOPIC_COLORS`, `TOPIC_ORDER`, `STORAGE_KEY`, `GRADES`).
- **Limite de tamanho**: 1 ficheiro = 1 responsabilidade clara, alvo ≤300 linhas, máximo 500.

## Workflow

1. Branch a partir de `main`.
2. Commits atómicos: 1 commit por extracção / mudança lógica.
3. Mensagens descritivas em português ou inglês — seguir estilo do histórico.
4. Antes de abrir PR, correr:
   ```bash
   npm run validate
   ```
5. Para o gerador de guia:
   ```bash
   npm run build:guide
   # confere o tamanho do .docx — diff <5% vs último commit é normal
   ```

## Smoke tests

Os tests vivem em `tests/smoke/*.test.js` e correm via `tests/smoke/run-all.js` (sem framework — só `assert`). Adicionar novo teste:

1. Cria `tests/smoke/<nome>.test.js`.
2. Importa `assert`, lê o que precisa de verificar, faz `assert.*`.
3. O runner descobre automaticamente.

Não adicionar Jest / Mocha / Vitest sem proposta clara — a leveza é deliberada.

## Decisões intencionais (não mexer sem justificação)

- **`output.js` exporta o global `ALL`** — alterar o nome quebra a app inteira.
- **`sistemas_operacoes_estudo__2_.html` fica na raiz** — é referenciado por `output.js` em ~540 hrefs nas explicações; mover quebraria todos os links.
- **Sem `<script type="module">`** — os `onclick="…"` no HTML precisam de funções no escopo global; ESM partia o modelo.
- **`optionOrder` é forçado a `[0,1,2,3]` em `loadState()`** — as explicações em `output.js` referem opções por letra original `(A)`/`(B)`/`(C)`/`(D)`. Não mexer.
