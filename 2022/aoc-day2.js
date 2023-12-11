"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var DAY = 2;
var path = "aoc-".concat(DAY, "-input.txt");
var input = (0, fs_1.readFileSync)(path, "utf-8").toString().trim().split("\n");
//input = ["A Y", "B X", "C Z"];
var scoreValues = [1, 2, 3];
var totalScore = 0;
var ROCK = 0;
var PAPER = 1;
var SCISSORS = 2;
var LOSE = 0;
var DRAW = 1;
var WIN = 2;
// A - X (rock)
// B - Y (paper)
// C - Z (scissors)
for (var i = 0; i < input.length; i++) {
    var them = input[i].at(0).charCodeAt(0) - "A".charCodeAt(0);
    var us = input[i].at(2).charCodeAt(0) - "X".charCodeAt(0);
    var who = input[i].at(0);
    var score = scoreValues[us];
    if (them === us) {
        score += 3;
    }
    else if (
    // Us winning
    (them === ROCK && us === PAPER) ||
        (them === PAPER && us === SCISSORS) ||
        (them === SCISSORS && us === ROCK)) {
        score += 6;
    }
    else {
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
for (var i = 0; i < input.length; i++) {
    var them = input[i].at(0).charCodeAt(0) - "A".charCodeAt(0);
    var us = input[i].at(2).charCodeAt(0) - "X".charCodeAt(0);
    var score = 0;
    if (us === WIN) {
        score = 6 + scoreValues[(them + 1) % 3];
    }
    else if (us === LOSE) {
        score = scoreValues[(them - 1 + 3) % 3];
    }
    else {
        // us === DRAW
        score = 3 + scoreValues[them];
    }
    totalScore += score;
    console.log(score);
}
console.log("Part 2: Total = ");
console.log(totalScore);
//# sourceMappingURL=aoc-day2.js.map