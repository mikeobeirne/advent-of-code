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
var Day1_2023 = /** @class */ (function (_super) {
    __extends(Day1_2023, _super);
    function Day1_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 1;
        _this.spelledVal = function (line) {
            var lookup = {
                "one": 1,
                "two": 2,
                "three": 3,
                "four": 4,
                "five": 5,
                "six": 6,
                "seven": 7,
                "eight": 8,
                "nine": 9,
            };
            for (var key in lookup) {
                if (line.startsWith(key)) {
                    return lookup[key];
                }
            }
            return null;
        };
        return _this;
    }
    Day1_2023.prototype.partOne = function (input) {
        var answer = [];
        for (var line in input) {
            var firstDigit = 0;
            var lastDigit = 0;
            for (var i = 0; i < line.length; i++) {
                var maybeInt = parseInt(line.charAt(i));
                var maybeSpelled = this.spelledVal(line.substring(i));
                if (maybeSpelled !== null) {
                    firstDigit = maybeSpelled;
                    break;
                }
                else if (!Number.isNaN(maybeInt)) {
                    firstDigit = maybeInt;
                    break;
                }
            }
            for (var i = line.length - 1; i >= 0; i--) {
                var maybeInt = parseInt(line.charAt(i));
                var maybeSpelled = this.spelledVal(line.substring(i));
                if (maybeSpelled !== null) {
                    lastDigit = maybeSpelled;
                    break;
                }
                else if (!Number.isNaN(maybeInt)) {
                    lastDigit = maybeInt;
                    break;
                }
            }
            answer = answer.concat(firstDigit * 10 + lastDigit);
        }
        return answer.reduce(function (partialSum, a) { return partialSum + a; }, 0);
    };
    Day1_2023.prototype.partTwo = function (input) {
        var _this = this;
        var answer = input.map(function (line) {
            var firstDigit = 0;
            var lastDigit = 0;
            for (var i = 0; i < line.length; i++) {
                var maybeInt = parseInt(line.charAt(i));
                var maybeSpelled = _this.spelledVal(line.substring(i));
                if (maybeSpelled !== null) {
                    firstDigit = maybeSpelled;
                    break;
                }
                else if (!Number.isNaN(maybeInt)) {
                    firstDigit = maybeInt;
                    break;
                }
            }
            for (var i = line.length - 1; i >= 0; i--) {
                var maybeInt = parseInt(line.charAt(i));
                var maybeSpelled = _this.spelledVal(line.substring(i));
                if (maybeSpelled !== null) {
                    lastDigit = maybeSpelled;
                    break;
                }
                else if (!Number.isNaN(maybeInt)) {
                    lastDigit = maybeInt;
                    break;
                }
            }
            return firstDigit * 10 + lastDigit;
        });
        return (answer.reduce(function (partialSum, a) { return partialSum + a; }, 0)).toString();
    };
    return Day1_2023;
}(solution_1.Solution));
utils.runSolution(new Day1_2023(), utils.ProblemParts.One);
utils.runSolution(new Day1_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-1%20copy.js.map