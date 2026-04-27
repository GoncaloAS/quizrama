/**
 * Conteúdo: Chapter 8 — Complete Quick Reference
 * Extraído verbatim de os_guide.js (linhas 1256-1355).
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

  // ─── CHAPTER 8 — Quick Reference ───
  heading1('Chapter 8: Complete Quick Reference'),

  heading2('All Key Terms — Master Glossary'),
  tbl([
    row(hdrCell('Term',C.darkBlue,C.white,2800), hdrCell('Definition',C.darkBlue,C.white,6560)),
    ...([
      ['Operating System','Software managing hardware; intermediary between users/programs and hardware'],
      ['Kernel','The one program running at all times — the core of the OS'],
      ['Process','A program in execution — active entity with state, resources, and memory'],
      ['PCB','Process Control Block — OS data structure holding ALL info about a process'],
      ['Context Switch','Save current process state to PCB; load another process\'s PCB into CPU'],
      ['Multiprogramming','Multiple programs in memory; CPU switches when one waits — keeps CPU busy'],
      ['Multitasking','Preemptive multiprogramming with time slices — enables user interaction'],
      ['Firmware','Bootstrap program in ROM — loads kernel at startup'],
      ['Interrupt Vector','Table of ISR addresses — CPU consults it to find handler for each interrupt'],
      ['Device Driver','Software bridging OS and device controller — provides uniform interface'],
      ['DMA','Direct Memory Access — controller transfers data directly to RAM; one interrupt/block'],
      ['Dual-Mode','User mode (restricted) and kernel mode (privileged) — hardware enforced'],
      ['System Call','Interface for user programs to request OS kernel services'],
      ['Critical Section','Code accessing shared resources; only one process may execute it at a time'],
      ['Race Condition','Bug where outcome depends on timing of concurrent accesses to shared data'],
      ['Atomic Operation','Indivisible operation — cannot be interrupted or seen in a partial state'],
      ['Mutex','Mutual exclusion lock — binary synchronization primitive'],
      ['Spinlock','Mutex using busy-waiting — process loops checking lock instead of sleeping'],
      ['Semaphore','Integer synchronization primitive accessed via wait() and signal() only'],
      ['Peterson\'s Alg.','Software-only 2-process critical section solution using turn and flag[]'],
      ['test_and_set()','Atomic: reads boolean AND sets to true, returning original value'],
      ['compare_and_swap()','Atomic: if *target==expected, set to new_val; return old value'],
      ['Deadlock','Circular wait: each process waits for resource held by next in cycle — permanent'],
      ['Starvation','Process waits indefinitely — may resolve; not necessarily a deadlock'],
      ['Zombie','Terminated process not yet wait()-ed by parent; holds PCB in process table'],
      ['Orphan','Process whose parent terminated; adopted by init (PID 1) on UNIX/Linux'],
      ['FCFS','First-Come First-Served scheduling — FIFO, non-preemptive, convoy effect'],
      ['Round Robin','FCFS with time quantum preemption — fair, good response time'],
      ['SJF','Shortest-Job-First — optimal avg wait, non-preemptive, needs burst estimate'],
      ['SRTF','Shortest-Remaining-Time-First — preemptive SJF, optimal for preemptive'],
      ['Priority Scheduling','CPU to highest priority process; starvation solved by aging'],
      ['MLQ','Multiple queues by process type; permanent queue assignment'],
      ['MLFQ','Multilevel Feedback Queue; processes move between queues based on behavior'],
      ['CFS','Completely Fair Scheduler; Linux default; tracks vruntime, uses red-black tree'],
      ['Banker\'s Algorithm','Deadlock avoidance; grants requests only if resulting state is safe'],
      ['Safe State','State where a safe sequence exists — all processes can eventually complete'],
      ['RAG','Resource Allocation Graph — directed graph modeling resource assignments/requests'],
    ].map(([term, def]) => row(cell([para([b(term)])],C.gray,{width:2800}), cell(def,C.white,{width:6560})))),
  ],[2800,6560]),

  heading2('Process State Transitions Quick Reference'),
  tbl([
    row(hdrCell('Transition',C.darkBlue,C.white,2600), hdrCell('Trigger',C.darkBlue,C.white,3600), hdrCell('Notes',C.darkBlue,C.white,3160)),
    row(cell('New → Ready',C.lightGreen,{width:2600}), cell('OS admits process',C.white,{width:3600}), cell('All resources allocated except CPU',C.white,{width:3160})),
    row(cell('Ready → Running',C.lightGreen,{width:2600}), cell('Scheduler dispatches',C.white,{width:3600}), cell('One per CPU at a time',C.white,{width:3160})),
    row(cell('Running → Ready',C.lightOrange,{width:2600}), cell('Timer interrupt / preemption',C.white,{width:3600}), cell('Process still wants to run',C.white,{width:3160})),
    row(cell('Running → Waiting',C.lightOrange,{width:2600}), cell('I/O request, wait(), mutex block',C.white,{width:3600}), cell('Process voluntarily yields CPU',C.white,{width:3160})),
    row(cell('Waiting → Ready',C.lightBlue,{width:2600}), cell('I/O complete, signal, mutex available',C.white,{width:3600}), cell('CANNOT go directly to Running',C.white,{width:3160})),
    row(cell('Running → Terminated',C.lightRed,{width:2600}), cell('exit(), end of main()',C.white,{width:3600}), cell('PCB may remain as zombie',C.white,{width:3160})),
  ],[2600,3600,3160]),

  heading2('UNIX/Linux Process System Calls'),
  tbl([
    row(hdrCell('Call',C.darkBlue,C.white,1800), hdrCell('What It Does',C.darkBlue,C.white,4560), hdrCell('Returns',C.darkBlue,C.white,3000)),
    row(cell([para([b('fork()')])],C.lightBlue,{width:1800}), cell('Creates child — exact copy of parent. Both continue from instruction after fork()',C.white,{width:4560}), cell('0 to child; child PID to parent; -1 on error',C.white,{width:3000})),
    row(cell([para([b('exec()')])],C.lightGreen,{width:1800}), cell('Replaces process image with new program. PID and PCB unchanged.',C.white,{width:4560}), cell('Never returns on success; -1 on error',C.white,{width:3000})),
    row(cell([para([b('exit(status)')])],C.lightOrange,{width:1800}), cell('Terminates calling process; releases all resources',C.white,{width:4560}), cell('Does not return',C.white,{width:3000})),
    row(cell([para([b('wait(&status)')])],C.lightPurple,{width:1800}), cell('Parent blocks until a child terminates; prevents zombies',C.white,{width:4560}), cell('PID of terminated child',C.white,{width:3000})),
    row(cell([para([b('pipe(fd[2])')])],C.gray,{width:1800}), cell('Creates communication pipe. fd[0]=read end, fd[1]=write end',C.white,{width:4560}), cell('0 on success',C.white,{width:3000})),
  ],[1800,4560,3000]),

  heading2('Synchronization Primitives Comparison'),
  tbl([
    row(hdrCell('Primitive',C.darkBlue,C.white,2000), hdrCell('Mechanism',C.darkBlue,C.white,2800), hdrCell('Bounded Waiting?',C.darkBlue,C.white,1800), hdrCell('Best Use Case',C.darkBlue,C.white,2760)),
    row(cell('Spinlock',C.lightOrange,{width:2000}), cell('Busy-wait loop on atomic instruction',C.white,{width:2800}), cell('No (basic form)',C.lightRed,{width:1800}), cell('Short CS on multiprocessor',C.white,{width:2760})),
    row(cell('Blocking Mutex',C.lightGreen,{width:2000}), cell('Queue + suspend()',C.white,{width:2800}), cell([para([b('Yes (FIFO)')])],C.lightGreen,{width:1800}), cell('General mutual exclusion',C.white,{width:2760})),
    row(cell('Binary Semaphore',C.lightBlue,{width:2000}), cell('wait()/signal(), value 0 or 1',C.white,{width:2800}), cell([para([b('Yes')])],C.lightGreen,{width:1800}), cell('Mutual exclusion, signaling',C.white,{width:2760})),
    row(cell('Counting Semaphore',C.lightBlue,{width:2000}), cell('wait()/signal(), value 0 to N',C.white,{width:2800}), cell([para([b('Yes')])],C.lightGreen,{width:1800}), cell('Resource pool of N instances',C.white,{width:2760})),
    row(cell('Peterson\'s',C.gray,{width:2000}), cell('Software: turn + flag[]',C.white,{width:2800}), cell([para([b('Yes')])],C.lightGreen,{width:1800}), cell('2-process teaching example',C.white,{width:2760})),
  ],[2000,2800,1800,2760]),

  heading2('Deadlock: Four Conditions & Prevention'),
  tbl([
    row(hdrCell('Condition',C.red,C.white,2400), hdrCell('How It Enables Deadlock',C.red,C.white,3480), hdrCell('Prevention Strategy',C.red,C.white,3480)),
    row(cell('Mutual Exclusion',C.lightRed,{width:2400}), cell('Resources exclusively held',C.white,{width:3480}), cell('Make resources sharable (often infeasible)',C.white,{width:3480})),
    row(cell('Hold and Wait',C.lightRed,{width:2400}), cell('Process waits while holding resources',C.white,{width:3480}), cell('Request all resources upfront; release all before requesting more',C.white,{width:3480})),
    row(cell('No Preemption',C.lightRed,{width:2400}), cell('Can\'t forcibly reclaim resources',C.white,{width:3480}), cell('Allow OS to preempt resources (limited applicability)',C.white,{width:3480})),
    row(cell('Circular Wait',C.lightRed,{width:2400}), cell('Circular dependency chain forms',C.white,{width:3480}), cell('Total ordering of resource types; always request in increasing order',C.white,{width:3480})),
  ],[2400,3480,3480]),

  heading2('Scheduling Algorithms Summary'),
  tbl([
    row(hdrCell('Algorithm',C.darkBlue,C.white,1600), hdrCell('Type',C.darkBlue,C.white,1200), hdrCell('Optimal For',C.darkBlue,C.white,2200), hdrCell('Key Pro',C.darkBlue,C.white,2200), hdrCell('Key Con',C.darkBlue,C.white,2160)),
    row(cell('FCFS',C.gray,{width:1600}), cell('Non-preemptive',C.white,{width:1200}), cell('Nothing',C.white,{width:2200}), cell('Simplest',C.white,{width:2200}), cell('Convoy effect',C.white,{width:2160})),
    row(cell('Round Robin',C.gray,{width:1600}), cell('Preemptive',C.white,{width:1200}), cell('Response time',C.white,{width:2200}), cell('Fair; interactive',C.white,{width:2200}), cell('High turnaround',C.white,{width:2160})),
    row(cell('SJF',C.gray,{width:1600}), cell('Non-preemptive',C.white,{width:1200}), cell('Avg wait time',C.white,{width:2200}), cell('Provably optimal',C.white,{width:2200}), cell('Needs future knowledge',C.white,{width:2160})),
    row(cell('SRTF',C.gray,{width:1600}), cell('Preemptive',C.white,{width:1200}), cell('Avg wait (preemptive)',C.white,{width:2200}), cell('Best avg wait',C.white,{width:2200}), cell('Most preemptions',C.white,{width:2160})),
    row(cell('Priority',C.gray,{width:1600}), cell('Both',C.white,{width:1200}), cell('Priority classes',C.white,{width:2200}), cell('Flexible',C.white,{width:2200}), cell('Starvation risk',C.white,{width:2160})),
    row(cell('MLQ',C.gray,{width:1600}), cell('Both',C.white,{width:1200}), cell('Fixed process types',C.white,{width:2200}), cell('Low overhead',C.white,{width:2200}), cell('Inflexible',C.white,{width:2160})),
    row(cell('MLFQ',C.gray,{width:1600}), cell('Preemptive',C.white,{width:1200}), cell('General use',C.white,{width:2200}), cell('Adaptive',C.white,{width:2200}), cell('Complex tuning',C.white,{width:2160})),
    row(cell('CFS',C.gray,{width:1600}), cell('Preemptive',C.white,{width:1200}), cell('Fairness',C.white,{width:2200}), cell('Very fair; O(log n)',C.white,{width:2200}), cell('Not real-time',C.white,{width:2160})),
  ],[1600,1200,2200,2200,2160]),
];
