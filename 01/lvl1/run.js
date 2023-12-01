import fs from 'fs';
import path from 'path';

// advent of code lvl 1
const input = fs.readFileSync(path.join(__dirname, 'input.in'), 'utf8');
const lines = input.split('\n');
const possibleDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let sum = 0;
const map = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};
for (const line of lines) {
  let firstItem = '';
  let firstIndex = null;
  let lastItem = '';
  let lastIndex = null;
  for (const digit of possibleDigits) {
    const ind = line.indexOf(digit);
    if (ind !== -1 && (ind < firstIndex || firstIndex === null)) {
      firstIndex = ind;
      firstItem = digit;
    }
  }
  for (const digit of possibleDigits) {
    const ind = line.lastIndexOf(digit);
    console.log(ind, digit, lastIndex);
    if (ind !== -1 && (ind > lastIndex || lastIndex === null)) {
      lastIndex = ind;
      lastItem = digit;
    }
  }
  console.log(firstItem, lastItem);
  const newString = `${map[firstItem]}${map[lastItem]}`;
  const int = parseInt(newString);
  console.log(int);
  sum += int;
}
console.log(sum);
