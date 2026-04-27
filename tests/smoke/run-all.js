#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const tests = fs.readdirSync(DIR)
  .filter(f => f.endsWith('.test.js'))
  .sort();

let failed = 0;
for (const file of tests) {
  process.stdout.write(`▸ ${file} … `);
  try {
    require(path.join(DIR, file));
    console.log('OK');
  } catch (e) {
    failed++;
    console.log('FAIL');
    console.error(`  ${e.message}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} smoke test(s) falharam.`);
  process.exit(1);
}
console.log(`\n${tests.length} smoke tests OK.`);
