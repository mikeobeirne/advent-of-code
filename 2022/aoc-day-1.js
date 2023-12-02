"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var DAY = 1;
var path = "aoc-".concat(DAY, "-input.txt");
var input = (0, fs_1.readFileSync)(path, 'utf-8').toString().trim().split('\n');
var calories = [];
var count = 0;
var i = 0;
console.log(input.length);
while (i < input.length) {
    var line = input[i];
    i = i + 1;
    if (line.length == 0) {
        calories.push(count);
        count = 0;
    }
    else {
        var num = parseInt(line);
        count += num;
    }
}
console.log("Part 1:");
calories = calories.sort(function (a, b) { return b - a; });
console.log(calories[0]);
console.log("Part 2:");
console.log(calories[0] + calories[1] + calories[2]);
//# sourceMappingURL=aoc-day-1.js.map