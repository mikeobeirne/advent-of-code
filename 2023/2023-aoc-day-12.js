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
var Day12_2023 = /** @class */ (function (_super) {
    __extends(Day12_2023, _super);
    function Day12_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 12;
        return _this;
    }
    Day12_2023.prototype.partOne = function (input) {
        var ans = 0;
        for (var i = 0; i < input.length; i++) {
            var _a = input[i].split(" "), map = _a[0], toParse = _a[1];
            var order = toParse.split(",").map(function (num) { return parseInt(num); });
            ans += this.numValidCombos(map, order);
        }
        return ans;
    };
    Day12_2023.prototype.numValidCombos = function (map, order) {
        var _this = this;
        // Option 1: Generate all combos that fit x,y,z and retroactively check them
        var allCombos = this.backtrack("", map);
        allCombos = allCombos.filter(function (c) { return _this.validate(c, order); });
        return allCombos.length;
    };
    // Generate all possible combinations (adhering to the map), we'll
    // check them later
    Day12_2023.prototype.backtrack = function (curString, map) {
        if (curString.length === map.length) {
            return [curString];
        }
        var ans = [];
        var nextIndex = curString.length;
        // If a wildcard, try both
        if (map.charAt(nextIndex) === "?") {
            return ans.concat(this.backtrack(curString + ".", map), this.backtrack(curString + "#", map));
        }
        else {
            return this.backtrack(curString + map.charAt(nextIndex), map);
        }
    };
    Day12_2023.prototype.validate = function (pattern, order) {
        var thisOrder = [];
        var curStreak = 0;
        for (var i = 0; i < pattern.length; i++) {
            if (pattern.charAt(i) === ".") {
                thisOrder.push(curStreak);
                curStreak = 0;
            }
            else {
                curStreak++;
            }
        }
        thisOrder.push(curStreak);
        thisOrder = thisOrder.filter(function (num) { return num !== 0; });
        if (thisOrder.length !== order.length) {
            return false;
        }
        for (var i = 0; i < order.length; i++) {
            if (thisOrder[i] !== order[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Part 2 times out pretty aggressively, so it's
     * reasonably clear that this should actually be a dynamic programming
     * solution, which can be modeled as such
     *
     * solution(i, n): the number of ways at index i of the 'map' at index
     * n of the 'grouping' list.
     *
     * That's probably enough to prevent re-calculating things a bajillion times
     */
    Day12_2023.prototype.partTwo = function (input) {
        var ans = 0;
        for (var i = 0; i < input.length; i++) {
            this.resetCache();
            var _a = input[i].split(" "), map = _a[0], toParse = _a[1];
            // I'm a clown and this was how I represented the modifications to the
            // inputs
            var order = toParse.split(",").map(function (num) { return parseInt(num); });
            map = map + "?" + map + "?" + map + "?" + map + "?" + map;
            var groupSizes = order.concat(order, order, order, order);
            ans += this.batchBacktrack("", map, 0, groupSizes);
        }
        return ans;
    };
    /**
     * Is this how you do caches/static state in JS!?
     */
    Day12_2023.prototype.resetCache = function () {
        Day12_2023.cache = [];
        for (var i = 0; i < 1000; i++) {
            Day12_2023.cache[i] = [];
            for (var j = 0; j < 1000; j++) {
                Day12_2023.cache[i][j] = -1;
            }
        }
    };
    Day12_2023.prototype.batchBacktrack = function (curString, map, groupIndex, groupSizes) {
        if (curString.length === map.length) {
            var baseCase = this.validate(curString, groupSizes) ? 1 : 0;
            Day12_2023.cache[curString.length][groupIndex] = baseCase;
            return baseCase;
        }
        // If cached, return it
        var cacheVal = Day12_2023.cache[curString.length][groupIndex];
        if (cacheVal !== -1) {
            return cacheVal;
        }
        var ans = 0;
        var nextIndex = curString.length;
        var canHash = map.charAt(nextIndex) === "#" || map.charAt(nextIndex) === "?";
        var canDot = map.charAt(nextIndex) === "." || map.charAt(nextIndex) === "?";
        // If we drop a '.', proceed one step forward
        if (canDot) {
            ans += this.batchBacktrack(curString + ".", map, groupIndex, groupSizes);
        }
        // If we drop a #, we try to finish out the run of #'s
        if (canHash) {
            // If we choose to drop a #, we have to do it in a run of
            // a specified length. Let's check if that is even possible
            var numHashes = groupIndex >= groupSizes.length ? 0 : groupSizes[groupIndex];
            var isLegal = numHashes !== 0; // If the run is 0, this isn't legal (since we're out of hash groups to allocate)
            for (var i = 0; i < numHashes; i++) {
                // If this would put us past the total length possible, bail
                if (nextIndex + i >= map.length) {
                    isLegal = false;
                }
                // ... or if there's not already a # or a ?
                else if (map.charAt(nextIndex + i) === ".") {
                    isLegal = false;
                }
            }
            // Finally, we need a . to terminate the run (or ensure this the end of the line)
            var needExplicitEnd = curString.length + numHashes !== map.length;
            // This isn't legal if we can't place a . there (if one is needed)
            if (needExplicitEnd && map.charAt(nextIndex + numHashes) === "#") {
                isLegal = false;
            }
            if (isLegal) {
                var batch = "#".repeat(numHashes) + (needExplicitEnd ? "." : "");
                ans += this.batchBacktrack(curString + batch, map, groupIndex + 1, groupSizes);
            }
        }
        Day12_2023.cache[curString.length][groupIndex] = ans;
        return ans;
    };
    return Day12_2023;
}(solution_1.Solution));
var sol = new Day12_2023();
// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-12.js.map