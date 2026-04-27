/**
 * Conteúdo: Chapter 3 — Processes
 * Extraído verbatim de os_guide.js (linhas 765-895).
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

  // ─── CHAPTER 3 ───
  heading1('Chapter 3: Processes'),

  heading2('3.1 Program vs. Process'),
  tbl([
    row(hdrCell('Program',C.medBlue,C.white,4680), hdrCell('Process',C.darkBlue,C.white,4680)),
    row(cell('Passive — executable file stored on disk',C.lightBlue,{width:4680}), cell('Active — currently executing or ready to run in memory',C.lightPurple,{width:4680})),
    row(cell('Static list of instructions',C.lightBlue,{width:4680}), cell('Dynamic execution: code + stack + heap + data + open files + registers',C.lightPurple,{width:4680})),
    row(cell('Consumes no CPU or memory when idle',C.lightBlue,{width:4680}), cell('Consumes CPU time, memory, file descriptors, I/O devices',C.lightPurple,{width:4680})),
    row(cell('One program → can be many processes',C.lightBlue,{width:4680}), cell('Each process is one independent execution instance',C.lightPurple,{width:4680})),
  ],[4680,4680]),

  heading2('3.2 Process Memory Layout'),
  para('A process\'s address space is divided into four distinct sections:'),
  ...spacer(1),
  memoryLayoutDiagram(),
  ...spacer(1),
  infoBox('Key Rules:', 'Text + Data sections have FIXED sizes set at compile time. Heap grows UP; Stack grows DOWN. They grow toward each other and can collide → segfault / stack overflow.', C.lightBlue, C.medBlue),

  heading2('3.3 Process Control Block (PCB)'),
  para('The OS represents each process with a PCB — its complete "file" in the kernel\'s filing system:'),
  ...spacer(1),
  tbl([
    row(hdrCell('PCB Field',C.darkBlue,C.white,2400), hdrCell('Contents & Purpose',C.darkBlue,C.white,6960)),
    row(cell('Process State',C.lightBlue,{width:2400}), cell('Current state: New / Ready / Running / Waiting / Terminated',C.white,{width:6960})),
    row(cell('Process ID (PID)',C.lightBlue,{width:2400}), cell('Unique non-negative integer; used in syscalls like wait() and kill()',C.white,{width:6960})),
    row(cell('Program Counter',C.lightGreen,{width:2400}), cell('Address of NEXT instruction to execute — most critical field for resuming correctly',C.white,{width:6960})),
    row(cell('CPU Registers',C.lightGreen,{width:2400}), cell('Complete snapshot of ALL register values at last context switch',C.white,{width:6960})),
    row(cell('Scheduling Info',C.lightOrange,{width:2400}), cell('Priority, queue pointer, scheduling class, CPU time used, time slice remaining',C.white,{width:6960})),
    row(cell('Memory Info',C.lightOrange,{width:2400}), cell('Page table pointer, base/limit registers — for virtual→physical address translation',C.white,{width:6960})),
    row(cell('Accounting Info',C.lightPurple,{width:2400}), cell('Total CPU time, wall-clock start time, owner UID, resource limits — billing & auditing',C.white,{width:6960})),
    row(cell('I/O State',C.lightPurple,{width:2400}), cell('All open file descriptors (with position, mode), allocated I/O devices, pending I/O ops',C.white,{width:6960})),
  ],[2400,6960]),

  heading2('3.4 Process States'),
  para('A process moves through states based on its activity and available resources. On a single CPU, only ONE process can be RUNNING at any instant.'),
  ...spacer(1),
  heading3('Process State Diagram'),
  processStateDiagram(),
  ...spacer(1),
  tbl([
    row(hdrCell('State',C.darkBlue,C.white,1600), hdrCell('What Process is Doing',C.darkBlue,C.white,2400), hdrCell('Has CPU?',C.darkBlue,C.white,1200), hdrCell('Waiting For',C.darkBlue,C.white,4160)),
    row(cell('NEW',C.gray,{width:1600}), cell('Being created, PCB allocated',C.white,{width:2400}), cell('No',C.lightRed,{width:1200}), cell('OS to complete initialization',C.white,{width:4160})),
    row(cell('READY',C.lightGreen,{width:1600}), cell('All resources ready, waiting for CPU',C.white,{width:2400}), cell('No',C.lightRed,{width:1200}), cell('CPU to become free (scheduler decision)',C.white,{width:4160})),
    row(cell('RUNNING',C.lightBlue,{width:1600}), cell('Actively executing instructions',C.white,{width:2400}), cell([para([b('YES')])],C.lightGreen,{width:1200}), cell('Nothing — it is running',C.white,{width:4160})),
    row(cell('WAITING',C.lightOrange,{width:1600}), cell('Paused for external event',C.white,{width:2400}), cell('No',C.lightRed,{width:1200}), cell('I/O completion, signal, mutex, child exit',C.white,{width:4160})),
    row(cell('TERMINATED',C.lightRed,{width:1600}), cell('Finished — cleanup in progress',C.white,{width:2400}), cell('No',C.lightRed,{width:1200}), cell('Parent to call wait() (zombie until then)',C.white,{width:4160})),
  ],[1600,2400,1200,4160]),
  ...spacer(1),
  heading3('State Transitions Explained'),
  tbl([
    row(hdrCell('Transition',C.darkBlue,C.white,2600), hdrCell('Trigger',C.darkBlue,C.white,6760)),
    row(cell('New → Ready',C.lightGreen,{width:2600}), cell('OS admits process into ready queue (resources allocated)',C.white,{width:6760})),
    row(cell('Ready → Running',C.lightGreen,{width:2600}), cell('Scheduler (dispatcher) selects this process; loads its PCB into CPU',C.white,{width:6760})),
    row(cell('Running → Ready',C.lightOrange,{width:2600}), cell('Timer interrupt fires (quantum expired) OR OS preempts for higher-priority process',C.white,{width:6760})),
    row(cell('Running → Waiting',C.lightOrange,{width:2600}), cell('Process requests I/O, calls wait() for child, blocks on semaphore/mutex',C.white,{width:6760})),
    row(cell('Waiting → Ready',C.lightBlue,{width:2600}), cell('I/O completes, signal received, semaphore signaled — process CAN\'T go directly to Running',C.white,{width:6760})),
    row(cell('Running → Terminated',C.lightRed,{width:2600}), cell('Process calls exit(), returns from main(), or is killed by signal',C.white,{width:6760})),
  ],[2600,6760]),

  heading2('3.5 When Does Scheduling Happen?'),
  infoBox('Scheduling Decision Points (Explicit):', 'Scheduling decisions occur when a process: (1) Switches from Running → Waiting [voluntary]. (2) Switches from Running → Ready [timer interrupt]. (3) Switches from Waiting → Ready [I/O completes]. (4) Terminates. Points 1 and 4 = non-preemptive only. Points 2 and 3 = preemptive scheduling is triggered.', C.yellow, C.orange),

  heading2('3.6 Context Switching'),
  para('When the OS switches the CPU from one process to another, it performs a context switch:'),
  ...spacer(1),
  contextSwitchDiagram(),
  ...spacer(1),
  tbl([
    row(hdrCell('Context Switch Factor',C.darkBlue,C.white,3600), hdrCell('Detail',C.darkBlue,C.white,5760)),
    row(cell('Time cost',C.lightOrange,{width:3600}), cell('1–10 milliseconds — pure overhead (no useful computation)',C.white,{width:5760})),
    row(cell('What is saved to PCB',C.lightBlue,{width:3600}), cell('ALL CPU registers + Program Counter + Stack Pointer + Memory management info',C.white,{width:5760})),
    row(cell('Speed depends on',C.lightBlue,{width:3600}), cell('Memory bandwidth, number of registers, hardware bulk-save support',C.white,{width:5760})),
    row(cell('Hardware optimization',C.lightGreen,{width:3600}), cell('Some CPUs have multiple register banks → context switch = just change bank pointer',C.white,{width:5760})),
  ],[3600,5760]),

  heading2('3.7 Process Creation: fork(), exec(), exit(), wait()'),
  tbl([
    row(hdrCell('Syscall',C.darkBlue,C.white,1800), hdrCell('What It Does',C.darkBlue,C.white,4000), hdrCell('Return Value',C.darkBlue,C.white,3560)),
    row(cell('fork()',C.lightBlue,{width:1800}), cell('Creates exact copy of calling process (child). Both continue from instruction after fork()',C.white,{width:4000}), cell('0 to child; child\'s PID to parent; -1 on error',C.white,{width:3560})),
    row(cell('exec()',C.lightGreen,{width:1800}), cell('Replaces process image with new program. PID/PCB unchanged — just the program changes. Does NOT create new process',C.white,{width:4000}), cell('Never returns on success; -1 on error',C.white,{width:3560})),
    row(cell('exit(status)',C.lightOrange,{width:1800}), cell('Terminates calling process; releases ALL resources; makes exit status available to parent',C.white,{width:4000}), cell('Does not return',C.white,{width:3560})),
    row(cell('wait(&status)',C.lightPurple,{width:1800}), cell('Parent blocks until a child terminates. Prevents zombie accumulation.',C.white,{width:4000}), cell('PID of terminated child',C.white,{width:3560})),
  ],[1800,4000,3560]),
  ...spacer(1),
  heading3('Resource & Execution Sharing Alternatives (Explicit)'),
  tbl([
    row(hdrCell('Dimension',C.darkBlue,C.white,2400), hdrCell('Option A',C.darkBlue,C.white,3480), hdrCell('Option B',C.darkBlue,C.white,3480)),
    row(cell([para([b('Resource Sharing')])],C.lightBlue,{width:2400}), cell('Parent & children share ALL resources',C.white,{width:3480}), cell('Children share NO resources (independent from creation)',C.white,{width:3480})),
    row(cell([para([b('Execution')])],C.lightGreen,{width:2400}), cell('Parent and children execute concurrently',C.white,{width:3480}), cell('Parent waits until children terminate (calls wait())',C.white,{width:3480})),
    row(cell([para([b('Address Space')])],C.lightOrange,{width:2400}), cell('Child is copy of parent (copy-on-write) — same program initially',C.white,{width:3480}), cell('Child calls exec() → new program loaded into child\'s space',C.white,{width:3480})),
  ],[2400,3480,3480]),

  heading2('3.8 Zombies & Orphans'),
  tbl([
    row(hdrCell('Concept',C.darkBlue,C.white,2200), hdrCell('What It Is',C.darkBlue,C.white,3600), hdrCell('Risk & Fix',C.darkBlue,C.white,3560)),
    row(cell([para([b('Zombie')])],C.lightRed,{width:2200}), cell('Terminated process whose parent has NOT yet called wait(). PCB remains in process table.',C.white,{width:3600}), cell('Risk: table fills up. Fix: parent must call wait() to reap zombie.',C.white,{width:3560})),
    row(cell([para([b('Orphan')])],C.lightOrange,{width:2200}), cell('Process whose parent terminated before it. Parent gone → who reaps it?',C.white,{width:3600}), cell('Fix: init (PID 1 / systemd) auto-adopts orphans and calls wait() periodically.',C.white,{width:3560})),
  ],[2200,3600,3560]),

  heading2('3.9 IPC — Message Passing vs. Shared Memory'),
  tbl([
    row(hdrCell('Aspect',C.darkBlue,C.white,2000), hdrCell('Message Passing',C.darkBlue,C.white,3680), hdrCell('Shared Memory',C.darkBlue,C.white,3680)),
    row(cell('Mechanism',C.gray,{width:2000}), cell('Explicit send()/receive() calls',C.lightBlue,{width:3680}), cell('Read/write a shared memory region directly',C.lightGreen,{width:3680})),
    row(cell('Kernel involvement',C.gray,{width:2000}), cell('Every exchange requires kernel syscall',C.lightBlue,{width:3680}), cell('Only at setup — after that, direct memory access',C.lightGreen,{width:3680})),
    row(cell('Speed',C.gray,{width:2000}), cell('Slower — syscall overhead per message',C.lightRed,{width:3680}), cell('Faster — memory access speed',C.lightGreen,{width:3680})),
    row(cell('Network capable?',C.gray,{width:2000}), cell('Yes — works across machines',C.lightGreen,{width:3680}), cell('No — same machine only',C.lightRed,{width:3680})),
    row(cell('Synchronization',C.gray,{width:2000}), cell('Implicit in message protocol',C.lightBlue,{width:3680}), cell('Programmer must handle explicitly (races!)',C.lightOrange,{width:3680})),
    row(cell('Best for',C.gray,{width:2000}), cell('Distributed systems, inter-machine IPC',C.lightBlue,{width:3680}), cell('High-speed local data sharing, producer-consumer',C.lightGreen,{width:3680})),
  ],[2000,3680,3680]),

  // New: IPC Models Comparison (heading3 under 3.9)
  heading3('IPC Models Comparison'),
  tbl([
    row(hdrCell('Feature',C.medBlue,C.white,2000), hdrCell('Message Passing',C.medBlue,C.white,2640), hdrCell('Shared Memory',C.medBlue,C.white,2640)),
    row(cell('Kernel Involvement',C.lightBlue,{width:2000}), cell('Yes',C.white,{width:2640}), cell('Minimal after setup',C.white,{width:2640})),
    row(cell('Speed',C.lightBlue,{width:2000}), cell('Slower',C.white,{width:2640}), cell('Faster',C.white,{width:2640})),
    row(cell('Complexity',C.lightBlue,{width:2000}), cell('Simpler',C.white,{width:2640}), cell('Requires synchronization',C.white,{width:2640})),
  ], [2000,2640,2640]),

  // New: 3.10 Pipe Communication Flow
  heading2('3.10 Pipe Communication Flow'),
  tbl([
    row(hdrCell('Process',C.orange,C.white,2000), hdrCell('Action',C.orange,C.white,5280)),
    row(cell('Parent',C.lightOrange,{width:2000}), cell('Writes to pipe (write-end)',C.white,{width:5280})),
    row(cell('Kernel',C.lightOrange,{width:2000}), cell('Stores data in pipe buffer',C.white,{width:5280})),
    row(cell('Child',C.lightOrange,{width:2000}), cell('Reads from pipe (read-end)',C.white,{width:5280})),
  ], [2000,5280]),

  new Paragraph({ children:[new PageBreak()] }),
];
