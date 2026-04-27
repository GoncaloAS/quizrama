/**
 * Entry-point do gerador do guia.
 *
 * Usa: `npm run build:guide`  (ou `node tools/os-guide/index.js`).
 * Output: `OS_Improved_Study_Guide.docx` na raiz do projecto.
 *
 * Estrutura:
 *   theme.js       — paleta + helpers de TextRun
 *   primitives.js  — para, headings, spacers, borders
 *   tables.js      — cell, hdrCell, tbl, row, info/warning/success boxes
 *   diagrams.js    — diagramas tabulares
 *   content/*.js   — um capítulo por ficheiro, exporta array de blocos
 */
const fs = require('fs');
const {
  Document, Packer, AlignmentType, BorderStyle, LevelFormat,
} = require('docx');
const { C } = require('./theme');

const cover            = require('./content/cover');
const ch1Intro         = require('./content/chapter-01-intro');
const ch2Startup       = require('./content/chapter-02-startup');
const ch3Processes     = require('./content/chapter-03-processes');
const ch4Scheduling    = require('./content/chapter-04-scheduling');
const ch5Sync          = require('./content/chapter-05-sync');
const ch6ClassicalSync = require('./content/chapter-06-classical-sync');
const ch7Deadlocks     = require('./content/chapter-07-deadlocks');
const ch8QuickRef      = require('./content/chapter-08-quick-ref');

const docStyles = {
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
};

const docNumbering = {
  config: [
    { reference:'bullets', levels:[{ level:0, format:LevelFormat.BULLET, text:'•', alignment:AlignmentType.LEFT,
      style:{ paragraph:{ indent:{ left:720, hanging:360 } } } }] },
    { reference:'sub-bullets', levels:[
      { level:0, format:LevelFormat.BULLET, text:'•', alignment:AlignmentType.LEFT, style:{ paragraph:{ indent:{ left:720, hanging:360 } } } },
      { level:1, format:LevelFormat.BULLET, text:'◦', alignment:AlignmentType.LEFT, style:{ paragraph:{ indent:{ left:1080, hanging:360 } } } },
    ]},
  ]
};

const sectionProperties = {
  page: { size:{ width:12240, height:15840 }, margin:{ top:1080, right:1080, bottom:1080, left:1080 } }
};

const doc = new Document({
  styles: docStyles,
  numbering: docNumbering,
  sections: [{
    properties: sectionProperties,
    children: [
      ...cover,
      ...ch1Intro,
      ...ch2Startup,
      ...ch3Processes,
      ...ch4Scheduling,
      ...ch5Sync,
      ...ch6ClassicalSync,
      ...ch7Deadlocks,
      ...ch8QuickRef,
    ]
  }]
});

// Apenas escreve o ficheiro quando corrido directamente — facilita testes
// que façam `require()` sem provocar I/O.
if (require.main === module) {
  Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync('OS_Improved_Study_Guide.docx', buf);
    console.log('Done!');
  }).catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
  });
}

module.exports = doc;
