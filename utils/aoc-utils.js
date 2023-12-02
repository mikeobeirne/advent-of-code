"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSolution = exports.run = exports.runTest = exports.ProblemParts = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var ProblemParts;
(function (ProblemParts) {
    ProblemParts["One"] = "one";
    ProblemParts["Two"] = "two";
})(ProblemParts = exports.ProblemParts || (exports.ProblemParts = {}));
var readInput = function (path) {
    try {
        return (0, fs_1.readFileSync)(path, 'utf-8').toString().trim().split('\n');
    }
    catch (e) {
        console.log('!!! No file found at ' + path + ' !!!');
        return [];
    }
};
function runTest(sol, part) {
    var testInputPath = (0, path_1.join)(__dirname, "../2023/input/".concat(sol.DAY, "-part-").concat(part, "-test.in"));
    var testInput = readInput(testInputPath);
    console.log("Running test:");
    console.log(part == ProblemParts.One ? sol.partOne(testInput) : sol.partTwo(testInput));
    console.log();
}
exports.runTest = runTest;
function run(sol, part) {
    var inputPath = (0, path_1.join)(__dirname, "../2023/input/".concat(sol.DAY, "-part-").concat(part, ".in"));
    var input = readInput(inputPath);
    console.log("Running solution part ".concat(part, ":"));
    console.log(part == ProblemParts.One ? sol.partOne(input) : sol.partTwo(input));
    console.log();
}
exports.run = run;
function runSolution(sol, part) {
    runTest(sol, part);
    run(sol, part);
}
exports.runSolution = runSolution;
//# sourceMappingURL=aoc-utils.js.map