/**
 * Tema do guia — paleta de cores + helpers de TextRun.
 *
 * `b(text, color?)`     — texto a bold em Arial.
 * `t(text, color?, sz?)` — texto normal; tamanho em pt (multiplicado por 2 internamente).
 * `mono(text)`          — texto monoespaçado (Courier New, ~9pt).
 */
const { TextRun } = require('docx');

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

const b    = (text, color)       => new TextRun({ text, bold: true, color: color || '000000', font: 'Arial' });
const t    = (text, color, size) => new TextRun({ text, color: color || '000000', font: 'Arial', size: size ? size*2 : undefined });
const mono = (text)              => new TextRun({ text, font: 'Courier New', size: 18 });

module.exports = { C, b, t, mono };
