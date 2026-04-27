/**
 * Conteúdo: Chapter 4 — Process Scheduling
 * Extraído verbatim de os_guide.js (linhas 896-1042).
 * Exporta um array de blocos prontos a embutir em `Document.sections.children`.
 */
const { Paragraph, TextRun, PageBreak, ShadingType, WidthType, TableRow, TableCell, AlignmentType } = require('docx');
const { C, b, t, mono } = require('../theme');
const { para, heading1, heading2, heading3, spacer, borders } = require('../primitives');
const { tbl, cell, hdrCell, row, infoBox, warningBox, successBox } = require('../tables');
const {
  processStateDiagram, memoryLayoutDiagram, ganttChart,
  mlqDiagram, mlfqDiagram, deadlockRAGDiagram,
  diningPhilosophersDiagram, ioFlowDiagram, contextSwitchDiagram,
} = require('../diagrams');

module.exports = [

  // ─── CHAPTER 4 ───
  heading1('Chapter 4: Process Scheduling'),

  heading2('4.1 CPU-I/O Burst Cycle & Scheduling Motivation'),
  para('Processes alternate between CPU bursts (executing) and I/O bursts (waiting for devices). The OS scheduler decides which process gets the CPU when a burst ends.'),
  ...spacer(1),
  tbl([
    row(hdrCell('Process Type',C.darkBlue,C.white,2800), hdrCell('CPU Bursts',C.darkBlue,C.white,2800), hdrCell('I/O Bursts',C.darkBlue,C.white,3760)),
    row(cell('CPU-bound',C.lightOrange,{width:2800}), cell('Few, very long',C.white,{width:2800}), cell('Few, short',C.white,{width:3760})),
    row(cell('I/O-bound',C.lightGreen,{width:2800}), cell('Many, very short',C.white,{width:2800}), cell('Many, long',C.white,{width:3760})),
    row(cell('Interactive (GUI)',C.lightBlue,{width:2800}), cell('Very many, very short',C.white,{width:2800}), cell('Dominant — waiting for user input',C.white,{width:3760})),
  ],[2800,2800,3760]),

  heading2('4.2 Scheduling Criteria'),
  tbl([
    row(hdrCell('Criterion',C.darkBlue,C.white,2400), hdrCell('Definition',C.darkBlue,C.white,4200), hdrCell('Goal',C.darkBlue,C.white,2760)),
    row(cell('CPU Utilization',C.lightGreen,{width:2400}), cell('Fraction of time CPU is busy doing useful work',C.white,{width:4200}), cell('Maximize (40%–100%)',C.white,{width:2760})),
    row(cell('Throughput',C.lightGreen,{width:2400}), cell('Number of processes completed per unit time',C.white,{width:4200}), cell('Maximize',C.white,{width:2760})),
    row(cell('Turnaround Time',C.lightBlue,{width:2400}), cell('Submission → completion interval',C.white,{width:4200}), cell('Minimize',C.white,{width:2760})),
    row(cell('Waiting Time',C.lightBlue,{width:2400}), cell('Total time spent in ready queue',C.white,{width:4200}), cell('Minimize',C.white,{width:2760})),
    row(cell('Response Time',C.lightOrange,{width:2400}), cell('Time from request to FIRST response (not completion)',C.white,{width:4200}), cell('Minimize (interactive systems)',C.white,{width:2760})),
  ],[2400,4200,2760]),

  heading2('4.3 Preemptive vs. Non-Preemptive'),
  tbl([
    row(hdrCell('',C.darkBlue,C.white,2000), hdrCell('Non-Preemptive (Cooperative)',C.darkBlue,C.white,3680), hdrCell('Preemptive',C.darkBlue,C.white,3680)),
    row(cell([para([b('When?')])],C.gray,{width:2000}), cell('Scheduling only when process voluntarily waits or exits',C.white,{width:3680}), cell('Scheduling at ALL 4 decision points including timer interrupt',C.white,{width:3680})),
    row(cell([para([b('Pros')])],C.gray,{width:2000}), cell('Simple; no race conditions on kernel data',C.white,{width:3680}), cell('Good response time; can prioritize processes',C.white,{width:3680})),
    row(cell([para([b('Cons')])],C.gray,{width:2000}), cell('Poor response time for interactive use',C.white,{width:3680}), cell('Race conditions require careful synchronization',C.white,{width:3680})),
  ],[2000,3680,3680]),

  heading2('4.4 First-Come First-Served (FCFS)'),
  para([b('Rule:'), t(' Processes served in arrival order. FIFO queue. Non-preemptive.')]),
  ...spacer(1),
  para([b('Example Gantt Chart — FCFS (P1=24ms, P2=3ms, P3=3ms arrive in order):')]),
  ...spacer(1),
  ganttChart([
    {label:'P1',burst:24,fill:'1565C0'},
    {label:'P2',burst:3,fill:'00796B'},
    {label:'P3',burst:3,fill:'7B1FA2'},
  ]),
  ...spacer(1),
  para([t('Avg wait = (0+24+27)/3 = 17ms. If reversed arrival order: (0+3+6)/3 = 3ms → huge difference!')]),
  ...spacer(1),
  warningBox('Convoy Effect:', 'One long CPU-bound process at head of queue forces all short I/O-bound processes to wait → poor device utilization and high average wait time.'),

  heading2('4.5 Round Robin (RR)'),
  para([b('Rule:'), t(' FCFS + fixed time quantum Q. After Q expires, process is preempted and goes to tail of queue.')]),
  ...spacer(1),
  para([b('Example Gantt Chart — RR with Q=4ms (P1=24ms, P2=3ms, P3=3ms):')]),
  ...spacer(1),
  ganttChart([
    {label:'P1',burst:4,fill:'1565C0'},
    {label:'P2',burst:3,fill:'00796B'},
    {label:'P3',burst:3,fill:'7B1FA2'},
    {label:'P1',burst:4,fill:'1565C0'},
    {label:'P1',burst:4,fill:'1565C0'},
    {label:'P1',burst:4,fill:'1565C0'},
    {label:'P1',burst:4,fill:'1565C0'},
    {label:'P1',burst:4,fill:'1565C0'},
  ]),
  ...spacer(1),
  para([b('Quantum size rule: '), t('80% of CPU bursts should be shorter than Q. Typically Q = 10–20ms. Too large → FCFS. Too small → context switch dominates.')]),

  heading2('4.6 Shortest-Job-First (SJF)'),
  para([b('Rule:'), t(' Schedule process with shortest expected next CPU burst. Non-preemptive. Ties → FCFS.')]),
  ...spacer(1),
  para([b('Example Gantt Chart — SJF (P1=6ms, P2=8ms, P3=7ms, P4=3ms, all arrive t=0):')]),
  ...spacer(1),
  ganttChart([
    {label:'P4',burst:3,fill:'7B1FA2'},
    {label:'P1',burst:6,fill:'1565C0'},
    {label:'P3',burst:7,fill:'00796B'},
    {label:'P2',burst:8,fill:'C55A11'},
  ]),
  ...spacer(1),
  para([b('Key Properties:'), t(' Provably optimal average wait time. Fatal flaw: future burst length unknown. Solution: exponential averaging: ')]),
  para([mono('  τ(n+1) = α × t(n) + (1−α) × τ(n)   [α controls recent vs. historical weight]')]),

  heading2('4.7 Shortest-Remaining-Time-First (SRTF)'),
  para([b('Rule:'), t(' Preemptive SJF. New process arrival triggers comparison with current process\'s remaining time — preempt if new is shorter.')]),
  ...spacer(1),
  para([b('Example Gantt Chart — SRTF (P1 starts t=0 burst=8; P2 arrives t=1 burst=4; P3 arrives t=2 burst=9; P4 arrives t=3 burst=5):')]),
  ...spacer(1),
  ganttChart([
    {label:'P1',burst:1,fill:'1565C0'},
    {label:'P2',burst:4,fill:'00796B'},
    {label:'P4',burst:5,fill:'7B1FA2'},
    {label:'P1',burst:7,fill:'1565C0'},
    {label:'P3',burst:9,fill:'C55A11'},
  ]),
  ...spacer(1),
  para([t('SRTF has optimal average wait time among preemptive algorithms. Starvation risk for long jobs.')]),

  heading2('4.8 Priority Scheduling'),
  para([b('Rule:'), t(' Always give CPU to highest-priority ready process. Can be preemptive or non-preemptive.')]),
  ...spacer(1),
  infoBox('Starvation & Aging:', 'Low-priority processes may wait indefinitely as higher-priority ones keep arriving. Solution: Aging — gradually increase priority of waiting processes over time. In Linux: nice value [-20 (highest priority), +19 (lowest)].', C.lightOrange, C.orange),

  heading2('4.9 Multilevel Queue (MLQ)'),
  para('Partitions ready queue into multiple separate queues. Processes permanently assigned by type. Each queue has its own algorithm.'),
  ...spacer(1),
  mlqDiagram(),
  ...spacer(1),
  warningBox('MLQ Limitation:', 'Processes are permanently assigned to one queue. A batch process that becomes interactive is stuck in the low-priority batch queue forever → inflexible.'),

  heading2('4.10 Multilevel Feedback Queue (MLFQ)'),
  para('Like MLQ but processes CAN move between queues. Short I/O-bound jobs stay at top; long CPU-bound jobs sink to bottom. Approximates SRTF without knowing burst lengths.'),
  ...spacer(1),
  mlfqDiagram(),
  ...spacer(1),
  tbl([
    row(hdrCell('MLFQ Parameters (5 required)',C.darkBlue,C.white,9360)),
    row(cell('① Number of queues',C.white,{width:9360})),
    row(cell('② Scheduling algorithm for each queue',C.white,{width:9360})),
    row(cell('③ Method used to UPGRADE a process (promote to higher queue)',C.white,{width:9360})),
    row(cell('④ Method used to DEMOTE a process (push to lower queue after using full quantum)',C.white,{width:9360})),
    row(cell('⑤ Method to determine which queue a new process enters',C.white,{width:9360})),
  ],[9360]),

  heading2('4.11 Linux CFS (Completely Fair Scheduler)'),
  para([b('Goal:'), t(' Give each of N runnable processes exactly 1/N of CPU time. Used in all Linux kernels ≥ 2.6.23.')]),
  ...spacer(1),
  tbl([
    row(hdrCell('CFS Concept',C.darkBlue,C.white,2800), hdrCell('Explanation',C.darkBlue,C.white,6560)),
    row(cell([para([b('Virtual Runtime (vruntime)')])],C.lightBlue,{width:2800}), cell('Each task accumulates CPU time, weighted by nice value. Higher priority (lower nice) → vruntime grows MORE SLOWLY → stays at top',C.white,{width:6560})),
    row(cell([para([b('Scheduling Decision')])],C.lightGreen,{width:2800}), cell('Always run task with LOWEST vruntime. Tasks stored in red-black tree → O(log n) selection',C.white,{width:6560})),
    row(cell([para([b('Target Latency')])],C.lightOrange,{width:2800}), cell('Configurable period where every runnable task runs once. If 4 tasks + 20ms latency → each gets 5ms slice',C.white,{width:6560})),
    row(cell([para([b('Nice Values')])],C.lightPurple,{width:2800}), cell('Range -20 (highest priority) to +19 (lowest). Each step = ~10% CPU weight change',C.white,{width:6560})),
    row(cell([para([b('Scheduling Classes')])],C.gray,{width:2800}), cell('Real-time class (priorities 0–99, strict priority) vs Normal class (100–139, governed by CFS)',C.white,{width:6560})),
  ],[2800,6560]),

  heading2('4.12 Scheduling Algorithm Comparison'),
  tbl([
    row(hdrCell('Algorithm',C.darkBlue,C.white,1600), hdrCell('Preemptive?',C.darkBlue,C.white,1200), hdrCell('Key Parameter',C.darkBlue,C.white,1800), hdrCell('Advantage',C.darkBlue,C.white,2400), hdrCell('Disadvantage',C.darkBlue,C.white,2360)),
    row(cell('FCFS',C.gray,{width:1600}), cell('No',C.lightRed,{width:1200}), cell('None',C.white,{width:1800}), cell('Simple',C.white,{width:2400}), cell('Convoy effect; bad avg wait',C.white,{width:2360})),
    row(cell('Round Robin',C.gray,{width:1600}), cell('Yes',C.lightGreen,{width:1200}), cell('Quantum Q',C.white,{width:1800}), cell('Fair; good response time',C.white,{width:2400}), cell('Context switch overhead',C.white,{width:2360})),
    row(cell('SJF',C.gray,{width:1600}), cell('No',C.lightRed,{width:1200}), cell('None',C.white,{width:1800}), cell('Optimal avg wait',C.white,{width:2400}), cell('Needs burst estimate; starvation',C.white,{width:2360})),
    row(cell('SRTF',C.gray,{width:1600}), cell('Yes',C.lightGreen,{width:1200}), cell('None',C.white,{width:1800}), cell('Best avg wait (preemptive)',C.white,{width:2400}), cell('Many preemptions; starvation',C.white,{width:2360})),
    row(cell('Priority',C.gray,{width:1600}), cell('Both',C.lightBlue,{width:1200}), cell('Priority number',C.white,{width:1800}), cell('Flexible priority classes',C.white,{width:2400}), cell('Starvation → use aging',C.white,{width:2360})),
    row(cell('MLQ',C.gray,{width:1600}), cell('Both',C.lightBlue,{width:1200}), cell('Queue assignment',C.white,{width:1800}), cell('Low overhead; clear classes',C.white,{width:2400}), cell('Inflexible; starvation',C.white,{width:2360})),
    row(cell('MLFQ',C.gray,{width:1600}), cell('Yes',C.lightGreen,{width:1200}), cell('5 parameters',C.white,{width:1800}), cell('Adaptive; approximates SRTF',C.white,{width:2400}), cell('Complex tuning',C.white,{width:2360})),
    row(cell('CFS',C.gray,{width:1600}), cell('Yes',C.lightGreen,{width:1200}), cell('Nice value',C.white,{width:1800}), cell('Very fair; O(log n)',C.white,{width:2400}), cell('Not ideal for real-time',C.white,{width:2360})),
  ],[1600,1200,1800,2400,2360]),

  new Paragraph({ children:[new PageBreak()] }),
];
