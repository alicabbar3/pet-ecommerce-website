import fs from 'fs';

const contents = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = contents.split('\n');

let inArray = false;
let startLine = 0;
let arrayLength = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const ') && lines[i].includes(' = [')) {
    inArray = true;
    startLine = i;
  }
  
  if (inArray) {
    if (lines[i].includes('];')) {
      inArray = false;
      if (i - startLine > 50) {
        console.log(`Array from ${startLine + 1} to ${i + 1} (length: ${i - startLine + 1})`);
      }
    }
  }
}
