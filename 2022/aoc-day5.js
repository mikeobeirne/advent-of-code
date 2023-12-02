"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var DAY = 5;
var path = "aoc-".concat(DAY, "-input.txt");
var input = (0, fs_1.readFileSync)(path, 'utf-8').toString().split('\n');
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
var numCols = (input[0].length + 1) / 4;
console.log("Part 1:");
// Init our state management
var state = [];
for (var i = 0; i < numCols; i++) {
    state.push([]);
}
var instructionsBegin = input.findIndex(function (s) { return s.includes("move"); });
for (var i = 0; i < instructionsBegin - 2; i++) {
    for (var j = 1; j < input[i].length; j += 4) {
        var letter = input[i].charAt(j);
        var col = Math.floor(j / 4);
        if (letter !== " ") {
            state[col].push(letter);
        }
    }
}
// Gotta reverse 'em because we put them in backwards lolz
for (var i = 0; i < numCols; i++) {
    state[i] = state[i].reverse();
}
// Save a copy for part 2 :)
var initialState = [];
for (var i = 0; i < state.length; i++) {
    initialState.push(__spreadArray([], state[i], true));
}
// Instruction time
for (var i = instructionsBegin; i < input.length; i++) {
    var line = input[i].split(" ");
    var count = parseInt(line[1]);
    var from = parseInt(line[3]) - 1; // 0-indexed
    var to = parseInt(line[5]) - 1;
    for (var x = 0; x < count; x++) {
        state[to].push(state[from].pop());
    }
}
var answer = "";
for (var i = 0; i < state.length; i++) {
    answer += state[i].pop();
}
console.log(answer);
// -------------------- PART 2 --------------------
console.log("Part 2:");
state = initialState;
for (var i = instructionsBegin; i < input.length; i++) {
    var line = input[i].split(" ");
    var count = parseInt(line[1]);
    var from = parseInt(line[3]) - 1; // 0-indexed
    var to = parseInt(line[5]) - 1;
    // Concat the last COUNT
    state[to] = state[to].concat(state[from].slice(state[from].length - count));
    // Remove from original
    for (var x = 0; x < count; x++) {
        state[from].pop();
    }
}
answer = "";
for (var i = 0; i < state.length; i++) {
    answer += state[i].pop();
}
console.log(answer);
//# sourceMappingURL=aoc-day5.js.map