import fs from 'fs';
import path from 'path';

// advent of code lvl 1
const input = fs.readFileSync(path.join(__dirname, 'input.in'), 'utf8');
const lines = input.split('\n').filter((line) => line.length > 0);

const redcubes = 12;
const greencubes = 13;
const bluecubes = 14;

let games = lines.map((line) => line.split(':')[1].trim());
games = games.map((game) => game.split(';'));
games = games.map((game) => {
  game = game.map((cube) => {
    cube = cube.split(',');
    cube = cube.map((color) => color.trim().split(' ').reverse());
    cube = cube.map((color) => {
      color[1] = parseInt(color[1]);
      return color;
    });
    cube = Object.fromEntries(cube);
    return cube;
  });
  return game;
});

const minimumAmounts = [];

outer: for (let i = 0; i < games.length; i++) {
  const game = games[i];
  let red = 0;
  let green = 0;
  let blue = 0;
  for (const cube of game) {
    if (cube.red > red) {
      console.log(`set red from ${red} to ${cube.red}`);
      red = cube.red;
    }
    if (cube.green > green) {
      console.log(`set green from ${green} to ${cube.green}`);
      green = cube.green;
    }
    if (cube.blue > blue) {
      console.log(`set blue from ${blue} to ${cube.blue}`);
      blue = cube.blue;
    }
  }
  console.log(red, green, blue);
  minimumAmounts.push(red * green * blue);
}

// sum of correct game ids

const sum = minimumAmounts.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
