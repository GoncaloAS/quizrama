/**
 * Banco de perguntas — Treino · Sinais
 * Total: 10 perguntas.
 *
 * Esquema de cada entrada:
 *   [topic, id, questionHtml, [4 options], correctIdx, explanationHtml, hintHtml?]
 */
/* eslint-disable */
const Q_TREINO_SINAIS = [
  [
    "Treino · Sinais",
    "529",
    "Qual destas afirmações sobre <code>SIGKILL</code> é VERDADEIRA?",
    [
      "Pode ser apanhado com <code>signal()</code> ou <code>sigaction()</code>",
      "É equivalente a <code>SIGINT</code> (Ctrl+C)",
      "Não pode ser apanhado, bloqueado nem ignorado",
      "Apenas pausa o processo (suspende-o)",
    ],
    2,
    "<b>(C) ✓ correcta:</b> <code>SIGKILL</code> (sinal 9) é especial — o kernel <i>nunca</i> entrega o sinal ao processo; aplica directamente a acção default (terminar). Por isso não pode ser apanhado, bloqueado ou ignorado.\n\n<b>(A) ✗</b>: <code>signal(SIGKILL, ...)</code> falha silenciosamente ou retorna <code>SIG_ERR</code>.\n<b>(D) ✗</b>: pausar é <code>SIGSTOP</code> (também não-apanhável).\n<b>(B) ✗</b>: SIGINT é apanhável e tipicamente usado para Ctrl+C.",
    "📌 Os DOIS únicos sinais não-apanháveis em UNIX: <b>SIGKILL e SIGSTOP</b>. Os restantes podem ter handler customizado.<br><a href=\"sistemas_operacoes_estudo__2_.html#38-terminacao-de-processos\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §38 Terminação de Processos ↗</a>",
  ],
  [
    "Treino · Sinais",
    "530",
    "Quais destes sinais NÃO podem ser interceptados por um handler em user-space?",
    [
      "SIGCHLD e SIGPIPE",
      "SIGHUP e SIGUSR1",
      "SIGSTOP e SIGKILL",
      "SIGINT e SIGTERM",
    ],
    2,
    "<b>(C) ✓ correcta:</b> apenas <code>SIGSTOP</code> (suspende processo) e <code>SIGKILL</code> (termina) não podem ser interceptados, bloqueados nem ignorados — o kernel aplica directamente a acção default.\n\n<b>(D) ✗</b>: SIGINT (Ctrl+C) e SIGTERM são apanháveis.\n<b>(B) ✗</b>: SIGHUP e SIGUSR1 são apanháveis (SIGUSR1/2 são especificamente para uso da aplicação).\n<b>(A) ✗</b>: SIGCHLD (filho mudou estado) e SIGPIPE (write em pipe sem reader) são apanháveis.",
    "📌 SIGSTOP suspende; o complemento é <code>SIGCONT</code> que reactiva o processo (e este, ironicamente, é apanhável).<br><a href=\"sistemas_operacoes_estudo__2_.html#38-terminacao-de-processos\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §38 Terminação de Processos ↗</a>",
  ],
  [
    "Treino · Sinais",
    "531",
    "A diferença principal entre <code>wait()</code> e <code>waitpid()</code> é:",
    [
      "Não há diferença prática entre as duas — são aliases",
      "A <code>wait()</code> é mais antiga; <code>waitpid()</code> é equivalente moderno",
      "A <code>wait()</code> espera por qualquer filho; <code>waitpid()</code> permite escolher",
      "A <code>waitpid()</code> só funciona em Linux; <code>wait()</code> é portátil",
    ],
    2,
    "<b>(C) ✓ correcta:</b> <code>wait(&status)</code> bloqueia até <i>qualquer</i> filho terminar. <code>waitpid(pid, &status, opts)</code> é mais flexível: permite escolher o PID específico e opções como <code>WNOHANG</code> (não bloquear).\n\n<b>(B) ✗</b>: <code>waitpid()</code> é estritamente mais poderoso, não equivalente.\n<b>(D) ✗</b>: ambos são POSIX e portáteis.\n<b>(A) ✗</b>: têm comportamentos diferentes.",
    "📌 <code>WNOHANG</code> é útil para <i>polling</i>: <code>waitpid(-1, &status, WNOHANG)</code> retorna 0 se nenhum filho terminou ainda, em vez de bloquear.<br><a href=\"sistemas_operacoes_estudo__2_.html#38-terminacao-de-processos\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §38 Terminação de Processos ↗</a>",
  ],
  [
    "Treino · Sinais",
    "532",
    "Quando é que uma chamada <i>bem-sucedida</i> a <code>execvp()</code> retorna ao chamador?",
    [
      "Após executar a primeira instrução do novo <code>main()</code>",
      "Nunca — só retorna se a chamada FALHAR",
      "Imediatamente após carregar o novo programa",
      "Quando o novo programa termina com <code>exit()</code>",
    ],
    1,
    "<b>(B) ✓ correcta:</b> <code>exec*</code> substitui completamente o address-space do processo. Se for bem-sucedida, o código que vinha a seguir <i>já não existe</i> — o processo agora está a executar o novo programa. Logo só retorna em caso de erro (return -1, errno setado).\n\n<b>(C) ✗</b>: o address-space antigo já não existe.\n<b>(D) ✗</b>: o novo programa termina o processo, não retorna.\n<b>(A) ✗</b>: o controlo passa para o novo <code>main</code>, não retorna.",
    "📌 Padrão clássico: <code>execvp(...); perror(\"exec falhou\"); exit(1);</code> — as duas linhas após o exec só correm em caso de falha.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · Sinais",
    "533",
    "Por <i>defeito</i>, o que acontece aos file descriptors abertos quando um processo chama <code>execvp()</code>?",
    [
      "São duplicados — passam a ter ambas as cópias",
      "São preservados (herdados pelo novo programa)",
      "Apenas stdin/stdout/stderr são preservados",
      "Todos são fechados automaticamente",
    ],
    1,
    "<b>(B) ✓ correcta:</b> file descriptors são <i>preservados</i> através de <code>exec</code> por defeito. O novo programa vê os mesmos fds que o antigo tinha abertos. Para um fd ser fechado automaticamente em exec, deves setar a flag <code>FD_CLOEXEC</code> com <code>fcntl()</code>.\n\n<b>(D) ✗</b>: a menos que cada fd tenha <code>FD_CLOEXEC</code> setado.\n<b>(C) ✗</b>: <i>todos</i> os fds são preservados, não só os primeiros.\n<b>(A) ✗</b>: não há duplicação — apenas continuidade.",
    "📌 Por isso é que pipelines funcionam: o filho redireciona stdin/stdout via <code>dup2()</code> ANTES do <code>exec()</code> — o novo programa herda essas redirecções.<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · Sinais",
    "534",
    "O que acontece a um signal handler <i>customizado</i> (registado com <code>signal()</code>) após uma chamada bem-sucedida a <code>exec()</code>?",
    [
      "É reposto para SIG_DFL — o novo programa não conhece o handler antigo",
      "É preservado e executado pelo novo programa quando o sinal chegar",
      "É copiado em formato binário para o disco e restaurado",
      "Causa erro de execução do <code>exec()</code>",
    ],
    0,
    "<b>(A) ✓ correcta:</b> handlers customizados não fazem sentido após <code>exec</code> — apontam para código (a função handler) que já não existe no address-space novo. POSIX especifica:<br>• <code>SIG_DFL</code> mantém-se <code>SIG_DFL</code><br>• <code>SIG_IGN</code> mantém-se <code>SIG_IGN</code><br>• Custom handlers → <b>repostos para <code>SIG_DFL</code></b>\n\n<b>(B) ✗</b>: o handler aponta para código que já não existe.\n<b>(C) ✗</b>: nada é serializado para disco.\n<b>(D) ✗</b>: <code>exec</code> é bem-sucedido — handlers são apenas resetados.",
    "📌 Comportamento <i>diferente</i> do <code>fork()</code>: aí os handlers SÃO preservados (porque o address-space é duplicado, código incluído).<br><a href=\"sistemas_operacoes_estudo__2_.html#37-fork-e-exec-em-unixlinux\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §37 fork() e exec() em UNIX/Linux ↗</a>",
  ],
  [
    "Treino · Sinais",
    "535",
    "Quando o processo pai termina antes do filho, o filho fica <i>órfão</i>. Qual o seu novo PPID (parent PID)?",
    [
      "-1 — indica processo sem pai",
      "Mantém o PID original do pai",
      "0 — PID reservado pelo kernel",
      "1 — init/systemd adopta órfãos",
    ],
    3,
    "<b>(D) ✓ correcta:</b> em UNIX, o processo <code>init</code> (PID 1) — ou em sistemas modernos <code>systemd</code> — adopta automaticamente os processos órfãos. Faz <code>wait()</code> periodicamente para reapar zombies. Por isso <code>getppid()</code> num órfão devolve <b>1</b>.\n\n<b>(C) ✗</b>: PID 0 está reservado (kernel scheduler).\n<b>(A) ✗</b>: PIDs são sempre não-negativos.\n<b>(B) ✗</b>: PIDs morrem com o processo — referenciar um PID inexistente é inválido.",
    "📌 Sem este mecanismo, todos os processos com pais mortos seriam zombies eternos — e a process table esgotava-se.<br><a href=\"sistemas_operacoes_estudo__2_.html#38-terminacao-de-processos\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §38 Terminação de Processos ↗</a>",
  ],
  [
    "Treino · Sinais",
    "536",
    "A diferença entre <code>kill -9 PID</code> e <code>kill -15 PID</code> é:",
    [
      "O <code>-9</code> é SIGKILL (não-apanhável); <code>-15</code> é SIGTERM (apanhável)",
      "Apenas o <code>-9</code> funciona em Linux modernos",
      "O <code>-9</code> é apenas mais rápido a executar",
      "O <code>-15</code> é uma versão antiga e obsoleta de <code>-9</code>",
    ],
    0,
    "<b>(A) ✓ correcta:</b><br>• <code>kill -15 PID</code> = SIGTERM (default do <code>kill</code>) — o processo pode interceptá-lo, fazer cleanup (fechar ficheiros, libertar locks) e sair com graça.<br>• <code>kill -9 PID</code> = SIGKILL — o processo morre IMEDIATAMENTE sem oportunidade de cleanup. Usar só quando SIGTERM não funciona.\n\n<b>(C) ✗</b>: a diferença é semântica, não de velocidade.\n<b>(D) ✗</b>: SIGTERM continua a ser o sinal de \"terminação suave\" recomendado.\n<b>(B) ✗</b>: ambos funcionam.",
    "📌 Boa prática: tentar <code>kill -15</code> primeiro; só usar <code>kill -9</code> se o processo ignorar SIGTERM por &gt;X segundos.<br><a href=\"sistemas_operacoes_estudo__2_.html#38-terminacao-de-processos\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §38 Terminação de Processos ↗</a>",
  ],
  [
    "Treino · Sinais",
    "537",
    "Em que momento se cria um processo \"<b>zombie</b>\"?",
    [
      "Quando o pai morre antes do filho completar a sua tarefa",
      "Quando o filho terminou mas o pai ainda não fez <code>wait()</code>",
      "Sempre que <code>exec()</code> falha numa chamada do filho",
      "Quando o filho corre durante muito tempo sem responder",
    ],
    1,
    "<b>(B) ✓ correcta:</b> zombie é um processo <i>já terminado</i> mas cuja entrada na process table ainda não foi reclamada via <code>wait()</code>/<code>waitpid()</code> pelo pai. O kernel preserva o PID e o exit status até o pai lê-los — para o pai poder saber como o filho terminou.\n\n<b>(D) ✗</b>: um processo a correr não é zombie — só após terminar.\n<b>(A) ✗</b>: descreve <i>orphan</i>, não zombie.\n<b>(C) ✗</b>: <code>exec</code> falhar não cria zombie — o processo continua a correr.",
    "📌 Sintoma típico: <code>ps</code> mostra <code>&lt;defunct&gt;</code> ou estado <code>Z</code>. Solução: o pai chamar <code>wait()</code>, ou um handler para SIGCHLD.<br><a href=\"sistemas_operacoes_estudo__2_.html#38-terminacao-de-processos\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §38 Terminação de Processos ↗</a>",
  ],
  [
    "Treino · Sinais",
    "538",
    "Qual o valor de retorno de uma chamada bem-sucedida a <code>signal(sig, handler)</code>?",
    [
      "Sempre o valor da constante <code>SIG_DFL</code>",
      "O PID do processo que registou o handler",
      "O ponteiro para o handler que estava registado antes",
      "0 em caso de sucesso da operação",
    ],
    2,
    "<b>(C) ✓ correcta:</b> a assinatura é <code>void (*signal(int sig, void (*handler)(int)))(int);</code> — devolve o handler que estava registado <i>antes</i>. Útil para guardar e restaurar o estado anterior:<br><code>old_h = signal(SIGINT, my_handler);<br>// ... usa my_handler ...<br>signal(SIGINT, old_h);  // restaura</code>\n\n<b>(D) ✗</b>: 0 não é o valor de retorno (returns SIG_ERR em caso de erro, mas success = old handler).\n<b>(B) ✗</b>: nada a ver com o PID.\n<b>(A) ✗</b>: SIG_DFL é uma constante, devolvida apenas se era esse o handler anterior.",
    "📌 Em código moderno usa-se <code>sigaction()</code> em vez de <code>signal()</code> — mais robusto e portável (comportamento de <code>signal()</code> varia entre UNIXes).<br><a href=\"sistemas_operacoes_estudo__2_.html#38-terminacao-de-processos\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §38 Terminação de Processos ↗</a>",
  ],
];
