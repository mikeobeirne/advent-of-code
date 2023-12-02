"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var DAY = 4;
var path = "aoc-".concat(DAY, "-input.txt");
var input = (0, fs_1.readFileSync)(path, 'utf-8').toString().trim().split('\n');
//Sample input:
/*
input =
[
"2-4,6-8",
"2-3,4-5",
"5-7,7-9",
"2-8,3-7",
"6-6,4-6",
"2-6,4-8",
];
*/
// -------------------- PART 1 --------------------
console.log("Part 1:");
var partOneCount = 0;
for (var i = 0; i < input.length; i++) {
    var parts = input[i].split(",");
    var first = parts[0].split("-").map(function (p) { return parseInt(p); });
    var second = parts[1].split("-").map(function (p) { return parseInt(p); });
    var contains = function (a, b) {
        if (a[0] <= b[0] && a[1] >= b[1]) {
            return true;
        }
    };
    if (contains(first, second) || contains(second, first)) {
        partOneCount++;
    }
}
console.log(partOneCount);
// -------------------- PART 2 --------------------
console.log("Part 2:");
var partTwoCount = 0;
for (var i = 0; i < input.length; i++) {
    var parts = input[i].split(",");
    var first = parts[0].split("-").map(function (p) { return parseInt(p); });
    var second = parts[1].split("-").map(function (p) { return parseInt(p); });
    var intersects = function (a, b) {
        // Two possible scenarios
        // |-------|      OR        |------|
        //        |---|           |----|
        // 
        // 
        return (a[1] >= b[0] && a[1] <= b[1]) ||
            (b[1] >= a[0] && b[1] <= a[1]);
    };
    if (intersects(first, second)) {
        partTwoCount++;
    }
}
console.log(partTwoCount);
//# sourceMappingURL=aoc-day4.js.map