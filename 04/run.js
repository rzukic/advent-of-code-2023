import fs, { symlinkSync } from 'fs';
import path from 'path';

// advent of code lvl 1
const input = fs.readFileSync(path.join(__dirname, 'input.in'), 'utf8');
const lines = input.split('\n').filter((line) => line.length > 0);

let cards = lines.map((line) => {
  let x = line.split(':');
  return {
    id: parseInt(x[0].slice(4)),
    game: x[1].split('|').map((y) =>
      y
        .trim()
        .split(' ')
        .map((z) => parseInt(z, 10))
        .filter((z) => !isNaN(z))
    ),
  };
});

console.time('run');

let sum = 0;

let copiedCards = [];

cards = cards.map((card) => {
  const [scratch, wins] = card.game;
  let matches = 0;
  for (const number of scratch) {
    if (wins.includes(number)) {
      matches++;
    }
  }
  return {
    id: card.id,
    matches,
  };
});

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  if (card.matches === 0) continue;
  for (let j = 0; j < card.matches; j++) {
    cards.push(cards[card.id + j]);
  }
  console.log(cards.length);
}

console.timeEnd('run');

console.log(cards.length);
