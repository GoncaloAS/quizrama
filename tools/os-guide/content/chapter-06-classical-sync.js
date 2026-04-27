/**
 * Conteúdo: Chapter 6 — Classical Synchronization Problems
 * Extraído verbatim de os_guide.js (linhas 1137-1191).
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

  // ─── CHAPTER 6 ───
  heading1('Chapter 6: Classical Synchronization Problems'),

  heading2('6.1 Bounded Buffer (Producer-Consumer)'),
  para([b('Setup:'), t(' Shared buffer of size N. Producers insert; consumers remove. Both run concurrently.')]),
  ...spacer(1),
  tbl([
    row(hdrCell('Semaphore',C.darkBlue,C.white,2000), hdrCell('Initial Value',C.darkBlue,C.white,1600), hdrCell('Meaning',C.darkBlue,C.white,5760)),
    row(cell('mutex',C.lightBlue,{width:2000}), cell('1',C.white,{width:1600}), cell('Binary semaphore — mutual exclusion for buffer access',C.white,{width:5760})),
    row(cell('empty',C.lightGreen,{width:2000}), cell('N',C.white,{width:1600}), cell('Counting — number of EMPTY slots. Producer waits here (can\'t produce if full)',C.white,{width:5760})),
    row(cell('full',C.lightOrange,{width:2000}), cell('0',C.white,{width:1600}), cell('Counting — number of FULL slots. Consumer waits here (can\'t consume if empty)',C.white,{width:5760})),
  ],[2000,1600,5760]),
  ...spacer(1),
  tbl([new TableRow({children:[new TableCell({
    borders,shading:{fill:'F8F8F8',type:ShadingType.CLEAR},
    margins:{top:120,bottom:120,left:200,right:200},width:{size:9360,type:WidthType.DXA},
    children:[
      para([b('Producer:', C.medBlue), t('  wait(empty); wait(mutex); [add item]; signal(mutex); signal(full);')]),
      para([b('Consumer:', C.orange), t('  wait(full);  wait(mutex); [remove item]; signal(mutex); signal(empty);')]),
      ...spacer(1),
      para([b('⚠ CRITICAL ORDER: ', C.red), t('Always wait(scheduling_sem) BEFORE wait(mutex). If reversed → deadlock: producer holds mutex while blocking on empty, consumer can\'t acquire mutex to free a slot.')]),
    ]
  })]})],[9360]),

  heading2('6.2 Readers-Writers Problem'),
  para([b('Rule:'), t(' Multiple readers OK concurrently. A writer needs EXCLUSIVE access — no other reader or writer.')]),
  ...spacer(1),
  tbl([
    row(hdrCell('Variable',C.darkBlue,C.white,2200), hdrCell('Init',C.darkBlue,C.white,800), hdrCell('Purpose',C.darkBlue,C.white,6360)),
    row(cell('rw_mutex',C.lightBlue,{width:2200}), cell('1',C.white,{width:800}), cell('Writers acquire for exclusive access. First reader acquires (blocks writers). Last reader releases.',C.white,{width:6360})),
    row(cell('mutex',C.lightBlue,{width:2200}), cell('1',C.white,{width:800}), cell('Protects read_count from concurrent modification',C.white,{width:6360})),
    row(cell('read_count',C.lightBlue,{width:2200}), cell('0',C.white,{width:800}), cell('Number of readers currently reading',C.white,{width:6360})),
  ],[2200,800,6360]),
  ...spacer(1),
  tbl([
    row(hdrCell('Variation',C.darkBlue,C.white,2400), hdrCell('Who Wins?',C.darkBlue,C.white,2400), hdrCell('Starvation Risk',C.darkBlue,C.white,4560)),
    row(cell('Variation I: Reader Priority',C.lightBlue,{width:2400}), cell('Readers never wait if any reader is reading',C.white,{width:2400}), cell('Writers may starve if readers keep arriving',C.lightRed,{width:4560})),
    row(cell('Variation II: Writer Priority',C.lightGreen,{width:2400}), cell('Once a writer waits, no new readers start',C.white,{width:2400}), cell('Readers may starve if writers keep arriving',C.lightRed,{width:4560})),
  ],[2400,2400,4560]),

  heading2('6.3 Dining Philosophers Problem'),
  diningPhilosophersDiagram(),
  ...spacer(1),
  tbl([
    row(hdrCell('Solution',C.darkBlue,C.white,2800), hdrCell('Mechanism',C.darkBlue,C.white,6560)),
    row(cell([para([b('Naive — DEADLOCKS')])],C.lightRed,{width:2800}), cell('Each picks up left chopstick, waits for right → circular wait if all hungry simultaneously',C.white,{width:6560})),
    row(cell([para([b('Allow N-1 at table')])],C.lightGreen,{width:2800}), cell('Semaphore init to N-1=4. At least one philosopher always has both chopsticks available',C.white,{width:6560})),
    row(cell([para([b('Asymmetric Pickup')])],C.lightGreen,{width:2800}), cell('Odd philosophers: left then right. Even philosophers: right then left. Breaks circular symmetry.',C.white,{width:6560})),
    row(cell([para([b('All-or-Nothing (Monitor)')])],C.lightGreen,{width:2800}), cell('Philosopher picks up chopsticks ONLY if BOTH are available. Atomic acquisition.',C.white,{width:6560})),
  ],[2800,6560]),
  ...spacer(1),
  warningBox('Important:', 'Deadlock-free ≠ Starvation-free. A philosopher could always lose the race to chopsticks without a deadlock cycle. Both must be explicitly ensured.'),

  new Paragraph({ children:[new PageBreak()] }),
];
