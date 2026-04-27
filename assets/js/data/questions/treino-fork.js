/**
 * Banco de perguntas — Treino · fork()
 * Total: 8 perguntas.
 *
 * Esquema de cada entrada:
 *   [topic, id, questionHtml, [4 options], correctIdx, explanationHtml, hintHtml?]
 */
/* eslint-disable */
const Q_TREINO_FORK = [
  [
    "Treino · fork()",
    "505",
    "Quantos processos existem após executar:<br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);\">fork();\nfork();\nfork();</pre>",
    [
      "3",
      "6",
      "8",
      "16",
    ],
    2,
    "<b>(C) 8 ✓ correcta:</b> três <code>fork()</code> sequenciais — cada um duplica o número de processos. Início: 1 proc → após 1º fork: 2 → 2º fork: 4 → 3º fork: 8. Fórmula: <b>2ⁿ</b> onde n = nº de forks. Logo 2³ = <b>8</b>.\n\n<b>(A) ✗</b>: 3 é o número de chamadas <code>fork()</code>, não de processos.\n<b>(B) ✗</b>: 6 não corresponde a nenhuma operação razoável aqui.\n<b>(D) ✗</b>: 16 = 2⁴ corresponderia a 4 forks.",
    "📌 Regra geral: N forks sequenciais sem break/condição → 2ᴺ processos. Cuidado quando há <code>break</code>, <code>if</code>/<code>else</code> ou <code>exec</code> — mudam tudo.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · fork()",
    "506",
    "Após o seguinte loop, quantos processos existem (incluindo o original)?<br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);\">for (int i = 0; i &lt; 4; i++)\n    fork();</pre>",
    [
      "4",
      "5",
      "8",
      "16",
    ],
    3,
    "<b>(D) 16 ✓ correcta:</b> em cada iteração do loop, <i>todos</i> os processos existentes chamam <code>fork()</code> — duplicando o total. 1 → 2 → 4 → 8 → 16. Após 4 iterações: <b>2⁴ = 16</b>.\n\n<b>(A) ✗</b>: 4 é o número de iterações, não de processos.\n<b>(B) ✓ pegadinha</b>: 5 confunde \"iterações + 1\".\n<b>(C) ✗</b>: 8 = 2³ corresponderia a 3 forks.",
    "📌 Truque: como o filho também \"vê\" o resto do loop, ele também faz forks nas iterações seguintes — daí a duplicação.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · fork()",
    "507",
    "Quantos processos <i>filhos</i> são criados pelo seguinte código?<br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);\">for (int i = 0; i &lt; 5; i++)\n    if (fork() == 0)\n        break;</pre>",
    [
      "4",
      "5",
      "6",
      "32",
    ],
    1,
    "<b>(B) 5 ✓ correcta:</b> o <code>break</code> só executa no <i>filho</i> (que recebe <code>fork()==0</code>) — impede que o filho continue o loop. Apenas o pai itera 5 vezes, criando <b>5 filhos</b>. Total processos: 1 (pai) + 5 (filhos) = 6.\n\n<b>(A) ✗</b>: 4 ignoraria uma das iterações.\n<b>(C) ✗</b>: 6 é o total de processos, não só de filhos.\n<b>(D) ✗</b>: 32 = 2⁵ seria sem o <code>break</code>.",
    "📌 Sem o <code>break</code>, o número explodia para 32 (2⁵). O <code>break</code> \"domestica\" o filho e dá uma topologia em estrela: pai com fan-out 5.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · fork()",
    "508",
    "Quantos processos existem após o seguinte código?<br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);\">if (fork() == 0)\n    fork();</pre>",
    [
      "1",
      "2",
      "3",
      "4",
    ],
    2,
    "<b>(C) 3 ✓ correcta:</b> trace:<br>1) Processo A faz <code>fork()</code> → cria filho B. A.fork() retorna pid&gt;0; B.fork() retorna 0.<br>2) A: condição <code>(pid==0)</code> é <i>falsa</i> → não entra no <code>if</code>.<br>3) B: condição é <i>verdadeira</i> → entra no <code>if</code> e faz <code>fork()</code> → cria neto C.<br>Total: A + B + C = <b>3 processos</b>.\n\n<b>(A) ✗</b>: 1 ignora qualquer fork.\n<b>(B) ✗</b>: 2 seria só o primeiro fork sem o segundo.\n<b>(D) ✗</b>: 4 seria se o pai também entrasse no if.",
    "📌 Topologia: A → B → C (cadeia). Só o filho B é que cria neto.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · fork()",
    "509",
    "Quantas vezes a string \"hello\" é impressa?<br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);\">fork();\nfork();\nprintf(\"hello\\n\");</pre>",
    [
      "2",
      "3",
      "4",
      "8",
    ],
    2,
    "<b>(C) 4 ✓ correcta:</b> dois forks sequenciais → 2² = 4 processos. Cada um executa a instrução <code>printf</code> uma vez. Total: <b>4 linhas \"hello\"</b>.\n\n<b>(A) ✗</b>: 2 seria só com 1 fork.\n<b>(B) ✗</b>: 3 não corresponde a nenhuma fórmula 2ⁿ.\n<b>(D) ✗</b>: 8 = 2³ seria com 3 forks.",
    "📌 Cada processo executa todo o código a partir do ponto onde \"nasceu\" — incluindo o <code>printf</code> que vem depois dos forks.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · fork()",
    "510",
    "Quantos processos existem após:<br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);\">int pid = fork();\nif (pid &gt; 0) fork();</pre>",
    [
      "2",
      "3",
      "4",
      "5",
    ],
    1,
    "<b>(B) 3 ✓ correcta:</b> trace:<br>1) Processo A faz primeiro fork → A, B. A.pid &gt; 0; B.pid = 0.<br>2) A: <code>pid &gt; 0</code> é <i>verdadeiro</i> → entra no <code>if</code> e faz fork → cria C.<br>3) B: <code>pid &gt; 0</code> é <i>falso</i> (pid = 0) → salta o <code>if</code>.<br>Total: A + B + C = <b>3 processos</b>.\n\n<b>(A) ✗</b>: 2 ignoraria o segundo fork.\n<b>(C) ✗</b>: 4 seria se ambos entrassem no <code>if</code>.\n<b>(D) ✗</b>: 5 não corresponde.",
    "📌 Pegadinha: ao contrário da Q anterior, aqui só o <i>pai</i> (e não o filho) faz o segundo fork.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · fork()",
    "511",
    "Quantos caracteres totais são impressos?<br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);\">fork();\nprintf(\"a\");\nfork();\nprintf(\"b\");</pre>",
    [
      "4",
      "6",
      "8",
      "12",
    ],
    1,
    "<b>(B) 6 ✓ correcta:</b> trace:<br>1) Após 1º fork: 2 processos. Ambos fazem <code>printf(\"a\")</code> → 2 \"a\"s.<br>2) Após 2º fork: 4 processos. Todos fazem <code>printf(\"b\")</code> → 4 \"b\"s.<br>Total: 2 + 4 = <b>6 caracteres</b>.\n\n<b>(A) ✗</b>: 4 contaria só os \"b\"s.\n<b>(C) ✗</b>: 8 seria 4×2 (errado).\n<b>(D) ✗</b>: 12 não corresponde.",
    "📌 A ordem em que os caracteres aparecem é <i>indeterminada</i> — depende do scheduling. Mas o número total é determinístico.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · fork()",
    "512",
    "Quantos processos existem após:<br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);\">if (fork() == 0)\n    fork();\nelse\n    fork();</pre>",
    [
      "2",
      "3",
      "4",
      "8",
    ],
    2,
    "<b>(C) 4 ✓ correcta:</b> trace:<br>1) Processo A faz primeiro fork → A, B. A.fork() ≠ 0; B.fork() = 0.<br>2) A: condição falsa → entra no <code>else</code>, fork → cria C.<br>3) B: condição verdadeira → entra no <code>if</code>, fork → cria D.<br>Total: A + B + C + D = <b>4 processos</b>.\n\n<b>(A) ✗</b>: 2 ignoraria os forks no <code>if</code>/<code>else</code>.\n<b>(B) ✗</b>: 3 seria sem um dos ramos.\n<b>(D) ✗</b>: 8 não corresponde.",
    "📌 Como o <code>if</code> e o <code>else</code> são exclusivos, cada processo só faz UM fork adicional — daí a duplicação simples.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
];
