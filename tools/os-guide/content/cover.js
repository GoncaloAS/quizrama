/**
 * Conteúdo: Cover
 * Extraído verbatim de os_guide.js (linhas 549-567).
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

];
