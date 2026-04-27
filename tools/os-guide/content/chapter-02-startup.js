/**
 * Conteúdo: Chapter 2 — Startup, Interrupts, Syscalls
 * Extraído verbatim de os_guide.js (linhas 632-764).
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

  // ─── CHAPTER 2 ───
  heading1('Chapter 2: Startup, Interrupts & System Calls'),

  heading2('2.1 Multiprogramming vs. Multitasking'),
  tbl([
    row(hdrCell('Concept',C.darkBlue,C.white,2000), hdrCell('Switching Trigger',C.darkBlue,C.white,2200), hdrCell('User Interaction',C.darkBlue,C.white,2200), hdrCell('Scheduling Type',C.darkBlue,C.white,2960)),
    row(cell('Multiprogramming',C.lightBlue,{width:2000}), cell('Job waits for I/O or event',C.white,{width:2200}), cell('No — batch mode',C.white,{width:2200}), cell('Non-preemptive',C.white,{width:2960})),
    row(cell('Multitasking',C.lightGreen,{width:2000}), cell('Timer expires (time quantum)',C.white,{width:2200}), cell('Yes — interactive',C.white,{width:2200}), cell('Preemptive',C.white,{width:2960})),
  ],[2000,2200,2200,2960]),

  heading2('2.2 Computer Startup (Boot Process)'),
  para('When powered on, the bootstrap process runs from firmware (ROM/EPROM — survives power-off):'),
  ...spacer(1),
  tbl([
    row(hdrCell('Step',C.darkBlue,C.white,400), hdrCell('Actor',C.darkBlue,C.white,1800), hdrCell('Action',C.darkBlue,C.white,7160)),
    row(cell('1',C.lightBlue,{width:400}), cell([para([b('Firmware/BIOS/UEFI')])],C.lightBlue,{width:1800}), cell('CPU begins executing firmware from ROM; runs POST; initializes all hardware; sets up interrupt vectors',C.white,{width:7160})),
    row(cell('2',C.lightGreen,{width:400}), cell([para([b('Bootloader (GRUB)')])],C.lightGreen,{width:1800}), cell('Locates OS kernel on disk; loads kernel image into main RAM',C.white,{width:7160})),
    row(cell('3',C.lightOrange,{width:400}), cell([para([b('Kernel')])],C.lightOrange,{width:1800}), cell('Firmware hands control to kernel; kernel initializes data structures, drivers, subsystems',C.white,{width:7160})),
    row(cell('4',C.lightPurple,{width:400}), cell([para([b('init / systemd')])],C.lightPurple,{width:1800}), cell('Kernel launches init (PID 1); init starts all system services and daemons',C.white,{width:7160})),
    row(cell('5',C.gray,{width:400}), cell([para([b('OS Running')])],C.gray,{width:1800}), cell('System fully booted; begins waiting for events (logins, application launches, hardware signals)',C.white,{width:7160})),
  ],[400,1800,7160]),

  heading2('2.3 Interrupts'),
  para('Events are signaled by interrupts — eliminating the need for the CPU to poll devices constantly.'),
  ...spacer(1),
  tbl([
    row(hdrCell('Type',C.darkBlue,C.white,2200), hdrCell('Triggered By',C.darkBlue,C.white,3080), hdrCell('Examples',C.darkBlue,C.white,4080)),
    row(cell([para([b('Hardware Interrupt')])],C.lightBlue,{width:2200}), cell('Device sends electrical signal to CPU interrupt pin',C.white,{width:3080}), cell('Key press, disk read complete, network packet received, timer expiry',C.white,{width:4080})),
    row(cell([para([b('Software Interrupt (Trap)')])],C.lightOrange,{width:2200}), cell('Software executes trap instruction deliberately',C.white,{width:3080}), cell('System calls, division by zero, illegal memory access, page fault',C.white,{width:4080})),
  ],[2200,3080,4080]),
  ...spacer(1),
  heading3('Interrupt Handling Sequence (Atomic)'),
  tbl([
    row(hdrCell('Step',C.medBlue,C.white,400), hdrCell('Action',C.medBlue,C.white,8960)),
    row(cell('1',C.lightBlue,{width:400}), cell('Finish current instruction; SUSPEND current activity',C.white,{width:8960})),
    row(cell('2',C.lightBlue,{width:400}), cell('SAVE full CPU state: program counter, ALL registers, stack pointer → stack or save area',C.white,{width:8960})),
    row(cell('3',C.lightBlue,{width:400}), cell('IDENTIFY the interrupt number (from hardware or trap instruction)',C.white,{width:8960})),
    row(cell('4',C.lightBlue,{width:400}), cell('Look up handler address in INTERRUPT VECTOR TABLE (fixed memory address with ISR addresses)',C.white,{width:8960})),
    row(cell('5',C.lightBlue,{width:400}), cell('EXECUTE Interrupt Service Routine (ISR) — other interrupts may be disabled',C.white,{width:8960})),
    row(cell('6',C.lightBlue,{width:400}), cell('RESTORE saved state; RESUME interrupted computation (or a different process if scheduler decides)',C.white,{width:8960})),
  ],[400,8960]),

  // New: Interrupt Handling Timeline
  heading2('2.4 Interrupt Handling Timeline'),
  tbl([
    row(hdrCell('Step',C.purple,C.white,2000), hdrCell('Action',C.purple,C.white,5280)),
    row(cell('1',C.lightPurple,{width:2000}), cell('Current instruction completes',C.white,{width:5280})),
    row(cell('2',C.lightPurple,{width:2000}), cell('Interrupt signal received',C.white,{width:5280})),
    row(cell('3',C.lightPurple,{width:2000}), cell('CPU saves context (PC, registers)',C.white,{width:5280})),
    row(cell('4',C.lightPurple,{width:2000}), cell('Interrupt vector lookup',C.white,{width:5280})),
    row(cell('5',C.lightPurple,{width:2000}), cell('ISR executes',C.white,{width:5280})),
    row(cell('6',C.lightPurple,{width:2000}), cell('Context restored',C.white,{width:5280})),
    row(cell('7',C.lightPurple,{width:2000}), cell('Execution resumes',C.white,{width:5280})),
  ], [2000,5280]),

  // Renumbered: 2.5 I/O Operation Flow
  heading2('2.5 I/O Operation Flow — Step by Step'),
  para([b('EXPLICIT CONCEPT: '), t('The I/O operation flow is the exact sequence from software request to completion:')]),
  ...spacer(1),
  ioFlowDiagram(),

  // Renumbered: 2.6 DMA
  heading2('2.6 Direct Memory Access (DMA)'),
  tbl([
    row(hdrCell('Method',C.darkBlue,C.white,2200), hdrCell('CPU in Transfer?',C.darkBlue,C.white,2200), hdrCell('Interrupts',C.darkBlue,C.white,2200), hdrCell('Best For',C.darkBlue,C.white,2760)),
    row(cell('Normal Interrupt I/O',C.lightOrange,{width:2200}), cell('Yes — handles every byte',C.white,{width:2200}), cell('One per byte',C.white,{width:2200}), cell('Slow devices, small transfers (keyboard, mouse)',C.white,{width:2760})),
    row(cell('DMA',C.lightGreen,{width:2200}), cell('No — controller handles it directly',C.white,{width:2200}), cell('One per block',C.white,{width:2200}), cell('Fast devices, bulk transfers (disk, NIC, GPU)',C.white,{width:2760})),
  ],[2200,2200,2200,2760]),

  // Renumbered: 2.7 Dual-Mode Operation
  heading2('2.7 Dual-Mode Operation'),
  para('Hardware enforces two execution modes — software cannot fake its own mode:'),
  ...spacer(1),
  tbl([
    row(hdrCell('Mode',C.darkBlue,C.white,2000), hdrCell('Mode Bit',C.darkBlue,C.white,1200), hdrCell('Who Runs Here',C.darkBlue,C.white,2000), hdrCell('Capabilities',C.darkBlue,C.white,4160)),
    row(cell([para([b('User Mode')])],C.lightOrange,{width:2000}), cell('= 1',C.lightOrange,{width:1200}), cell('User applications',C.white,{width:2000}), cell('Restricted — privileged instructions cause hardware trap',C.white,{width:4160})),
    row(cell([para([b('Kernel Mode')])],C.lightGreen,{width:2000}), cell('= 0',C.lightGreen,{width:1200}), cell('OS kernel',C.white,{width:2000}), cell('Full access: I/O control, interrupt vectors, timer, all memory',C.white,{width:4160})),
  ],[2000,1200,2000,4160]),
  ...spacer(1),

  // New: Dual Mode Summary table (inside this section)
  heading3('Dual Mode Summary'),
  tbl([
    row(hdrCell('Mode',C.green,C.white,2000), hdrCell('Access Level',C.green,C.white,2640), hdrCell('Capabilities',C.green,C.white,2640)),
    row(cell('User Mode',C.lightGreen,{width:2000}), cell('Restricted',C.white,{width:2640}), cell('No direct I/O, no privileged instructions',C.white,{width:2640})),
    row(cell('Kernel Mode',C.lightGreen,{width:2000}), cell('Full Access',C.white,{width:2640}), cell('Full hardware + memory access',C.white,{width:2640})),
  ], [2000,2640,2640]),
  para('Switching occurs via system calls, interrupts, or exceptions.'),
  para([b('Mode transitions: '), t('User → Kernel: interrupt, exception, or trap (system call). Kernel → User: return-from-interrupt restores mode bit AND registers atomically.')]),

  // Renumbered: 2.8 CPU Timer Protection
  heading2('2.8 CPU Timer Protection'),
  para('Before returning control to any user program, the OS programs a hardware countdown timer. When it reaches zero it fires an interrupt, unconditionally returning control to the OS. This prevents infinite loops or malicious processes from monopolizing the CPU.'),

  // Renumbered: 2.9 System Calls
  heading2('2.9 System Calls'),
  para('System calls are the ONLY mechanism for user-mode programs to request kernel services. They are the safe, controlled boundary between user space and kernel space.'),
  ...spacer(1),
  heading3('System Call Categories (Explicit)'),
  tbl([
    row(hdrCell('Category',C.darkBlue,C.white,2200), hdrCell('What It Does',C.darkBlue,C.white,3000), hdrCell('POSIX Examples',C.darkBlue,C.white,4160)),
    row(cell([para([b('Process Control')])],C.lightBlue,{width:2200}), cell('Create, delete, wait for, signal processes',C.white,{width:3000}), cell('fork(), exec(), exit(), wait(), kill(), getpid()',C.white,{width:4160})),
    row(cell([para([b('File Manipulation')])],C.lightGreen,{width:2200}), cell('Open, read, write, seek, stat files',C.white,{width:3000}), cell('open(), read(), write(), close(), lseek(), stat()',C.white,{width:4160})),
    row(cell([para([b('Device Manipulation')])],C.lightOrange,{width:2200}), cell('Request and release devices, read/write device files',C.white,{width:3000}), cell('ioctl(), read(), write() on device files',C.white,{width:4160})),
    row(cell([para([b('Information Maintenance')])],C.lightPurple,{width:2200}), cell('Get/set time, PID, resource usage',C.white,{width:3000}), cell('gettimeofday(), getpid(), getrusage()',C.white,{width:4160})),
    row(cell([para([b('Communications')])],C.lightBlue,{width:2200}), cell('Send/receive messages, create shared memory, pipes, sockets',C.white,{width:3000}), cell('socket(), send(), recv(), pipe(), shmget()',C.white,{width:4160})),
    row(cell([para([b('Protection')])],C.lightGreen,{width:2200}), cell('Set file/process permissions, change ownership',C.white,{width:3000}), cell('chmod(), chown(), setuid(), umask()',C.white,{width:4160})),
  ],[2200,3000,4160]),
  ...spacer(1),
  heading3('How System Calls Work Internally'),
  tbl([
    row(hdrCell('Step',C.medBlue,C.white,400), hdrCell('Action',C.medBlue,C.white,8960)),
    row(cell('1',C.lightBlue,{width:400}), cell('API function (e.g. read()) places syscall NUMBER and parameters into CPU registers',C.white,{width:8960})),
    row(cell('2',C.lightBlue,{width:400}), cell('Trap instruction → hardware switches to KERNEL MODE automatically',C.white,{width:8960})),
    row(cell('3',C.lightBlue,{width:400}), cell('Kernel\'s syscall dispatcher looks up call number in system call table',C.white,{width:8960})),
    row(cell('4',C.lightBlue,{width:400}), cell('Kernel executes the requested service (reads file, creates process, etc.)',C.white,{width:8960})),
    row(cell('5',C.lightBlue,{width:400}), cell('Return value placed in register; switch back to USER MODE; return to calling program',C.white,{width:8960})),
  ],[400,8960]),
  ...spacer(1),
  heading3('APIs vs Direct System Calls'),
  para('Programs use APIs (POSIX, Win32, Java JVM) instead of raw syscalls for: portability (same source compiles anywhere), easier error handling, and buffering/extra functionality. The API internally calls the actual OS syscall.'),

  // New: System Call API Examples (within 2.9 System Calls)
  heading3('System Call API Examples'),
  tbl([
    row(hdrCell('API',C.darkGray,C.white,2000), hdrCell('Examples',C.darkGray,C.white,5280)),
    row(cell('POSIX',C.gray,{width:2000}), cell('fork(), read(), write()',C.white,{width:5280})),
    row(cell('Win32',C.gray,{width:2000}), cell('CreateProcess(), ReadFile(), WriteFile()',C.white,{width:5280})),
    row(cell('Java',C.gray,{width:2000}), cell('ProcessBuilder, FileInputStream, Socket',C.white,{width:5280})),
  ], [2000,5280]),

  new Paragraph({ children:[new PageBreak()] }),
];
