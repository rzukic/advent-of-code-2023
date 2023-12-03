import fs, { symlinkSync } from 'fs';
import path from 'path';

// advent of code lvl 1
const input = fs.readFileSync(path.join(__dirname, 'input.in'), 'utf8');
const lines = input.split('\n').filter((line) => line.length > 0);

let numbers = [];

for (let i = 0; i < lines.length; i++) {
  let counting = false;
  let number = '';
  for (let j = 0; j < lines.length; j++) {
    if (!isNaN(lines[i][j])) {
      number += lines[i][j];
      counting = true;
    } else if (counting) {
      numbers.push({
        number: parseInt(number),
        line: i,
        index: j - number.length,
        length: number.length,
      });
      number = '';
      counting = false;
    }
  }
  if (counting) {
    numbers.push({
      number: parseInt(number),
      line: i,
      index: lines[i].length - number.length,
      length: number.length,
    });
    number = '';
    counting = false;
  }
}

let symbols = [];

let sum = 0;

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines.length; j++) {
    if (lines[i][j] == '*') {
      // find adjacent numbers
      let adjacentNumbers = [];
      for (const number of numbers) {
        if (number.line > i + 1 || number.line < i - 1) continue;
        if (j > number.index + number.length || j < number.index - 1) continue;
        adjacentNumbers.push(number);
      }
      if (adjacentNumbers.length !== 2) continue;
      let gearRatio = adjacentNumbers[0].number * adjacentNumbers[1].number;
      sum += gearRatio;
    }
  }
}

console.log(sum);
