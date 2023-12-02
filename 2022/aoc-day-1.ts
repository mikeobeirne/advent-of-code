import { readFileSync } from 'fs';

const DAY = 1;
const path = `aoc-${DAY}-input.txt`;

const input = readFileSync(path, 'utf-8').toString().trim().split('\n');
let calories: number[] = [];
let count = 0;

let i = 0;
console.log(input.length);
while (i < input.length) {
  let line = input[i];
  i = i+1;
  if (line.length == 0) {
    calories.push(count);
    count = 0;
  } else {
    const num: number = parseInt(line);
    count += num;
  }
}
console.log("Part 1:")
calories = calories.sort((a, b) => b - a);
console.log(calories[0]);

console.log("Part 2:");
console.log(calories[0] + calories[1] + calories[2]);
