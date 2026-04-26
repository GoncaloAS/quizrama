const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak, TableOfContents, VerticalAlign
} = require('docx');
const fs = require('fs');

// ─── Color palette ───
const C = {
  darkBlue:   '1F3864',
  medBlue:    '2E75B6',
  lightBlue:  'DEEAF1',
  skyBlue:    'BDD7EE', 
  green:      '375623',
  lightGreen: 'E2EFDA',
  orange:     'C55A11',
  lightOrange:'FCE4D6',
  purple:     '4B2766',
  lightPurple:'EAD1F5',
  red:        '7B0000',
  lightRed:   'FFE7E7',
  yellow:     'FFF2CC',
  gray:       'F2F2F2',
  darkGray:   '595959',
  white:      'FFFFFF',
};

// ─── Helpers ───
const b = (text, color) => new TextRun({ text, bold: true, color: color || '000000', font: 'Arial' });
const t = (text, color, size) => new TextRun({ text, color: color || '000000', font: 'Arial', size: size ? size*2 : undefined });
const mono = (text) => new TextRun({ text, font: 'Courier New', size: 18 });

function para(children, opts = {}) {
  const arr = Array.isArray(children) ? children : [typeof children === 'string' ? t(children) : children];
  return new Paragraph({ children: arr, ...opts });
}

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, font: 'Arial', size: 36, color: C.darkBlue })],
    spacing: { before: 360, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.medBlue, space: 4 } }
  });
}
function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, font: 'Arial', size: 28, color: C.medBlue })],
    spacing: { before: 240, after: 80 }
  });
}
function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true, font: 'Arial', size: 22, color: C.darkGray })],
    spacing: { before: 160, after: 60 }
  });
}
function spacer(n=1) {
  return Array.from({length:n}, ()=>new Paragraph({ children:[t('')], spacing:{before:0,after:0} }));
}

// Standard border
const border1 = { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA' };
const borders = { top: border1, bottom: border1, left: border1, right: border1 };
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function cell(content, fill, opts = {}) {
  const cellBorder = opts.border === false ? noBorders : borders;
  const children = Array.isArray(content) ? content : [para(content)];
  return new TableCell({
    borders: cellBorder,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: opts.vAlign || VerticalAlign.CENTER,
    columnSpan: opts.span,
    children
  });
}

function hdrCell(text, fill='1F3864', textColor='FFFFFF', width) {
  return new TableCell({
    borders,
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [para([b(text, textColor)])],
  });
}

function tbl(rows, colWidths, opts={}) {
  const total = colWidths.reduce((a,b)=>a+b,0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: colWidths,
    rows,
    ...opts
  });
}

function row(...cells) { return new TableRow({ children: cells }); }

// ─── Info box ───
function infoBox(title, content, color=C.lightBlue, titleColor=C.darkBlue) {
  const children = [
    para([b(title + '  ', titleColor), t(content)]),
  ];
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({ children: [new TableCell({
      borders: {
        top: { style: BorderStyle.THICK, size: 12, color: titleColor },
        bottom: border1, left: border1, right: border1
      },
      shading: { fill: color, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 180, right: 180 },
      children
    })] })]
  });
}

function warningBox(title, content) {
  return infoBox(title, content, C.lightOrange, C.orange);
}
function successBox(title, content) {
  return infoBox(title, content, C.lightGreen, C.green);
}

// ═══════════════════════════════════════════════════════════
// PROCESS STATE DIAGRAM (table-based)
// ═══════════════════════════════════════════════════════════
function processStateDiagram() {
  // Visual state diagram using a table grid
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

  // Row 1: [NEW] --> [READY] --> [RUNNING] --> [TERMINATED]
  // Row 2:                   <-- [WAITING] <--
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

// ═══════════════════════════════════════════════════════════
// MEMORY LAYOUT DIAGRAM
// ═══════════════════════════════════════════════════════════
function memoryLayoutDiagram() {
  const memRow = (label, sublabel, fill, textColor='000000') => new TableRow({ children: [
    new TableCell({
      borders, width:{size:2200,type:WidthType.DXA},
      shading:{fill,type:ShadingType.CLEAR},
      margins:{top:100,bottom:100,left:120,right:120},
      children:[
        para([b(label, textColor)],{alignment:AlignmentType.CENTER}),
        para([t(sublabel, textColor, 8)],{alignment:AlignmentType.CENTER}),
      ]
    }),
    new TableCell({
      borders: noBorders, width:{size:7160,type:WidthType.DXA},
      shading:{fill:C.white,type:ShadingType.CLEAR},
      margins:{top:80,bottom:80,left:180,right:120},
      children:[para([t(addressInfo(label), C.darkGray, 9)])]
    }),
  ]});

  function addressInfo(label) {
    const map = {
      'HIGH ADDRESS': 'Max address (e.g. 0xFFFFFFFF)',
      'STACK': 'Function frames, local vars, return addresses\n↓ grows DOWN toward heap',
      '(gap)': 'Unmapped — grows as heap/stack expand',
      'HEAP': 'malloc()/new memory — ↑ grows UP toward stack',
      'DATA (BSS)': 'Uninitialized global/static vars (zeroed at start)',
      'DATA (init)': 'Initialized global/static variables',
      'TEXT (Code)': 'Read-only compiled instructions — shareable between processes',
      'LOW ADDRESS': 'Address 0x00000000 (NULL)',
    };
    return map[label] || '';
  }

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

// ═══════════════════════════════════════════════════════════
// GANTT CHART helpers
// ═══════════════════════════════════════════════════════════
function ganttChart(processes, totalWidth=9360) {
  // processes: [{label, burst, fill}]
  const total = processes.reduce((a,b)=>a+b.burst,0);
  const cols = processes.map(p => Math.round((p.burst/total)*totalWidth));
  // Adjust last to fill exactly
  const diff = totalWidth - cols.reduce((a,b)=>a+b,0);
  cols[cols.length-1] += diff;

  const processCells = processes.map((p,i) => new TableCell({
    borders,
    width:{size:cols[i],type:WidthType.DXA},
    shading:{fill:p.fill||C.skyBlue,type:ShadingType.CLEAR},
    margins:{top:60,bottom:60,left:60,right:60},
    children:[
      para([b(p.label,C.white)],{alignment:AlignmentType.CENTER}),
      para([t(p.burst+'ms',C.white,8)],{alignment:AlignmentType.CENTER}),
    ]
  }));

  // time markers
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
  // add final time marker
  timeLabels[timeLabels.length-1] = new TableCell({
    borders:noBorders, width:{size:cols[cols.length-1],type:WidthType.DXA},
    shading:{fill:C.white,type:ShadingType.CLEAR},
    margins:{top:40,bottom:40,left:60,right:60},
    children:[para([t(String(time),C.darkGray,8)],{alignment:AlignmentType.RIGHT})]
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

// ═══════════════════════════════════════════════════════════
// MLQ DIAGRAM
// ═══════════════════════════════════════════════════════════
function mlqDiagram() {
  const queueRow = (priority, name, algo, color, example) => new TableRow({ children: [
    new TableCell({ borders, width:{size:700,type:WidthType.DXA}, shading:{fill:color,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:80,right:80},
      children:[para([b('Q'+priority, C.white)],{alignment:AlignmentType.CENTER})] }),
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

// ═══════════════════════════════════════════════════════════
// MLFQ DIAGRAM
// ═══════════════════════════════════════════════════════════
function mlfqDiagram() {
  const qRow = (q, quantum, note, fill) => new TableRow({ children: [
    new TableCell({ borders, width:{size:600,type:WidthType.DXA}, shading:{fill,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:80,right:80},
      children:[para([b(q,C.white)],{alignment:AlignmentType.CENTER})] }),
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

// ═══════════════════════════════════════════════════════════
// DEADLOCK RAG DIAGRAM (text-based)
// ═══════════════════════════════════════════════════════════
function deadlockRAGDiagram() {
  const ragText = [
    '  P1 ──────request──────► R1 ●',
    '   ▲                        │',
    '   │                   assigned',
    '   │                        │',
    '  R2 ●◄──────assigned──── P2',
    '        ◄──────request────── P2',
    '',
    '  Cycle detected: P1→R1→P2→R2→P1  ←  DEADLOCK (single-instance resources)',
  ].join('\n');

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

// ═══════════════════════════════════════════════════════════
// DINING PHILOSOPHERS DIAGRAM
// ═══════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════
// IO OPERATION FLOW DIAGRAM
// ═══════════════════════════════════════════════════════════
function ioFlowDiagram() {
  const stepRow = (num, actor, action, fill) => new TableRow({ children: [
    new TableCell({ borders, width:{size:400,type:WidthType.DXA}, shading:{fill:C.medBlue,type:ShadingType.CLEAR}, margins:{top:80,bottom:80,left:60,right:60},
      children:[para([b(num,C.white)],{alignment:AlignmentType.CENTER})] }),
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

// ═══════════════════════════════════════════════════════════
// CONTEXT SWITCH DIAGRAM
// ═══════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════
// DOCUMENT ASSEMBLY
// ═══════════════════════════════════════════════════════════
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      { id:'Heading1', name:'Heading 1', basedOn:'Normal', next:'Normal', quickFormat:true,
        run:{ size:36, bold:true, font:'Arial', color:C.darkBlue },
        paragraph:{ spacing:{ before:360, after:120 }, outlineLevel:0 } },
      { id:'Heading2', name:'Heading 2', basedOn:'Normal', next:'Normal', quickFormat:true,
        run:{ size:28, bold:true, font:'Arial', color:C.medBlue },
        paragraph:{ spacing:{ before:240, after:80 }, outlineLevel:1 } },
      { id:'Heading3', name:'Heading 3', basedOn:'Normal', next:'Normal', quickFormat:true,
        run:{ size:22, bold:true, font:'Arial', color:C.darkGray },
        paragraph:{ spacing:{ before:160, after:60 }, outlineLevel:2 } },
    ]
  },
  numbering: {
    config: [
      { reference:'bullets', levels:[{ level:0, format:LevelFormat.BULLET, text:'•', alignment:AlignmentType.LEFT,
        style:{ paragraph:{ indent:{ left:720, hanging:360 } } } }] },
      { reference:'sub-bullets', levels:[
        { level:0, format:LevelFormat.BULLET, text:'•', alignment:AlignmentType.LEFT, style:{ paragraph:{ indent:{ left:720, hanging:360 } } } },
        { level:1, format:LevelFormat.BULLET, text:'◦', alignment:AlignmentType.LEFT, style:{ paragraph:{ indent:{ left:1080, hanging:360 } } } },
      ]},
    ]
  },
  sections: [{
    properties: {
      page: { size:{ width:12240, height:15840 }, margin:{ top:1080, right:1080, bottom:1080, left:1080 } }
    },
    children: [
      // ─── COVER ───
      ...spacer(4),
      new Paragraph({ children:[b('OPERATING SYSTEMS', C.darkBlue)], alignment:AlignmentType.CENTER, spacing:{before:0,after:0},
        run:{ size:56, bold:true, font:'Arial', color:C.darkBlue } }),
      ...spacer(1),
      new Paragraph({ children:[new TextRun({text:'Complete Study Guide  2025 / 2026', bold:true, size:36, font:'Arial', color:C.medBlue})], alignment:AlignmentType.CENTER }),
      ...spacer(1),
      new Paragraph({ children:[t('Chapters 1–2  •  Processes  •  Scheduling  •  Synchronization  •  Deadlocks', C.darkGray)], alignment:AlignmentType.CENTER }),
      ...spacer(1),
      new Paragraph({ children:[t('Based on: Operating System Concepts, 10th Edition', C.darkGray, 9)], alignment:AlignmentType.CENTER }),
      new Paragraph({ children:[t('Silberschatz, Galvin & Gagne  •  Wiley', C.darkGray, 9)], alignment:AlignmentType.CENTER }),
      ...spacer(2),
      tbl([row(
        cell([para([b('✅  Complete Theory Coverage'),t('\n'),t('All core OS topics from Chapters 1–7')])], C.lightBlue, {width:3020}),
        cell([para([b('📊  Visual Diagrams'),t('\n'),t('Process states, memory layout, Gantt charts, RAG')])], C.lightGreen, {width:3020}),
        cell([para([b('⚡  Exam-Ready'),t('\n'),t('Quick-reference tables + cheat sheets per chapter')])], C.lightOrange, {width:3320}),
      )],[3020,3020,3320]),
      new Paragraph({ children:[new PageBreak()] }),

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
        row(hdrCell('Mode',C.green,C.white,2000), hdrCell('Access Level',C.green,C.white,2640), hdrHead('Capabilities',C.green,C.white,2640)),
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
        row(hdrCell('Transition',C.darkBlue,C.white,2600), hdrHead('Trigger',C.darkBlue,C.white,6760)),
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
        row(hdrCell('Syscall',C.darkBlue,C.white,1800), hdrCell('What It Does',C.darkBlue,C.white,4000), hdrHead('Return Value',C.darkBlue,C.white,3560)),
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
        row(hdrCell('Concept',C.darkBlue,C.white,2200), hdrCell('What It Is',C.darkBlue,C.white,3600), hdrHead('Risk & Fix',C.darkBlue,C.white,3560)),
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
        row(hdrCell('Feature',C.medBlue,C.white,2000), hdrCell('Message Passing',C.medBlue,C.white,2640), hdrHead('Shared Memory',C.medBlue,C.white,2640)),
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
        row(hdrCell('Step',C.orange,C.white,2000), hdrCell('Process A',C.orange,C.white,3640), hdrHead('Process B',C.orange,C.white,3640)),
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
        row(hdrCell('Variation',C.darkBlue,C.white,2400), hdrCell('Who Wins?',C.darkBlue,C.white,2400), hdrHead('Starvation Risk',C.darkBlue,C.white,4560)),
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
        row(hdrCell('Graph State',C.darkBlue,C.white,3600), hdrHead('Deadlock Conclusion',C.darkBlue,C.white,5760)),
        row(cell('No cycle anywhere',C.lightGreen,{width:3600}), cell([para([b('No deadlock — guaranteed',C.green)])],C.lightGreen,{width:5760})),
        row(cell('Cycle exists; all resource types have 1 instance',C.lightRed,{width:3600}), cell([para([b('Deadlock — guaranteed',C.red)])],C.lightRed,{width:5760})),
        row(cell('Cycle exists; some resource types have multiple instances',C.lightOrange,{width:3600}), cell('Deadlock POSSIBLE but not certain — depends on non-cycle allocations',C.white,{width:5760})),
      ],[3600,5760]),

      heading2('7.3 Deadlock Handling Strategies'),
      tbl([
        row(hdrCell('Strategy',C.darkBlue,C.white,2000), hdrCell('Approach',C.darkBlue,C.white,4000), hdrHead('Cost / Tradeoff',C.darkBlue,C.white,3360)),
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
        row(hdrCell('Method',C.darkBlue,C.white,2400), hdrCell('Process Termination',C.darkBlue,C.white,3480), hdrHead('Resource Preemption',C.darkBlue,C.white,3480)),
        row(cell([para([b('Options')])],C.gray,{width:2400}),
          cell('① Abort ALL deadlocked processes (simple, guaranteed). ② Abort ONE at a time until cycle broken.',C.lightBlue,{width:3480}),
          cell('Forcibly take resources from victims; rollback to checkpoint; restart.',C.lightGreen,{width:3480})),
        row(cell([para([b('Victim Selection')])],C.gray,{width:2400}),
          cell('Minimize cost: priority, how long running, resources held, remaining need, interactive vs batch',C.white,{width:3480}),
          cell('Same factors. Must prevent starvation: track rollback count in cost function.',C.white,{width:3480})),
      ],[2400,3480,3480]),

      new Paragraph({ children:[new PageBreak()] }),

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
        row(hdrCell('Transition',C.darkBlue,C.white,2600), hdrCell('Trigger',C.darkBlue,C.white,3600), hdrHead('Notes',C.darkBlue,C.white,3160)),
        row(cell('New → Ready',C.lightGreen,{width:2600}), cell('OS admits process',C.white,{width:3600}), cell('All resources allocated except CPU',C.white,{width:3160})),
        row(cell('Ready → Running',C.lightGreen,{width:2600}), cell('Scheduler dispatches',C.white,{width:3600}), cell('One per CPU at a time',C.white,{width:3160})),
        row(cell('Running → Ready',C.lightOrange,{width:2600}), cell('Timer interrupt / preemption',C.white,{width:3600}), cell('Process still wants to run',C.white,{width:3160})),
        row(cell('Running → Waiting',C.lightOrange,{width:2600}), cell('I/O request, wait(), mutex block',C.white,{width:3600}), cell('Process voluntarily yields CPU',C.white,{width:3160})),
        row(cell('Waiting → Ready',C.lightBlue,{width:2600}), cell('I/O complete, signal, mutex available',C.white,{width:3600}), cell('CANNOT go directly to Running',C.white,{width:3160})),
        row(cell('Running → Terminated',C.lightRed,{width:2600}), cell('exit(), end of main()',C.white,{width:3600}), cell('PCB may remain as zombie',C.white,{width:3160})),
      ],[2600,3600,3160]),

      heading2('UNIX/Linux Process System Calls'),
      tbl([
        row(hdrCell('Call',C.darkBlue,C.white,1800), hdrCell('What It Does',C.darkBlue,C.white,4560), hdrHead('Returns',C.darkBlue,C.white,3000)),
        row(cell([para([b('fork()')])],C.lightBlue,{width:1800}), cell('Creates child — exact copy of parent. Both continue from instruction after fork()',C.white,{width:4560}), cell('0 to child; child PID to parent; -1 on error',C.white,{width:3000})),
        row(cell([para([b('exec()')])],C.lightGreen,{width:1800}), cell('Replaces process image with new program. PID and PCB unchanged.',C.white,{width:4560}), cell('Never returns on success; -1 on error',C.white,{width:3000})),
        row(cell([para([b('exit(status)')])],C.lightOrange,{width:1800}), cell('Terminates calling process; releases all resources',C.white,{width:4560}), cell('Does not return',C.white,{width:3000})),
        row(cell([para([b('wait(&status)')])],C.lightPurple,{width:1800}), cell('Parent blocks until a child terminates; prevents zombies',C.white,{width:4560}), cell('PID of terminated child',C.white,{width:3000})),
        row(cell([para([b('pipe(fd[2])')])],C.gray,{width:1800}), cell('Creates communication pipe. fd[0]=read end, fd[1]=write end',C.white,{width:4560}), cell('0 on success',C.white,{width:3000})),
      ],[1800,4560,3000]),

      heading2('Synchronization Primitives Comparison'),
      tbl([
        row(hdrCell('Primitive',C.darkBlue,C.white,2000), hdrCell('Mechanism',C.darkBlue,C.white,2800), hdrCell('Bounded Waiting?',C.darkBlue,C.white,1800), hdrHead('Best Use Case',C.darkBlue,C.white,2760)),
        row(cell('Spinlock',C.lightOrange,{width:2000}), cell('Busy-wait loop on atomic instruction',C.white,{width:2800}), cell('No (basic form)',C.lightRed,{width:1800}), cell('Short CS on multiprocessor',C.white,{width:2760})),
        row(cell('Blocking Mutex',C.lightGreen,{width:2000}), cell('Queue + suspend()',C.white,{width:2800}), cell([para([b('Yes (FIFO)')])],C.lightGreen,{width:1800}), cell('General mutual exclusion',C.white,{width:2760})),
        row(cell('Binary Semaphore',C.lightBlue,{width:2000}), cell('wait()/signal(), value 0 or 1',C.white,{width:2800}), cell([para([b('Yes')])],C.lightGreen,{width:1800}), cell('Mutual exclusion, signaling',C.white,{width:2760})),
        row(cell('Counting Semaphore',C.lightBlue,{width:2000}), cell('wait()/signal(), value 0 to N',C.white,{width:2800}), cell([para([b('Yes')])],C.lightGreen,{width:1800}), cell('Resource pool of N instances',C.white,{width:2760})),
        row(cell('Peterson\'s',C.gray,{width:2000}), cell('Software: turn + flag[]',C.white,{width:2800}), cell([para([b('Yes')])],C.lightGreen,{width:1800}), cell('2-process teaching example',C.white,{width:2760})),
      ],[2000,2800,1800,2760]),

      heading2('Deadlock: Four Conditions & Prevention'),
      tbl([
        row(hdrCell('Condition',C.red,C.white,2400), hdrCell('How It Enables Deadlock',C.red,C.white,3480), hdrHead('Prevention Strategy',C.red,C.white,3480)),
        row(cell('Mutual Exclusion',C.lightRed,{width:2400}), cell('Resources exclusively held',C.white,{width:3480}), cell('Make resources sharable (often infeasible)',C.white,{width:3480})),
        row(cell('Hold and Wait',C.lightRed,{width:2400}), cell('Process waits while holding resources',C.white,{width:3480}), cell('Request all resources upfront; release all before requesting more',C.white,{width:3480})),
        row(cell('No Preemption',C.lightRed,{width:2400}), cell('Can\'t forcibly reclaim resources',C.white,{width:3480}), cell('Allow OS to preempt resources (limited applicability)',C.white,{width:3480})),
        row(cell('Circular Wait',C.lightRed,{width:2400}), cell('Circular dependency chain forms',C.white,{width:3480}), cell('Total ordering of resource types; always request in increasing order',C.white,{width:3480})),
      ],[2400,3480,3480]),

      heading2('Scheduling Algorithms Summary'),
      tbl([
        row(hdrCell('Algorithm',C.darkBlue,C.white,1600), hdrCell('Type',C.darkBlue,C.white,1200), hdrCell('Optimal For',C.darkBlue,C.white,2200), hdrCell('Key Pro',C.darkBlue,C.white,2200), hdrHead('Key Con',C.darkBlue,C.white,2160)),
        row(cell('FCFS',C.gray,{width:1600}), cell('Non-preemptive',C.white,{width:1200}), cell('Nothing',C.white,{width:2200}), cell('Simplest',C.white,{width:2200}), cell('Convoy effect',C.white,{width:2160})),
        row(cell('Round Robin',C.gray,{width:1600}), cell('Preemptive',C.white,{width:1200}), cell('Response time',C.white,{width:2200}), cell('Fair; interactive',C.white,{width:2200}), cell('High turnaround',C.white,{width:2160})),
        row(cell('SJF',C.gray,{width:1600}), cell('Non-preemptive',C.white,{width:1200}), cell('Avg wait time',C.white,{width:2200}), cell('Provably optimal',C.white,{width:2200}), cell('Needs future knowledge',C.white,{width:2160})),
        row(cell('SRTF',C.gray,{width:1600}), cell('Preemptive',C.white,{width:1200}), cell('Avg wait (preemptive)',C.white,{width:2200}), cell('Best avg wait',C.white,{width:2200}), cell('Most preemptions',C.white,{width:2160})),
        row(cell('Priority',C.gray,{width:1600}), cell('Both',C.white,{width:1200}), cell('Priority classes',C.white,{width:2200}), cell('Flexible',C.white,{width:2200}), cell('Starvation risk',C.white,{width:2160})),
        row(cell('MLQ',C.gray,{width:1600}), cell('Both',C.white,{width:1200}), cell('Fixed process types',C.white,{width:2200}), cell('Low overhead',C.white,{width:2200}), cell('Inflexible',C.white,{width:2160})),
        row(cell('MLFQ',C.gray,{width:1600}), cell('Preemptive',C.white,{width:1200}), cell('General use',C.white,{width:2200}), cell('Adaptive',C.white,{width:2200}), cell('Complex tuning',C.white,{width:2160})),
        row(cell('CFS',C.gray,{width:1600}), cell('Preemptive',C.white,{width:1200}), cell('Fairness',C.white,{width:2200}), cell('Very fair; O(log n)',C.white,{width:2200}), cell('Not real-time',C.white,{width:2160})),
      ],[1600,1200,2200,2200,2160]),
    ]
  }]
});

// Fix missing helper
function hdrHead(text, fill='1F3864', textColor='FFFFFF', width) {
  return hdrCell(text, fill, textColor, width);
}

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('OS_Improved_Study_Guide.docx', buf);
  console.log('Done!');
}).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});

