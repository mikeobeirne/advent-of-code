"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var DAY = 7;
var path = "aoc-".concat(DAY, "-input.txt");
var testPath = "aoc-".concat(DAY, "-input-test.txt");
var input = (0, fs_1.readFileSync)(path, 'utf-8').toString().split('\n');
//input = readFileSync(testPath, 'utf-8').toString().split('\n');
// -------------------- PART 1 --------------------
// -------------------- PART 2 --------------------
var lineNumber = 0;
var answer = [];
while (lineNumber < input.length) {
    var line = input[lineNumber];
    var firstDigit = 0;
    var lastDigit = 0;
    for (var i = 0; i < line.length; i++) {
        var maybeInt = parseInt(line.charAt(i));
        if (!Number.isNaN(maybeInt)) {
            firstDigit = maybeInt;
            break;
        }
    }
    for (var i = line.length - 1; i >= 0; i--) {
        var maybeInt = parseInt(line.charAt(i));
        if (!Number.isNaN(maybeInt)) {
            lastDigit = maybeInt;
            break;
        }
    }
    answer.concat(firstDigit * 10 + lastDigit);
}
var finalAns = answer.reduce(function (partialSum, a) { return partialSum + a; }, 0);
console.log(answer);
console.log(finalAns);
//# sourceMappingURL=aoc-day7.js.map