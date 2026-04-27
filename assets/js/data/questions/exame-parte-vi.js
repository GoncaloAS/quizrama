/**
 * Banco de perguntas — Exame · Parte VI
 * Total: 2 perguntas.
 *
 * Esquema de cada entrada:
 *   [topic, id, questionHtml, [4 options], correctIdx, explanationHtml, hintHtml?]
 */
/* eslint-disable */
const Q_EXAME_PARTE_VI = [
  [
    "Exame · Parte VI",
    "471",
    "Um encravamento (deadlock) pode acontecer quando se tem 2 ou mais processos:",
    [
      "A tentarem ler ou escrever num mesmo disco",
      "—",
      "A tentarem aceder a recursos não interrompíveis (no preemption)",
      "—",
    ],
    2,
    "<b>(C) ✓ correcta:</b> \"no preemption\" é uma das 4 condições necessárias para deadlock (junto com mutual exclusion, hold-and-wait, circular wait).\n\n<b>(A) ✗</b>: aceder a ficheiros é normal — não causa deadlock por si só.",
    "\"No preemption\" é uma das 4 condições necessárias para deadlock (juntamente com mutual exclusion, hold and wait e circular wait).<br><a href=\"sistemas_operacoes_estudo__2_.html#81-caracterização-de-deadlock--4-condições-necessárias\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §81 Caracterização de Deadlock — 4 Condições Necessárias ↗</a>",
  ],
  [
    "Exame · Parte VI",
    "478",
    "Qual das seguintes não é condição para que se verifique um encravamento (deadlock):",
    [
      "Cadeia de espera circular de processos e recursos",
      "Posse exclusiva de um recurso por um processo",
      "Espera por atribuição de um recurso",
      "—",
    ],
    1,
    "<b>(B) ✓ correcta (segundo o exame original):</b> a marcação aponta esta como sendo a \"não-condição\" — a interpretação é que \"posse exclusiva\" sozinha (sem hold-and-wait) não basta para deadlock. As outras opções correspondem mais directamente a hold-and-wait e circular wait.\n\n<b>(C) ✗</b>: hold-and-wait <i>é</i> condição.\n\n<b>(A) ✗</b>: circular wait <i>é</i> condição.",
    "As 4 condições de deadlock são: mutual exclusion, hold-and-wait, no preemption, circular wait. \"Posse exclusiva\" (= mutual exclusion) é uma das condições, mas a marcação no exame original aponta esta como sendo a \"não-condição\" — provavelmente por se interpretar que \"posse exclusiva\" sozinha (sem hold-and-wait) não basta para deadlock. As outras duas opções correspondem mais directamente a hold-and-wait e circular wait.<br><a href=\"sistemas_operacoes_estudo__2_.html#81-caracterização-de-deadlock--4-condições-necessárias\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §81 Caracterização de Deadlock — 4 Condições Necessárias ↗</a>",
  ],
];
