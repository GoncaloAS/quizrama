/**
 * Conteúdo: Chapter 5 — Process Synchronization
 * Extraído verbatim de os_guide.js (linhas 1043-1136).
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

  // ─── CHAPTER 5 ───
  heading1('Chapter 5: Process Synchronization'),

  heading2('5.1 Race Conditions & Critical Sections'),
  para([b('Race condition: '), t('Bug where outcome depends on relative timing of concurrent accesses to shared data. Non-deterministic — hard to reproduce in debugging.')]),
  ...spacer(1),
  infoBox('Classic Example:', 'Two processes increment shared counter (value=5). Both LOAD 5, both INCREMENT to 6, both STORE 6. Net result: 6 instead of 7 — one increment LOST. The increment is NOT atomic: it requires LOAD + INCREMENT + STORE.', C.lightOrange, C.orange),
  ...spacer(1),
  heading3('Three Requirements for a Valid Critical Section Solution'),
  tbl([
    row(hdrCell('Requirement',C.darkBlue,C.white,2400), hdrCell('What It Means',C.darkBlue,C.white,6960)),
    row(cell([para([b('1. Mutual Exclusion')])],C.lightBlue,{width:2400}), cell('If Pi is in its critical section, NO other process may be in that same critical section',C.white,{width:6960})),
    row(cell([para([b('2. Progress')])],C.lightGreen,{width:2400}), cell('If no process is in CS and some want to enter, only those NOT in remainder section can decide who enters. Decision cannot be postponed indefinitely.',C.white,{width:6960})),
    row(cell([para([b('3. Bounded Waiting')])],C.lightOrange,{width:2400}), cell('After requesting entry, there is a bound on how many times OTHERS enter before this process does. No starvation at the CS level.',C.white,{width:6960})),
  ],[2400,6960]),

  heading2('5.2 Peterson\'s Algorithm (2-Process Software Solution)'),
  tbl([
    row(hdrCell('Variable',C.darkBlue,C.white,2400), hdrCell('Purpose',C.darkBlue,C.white,6960)),
    row(cell('int turn',C.lightBlue,{width:2400}), cell('Whose turn it is to enter critical section (turn = i → Pi can enter)',C.white,{width:6960})),
    row(cell('boolean flag[2]',C.lightBlue,{width:2400}), cell('flag[i] = true → process Pi WANTS to enter its critical section',C.white,{width:6960})),
  ],[2400,6960]),
  ...spacer(1),
  tbl([new TableRow({children:[new TableCell({
    borders,shading:{fill:'F8F8F8',type:ShadingType.CLEAR},
    margins:{top:120,bottom:120,left:200,right:200},width:{size:9360,type:WidthType.DXA},
    children:[
      para([b('Process Pi protocol:', C.medBlue)]),
      para([mono('  flag[i] = true;   // announce intent')]),
      para([mono('  turn = j;          // yield priority to j')]),
      para([mono('  while (flag[j] && turn == j);  // busy-wait')]),
      para([mono('  /* CRITICAL SECTION */')]),
      para([mono('  flag[i] = false;   // signal exit')]),
    ]
  })]})],[9360]),
  ...spacer(1),
  para([b('Correctness: '), t('turn can only equal one value → at most one process enters. Satisfies all 3 requirements. Limitation: busy-waiting wastes CPU; requires strong memory model.')]),

  // Renumbered: 5.3 Too Much Milk
  heading2('5.3 Too Much Milk Problem (Race Condition Example)'),
  para('Two processes (roommates) check for milk and may both buy it due to lack of synchronization.'),
  tbl([
    row(hdrCell('Step',C.orange,C.white,2000), hdrCell('Process A',C.orange,C.white,3640), hdrCell('Process B',C.orange,C.white,3640)),
    row(cell('1',C.lightOrange,{width:2000}), cell('Checks milk → none',C.white,{width:3640}), cell('Checks milk → none',C.white,{width:3640})),
    row(cell('2',C.lightOrange,{width:2000}), cell('Goes to buy milk',C.white,{width:3640}), cell('Goes to buy milk',C.white,{width:3640})),
    row(cell('3',C.lightOrange,{width:2000}), cell('Returns with milk',C.white,{width:3640}), cell('Returns with milk',C.white,{width:3640})),
  ], [2000,3640,3640]),
  para('Result: duplicate work due to race condition. Solution: enforce mutual exclusion using locks or flags.'),

  // Renumbered: 5.4 Hardware Atomic Instructions
  heading2('5.4 Hardware Atomic Instructions'),
  tbl([
    row(hdrCell('Instruction',C.darkBlue,C.white,2400), hdrCell('What It Does Atomically',C.darkBlue,C.white,4200), hdrCell('Used For',C.darkBlue,C.white,2760)),
    row(cell([para([b('test_and_set()')])],C.lightBlue,{width:2400}), cell('Reads boolean AND sets it to true; returns original value',C.white,{width:4200}), cell('Simple lock acquisition',C.white,{width:2760})),
    row(cell([para([b('compare_and_swap() (CAS)')])],C.lightGreen,{width:2400}), cell('If *target == expected: set to new_val, return old. Else: return current without changing.',C.white,{width:4200}), cell('Lock-free data structures; more general',C.white,{width:2760})),
  ],[2400,4200,2760]),
  ...spacer(1),
  warningBox('Bounded Waiting Warning:', 'Basic test_and_set and CAS implementations do NOT guarantee bounded waiting — a process could keep losing the race. The bounded-waiting version adds a waiting[] array: the lock holder passes the lock directly to a waiting process instead of releasing to open competition.'),

  // Renumbered: 5.5 Mutex Locks
  heading2('5.5 Mutex Locks'),
  tbl([
    row(hdrCell('Type',C.darkBlue,C.white,2000), hdrCell('Mechanism',C.darkBlue,C.white,3680), hdrCell('Best Use Case',C.darkBlue,C.white,3680)),
    row(cell([para([b('Spinlock')])],C.lightOrange,{width:2000}), cell('acquire_lock() loops checking lock (busy-wait). No context switch overhead.',C.white,{width:3680}), cell('Very short critical sections on multiprocessors where lock will be free in microseconds',C.white,{width:3680})),
    row(cell([para([b('Blocking Mutex')])],C.lightGreen,{width:2000}), cell('If lock held, add to FIFO waiting queue and suspend(). Lock holder wakes first waiter.',C.white,{width:3680}), cell('General mutual exclusion. Eliminates long busy-waiting.',C.white,{width:3680})),
  ],[2000,3680,3680]),

  // Renumbered: 5.6 Semaphores
  heading2('5.6 Semaphores'),
  para([b('Semaphore:'), t(' Non-negative integer accessed ONLY via wait() and signal() operations (both atomic). Invented by Dijkstra.')]),
  ...spacer(1),
  tbl([
    row(hdrCell('Operation',C.darkBlue,C.white,1800), hdrCell('Also Called',C.darkBlue,C.white,1800), hdrCell('What It Does',C.darkBlue,C.white,5760)),
    row(cell([para([b('wait(S)')])],C.lightGreen,{width:1800}), cell('P / down',C.white,{width:1800}), cell('If S>0: decrement and return (resource acquired). If S==0: BLOCK — add to waiting queue.',C.white,{width:5760})),
    row(cell([para([b('signal(S)')])],C.lightBlue,{width:1800}), cell('V / up',C.white,{width:1800}), cell('If waiting queue non-empty: wake one waiter (S stays at 0). If empty: increment S.',C.white,{width:5760})),
  ],[1800,1800,5760]),
  ...spacer(1),
  tbl([
    row(hdrCell('Type',C.darkBlue,C.white,2400), hdrCell('Range',C.darkBlue,C.white,1800), hdrCell('Primary Use',C.darkBlue,C.white,5160)),
    row(cell('Binary Semaphore',C.lightBlue,{width:2400}), cell('0 or 1',C.white,{width:1800}), cell('Mutual exclusion — identical to mutex lock',C.white,{width:5160})),
    row(cell('Counting Semaphore',C.lightGreen,{width:2400}), cell('0 to N',C.white,{width:1800}), cell('Control access to a pool of N identical resources',C.white,{width:5160})),
  ],[2400,1800,5160]),

  // Renumbered: 5.7 Starvation vs. Deadlock
  heading2('5.7 Starvation vs. Deadlock'),
  tbl([
    row(hdrCell('',C.darkBlue,C.white,2000), hdrCell('Starvation',C.darkBlue,C.white,3680), hdrCell('Deadlock',C.darkBlue,C.white,3680)),
    row(cell([para([b('Definition')])],C.gray,{width:2000}), cell('Waits indefinitely for possibly-recurring event',C.lightOrange,{width:3680}), cell('Circular wait — PERMANENTLY stuck',C.lightRed,{width:3680})),
    row(cell([para([b('Can self-resolve?')])],C.gray,{width:2000}), cell('Yes — if high-priority work eventually stops',C.lightGreen,{width:3680}), cell('Never — requires external intervention',C.lightRed,{width:3680})),
    row(cell([para([b('Requires')])],C.gray,{width:2000}), cell('Unfair scheduling',C.white,{width:3680}), cell('All 4 Coffman conditions simultaneously',C.white,{width:3680})),
  ],[2000,3680,3680]),

  new Paragraph({ children:[new PageBreak()] }),
];
