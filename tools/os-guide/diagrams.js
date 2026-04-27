/**
 * Diagramas tabulares — process states, memory layout, Gantt, MLQ, MLFQ,
 * RAG (Resource Allocation Graph), Dining Philosophers, I/O flow, context switch.
 *
 * Cada função devolve um único `Table` pronto a embeber em `Document.sections.children`.
 */
const {
  Table, TableRow, TableCell,
  WidthType, ShadingType, VerticalAlign, AlignmentType,
} = require('docx');
const { C, b, t, mono } = require('./theme');
const { para, spacer, borders, noBorders } = require('./primitives');
const { hdrCell } = require('./tables');

// ─── PROCESS STATE DIAGRAM ──────────────────────────────────────
function processStateDiagram() {
  const stateCell = (label, sub, fill, width) => new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      para([b(label, C.white)], { alignment: AlignmentType.CENTER }),
      para([t(sub, C.white, 8)], { alignment: AlignmentType.CENTER }),
    ]
  });
  const arrowCell = (text, width) => new TableCell({
    borders: noBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: C.white, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 40, right: 40 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      para([t(text, C.darkGray, 8)], { alignment: AlignmentType.CENTER }),
    ]
  });

  const diagramRows = [
    new TableRow({ children: [
      stateCell('NEW', 'Being created', C.darkGray, 1400),
      arrowCell('admitted ──►', 1000),
      stateCell('READY', 'Waiting for CPU', '375623', 1600),
      arrowCell('◄── dispatch\n\npreempt ──►', 1200),
      stateCell('RUNNING', 'Executing', C.medBlue, 1600),
      arrowCell('exit ──►', 900),
      stateCell('TERMINATED', 'Finished', C.red, 1660),
    ]}),
    new TableRow({ children: [
      new TableCell({ borders: noBorders, width:{size:1400,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, children:[para('')] }),
      new TableCell({ borders: noBorders, width:{size:1000,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, children:[para('')] }),
      new TableCell({ borders: noBorders, width:{size:1600,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR},
        children:[para([t('▲ I/O done / event', C.orange, 8)], {alignment:AlignmentType.CENTER})]}),
      new TableCell({ borders: noBorders, width:{size:1200,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR},
        children:[para([t('│', C.orange, 8)], {alignment:AlignmentType.CENTER})]}),
      new TableCell({ borders: noBorders, width:{size:1600,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR},
        children:[para([t('I/O request ▼', C.orange, 8)], {alignment:AlignmentType.CENTER})]}),
      new TableCell({ borders: noBorders, width:{size:900,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, children:[para('')] }),
      new TableCell({ borders: noBorders, width:{size:1660,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, children:[para('')] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ borders: noBorders, width:{size:1400,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, children:[para('')] }),
      new TableCell({ borders: noBorders, width:{size:1000,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, children:[para('')] }),
      new TableCell({ borders: noBorders, width:{size:1600,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR},
        children:[para([t('WAITING', C.white, 9)], {alignment:AlignmentType.CENTER})],
        shading:{fill:C.orange,type:ShadingType.CLEAR} }),
      new TableCell({ borders: noBorders, width:{size:1200,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR},
        children:[para([t('◄─────────────────', C.orange, 9)], {alignment:AlignmentType.CENTER})]}),
      new TableCell({ borders: noBorders, width:{size:1600,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR},
        children:[para([t('(I/O wait, mutex, semaphore)', C.darkGray, 8)], {alignment:AlignmentType.CENTER})]}),
      new TableCell({ borders: noBorders, width:{size:900,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, children:[para('')] }),
      new TableCell({ borders: noBorders, width:{size:1660,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, children:[para('')] }),
    ]}),
  ];
  return new Table({ width:{size:9360,type:WidthType.DXA}, columnWidths:[1400,1000,1600,1200,1600,900,1660], rows: diagramRows });
}

// ─── MEMORY LAYOUT DIAGRAM ──────────────────────────────────────
function memoryLayoutDiagram() {
  const ADDRESS_INFO = {
    'HIGH ADDRESS': 'Max address (e.g. 0xFFFFFFFF)',
    'STACK': 'Function frames, local vars, return addresses\n↓ grows DOWN toward heap',
    '(gap)': 'Unmapped — grows as heap/stack expand',
    'HEAP': 'malloc()/new memory — ↑ grows UP toward stack',
    'DATA (BSS)': 'Uninitialized global/static vars (zeroed at start)',
    'DATA (init)': 'Initialized global/static variables',
    'TEXT (Code)': 'Read-only compiled instructions — shareable between processes',
    'LOW ADDRESS': 'Address 0x00000000 (NULL)',
  };

  const memRow = (label, sublabel, fill, textColor='000000') => new TableRow({ children: [
    new TableCell({
      borders, width:{size:2200,type:WidthType.DXA},
      shading:{fill,type:ShadingType.CLEAR},
      margins:{top:100,bottom:100,left:120,right:120},
      children:[
        para([b(label, textColor)], {alignment:AlignmentType.CENTER}),
        para([t(sublabel, textColor, 8)], {alignment:AlignmentType.CENTER}),
      ]
    }),
    new TableCell({
      borders: noBorders, width:{size:7160,type:WidthType.DXA},
      shading:{fill:C.white,type:ShadingType.CLEAR},
      margins:{top:80,bottom:80,left:180,right:120},
      children:[para([t(ADDRESS_INFO[label] || '', C.darkGray, 9)])]
    }),
  ]});

  return new Table({
    width:{size:9360,type:WidthType.DXA},
    columnWidths:[2200,7160],
    rows:[
      memRow('HIGH ADDRESS','0xFFFFFFFF', C.darkGray, C.white),
      memRow('STACK','↓ grows down', C.skyBlue),
      memRow('(gap)','unmapped space', C.gray),
      memRow('HEAP','↑ grows up', C.lightGreen),
      memRow('DATA (BSS)','uninitialized globals', C.lightOrange),
      memRow('DATA (init)','initialized globals', C.lightOrange),
      memRow('TEXT (Code)','read-only instructions', C.lightPurple),
      memRow('LOW ADDRESS','0x00000000', C.darkGray, C.white),
    ]
  });
}

// ─── GANTT CHART ────────────────────────────────────────────────
function ganttChart(processes, totalWidth=9360) {
  // processes: [{label, burst, fill}]
  const total = processes.reduce((a,p)=>a+p.burst, 0);
  const cols = processes.map(p => Math.round((p.burst/total)*totalWidth));
  // Adjust last to fill exactly
  const diff = totalWidth - cols.reduce((a,w)=>a+w, 0);
  cols[cols.length-1] += diff;

  const processCells = processes.map((p,i) => new TableCell({
    borders,
    width:{size:cols[i],type:WidthType.DXA},
    shading:{fill:p.fill||C.skyBlue,type:ShadingType.CLEAR},
    margins:{top:60,bottom:60,left:60,right:60},
    children:[
      para([b(p.label,C.white)], {alignment:AlignmentType.CENTER}),
      para([t(p.burst+'ms',C.white,8)], {alignment:AlignmentType.CENTER}),
    ]
  }));

  let time = 0;
  const timeLabels = processes.map((p,i) => {
    const label = String(time);
    time += p.burst;
    return new TableCell({
      borders:noBorders, width:{size:cols[i],type:WidthType.DXA},
      shading:{fill:C.white,type:ShadingType.CLEAR},
      margins:{top:40,bottom:40,left:60,right:60},
      children:[para([t(label,C.darkGray,8)])]
    });
  });
  // final time marker (right-aligned)
  timeLabels[timeLabels.length-1] = new TableCell({
    borders:noBorders, width:{size:cols[cols.length-1],type:WidthType.DXA},
    shading:{fill:C.white,type:ShadingType.CLEAR},
    margins:{top:40,bottom:40,left:60,right:60},
    children:[para([t(String(time),C.darkGray,8)], {alignment:AlignmentType.RIGHT})]
  });

  return new Table({
    width:{size:totalWidth,type:WidthType.DXA},
    columnWidths:cols,
    rows:[
      new TableRow({children:processCells}),
      new TableRow({children:timeLabels}),
    ]
  });
}

// ─── MLQ DIAGRAM ────────────────────────────────────────────────
function mlqDiagram() {
  const queueRow = (priority, name, algo, color, example) => new TableRow({ children: [
    new TableCell({ borders, width:{size:700,type:WidthType.DXA}, shading:{fill:color,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:80,right:80},
      children:[para([b('Q'+priority, C.white)], {alignment:AlignmentType.CENTER})] }),
    new TableCell({ borders, width:{size:2200,type:WidthType.DXA}, shading:{fill:color,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:120,right:120},
      children:[para([b(name, C.white)])] }),
    new TableCell({ borders, width:{size:1400,type:WidthType.DXA}, shading:{fill:C.gray,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:120,right:120},
      children:[para([t(algo)])] }),
    new TableCell({ borders, width:{size:5060,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:120,right:120},
      children:[para([t(example,C.darkGray,9)])] }),
  ]});

  return new Table({
    width:{size:9360,type:WidthType.DXA}, columnWidths:[700,2200,1400,5060],
    rows:[
      new TableRow({children:[
        hdrCell('Queue',C.darkBlue,C.white,700),
        hdrCell('Type',C.darkBlue,C.white,2200),
        hdrCell('Algorithm',C.darkBlue,C.white,1400),
        hdrCell('Example Processes',C.darkBlue,C.white,5060),
      ]}),
      queueRow(0,'System / OS', 'Preemptive', '7B1FA2', 'Kernel threads, critical daemons'),
      queueRow(1,'Interactive Foreground', 'Round Robin', '1565C0', 'User apps, GUI processes'),
      queueRow(2,'Interactive Editing', 'Round Robin', '00796B', 'Text editors, IDEs'),
      queueRow(3,'Batch Jobs', 'FCFS', C.orange, 'Compiler runs, data processing'),
      queueRow(4,'Background / Student', 'FCFS', C.darkGray, 'Low-priority background tasks'),
    ]
  });
}

// ─── MLFQ DIAGRAM ───────────────────────────────────────────────
function mlfqDiagram() {
  const qRow = (q, quantum, note, fill) => new TableRow({ children: [
    new TableCell({ borders, width:{size:600,type:WidthType.DXA}, shading:{fill,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:80,right:80},
      children:[para([b(q,C.white)], {alignment:AlignmentType.CENTER})] }),
    new TableCell({ borders, width:{size:1400,type:WidthType.DXA}, shading:{fill:C.gray,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:120,right:120},
      children:[para([t(quantum)])] }),
    new TableCell({ borders, width:{size:7360,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:120,right:120},
      children:[para([t(note,C.darkGray,9)])] }),
  ]});
  return new Table({
    width:{size:9360,type:WidthType.DXA}, columnWidths:[600,1400,7360],
    rows:[
      new TableRow({children:[
        hdrCell('Queue',C.darkBlue,C.white,600),
        hdrCell('Quantum',C.darkBlue,C.white,1400),
        hdrCell('Behavior — a process is DEMOTED if it uses its full quantum without finishing',C.darkBlue,C.white,7360),
      ]}),
      qRow('Q0','8 ms','New processes start here. Short I/O-bound tasks finish quickly and STAY in Q0.','1565C0'),
      qRow('Q1','16 ms','If Q0 quantum expires → move DOWN. More CPU time given.','00796B'),
      qRow('Q2','∞ (FCFS)','If Q1 quantum expires → move DOWN. Long CPU-bound jobs sink here.','375623'),
    ]
  });
}

// ─── DEADLOCK RAG DIAGRAM ───────────────────────────────────────
function deadlockRAGDiagram() {
  return new Table({
    width:{size:9360,type:WidthType.DXA},
    columnWidths:[9360],
    rows:[new TableRow({ children: [new TableCell({
      borders,
      shading:{fill:'F8F8F8',type:ShadingType.CLEAR},
      margins:{top:120,bottom:120,left:200,right:200},
      children:[
        para([b('Resource Allocation Graph — Deadlock Example', C.red)]),
        ...spacer(1),
        para([mono('  Processes:  (P) = circles      Resources:  [R] = rectangles with dots')]),
        para([mono('  Request edge:   Process ──► Resource  (process wants this resource)')]),
        para([mono('  Assignment edge: Resource ──► Process  (resource held by this process)')]),
        ...spacer(1),
        para([mono('  ┌─────────────────────────────────────────────┐')]),
        para([mono('  │                                             │')]),
        para([mono('  │   (P1) ──request──► [R1 ●]                 │')]),
        para([mono('  │    ▲                   │                    │')]),
        para([mono('  │    │              assigned                  │')]),
        para([mono('  │ assigned              ▼                    │')]),
        para([mono('  │ [R2 ●] ◄─assigned─ (P2) ──request──► [R2] │')]),
        para([mono('  │                                             │')]),
        para([mono('  └─────────────────────────────────────────────┘')]),
        ...spacer(1),
        para([b('Cycle: ', C.red), t('P1→R1→P2→R2→P1  →  DEADLOCK (each resource has 1 instance)', C.red)]),
        ...spacer(1),
        para([b('No Cycle = No Deadlock  |  Cycle with single instances = Deadlock  |  Cycle with multiple instances = Possible deadlock', C.darkGray)]),
      ]
    })]})
  ]});
}

// ─── DINING PHILOSOPHERS DIAGRAM ────────────────────────────────
function diningPhilosophersDiagram() {
  return new Table({
    width:{size:9360,type:WidthType.DXA},
    columnWidths:[9360],
    rows:[new TableRow({ children: [new TableCell({
      borders,
      shading:{fill:'F8F8F8',type:ShadingType.CLEAR},
      margins:{top:120,bottom:120,left:200,right:200},
      children:[
        para([b('Dining Philosophers — Circular Table', C.medBlue)]),
        ...spacer(1),
        para([mono('                   P0 (top)')]),
        para([mono('                  /    \\')]),
        para([mono('              C4 /      \\ C0  ← chopstick')]),
        para([mono('              /            \\')]),
        para([mono('         P4 ─               ─ P1')]),
        para([mono('          |    [rice bowl]    |')]),
        para([mono('         P3 ─               ─ P2')]),
        para([mono('              \\            /')]),
        para([mono('              C3 \\      / C1')]),
        para([mono('                  \\    /')]),
        para([mono('                   C2 (bottom)')]),
        ...spacer(1),
        para([mono('  Each philosopher needs BOTH adjacent chopsticks to eat.')]),
        para([mono('  Deadlock: all 5 pick up LEFT chopstick → all wait for RIGHT → circular wait.')]),
        ...spacer(1),
        para([b('Deadlock-free solutions:', C.darkBlue)]),
        para([t('① Allow only N-1 = 4 philosophers to sit at once (semaphore init to 4)')]),
        para([t('② Asymmetric: odd philosophers pick left first; even pick right first')]),
        para([t('③ All-or-nothing: philosopher picks up BOTH chopsticks atomically (monitor)')]),
      ]
    })]})
  ]});
}

// ─── I/O FLOW DIAGRAM ───────────────────────────────────────────
function ioFlowDiagram() {
  const stepRow = (num, actor, action, fill) => new TableRow({ children: [
    new TableCell({ borders, width:{size:400,type:WidthType.DXA}, shading:{fill:C.medBlue,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:60,right:60},
      children:[para([b(num,C.white)], {alignment:AlignmentType.CENTER})] }),
    new TableCell({ borders, width:{size:1800,type:WidthType.DXA}, shading:{fill,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:120,right:120},
      children:[para([b(actor,C.white)])] }),
    new TableCell({ borders, width:{size:7160,type:WidthType.DXA}, shading:{fill:C.white,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:120,right:120},
      children:[para([t(action,C.darkGray,9)])] }),
  ]});
  return new Table({
    width:{size:9360,type:WidthType.DXA}, columnWidths:[400,1800,7160],
    rows:[
      new TableRow({children:[
        hdrCell('#',C.darkBlue,C.white,400),
        hdrCell('Actor',C.darkBlue,C.white,1800),
        hdrCell('Action',C.darkBlue,C.white,7160),
      ]}),
      stepRow('1','Device Driver', 'Writes command parameters (operation, address, byte count) into device controller registers', '1565C0'),
      stepRow('2','Device Controller','Reads registers; begins physical operation (e.g., seek to disk track, start data transfer)','00796B'),
      stepRow('3','Device Controller','Transfers data from physical device into controller\'s local buffer memory','00796B'),
      stepRow('4','Device Controller','Generates hardware interrupt when transfer completes','C55A11'),
      stepRow('5','CPU / OS Kernel','Interrupt handler runs; copies data from controller buffer → main RAM','7B1FA2'),
      stepRow('6','OS Scheduler','Marks waiting process as READY; schedules it to run','1F3864'),
      stepRow('DMA','DMA Controller','(With DMA): Steps 3–5 happen without CPU — controller writes directly to RAM. Only ONE interrupt per full block.','7B0000'),
    ]
  });
}

// ─── CONTEXT SWITCH DIAGRAM ─────────────────────────────────────
function contextSwitchDiagram() {
  return new Table({
    width:{size:9360,type:WidthType.DXA},
    columnWidths:[9360],
    rows:[new TableRow({ children: [new TableCell({
      borders,
      shading:{fill:'F8F8F8',type:ShadingType.CLEAR},
      margins:{top:120,bottom:120,left:200,right:200},
      children:[
        para([b('Context Switch Timeline', C.medBlue)]),
        ...spacer(1),
        para([mono('  Process A (running)         OS Kernel              Process B (ready)')]),
        para([mono('       │                           │                       │')]),
        para([mono('  executing ──── timer interrupt ──►│                       │')]),
        para([mono('       │         1. Save A\'s context │                       │')]),
        para([mono('       │            (PC, regs, SP)   │                       │')]),
        para([mono('       │         2. Write A\'s PCB    │                       │')]),
        para([mono('       │         3. Run scheduler    │                       │')]),
        para([mono('       │         4. Load B\'s PCB     │                       │')]),
        para([mono('       │         5. Restore B\'s regs │◄─── schedule B ───────│')]),
        para([mono('       │                           ──┼──► executing           │')]),
        para([mono('       │                             │       (B resumes       │')]),
        para([mono('       │                             │        where it left)  │')]),
        ...spacer(1),
        para([t('⚠  Context switch time = PURE OVERHEAD (1–10 ms). No useful work happens.', C.orange)]),
        para([t('   The kernel saves: ALL CPU registers + Program Counter + Stack Pointer + Memory info', C.darkGray, 9)]),
      ]
    })]})
  ]});
}

module.exports = {
  processStateDiagram,
  memoryLayoutDiagram,
  ganttChart,
  mlqDiagram,
  mlfqDiagram,
  deadlockRAGDiagram,
  diningPhilosophersDiagram,
  ioFlowDiagram,
  contextSwitchDiagram,
};
