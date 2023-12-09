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
/**
 * Notes from this problem:
 */
var Day6_2023 = /** @class */ (function (_super) {
    __extends(Day6_2023, _super);
    function Day6_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 6;
        return _this;
    }
    Day6_2023.prototype.partOne = function (input) {
        var parse = function (line) {
            return line
                .split(":")[1]
                .split(" ")
                .map(function (t) { return parseInt(t); })
                .filter(function (t) { return !Number.isNaN(t); });
        };
        var times = parse(input[0]);
        var distances = parse(input[1]);
        var ans = 1;
        for (var i = 0; i < times.length; i++) {
            var numWaysToWin = 0;
            var time = times[i];
            for (var holdTime = 0; holdTime <= time; holdTime++) {
                var dTraveled = holdTime * (time - holdTime);
                if (dTraveled > distances[i]) {
                    numWaysToWin++;
                }
            }
            ans = ans * numWaysToWin;
        }
        return ans;
    };
    Day6_2023.prototype.partTwo = function (input) {
        var parse = function (line) {
            var nums = line
                .split(":")[1]
                .split(" ")
                .filter(function (t) { return t !== ""; });
            var totalNum = parseInt(nums.join(""));
            return [totalNum];
        };
        var times = parse(input[0]);
        var distances = parse(input[1]);
        console.log(times);
        console.log(distances);
        var ans = 1;
        for (var i = 0; i < times.length; i++) {
            var numWaysToWin = 0;
            var time = times[i];
            for (var holdTime = 0; holdTime <= time; holdTime++) {
                var dTraveled = holdTime * (time - holdTime);
                if (dTraveled > distances[i]) {
                    numWaysToWin++;
                }
            }
            ans = ans * numWaysToWin;
        }
        return ans;
    };
    return Day6_2023;
}(solution_1.Solution));
// utils.runSolution(new Day6_2023(), utils.ProblemParts.One);
utils.runSolution(new Day6_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-6.js.map