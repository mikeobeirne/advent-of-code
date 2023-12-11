import { readFileSync } from "fs";

const DAY = 2;
const path = `aoc-${DAY}-input.txt`;

let input = readFileSync(path, "utf-8").toString().trim().split("\n");
//input = ["A Y", "B X", "C Z"];

const scoreValues = [1, 2, 3];

let totalScore = 0;

const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const LOSE = 0;
const DRAW = 1;
const WIN = 2;

// A - X (rock)
// B - Y (paper)
// C - Z (scissors)

for (let i = 0; i < input.length; i++) {
  let them = input[i].at(0).charCodeAt(0) - "A".charCodeAt(0);
  let us = input[i].at(2).charCodeAt(0) - "X".charCodeAt(0);
  let who = input[i].at(0);

  let score = scoreValues[us];
  if (them === us) {
    score += 3;
  } else if (
    // Us winning
    (them === ROCK && us === PAPER) ||
    (them === PAPER && us === SCISSORS) ||
    (them === SCISSORS && us === ROCK)
  ) {
    score += 6;
  } else {
    // We lost
    // score += 0
  }
  totalScore += score;
  //console.log(score);
}

console.log("Part 1: Total = ");
console.log(totalScore);

// PART 2 ----

totalScore = 0;
for (let i = 0; i < input.length; i++) {
  let them = input[i].at(0).charCodeAt(0) - "A".charCodeAt(0);
  let us = input[i].at(2).charCodeAt(0) - "X".charCodeAt(0);

  let score = 0;
  if (us === WIN) {
    score = 6 + scoreValues[(them + 1) % 3];
  } else if (us === LOSE) {
    score = scoreValues[(them - 1 + 3) % 3];
  } else {
    // us === DRAW
    score = 3 + scoreValues[them];
  }

  totalScore += score;
  console.log(score);
}

console.log("Part 2: Total = ");
console.log(totalScore);
