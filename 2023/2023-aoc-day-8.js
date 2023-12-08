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
var Day8_2023 = /** @class */ (function (_super) {
    __extends(Day8_2023, _super);
    function Day8_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 8;
        return _this;
    }
    Day8_2023.prototype.partOne = function (input) {
        var pattern = input[0];
        var routes = this.parseRoutes(input);
        return this.findZCycleLength(pattern, routes, "AAA", function (place) { return place === "ZZZ"; });
    };
    Day8_2023.prototype.parseRoutes = function (input) {
        var routes = {};
        // This parsing is gross I'm sorry, one
        // day I'll learn to parse with regex properly
        for (var i = 2; i < input.length; i++) {
            var _a = input[i].split("="), start = _a[0], paths = _a[1];
            start = start.trim();
            // (BBB, CCC)
            var _b = paths.split(","), leftPath = _b[0], rightPath = _b[1];
            leftPath = leftPath.split("(")[1].trim();
            rightPath = rightPath.split(")")[0].trim();
            routes[start] = { "L": leftPath, "R": rightPath };
        }
        return routes;
    };
    /**
     * Number of moves it takes to get to ZZZ
     */
    Day8_2023.prototype.findZCycleLength = function (pattern, routes, start, isFinished) {
        var numMoves = 0;
        var curPlace = start;
        var pIndex = 0;
        while (!isFinished(curPlace)) {
            numMoves++;
            curPlace = routes[curPlace][pattern[pIndex]];
            pIndex = (pIndex + 1) % pattern.length;
        }
        return numMoves;
    };
    Day8_2023.prototype.partTwo = function (input) {
        var _this = this;
        var pattern = input[0];
        var routes = this.parseRoutes(input);
        // Gather all of the cycle lengths
        // (aka time to get to the finish)
        var cycleLengths = [];
        for (var place in routes) {
            // If this is a starting place
            if (place.charAt(2) === "A") {
                var cLength = this.findZCycleLength(pattern, routes, place, function (p) { return p.charAt(2) === "Z"; });
                cycleLengths = cycleLengths.concat(cLength);
            }
        }
        cycleLengths = cycleLengths.sort().reverse();
        // Now just find the least common denominator of cycle lengths
        // We leverage the fact that LCM is communtative
        return cycleLengths.reduce(function (lcm, num) { return _this.lcm(lcm, num); });
    };
    // Least Common Multiple
    Day8_2023.prototype.lcm = function (a, b) {
        var lcm = a;
        while (lcm % b !== 0) {
            lcm += a;
        }
        return lcm;
    };
    Day8_2023.prototype.isFinished = function (curPlaces) {
        for (var _i = 0, curPlaces_1 = curPlaces; _i < curPlaces_1.length; _i++) {
            var p = curPlaces_1[_i];
            if (p.charAt(2) !== "Z") {
                return false;
            }
        }
        return true;
    };
    return Day8_2023;
}(solution_1.Solution));
// utils.runSolution(new Day8_2023(), utils.ProblemParts.One);
utils.runSolution(new Day8_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-8.js.map