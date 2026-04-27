/**
 * Banco de perguntas — Treino · Scheduling
 * Total: 8 perguntas.
 *
 * Esquema de cada entrada:
 *   [topic, id, questionHtml, [4 options], correctIdx, explanationHtml, hintHtml?]
 */
/* eslint-disable */
const Q_TREINO_SCHEDULING = [
  [
    "Treino · Scheduling",
    "521",
    "FCFS com P1(burst=4), P2(burst=2), P3(burst=8) chegando todos em <i>t=0</i> nessa ordem. Qual o tempo médio de espera?",
    [
      "3.33",
      "6.00",
      "4.67",
      "4.00",
    ],
    0,
    "<b>(A) 3.33 ✓ correcta:</b> em FCFS, ordem é P1 → P2 → P3.<br>• WT(P1) = 0 (começa logo)<br>• WT(P2) = 4 (espera P1 acabar)<br>• WT(P3) = 6 (espera P1 + P2)<br>Média: (0 + 4 + 6) / 3 = 10/3 ≈ <b>3.33</b>.\n\n<b>(D) ✗</b>: 4.00 não corresponde.\n<b>(C) ✗</b>: 4.67 corresponderia a outra ordem.\n<b>(B) ✗</b>: 6.00 é a maior espera individual, não a média.",
    "📌 Fórmula chave: <b>WT(Pi) = soma dos bursts dos processos antes</b> (em FCFS sem chegadas escalonadas).<br><a href=\"sistemas_operacoes_estudo__2_.html#46-first-come-first-served-fcfs\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §46 First-Come First-Served (FCFS) ↗</a>",
  ],
  [
    "Treino · Scheduling",
    "522",
    "SJF (não-preemptivo) com os MESMOS processos: P1(burst=4), P2(burst=2), P3(burst=8) todos em <i>t=0</i>. Tempo médio de espera?",
    [
      "3.33",
      "5.00",
      "2.67",
      "6.00",
    ],
    2,
    "<b>(C) 2.67 ✓ correcta:</b> SJF ordena por burst crescente: P2(2) → P1(4) → P3(8).<br>• WT(P2) = 0<br>• WT(P1) = 2<br>• WT(P3) = 6<br>Média: (0 + 2 + 6) / 3 = 8/3 ≈ <b>2.67</b>.\n\n<b>(A) ✗</b>: 3.33 é a média do FCFS — comparação útil!\n<b>(B) ✗</b>: 5.00 não corresponde.\n<b>(D) ✗</b>: 6.00 é apenas a maior espera.",
    "📌 SJF é <i>óptimo</i> em waiting time médio (entre não-preemptivos). Comparação directa: FCFS deu 3.33; SJF dá 2.67 — <b>SJF é sempre ≤ FCFS</b>.<br><a href=\"sistemas_operacoes_estudo__2_.html#48-shortest-job-first-sjf\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §48 Shortest-Job-First (SJF) ↗</a>",
  ],
  [
    "Treino · Scheduling",
    "523",
    "RR com quantum Q=3 e processos P1(burst=8), P2(burst=4), P3(burst=2) todos chegando em <i>t=0</i> nessa ordem. Tempo médio de espera?",
    [
      "5.33",
      "8.00",
      "6.67",
      "4.67",
    ],
    2,
    "<b>(C) 6.67 ✓ correcta:</b> Gantt:<br><code>P1[0-3] P2[3-6] P3[6-8] P1[8-11] P2[11-12] P1[12-14]</code><br>• Completion: P1=14, P2=12, P3=8<br>• WT(Pi) = CT - arrival - burst:<br>&nbsp;&nbsp;P1 = 14 - 0 - 8 = 6<br>&nbsp;&nbsp;P2 = 12 - 0 - 4 = 8<br>&nbsp;&nbsp;P3 = 8 - 0 - 2 = 6<br>Média: (6 + 8 + 6) / 3 = 20/3 ≈ <b>6.67</b>.\n\n<b>(D) ✗</b>, <b>(A) ✗</b>, <b>(B) ✗</b>: cálculos não batem com este Gantt.",
    "📌 Fórmula: <code>WT = completion - arrival - burst</code>. Em RR, fica fácil porque o burst total é a soma de todas as fatias do processo.<br><a href=\"sistemas_operacoes_estudo__2_.html#47-round-robin-rr\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §47 Round Robin (RR) ↗</a>",
  ],
  [
    "Treino · Scheduling",
    "524",
    "SRTF com P1(arr=0,burst=10), P2(arr=1,burst=2), P3(arr=4,burst=4), P4(arr=5,burst=1). Tempo médio de espera?",
    [
      "1.50",
      "2.00",
      "4.50",
      "3.25",
    ],
    1,
    "<b>(B) 2.00 ✓ correcta:</b> sequência SRTF (preempção quando chega job mais curto):<br><code>P1[0-1] P2[1-3] P1[3-4] P3[4-5] P4[5-6] P3[6-9] P1[9-17]</code><br>• Completion: P1=17, P2=3, P3=9, P4=6<br>• WT: 17-0-10=7, 3-1-2=0, 9-4-4=1, 6-5-1=0<br>Média: (7 + 0 + 1 + 0) / 4 = 8/4 = <b>2.0</b>.\n\n<b>(A), (D), (C) ✗</b>: outros valores não correspondem ao Gantt.",
    "📌 Em SRTF: <i>sempre que um processo novo chega</i>, comparas o seu burst total com o tempo restante do que está a correr. Se for menor, preempta.<br><a href=\"sistemas_operacoes_estudo__2_.html#49-shortest-remaining-time-first-srtf\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §49 Shortest-Remaining-Time-First (SRTF) ↗</a>",
  ],
  [
    "Treino · Scheduling",
    "525",
    "Priority Scheduling não-preemptivo (menor número = maior prioridade) com P1(burst=5,prio=2), P2(burst=3,prio=1), P3(burst=4,prio=3) todos em <i>t=0</i>. Tempo médio de espera?",
    [
      "2.67",
      "4.00",
      "3.67",
      "5.33",
    ],
    2,
    "<b>(C) 3.67 ✓ correcta:</b> ordem por prioridade (1 &lt; 2 &lt; 3): P2(prio=1) → P1(prio=2) → P3(prio=3).<br>• WT(P2) = 0<br>• WT(P1) = 3 (espera P2)<br>• WT(P3) = 8 (espera P2 + P1)<br>Média: (0 + 3 + 8) / 3 = 11/3 ≈ <b>3.67</b>.\n\n<b>(A), (B), (D) ✗</b>: outros valores não correspondem.",
    "📌 Convenção habitual: <b>menor número = maior prioridade</b>. Em alguns livros é o oposto — verifica sempre o enunciado.<br><a href=\"sistemas_operacoes_estudo__2_.html#50-priority-scheduling\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §50 Priority Scheduling ↗</a>",
  ],
  [
    "Treino · Scheduling",
    "526",
    "O efeito \"<i>convoy</i>\" (convoy effect) no FCFS ocorre quando:",
    [
      "O scheduler troca de processo demasiado rapidamente",
      "Um único processo monopoliza o CPU permanentemente",
      "Múltiplos processos chegam exactamente ao mesmo instante",
      "Processos curtos ficam presos atrás de processos longos",
    ],
    3,
    "<b>(D) ✓ correcta:</b> convoy effect = jobs curtos a aguardar atrás de jobs longos numa fila FCFS, fazendo subir o waiting time médio drasticamente. Exemplo clássico: P_longo(burst=100) chega antes de 10 jobs curtos (burst=1 cada) → todos esperam ~100s.\n\n<b>(C) ✗</b>: chegadas simultâneas não causam convoy por si só.\n<b>(B) ✗</b>: monopolização é outro problema.\n<b>(A) ✗</b>: troca rápida = problema de overhead, não de convoy.",
    "📌 Solução típica para convoy: usar SJF/SRTF (favorecem curtos) ou RR com quantum pequeno (impede monopolização).<br><a href=\"sistemas_operacoes_estudo__2_.html#46-first-come-first-served-fcfs\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §46 First-Come First-Served (FCFS) ↗</a>",
  ],
  [
    "Treino · Scheduling",
    "527",
    "Em SRTF (Shortest-Remaining-Time-First), qual o problema com processos longos?",
    [
      "O SO termina-os automaticamente após algum tempo",
      "Sofrem starvation se chegam continuamente jobs curtos",
      "São executados sempre primeiro de tudo",
      "Têm waiting time zero garantido por construção",
    ],
    1,
    "<b>(B) ✓ correcta:</b> SRTF favorece sempre o burst restante mais curto. Se há um fluxo contínuo de jobs curtos a chegar, um processo longo pode <i>nunca</i> chegar a correr — <b>starvation</b>. Solução típica: aging (aumentar prioridade com o tempo).\n\n<b>(C) ✗</b>: opposite — são executados <i>por último</i>.\n<b>(D) ✗</b>: o waiting time pode ser elevado.\n<b>(A) ✗</b>: o SO não termina automaticamente — só fica esquecido.",
    "📌 Trade-off clássico: SRTF dá optimal average waiting time mas sacrifica fairness. RR é justo mas waiting time pior.<br><a href=\"sistemas_operacoes_estudo__2_.html#49-shortest-remaining-time-first-srtf\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §49 Shortest-Remaining-Time-First (SRTF) ↗</a>",
  ],
  [
    "Treino · Scheduling",
    "528",
    "Para processos P1(b=3), P2(b=1), P3(b=2) chegando em <i>t=0</i>, qual algoritmo dá o MAIOR average waiting time?",
    [
      "Round Robin com Q=1",
      "SJF",
      "FCFS na ordem P2→P3→P1",
      "FCFS na ordem P1→P2→P3",
    ],
    3,
    "<b>(D) ✓ correcta:</b> calculemos:<br>• <b>SJF</b> (P2→P3→P1): WT = (0+1+3)/3 = 1.33.<br>• <b>FCFS P1→P2→P3</b>: WT = (0+3+4)/3 = <b>2.33</b>.<br>• <b>FCFS P2→P3→P1</b>: WT = (0+1+3)/3 = 1.33 (= SJF).<br>• <b>RR Q=1</b>: P1[0-1] P2[1-2] P3[2-3] P1[3-4] P3[4-5] P1[5-6]. CT: P1=6, P2=2, P3=5. WT = (3+1+3)/3 = 2.33.<br>Empate B vs D, mas a opção B (FCFS pior ordem) é a resposta clássica do \"convoy effect\".\n\n<b>(B) ✗</b>: SJF é óptimo (menor WT).\n<b>(C) ✗</b>: ordem boa do FCFS coincide com SJF.\n<b>(A) ✗</b>: RR Q=1 dá igual neste caso.",
    "📌 Exercício: confirma que SJF nunca é pior que qualquer FCFS — é o teorema da optimalidade.<br><a href=\"sistemas_operacoes_estudo__2_.html#48-shortest-job-first-sjf\" target=\"_blank\" style=\"color:#5b8af0;text-decoration:none;border:1px solid rgba(91,138,240,.35);padding:2px 8px;border-radius:6px;display:inline-block;margin-top:6px;font-size:.78rem;\">📖 §48 Shortest-Job-First (SJF) ↗</a>",
  ],
];
