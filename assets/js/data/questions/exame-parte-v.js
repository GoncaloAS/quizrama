/**
 * Banco de perguntas — Exame · Parte V
 * Total: 6 perguntas.
 *
 * Esquema de cada entrada:
 *   [topic, id, questionHtml, [4 options], correctIdx, explanationHtml, hintHtml?]
 */
/* eslint-disable */
const Q_EXAME_PARTE_V = [
  [
    "Exame · Parte V",
    "400",
    "Ao implementar sincronização entre processos concorrentes, a utilização do mecanismo de \"busy waiting\" (espera ocupada) traz vantagens em relação à utilização de semáforos baseados em fila quando:",
    [
      "o tempo para executar a secção crítica é menor que o tempo de troca de contexto do processo",
      "o tempo para executar a secção crítica é maior do que o tempo de espera pelo semáforo",
      "o tempo para executar a secção crítica é maior que o tempo de troca de contexto do processo",
      "—",
    ],
    0,
    "<b>(A) ✓ correcta:</b> se a CS é mais curta que o tempo de troca de contexto, o overhead de suspender/acordar (mutex) supera o de simplesmente fazer busy-wait. Spinlock é mais eficiente.\n\n<b>(B) ✗</b>: se a CS é maior que o tempo de espera, busy-wait queima muito CPU.\n\n<b>(C) ✗</b>: invertido — esse cenário favorece semáforo com fila.",
    "<br><a href=\"sistemas_operacoes_estudo__2_.html#70-busy-waiting-e-spinlocks\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §70 Busy Waiting e Spinlocks ↗</a>",
  ],
  [
    "Exame · Parte V",
    "403",
    "A solução abaixo para o problema da exclusão mútua entre dois processos está correcta?<br><br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);overflow-x:auto;\">shared int c1 = 1; int c2 = 1;<br><br>void p0() {<br>  for(;;) {<br>    c1 = 0;<br>    while (c2 == 0) {}<br>    \"secção crítica\"<br>    c2 = 1;<br>  }<br>}<br><br>void p1() {<br>  for(;;) {<br>    c2 = 0;<br>    while (c1 == 0) {}<br>    \"secção crítica\"<br>    c2 = 1;  // bug: devia ser c1 = 1<br>  }<br>}<br><br>main() {<br>  p0();<br>  p1();<br>}<br></pre>",
    [
      "sim",
      "não",
      "não há elementos suficientes para responder a esta questão pois a solução depende do código da secção crítica",
      "—",
    ],
    1,
    "<b>(B) ✓ correcta:</b> tem um bug evidente (<code>p1</code> repõe <code>c2 = 1</code> em vez de <code>c1 = 1</code>) e mesmo sem o bug a estrutura não garante exclusão mútua nem progresso (ambos podem ficar bloqueados ou entrar simultaneamente).\n\n<b>(A) ✗</b>: o código não está correcto.\n\n<b>(C) ✗</b>: a correcção pode ser determinada estaticamente — não depende do código da CS.",
    "O código tem um bug — <code>p1</code> repõe <code>c2 = 1</code> em vez de <code>c1 = 1</code>, e mesmo sem o bug a estrutura não garante exclusão mútua nem progresso.<br><a href=\"sistemas_operacoes_estudo__2_.html#55-critical-sections-e-race-conditions\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §55 Critical Sections e Race Conditions ↗</a>",
  ],
  [
    "Exame · Parte V",
    "430",
    "Qual dos seguintes códigos resolve o problema de exclusão mútua sobre uma região crítica, entre 2 processos, de forma correta?",
    [
      "Código (1) — usa variável <code>turn</code>:",
      "Código (2) — usa flag, testa antes de set:",
      "Código (3) — usa flag, set antes de testar:",
      "—",
    ],
    0,
    "<b>(A) ✓ correcta:</b> a alternância estrita via <code>turn</code> garante mutual exclusion (só um pode entrar de cada vez). Falha em <i>progress</i> (se um nunca quiser entrar, o outro fica preso) — mas das três opções é a única que assegura ME.\n\n<b>(B) ✗</b>: race condition entre testar e setar a flag — ambos podem entrar simultaneamente.\n\n<b>(C) ✗</b>: pode dar deadlock — ambos setam flag=TRUE e ficam à espera mutuamente.",
    "(1) garante exclusão mútua via alternância estrita (mas viola progresso se o outro nunca quiser entrar). (2) tem race condition: ambos podem ver flag=FALSE, setar flag=TRUE e entrar. (3) pode dar deadlock: ambos setam flag=TRUE e ficam à espera mutuamente. De entre as opções, apenas (1) garante exclusão mútua.<br><a href=\"sistemas_operacoes_estudo__2_.html#55-critical-sections-e-race-conditions\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §55 Critical Sections e Race Conditions ↗</a>",
  ],
  [
    "Exame · Parte V",
    "437",
    "Uma instrução que verifique e modifique uma posição de memória de forma atómica:",
    [
      "é fundamental para implementar sincronização entre processos",
      "não é necessária para implementar sincronização entre processos",
      "torna a implementação da sincronização entre processos mais fácil",
      "—",
    ],
    0,
    "<b>(A) ✓ correcta:</b> <code>test_and_set</code> e <code>compare_and_swap</code> são o bloco fundamental para mutexes/semáforos em SMP. Sem atomicidade, o lock falha (race entre testar e modificar).\n\n<b>(B) ✗</b>: é necessária — sem ela, sincronização correcta em SMP é impossível.\n\n<b>(C) ✗</b>: vai além de \"facilitar\" — é fundamental.",
    "Operações atómicas como <code>test_and_set</code> e <code>compare_and_swap</code> são o bloco de construção fundamental de mutexes e semáforos em sistemas multiprocessador.<br><a href=\"sistemas_operacoes_estudo__2_.html#56-operações-atómicas\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §56 Operações Atómicas ↗</a>",
  ],
  [
    "Exame · Parte V",
    "468",
    "Considere a seguinte implementação do problema dos leitores e escritores:<br><br><pre style=\"background:#0a0e1a;padding:10px;border-radius:6px;font-size:.85em;color:#a5c1ff;border:1px solid rgba(91,138,240,.15);overflow-x:auto;\"><br>semáforo mutex = 1;<br>semáforo bd = 1;<br>int num_leitores = 0;<br><br>escritor() {<br>  while (true) {<br>    produz_dado();<br>    down(&amp;bd);<br>    escreve_dado_bd();<br>    up(&amp;bd);<br>  }<br>}<br><br>leitor() {<br>  while (true) {<br>    down(&amp;mutex);<br>    num_leitores++;<br>    if (num_leitores == 1) down(&amp;bd);<br>    up(&amp;mutex);<br>    le_dado();<br>    down(&amp;mutex);<br>    num_leitores--;<br>    if (num_leitores == 0) up(&amp;bd);<br>    up(&amp;mutex);<br>    processa_dado_lido();<br>  }<br>}<br></pre><br><br>Esta implementação dá prioridade:",
    [
      "aos leitores",
      "aos escritores",
      "a muitos escritores",
      "igual aos leitores e escritores",
    ],
    0,
    "<b>(A) ✓ correcta:</b> <i>readers-preference</i> — enquanto houver pelo menos um leitor, <code>bd</code> está ocupado e os escritores não podem entrar. Pode causar starvation dos escritores.\n\n<b>(B) ✗</b>: prioridade não é dos escritores.\n\n<b>(C) ✗</b>: opposite.\n\n<b>(D) ✗</b>: leitores têm vantagem clara.",
    "Esta é a variante \"readers-preference\". Enquanto houver pelo menos um leitor activo, o <code>bd</code> está ocupado e os escritores não podem entrar — pode causar starvation dos escritores.<br><a href=\"sistemas_operacoes_estudo__2_.html#79-problemas-clássicos--readers-and-writers\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §79 Problemas Clássicos — Readers and Writers ↗</a>",
  ],
  [
    "Exame · Parte V",
    "484",
    "Uma instrução que verifique e modifique uma posição de memória de forma atómica:",
    [
      "é fundamental para implementar sincronização entre processos",
      "não é necessária para implementar sincronização entre processos",
      "torna a implementação de sincronização entre processos mais fácil",
      "—",
    ],
    0,
    "<b>(A) ✓ correcta:</b> instruções atómicas (<code>test_and_set</code>, <code>compare_and_swap</code>) são fundamentais para mutexes/semáforos em SMP.\n\n<b>(B) ✗</b>: são necessárias em SMP.\n\n<b>(C) ✗</b>: vai além de \"facilitar\".",
    "<br><a href=\"sistemas_operacoes_estudo__2_.html#56-operações-atómicas\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §56 Operações Atómicas ↗</a>",
  ],
];
