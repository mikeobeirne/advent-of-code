"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var DAY = 3;
var path = "aoc-".concat(DAY, "-input.txt");
var input = (0, fs_1.readFileSync)(path, 'utf-8').toString().trim().split('\n');
//Sample input:
/*
input =
[
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];
*/
var findCommon = function (l, r) {
    for (var i = 0; i < l.length; i++) {
        for (var j = 0; j < r.length; j++) {
            if (l.charAt(i) === r.charAt(j)) {
                return l.charAt(i);
            }
        }
    }
    // Failure case
    return null;
};
var score = function (c) {
    var charCode = c.charCodeAt(0);
    if (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) {
        return charCode - 'a'.charCodeAt(0) + 1;
    }
    else {
        return charCode - 'A'.charCodeAt(0) + 27;
    }
};
console.log("Part 1:");
var part1Score = 0;
for (var i = 0; i < input.length; i++) {
    var left = input[i].slice(0, input[i].length / 2);
    var right = input[i].slice(input[i].length / 2);
    var c = findCommon(left, right);
    //console.log(c);
    var s = score(c);
    //console.log(s);
    part1Score += s;
}
console.log(part1Score);
// -------------------- PART 2 --------------------
console.log("Part 2:");
var findCommon3 = function (l, m, r) {
    for (var i = 0; i < l.length; i++) {
        var c = l.charAt(i);
        // If in both other strings, bail
        if (m.indexOf(c) !== -1 && r.indexOf(c) !== -1) {
            return c;
        }
    }
    return null;
};
var p2Score = 0;
for (var i = 0; i < input.length; i += 3) {
    var l = input[i];
    var m = input[i + 1];
    var r = input[i + 2];
    var c = findCommon3(l, m, r);
    p2Score += score(c);
}
console.log(p2Score);
//# sourceMappingURL=aoc-day3.js.map