import { readFileSync } from 'fs';

const DAY = 5;
const path = `aoc-${DAY}-input.txt`;

let input = readFileSync(path, 'utf-8').toString().split('\n');

//Sample input:
/*
input = 
[
"    [D]    ",
"[N] [C]    ",
"[Z] [M] [P]",
" 1   2   3 ",
"",
"move 1 from 2 to 1",
"move 3 from 1 to 3",
"move 2 from 2 to 1",
"move 1 from 1 to 2",
];
*/

// -------------------- PART 1 --------------------
let numCols = (input[0].length + 1) / 4;
console.log("Part 1:");

// Init our state management
let state:  Array<Array<string>> = [];
for (let i = 0; i < numCols;  i++) {
  state.push([]);
}

let instructionsBegin = input.findIndex(s => s.includes("move"));
for (let i = 0; i < instructionsBegin - 2; i++) {
  for (let j = 1; j < input[i].length; j += 4) {
    let letter = input[i].charAt(j);
    let col = Math.floor(j / 4);
    if (letter !== " ") {
      state[col].push(letter);
    }
  }
}
// Gotta reverse 'em because we put them in backwards lolz
for (let i = 0; i < numCols; i++) {
  state[i] = state[i].reverse();
}

// Save a copy for part 2 :)
let initialState: Array<Array<string>> = [];
for (let i = 0; i < state.length; i++) {
  initialState.push([...state[i]]);
}

// Instruction time
for (let i = instructionsBegin; i < input.length; i++) {
  let line = input[i].split(" ");

  let count = parseInt(line[1]);
  let from = parseInt(line[3]) - 1; // 0-indexed
  let to = parseInt(line[5]) - 1;

  for (let x = 0; x < count; x++) {
    state[to].push(state[from].pop());
  }
}
let answer = "";
for (let i = 0; i < state.length; i++) {
  answer += state[i].pop();
}
console.log(answer);


// -------------------- PART 2 --------------------
console.log("Part 2:");

state = initialState;
for (let i = instructionsBegin; i < input.length; i++) {
  let line = input[i].split(" ");

  let count = parseInt(line[1]);
  let from = parseInt(line[3]) - 1; // 0-indexed
  let to = parseInt(line[5]) - 1;

  // Concat the last COUNT
  state[to] = state[to].concat(state[from].slice(state[from].length - count));
  // Remove from original
  for (let x = 0; x < count; x++) {
    state[from].pop();
  }
}
answer = "";
for (let i = 0; i < state.length; i++) {
  answer += state[i].pop();
}
console.log(answer);
