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
var Day2_2023 = /** @class */ (function (_super) {
    __extends(Day2_2023, _super);
    function Day2_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 2;
        return _this;
    }
    Day2_2023.prototype.partOne = function (input) {
        var ans = 0;
        for (var idx in input) {
            var game = input[idx];
            var maxPossible = this.gameToMaximum(game);
            // console.log(game);
            // console.log(maxPossible);
            if (maxPossible.red <= 12 && maxPossible.green <= 13 && maxPossible.blue <= 14) {
                // console.log("Possible");
                ans += (Number.parseInt(idx) + 1);
            }
            else {
                // console.log("Not possible");
            }
        }
        return ans.toString();
    };
    Day2_2023.prototype.gameToMaximum = function (game) {
        game = game.split(":")[1].trim(); // Chop off 'Game:'
        var maxPossible = {
            "blue": 0,
            "red": 0,
            "green": 0,
        };
        var rounds = game.split(";");
        // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        for (var _i = 0, rounds_1 = rounds; _i < rounds_1.length; _i++) {
            var r = rounds_1[_i];
            var max = this.roundToMaximum(r);
            for (var c in maxPossible) {
                maxPossible[c] = Math.max(maxPossible[c], max[c]);
            }
        }
        return maxPossible;
    };
    // 1 blue, 2 green; ==> {"blue": 1, "green": 2, "red": 0}
    Day2_2023.prototype.roundToMaximum = function (round) {
        var max = {
            "blue": 0,
            "red": 0,
            "green": 0,
        };
        for (var _i = 0, _a = round.split(","); _i < _a.length; _i++) {
            var cube = _a[_i];
            cube = cube.trim();
            var amount = Number.parseInt(cube.split(" ")[0]);
            var color = cube.split(" ")[1];
            max[color] = Math.max(max[color], amount);
        }
        return max;
    };
    Day2_2023.prototype.partTwo = function (input) {
        var ans = 0;
        for (var idx in input) {
            var game = input[idx];
            var maxPossible = this.gameToMaximum(game);
            // console.log(game);
            // console.log(maxPossible);
            var power = maxPossible.blue * maxPossible.green * maxPossible.red;
            ans += power;
        }
        return ans.toString();
    };
    return Day2_2023;
}(solution_1.Solution));
// utils.runSolution(new Day2_2023(), utils.ProblemParts.One);
utils.runSolution(new Day2_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-2.js.map