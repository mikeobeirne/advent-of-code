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
var Day4_2023 = /** @class */ (function (_super) {
    __extends(Day4_2023, _super);
    function Day4_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 4;
        return _this;
    }
    Day4_2023.prototype.partOne = function (input) {
        var totalAnswer = 0;
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var card = input_1[_i];
            // Cut off 'Card __:'
            card = card.split(":")[1].trim();
            var winners = new Set(card.split("|")[0].trim().split(" "));
            var myNums = card.split("|")[1].trim().split(" ").filter(function (s) { return s !== ''; });
            var power = 0;
            for (var _a = 0, myNums_1 = myNums; _a < myNums_1.length; _a++) {
                var n = myNums_1[_a];
                if (winners.has(n)) {
                    power++;
                }
            }
            var ans = 0;
            if (power !== 0) {
                ans = Math.pow(2, power - 1);
            }
            totalAnswer += ans;
        }
        return totalAnswer;
    };
    Day4_2023.prototype.partTwo = function (input) {
        var cardCounts = (new Array(input.length)).fill(1);
        for (var i = 0; i < input.length; i++) {
            var card = input[i].split(":")[1].trim();
            var winners = new Set(card.split("|")[0].trim().split(" "));
            var myNums = card.split("|")[1].trim().split(" ").filter(function (s) { return s !== ''; });
            var numMatches = 0;
            for (var _i = 0, myNums_2 = myNums; _i < myNums_2.length; _i++) {
                var n = myNums_2[_i];
                if (winners.has(n)) {
                    numMatches++;
                }
            }
            for (var j = i + 1; j < cardCounts.length; j++) {
                if (numMatches > 0) {
                    cardCounts[j] += cardCounts[i];
                    numMatches--;
                }
                else {
                    break;
                }
            }
        }
        console.log(cardCounts);
        var finalAns = cardCounts.reduce(function (curTotal, val) { return curTotal + val; }, 0);
        return finalAns;
    };
    return Day4_2023;
}(solution_1.Solution));
// utils.runSolution(new Day4_2023(), utils.ProblemParts.One);
utils.runSolution(new Day4_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-4.js.map