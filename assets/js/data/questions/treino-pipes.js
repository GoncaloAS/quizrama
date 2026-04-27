/**
 * Banco de perguntas — Treino · Pipes
 * Total: 8 perguntas.
 *
 * Esquema de cada entrada:
 *   [topic, id, questionHtml, [4 options], correctIdx, explanationHtml, hintHtml?]
 */
/* eslint-disable */
const Q_TREINO_PIPES = [
  [
    "Treino · Pipes",
    "513",
    "Tens <code>int fd[2]; pipe(fd);</code> Para redirecionar o stdout do processo para a ponta de escrita do pipe, usas:",
    [
      "<code>dup2(fd[1], 1);</code>",
      "<code>dup2(1, fd[1]);</code>",
      "<code>dup2(1, fd[0]);</code>",
      "<code>dup2(fd[0], 1);</code>",
    ],
    0,
    "<b>(A) ✓ correcta:</b> <code>dup2(oldfd, newfd)</code> faz com que <code>newfd</code> passe a referenciar o mesmo recurso que <code>oldfd</code>. Para que stdout (fd 1) escreva no pipe, queres que fd 1 referencie <code>fd[1]</code> (write end). Logo: <code>dup2(fd[1], 1)</code>.\n\n<b>(D) ✗</b>: <code>fd[0]</code> é a ponta de <i>leitura</i> — não escreves nela.\n<b>(B) ✗</b>: argumentos invertidos — faria fd[1] passar a ser stdout, perdendo o pipe.\n<b>(C) ✗</b>: <code>fd[0]</code> errado + argumentos invertidos.",
    "📌 Mnemónica: <code>dup2(novo_alvo, fd_a_substituir)</code>. O 2º arg é o que muda; o 1º é o \"destino\".<br><a href=\"sistemas_operacoes_estudo__2_.html#41-pipes\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §41 Pipes ↗</a>",
  ],
  [
    "Treino · Pipes",
    "514",
    "Por que é importante o processo <i>escritor</i> fechar a sua cópia do read-end (<code>fd[0]</code>) e o leitor fechar o write-end (<code>fd[1]</code>)?",
    [
      "Porque <code>dup2()</code> falha se houver fds extra abertos",
      "É opcional — afecta apenas a performance do código",
      "Para que <code>read()</code> receba EOF quando os writers fecharem",
      "Para libertar imediatamente memória do kernel",
    ],
    2,
    "<b>(C) ✓ correcta:</b> <code>read()</code> num pipe só retorna 0 (EOF) quando <i>todos</i> os write-ends estão fechados. Se o leitor mantiver o seu <code>fd[1]</code> aberto, mesmo o escritor a fechar não basta — o leitor bloqueia para sempre à espera de mais dados.\n\n<b>(D) ✗</b>: o impacto na memória é mínimo; o problema é semântico.\n<b>(A) ✗</b>: <code>dup2()</code> funciona com qualquer fd aberto.\n<b>(B) ✗</b>: NÃO é opcional — é causa de bug clássico (deadlock no pipe).",
    "📌 Bug comum: esquecer de fechar a ponta não usada → o programa \"pendura-se\" sem qualquer mensagem de erro.<br><a href=\"sistemas_operacoes_estudo__2_.html#41-pipes\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §41 Pipes ↗</a>",
  ],
  [
    "Treino · Pipes",
    "515",
    "Por que é que o <code>pipe()</code> é tipicamente chamado <i>antes</i> do <code>fork()</code>?",
    [
      "Para garantir que o stdout fica fechado no processo filho",
      "Por convenção apenas, sem efeito técnico real",
      "O <code>pipe()</code> falha em si quando chamado depois de <code>fork()</code>",
      "Para o filho herdar via fork os mesmos file descriptors do pipe",
    ],
    3,
    "<b>(D) ✓ correcta:</b> o <code>fork()</code> duplica os file descriptors abertos do pai para o filho. Se criasses o pipe DEPOIS do fork, cada processo teria o seu próprio pipe separado — não comunicariam. Criando o pipe ANTES, ambos partilham as mesmas pontas via herança.\n\n<b>(B) ✗</b>: tem efeito técnico crítico.\n<b>(C) ✗</b>: <code>pipe()</code> não falha — funciona, mas cria um pipe inútil.\n<b>(A) ✗</b>: stdout não tem ligação directa com o pipe inicialmente.",
    "📌 Outra forma de partilhar pipes entre processos sem ascendência comum: pipes <i>nomeados</i> (FIFOs) via <code>mkfifo()</code>.<br><a href=\"sistemas_operacoes_estudo__2_.html#41-pipes\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §41 Pipes ↗</a>",
  ],
  [
    "Treino · Pipes",
    "516",
    "Numa chamada a <code>read(fd[0], buf, n)</code> que retorna <code>0</code>, o que significa?",
    [
      "Erro de leitura — usar <code>errno</code> para o detalhe",
      "O file descriptor passado é considerado inválido",
      "EOF — todos os write-ends fecharam, sem mais dados",
      "Timeout — esperou demasiado tempo por dados novos",
    ],
    2,
    "<b>(C) ✓ correcta:</b> retorno <code>0</code> num <code>read</code> de pipe significa <b>EOF</b> — todos os escritores fecharam. Não há mais dados a vir nem nunca virão.\n\n<b>(A) ✗</b>: erro retorna <code>-1</code> e seta <code>errno</code>.\n<b>(B) ✗</b>: fd inválido também retornaria <code>-1</code>, com <code>errno = EBADF</code>.\n<b>(D) ✗</b>: <code>read</code> bloqueante não tem timeout intrínseco — bloqueia até dados ou EOF.",
    "📌 Padrão: <code>while ((n = read(fd, buf, sz)) &gt; 0) { ...processa... }</code> — o loop sai automaticamente em EOF.<br><a href=\"sistemas_operacoes_estudo__2_.html#41-pipes\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §41 Pipes ↗</a>",
  ],
  [
    "Treino · Pipes",
    "517",
    "Para implementar a pipeline <code>cmd1 | cmd2 | cmd3</code> num shell, quantos pipes e <code>fork()</code>s são necessários?",
    [
      "3 pipes, 2 forks",
      "1 pipe, 3 forks",
      "2 pipes, 3 forks",
      "3 pipes, 3 forks",
    ],
    2,
    "<b>(C) ✓ correcta:</b> N comandos numa pipeline precisam de <b>N-1 pipes</b> (uma entre cada par consecutivo) e <b>N forks</b> (um filho por comando). Aqui: 3 comandos → 2 pipes (cmd1↔cmd2 e cmd2↔cmd3) + 3 forks.\n\n<b>(D) ✗</b>: 3 pipes seriam para 4 comandos.\n<b>(A) ✗</b>: precisa de fork para cada comando — não pode reutilizar processos.\n<b>(B) ✗</b>: 1 pipe não chega — cmd2 precisa simultaneamente de input do cmd1 e de output para cmd3.",
    "📌 cmd2 tem ambos os ends usados: lê do pipe1 (esquerda) e escreve no pipe2 (direita). Precisa de redirecionar stdin E stdout.<br><a href=\"sistemas_operacoes_estudo__2_.html#41-pipes\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §41 Pipes ↗</a>",
  ],
  [
    "Treino · Pipes",
    "518",
    "Em pipes POSIX, escritas <i>concorrentes</i> de tamanho ≤ <code>PIPE_BUF</code> (tipicamente 4096 bytes) são:",
    [
      "Bloqueadas até o leitor ler todos os dados anteriores",
      "Sempre intercaladas byte a byte",
      "Comportamento indefinido pelo standard",
      "Atómicas — não são intercaladas com outras escritas",
    ],
    3,
    "<b>(D) ✓ correcta:</b> POSIX <i>garante</i> atomicidade para escritas até <code>PIPE_BUF</code> bytes — duas escritas simultâneas nunca aparecem misturadas. Acima de <code>PIPE_BUF</code> a atomicidade não é garantida.\n\n<b>(B) ✗</b>: o oposto da garantia POSIX.\n<b>(A) ✗</b>: o pipe é um buffer no kernel — escritas não bloqueiam por causa de leituras pendentes (a menos que o buffer esteja cheio).\n<b>(C) ✗</b>: o standard especifica claramente o comportamento.",
    "📌 Em Linux, <code>PIPE_BUF</code> é tipicamente 4096. Útil saber para logs concorrentes — múltiplas linhas curtas não são intercaladas.<br><a href=\"sistemas_operacoes_estudo__2_.html#41-pipes\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §41 Pipes ↗</a>",
  ],
  [
    "Treino · Pipes",
    "519",
    "Após <code>pipe(fd)</code> e <code>fork()</code>, num processo filho que vai <b>ler</b> do pipe (e depois fazer <code>exec</code>), qual a sequência correcta?",
    [
      "<code>dup2(fd[1], 0); close(fd[0]); close(fd[1]);</code>",
      "<code>close(fd[0]); dup2(fd[1], 0); close(fd[1]);</code>",
      "<code>close(fd[1]); dup2(fd[0], 0); close(fd[0]);</code>",
      "<code>dup2(0, fd[0]); close(fd[1]);</code>",
    ],
    2,
    "<b>(C) ✓ correcta:</b> três passos:<br>1) <code>close(fd[1])</code> — fechar o write-end (o filho não escreve).<br>2) <code>dup2(fd[0], 0)</code> — fd 0 (stdin) passa a ser o read-end.<br>3) <code>close(fd[0])</code> — fechar a cópia original (já temos referência via fd 0).\n\n<b>(B) ✗</b>: usa <code>fd[1]</code> (write) — o filho que LÊ deve usar <code>fd[0]</code> (read).\n<b>(D) ✗</b>: <code>dup2</code> com argumentos invertidos.\n<b>(A) ✗</b>: <code>fd[1]</code> errado — quem lê redireciona o read-end.",
    "📌 Princípio: o processo que LÊ do pipe redireciona <i>stdin</i>; quem ESCREVE redireciona <i>stdout</i>.<br><a href=\"sistemas_operacoes_estudo__2_.html#41-pipes\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §41 Pipes ↗</a>",
  ],
  [
    "Treino · Pipes",
    "520",
    "Se chamares <code>read(fd[0], buf, n)</code> num pipe vazio mas com pelo menos um write-end ainda aberto, o que acontece?",
    [
      "Retorna <code>-1</code> com <code>errno</code> a <code>EAGAIN</code>",
      "Devolve dados antigos do buffer interno do kernel",
      "Retorna <code>0</code> imediatamente como se fosse EOF",
      "Bloqueia até dados ou todos os writers fecharem",
    ],
    3,
    "<b>(D) ✓ correcta:</b> <code>read</code> em pipe (modo bloqueante, default) <i>bloqueia</i> até:<br>• haver dados disponíveis para ler, OU<br>• todos os write-ends fecharem (retorna 0 = EOF).\n\n<b>(C) ✗</b>: só retorna 0 quando todos os writers fecharem.\n<b>(A) ✗</b>: <code>EAGAIN</code> só ocorre em modo não-bloqueante (<code>O_NONBLOCK</code>).\n<b>(D) ✗</b>: o pipe é FIFO — não devolve dados antigos.",
    "📌 Para fazer <code>read</code> não-bloqueante: <code>fcntl(fd, F_SETFL, O_NONBLOCK)</code>. Aí retorna <code>-1</code> com <code>errno = EAGAIN</code> em vez de bloquear.<br><a href=\"sistemas_operacoes_estudo__2_.html#41-pipes\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §41 Pipes ↗</a>",
  ],
];
