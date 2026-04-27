/**
 * Conteúdo: Chapter 7 — Deadlocks
 * Extraído verbatim de os_guide.js (linhas 1192-1255).
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

  // ─── CHAPTER 7 ───
  heading1('Chapter 7: Deadlocks'),

  heading2('7.1 The Four Coffman Conditions'),
  para([b('ALL FOUR must hold simultaneously for deadlock. Break any one → no deadlock possible.')]),
  ...spacer(1),
  tbl([
    row(hdrCell('#',C.red,C.white,400), hdrCell('Condition',C.red,C.white,2400), hdrCell('Meaning',C.red,C.white,3680), hdrCell('Prevention Strategy',C.red,C.white,2880)),
    row(cell('1',C.lightRed,{width:400}), cell([para([b('Mutual Exclusion')])],C.lightRed,{width:2400}),
      cell('At least one resource is non-sharable — held by at most one process at a time',C.white,{width:3680}),
      cell('Make resources sharable (often not feasible — printers, mutex locks are inherently exclusive)',C.white,{width:2880})),
    row(cell('2',C.lightRed,{width:400}), cell([para([b('Hold and Wait')])],C.lightRed,{width:2400}),
      cell('Process holds ≥1 resources AND waits for more held by others',C.white,{width:3680}),
      cell('Request ALL resources before starting, OR release all before requesting more',C.white,{width:2880})),
    row(cell('3',C.lightRed,{width:400}), cell([para([b('No Preemption')])],C.lightRed,{width:2400}),
      cell('Resources cannot be forcibly taken — only voluntarily released',C.white,{width:3680}),
      cell('Allow OS to preempt resources (only works for some resource types)',C.white,{width:2880})),
    row(cell('4',C.lightRed,{width:400}), cell([para([b('Circular Wait')])],C.lightRed,{width:2400}),
      cell('Set of processes {P0…Pn} where each waits for resource held by next in cycle',C.white,{width:3680}),
      cell('Total ordering of resource types — always request in strictly increasing order',C.white,{width:2880})),
  ],[400,2400,3680,2880]),

  heading2('7.2 Resource Allocation Graph (RAG)'),
  deadlockRAGDiagram(),
  ...spacer(1),
  tbl([
    row(hdrCell('Graph State',C.darkBlue,C.white,3600), hdrCell('Deadlock Conclusion',C.darkBlue,C.white,5760)),
    row(cell('No cycle anywhere',C.lightGreen,{width:3600}), cell([para([b('No deadlock — guaranteed',C.green)])],C.lightGreen,{width:5760})),
    row(cell('Cycle exists; all resource types have 1 instance',C.lightRed,{width:3600}), cell([para([b('Deadlock — guaranteed',C.red)])],C.lightRed,{width:5760})),
    row(cell('Cycle exists; some resource types have multiple instances',C.lightOrange,{width:3600}), cell('Deadlock POSSIBLE but not certain — depends on non-cycle allocations',C.white,{width:5760})),
  ],[3600,5760]),

  heading2('7.3 Deadlock Handling Strategies'),
  tbl([
    row(hdrCell('Strategy',C.darkBlue,C.white,2000), hdrCell('Approach',C.darkBlue,C.white,4000), hdrCell('Cost / Tradeoff',C.darkBlue,C.white,3360)),
    row(cell([para([b('Prevention')])],C.lightBlue,{width:2000}), cell('Structurally ensure ≥1 Coffman condition can never hold',C.white,{width:4000}), cell('Over-restrictive; wastes resources',C.white,{width:3360})),
    row(cell([para([b('Avoidance')])],C.lightGreen,{width:2000}), cell('Runtime decision: only grant requests if resulting state is SAFE (Banker\'s Algorithm)',C.white,{width:4000}), cell('Requires max resource declarations; overhead per request',C.white,{width:3360})),
    row(cell([para([b('Detection & Recovery')])],C.lightOrange,{width:2000}), cell('Allow deadlocks; detect cycles periodically; terminate or preempt to recover',C.white,{width:4000}), cell('Detection overhead; lost work on recovery',C.white,{width:3360})),
    row(cell([para([b('Ostrich Algorithm')])],C.gray,{width:2000}), cell('Ignore deadlocks; reboot when they occur (common in practice)',C.white,{width:4000}), cell('Low engineering cost; operator intervention required',C.white,{width:3360})),
  ],[2000,4000,3360]),

  heading2('7.4 Banker\'s Algorithm (Deadlock Avoidance)'),
  para([b('Analogy:'), t(' A bank that can\'t allow withdrawals that might leave it unable to serve other customers. The OS simulates granting a request, then checks if the resulting state is safe.')]),
  ...spacer(1),
  tbl([
    row(hdrCell('Concept',C.darkBlue,C.white,2400), hdrCell('Definition',C.darkBlue,C.white,6960)),
    row(cell([para([b('Safe State')])],C.lightGreen,{width:2400}), cell('There EXISTS a safe sequence — an ordering of all processes such that each process\'s remaining needs can be satisfied by currently available resources + resources held by earlier processes in the sequence',C.white,{width:6960})),
    row(cell([para([b('Unsafe State')])],C.lightOrange,{width:2400}), cell('No safe sequence exists. Deadlock is POSSIBLE (not inevitable — depends on exact future requests)',C.white,{width:6960})),
    row(cell([para([b('Algorithm')])],C.lightBlue,{width:2400}), cell('When request arrives: pretend to grant it. Run safety check. If safe → grant. If unsafe → deny (process waits).',C.white,{width:6960})),
  ],[2400,6960]),

  heading2('7.5 Deadlock Recovery'),
  tbl([
    row(hdrCell('Method',C.darkBlue,C.white,2400), hdrCell('Process Termination',C.darkBlue,C.white,3480), hdrCell('Resource Preemption',C.darkBlue,C.white,3480)),
    row(cell([para([b('Options')])],C.gray,{width:2400}),
      cell('① Abort ALL deadlocked processes (simple, guaranteed). ② Abort ONE at a time until cycle broken.',C.lightBlue,{width:3480}),
      cell('Forcibly take resources from victims; rollback to checkpoint; restart.',C.lightGreen,{width:3480})),
    row(cell([para([b('Victim Selection')])],C.gray,{width:2400}),
      cell('Minimize cost: priority, how long running, resources held, remaining need, interactive vs batch',C.white,{width:3480}),
      cell('Same factors. Must prevent starvation: track rollback count in cost function.',C.white,{width:3480})),
  ],[2400,3480,3480]),

  new Paragraph({ children:[new PageBreak()] }),
];
