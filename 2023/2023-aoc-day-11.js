"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("../utils/aoc-utils");
var solution_1 = require("../utils/solution");
var Day11_2023 = /** @class */ (function (_super) {
    __extends(Day11_2023, _super);
    function Day11_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 11;
        return _this;
    }
    Day11_2023.prototype.partOne = function (input) {
        // Go over all rows
        var emptyCols = new Array(input[0].length).fill(false);
        var emptyRows = new Array(input.length).fill(false);
        for (var i = 0; i < input.length; i++) {
            var isEmpty = true;
            for (var j = 0; j < input[i].length; j++) {
                if (input[i].charAt(j) !== ".") {
                    isEmpty = false;
                }
            }
            if (isEmpty) {
                emptyRows[i] = true;
            }
        }
        // Go over all cols
        for (var j = 0; j < input[0].length; j++) {
            var isEmpty = true;
            for (var i = 0; i < input.length; i++) {
                if (input[i].charAt(j) !== ".") {
                    isEmpty = false;
                }
            }
            if (isEmpty) {
                emptyCols[j] = true;
            }
        }
        var galaxies = [];
        for (var i = 0; i < input.length; i++) {
            for (var j = 0; j < input.length; j++) {
                if (input[i].charAt(j) === "#") {
                    galaxies.push({ row: i, col: j });
                }
            }
        }
        var ans = 0;
        for (var g1 = 0; g1 < galaxies.length; g1++) {
            for (var g2 = g1 + 1; g2 < galaxies.length; g2++) {
                var galaxyA = galaxies[g1];
                var galaxyB = galaxies[g2];
                var dist = Math.abs(galaxyA.row - galaxyB.row) +
                    Math.abs(galaxyA.col - galaxyB.col);
                // Guaranteed to be gA row <= gB row due to how we sorted
                for (var r = galaxyA.row; r <= galaxyB.row; r++) {
                    if (emptyRows[r]) {
                        dist++;
                        // Part 2: dist += 1000000 - 1;
                    }
                }
                for (var c = Math.min(galaxyA.col, galaxyB.col); c <= Math.max(galaxyA.col, galaxyB.col); c++) {
                    if (emptyCols[c]) {
                        dist++;
                        // Part 2: dist += 1000000 - 1;
                    }
                }
                // console.log("Galaxy " + (g1 + 1) + "-" + (g2 + 1) + " : " + dist);
                ans += dist;
            }
        }
        return ans;
    };
    Day11_2023.prototype.partTwo = function (input) {
        // I was lazy and just inlined the part 2 logic into part 1 since it was so trivial
    };
    return Day11_2023;
}(solution_1.Solution));
var sol = new Day11_2023();
utils.runTest(sol, utils.ProblemParts.One);
utils.run(sol, utils.ProblemParts.One);
utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-11.js.map