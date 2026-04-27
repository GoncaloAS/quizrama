/**
 * Helpers para construir tabelas e caixas decorativas (info / warning / success).
 *
 * `cell` aceita conteúdo string OU array de Paragraph; aplica borda standard
 * (a menos que `opts.border === false`).
 *
 * `hdrCell` — célula de cabeçalho (texto bold sobre fundo de cor).
 * `tbl(rows, colWidths, opts?)` — tabela com larguras explícitas em DXA.
 * `row(...cells)` — atalho para `new TableRow({ children: cells })`.
 *
 * `infoBox` / `warningBox` / `successBox` — Tabelas 1×1 estilizadas com borda
 * superior thick a destacar título.
 */
const {
  Table, TableRow, TableCell,
  WidthType, ShadingType, VerticalAlign, BorderStyle,
} = require('docx');
const { para } = require('./primitives');
const { borders, noBorders, border1 } = require('./primitives');
const { C, b, t } = require('./theme');

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
  const total = colWidths.reduce((a,w)=>a+w, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: colWidths,
    rows,
    ...opts
  });
}

function row(...cells) { return new TableRow({ children: cells }); }

function infoBox(title, content, color=C.lightBlue, titleColor=C.darkBlue) {
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
      children: [para([b(title + '  ', titleColor), t(content)])]
    })] })]
  });
}

const warningBox = (title, content) => infoBox(title, content, C.lightOrange, C.orange);
const successBox = (title, content) => infoBox(title, content, C.lightGreen,  C.green);

module.exports = { cell, hdrCell, tbl, row, infoBox, warningBox, successBox };
