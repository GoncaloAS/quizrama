/**
 * Conteúdo: Chapter 1 — What is an OS?
 * Extraído verbatim de os_guide.js (linhas 568-631).
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
  // ─── CHAPTER 1 ───
  heading1('Chapter 1: What is an Operating System?'),

  heading2('1.1 Motivation & Definition'),
  para('Computer hardware on its own is not easy to use. Without an intermediary layer, every application programmer would need to write code to directly control each hardware component. The operating system (OS) solves this by consolidating common hardware control functions into a single shared software layer between hardware and applications.'),
  ...spacer(1),
  tbl([
    row(hdrCell('Definition',C.darkBlue,C.white,2000), hdrCell('Description',C.darkBlue,C.white,7360)),
    row(cell([para([b('Practical')])],C.lightBlue,{width:2000}), cell('"Everything a vendor ships when you order an OS" — varies widely.',C.white,{width:7360})),
    row(cell([para([b('Technical')])],C.lightBlue,{width:2000}), cell('The kernel: the one program running at all times. Everything else is a system or application program.',C.white,{width:7360})),
  ],[2000,7360]),

  heading2('1.2 OS Goals by Environment'),
  tbl([
    row(hdrCell('System Type',C.darkBlue,C.white,2200), hdrCell('Ease of Use',C.darkBlue,C.white,2000), hdrCell('Performance',C.darkBlue,C.white,2000), hdrCell('Resource Utilization',C.darkBlue,C.white,3160)),
    row(cell('Single-user PC',C.gray,{width:2200}), cell('★★★ High',C.lightGreen,{width:2000}), cell('★★ Moderate',C.lightBlue,{width:2000}), cell('★ Almost none',C.lightRed,{width:3160})),
    row(cell('Multi-user Server',C.gray,{width:2200}), cell('★ Low',C.lightRed,{width:2000}), cell('★★★ High',C.lightGreen,{width:2000}), cell('★★★ Critical',C.lightGreen,{width:3160})),
    row(cell('Mobile Device',C.gray,{width:2200}), cell('★★★ High',C.lightGreen,{width:2000}), cell('★★ Moderate',C.lightBlue,{width:2000}), cell('★★★ High (battery)',C.lightGreen,{width:3160})),
    row(cell('Embedded',C.gray,{width:2200}), cell('★ None/minimal',C.lightRed,{width:2000}), cell('★★ Task-specific',C.lightBlue,{width:2000}), cell('★ Minimal footprint',C.lightRed,{width:3160})),
  ],[2200,2000,2000,3160]),

  heading2('1.3 Computer System Structure'),
  para('A computer system forms a layered hierarchy — each layer builds on the one below:'),
  ...spacer(1),
  tbl([
    row(cell([para([b('USERS',C.white)])],C.darkBlue,{width:9360})),
    row(cell([para([t('↑ interact via', C.darkGray, 9)])],C.white,{width:9360,border:false})),
    row(cell([para([b('APPLICATION PROGRAMS',C.darkBlue)])],C.lightBlue,{width:9360})),
    row(cell([para([t('↑ managed by', C.darkGray, 9)])],C.white,{width:9360,border:false})),
    row(cell([para([b('OPERATING SYSTEM',C.white)])],C.medBlue,{width:9360})),
    row(cell([para([t('↑ controls', C.darkGray, 9)])],C.white,{width:9360,border:false})),
    row(cell([para([b('HARDWARE (CPU, Memory, I/O)',C.white)])],C.darkGray,{width:9360})),
  ],[9360]),

  ...spacer(1),

  heading2('1.4 The Four Major OS Components'),
  tbl([
    row(hdrCell('Component',C.darkBlue,C.white,2400), hdrCell('Responsibilities',C.darkBlue,C.white,6960)),
    row(cell([para([b('Process Management')])],C.lightBlue,{width:2400}),
      cell('Create/delete processes; schedule CPU; handle IPC, synchronization, deadlocks',C.white,{width:6960})),
    row(cell([para([b('Memory Management')])],C.lightGreen,{width:2400}),
      cell('Track memory usage; allocate/free; enforce memory protection; manage paging/swapping',C.white,{width:6960})),
    row(cell([para([b('Storage Management')])],C.lightOrange,{width:2400}),
      cell('Abstract physical disks into files/directories; enforce access control; handle backup/journaling',C.white,{width:6960})),
    row(cell([para([b('I/O Management')])],C.lightPurple,{width:2400}),
      cell('Hide hardware quirks via drivers; manage buffering, caching, spooling; uniform device interface',C.white,{width:6960})),
  ],[2400,6960]),

  heading2('1.5 OS Services'),
  tbl([
    row(hdrCell('Service Category',C.darkBlue,C.white,2800), hdrCell('Examples & Purpose',C.darkBlue,C.white,6560)),
    row(cell('User Interface',C.lightBlue,{width:2800}), cell('CLI, GUI, touch — ways to operate and control the system',C.white,{width:6560})),
    row(cell('Program Execution',C.lightBlue,{width:2800}), cell('Load program into memory, run it, handle normal/abnormal termination',C.white,{width:6560})),
    row(cell('I/O Operations',C.lightBlue,{width:2800}), cell('Controlled I/O on behalf of user programs (direct hardware access is unsafe)',C.white,{width:6560})),
    row(cell('File System Manipulation',C.lightGreen,{width:2800}), cell('Create, delete, read, write, search files and directories; manage permissions',C.white,{width:6560})),
    row(cell('Communications',C.lightGreen,{width:2800}), cell('Shared memory or message passing — between processes, or across networks',C.white,{width:6560})),
    row(cell('Error Detection',C.lightOrange,{width:2800}), cell('Monitor CPU hardware, memory, I/O devices, user programs; take corrective action',C.white,{width:6560})),
    row(cell('Resource Allocation',C.lightOrange,{width:2800}), cell('Allocate CPU, memory, I/O devices fairly and efficiently among concurrent processes',C.white,{width:6560})),
    row(cell('Accounting',C.lightPurple,{width:2800}), cell('Track which users use which resources — for billing, optimization, auditing',C.white,{width:6560})),
    row(cell('Protection & Security',C.lightPurple,{width:2800}), cell('Prevent processes interfering with each other; protect from unauthorized external access',C.white,{width:6560})),
  ],[2800,6560]),

  new Paragraph({ children:[new PageBreak()] }),
];
