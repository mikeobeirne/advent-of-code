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
var Day3_2023 = /** @class */ (function (_super) {
    __extends(Day3_2023, _super);
    function Day3_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 3;
        return _this;
    }
    Day3_2023.prototype.partOne = function (input) {
        var _this = this;
        var parts = this.parseParts(input);
        var answer = 0;
        parts = parts.filter(function (p, index) {
            return _this.isAdjacentToSymbol(input, p);
        });
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var p = parts_1[_i];
            answer += p.value;
        }
        return answer;
    };
    Day3_2023.prototype.parseParts = function (input) {
        var parts = [];
        for (var i = 0; i < input.length; i++) {
            var curNum = null;
            var curLeft = null;
            for (var j = 0; j < input[i].length; j++) {
                var isDigit = this.isDigit(input[i].charAt(j));
                // Are we terminating a part?
                if (!isDigit) {
                    if (curNum !== null) {
                        parts = parts.concat({
                            value: curNum,
                            leftBound: curLeft,
                            rightBound: j - 1,
                            row: i,
                        });
                        curNum = null;
                        curLeft = null;
                    }
                }
                else {
                    if (curNum === null) {
                        curLeft = j;
                        curNum = parseInt(input[i].charAt(j));
                    }
                    else {
                        curNum = curNum * 10 + parseInt(input[i].charAt(j));
                    }
                }
            }
            if (curNum !== null) {
                parts = parts.concat({
                    value: curNum,
                    leftBound: curLeft,
                    rightBound: input.length - 1,
                    row: i,
                });
            }
        }
        return parts;
    };
    Day3_2023.prototype.isAdjacentToSymbol = function (input, part) {
        for (var i = part.row - 1; i <= part.row + 1; i++) {
            for (var j = part.leftBound - 1; j <= part.rightBound + 1; j++) {
                if (this.isSymbol(input, i, j)) {
                    return true;
                }
            }
        }
        return false;
    };
    Day3_2023.prototype.isDigit = function (char) {
        return !Number.isNaN(parseInt(char));
    };
    Day3_2023.prototype.isSymbol = function (input, i, j) {
        // If it's out of bounds, bail
        if (i < 0 || j < 0 || i >= input.length || j >= input[i].length) {
            return false;
        }
        var char = input[i].charAt(j);
        if (char === ".") {
            return false;
        }
        // we assume it's a symbol if it's not a number
        return Number.isNaN(parseInt(char));
    };
    Day3_2023.prototype.partTwo = function (input) {
        var _this = this;
        var parts = this.parseParts(input);
        var answer = 0;
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (input[i].charAt(j) === "*") {
                    var adjparts = parts.filter(function (p, index) {
                        var isAdjacent = _this.isPartAdjacent(i, j, p);
                        return isAdjacent;
                    });
                    if (adjparts.length == 2) {
                        answer += adjparts[0].value * adjparts[1].value;
                    }
                }
            };
            for (var j = 0; j < input[i].length; j++) {
                _loop_2(j);
            }
        };
        for (var i = 0; i < input.length; i++) {
            _loop_1(i);
        }
        return answer;
    };
    // Gear at (i, j)
    Day3_2023.prototype.isPartAdjacent = function (i, j, part) {
        var row = part.row;
        for (var col = part.leftBound; col <= part.rightBound; col++) {
            // if (x, y) adjacent to (i, j)
            // (0, 2) -> (1, 3)
            if (Math.abs(col - j) <= 1 && Math.abs(row - i) <= 1) {
                return true;
            }
        }
        return false;
    };
    return Day3_2023;
}(solution_1.Solution));
// utils.runSolution(new Day3_2023(), utils.ProblemParts.One);
utils.runSolution(new Day3_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-3.js.map