"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var DAY = 6;
var path = "aoc-".concat(DAY, "-input.txt");
var testPath = "aoc-".concat(DAY, "-input-test.txt");
var input = (0, fs_1.readFileSync)(path, 'utf-8').toString().split('\n');
//input = readFileSync(testPath, 'utf-8').toString().split('\n');
// -------------------- PART 1 --------------------
var isUnique = function (lastFour) {
    return !(lastFour[0] === lastFour[1] ||
        lastFour[0] === lastFour[2] ||
        lastFour[0] === lastFour[3] ||
        lastFour[1] === lastFour[2] ||
        lastFour[1] === lastFour[3] ||
        lastFour[2] === lastFour[3]);
};
var solve = function (signal) {
    var buffer = [
        signal.charAt(0),
        signal.charAt(1),
        signal.charAt(2),
        signal.charAt(3),
    ];
    if (isUnique(buffer)) {
        return 4;
    }
    for (var i = 4; i < signal.length; i++) {
        buffer.shift();
        buffer.push(signal.charAt(i));
        if (isUnique(buffer)) {
            return i + 1;
        }
    }
};
for (var i = 0; i < input.length; i++) {
    var signal = input[i];
    var ans = solve(signal);
    console.log(ans);
}
// -------------------- PART 2 --------------------
console.log("Part 2");
// Alright fine, they called me on my BS and I have to write a better 'isUnique' function
var isUniqueV2 = function (freqCount) {
    var a = 'a'.charCodeAt(0);
    for (var c = a; c < a + 26; c++) {
        if (freqCount[c] > 1) {
            return false;
        }
    }
    return true;
};
var solvePartTwo = function (signal) {
    // Build frequency map
    var freq = {};
    var a = 'a'.charCodeAt(0);
    for (var c = a; c < a + 26; c++) {
        freq[c] = 0;
    }
    // Grab the first 14
    for (var i = 0; i < 14; i++) {
        var char = signal.charCodeAt(i);
        freq[char]++;
    }
    if (isUniqueV2(freq)) {
        return 14;
    }
    for (var i = 14; i < signal.length; i++) {
        var dropped = signal.charCodeAt(i - 14);
        var added = signal.charCodeAt(i);
        freq[dropped]--;
        freq[added]++;
        if (isUniqueV2(freq)) {
            return i + 1;
        }
    }
};
for (var i = 0; i < input.length; i++) {
    console.log(solvePartTwo(input[i]));
}
//# sourceMappingURL=aoc-day6.js.map