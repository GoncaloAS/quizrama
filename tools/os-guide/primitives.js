/**
 * Primitivas — parágrafos, headings, espaçadores e estilos de borda.
 */
const { Paragraph, TextRun, HeadingLevel, BorderStyle } = require('docx');
const { C, t } = require('./theme');

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
  return Array.from({length:n}, () => new Paragraph({ children:[t('')], spacing:{before:0, after:0} }));
}

const border1   = { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA' };
const borders   = { top: border1, bottom: border1, left: border1, right: border1 };
const noBorder  = { style: BorderStyle.NONE,   size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder,  bottom: noBorder,  left: noBorder,  right: noBorder  };

module.exports = { para, heading1, heading2, heading3, spacer, border1, borders, noBorders };
