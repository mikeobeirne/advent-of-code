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
var Day5_2023 = /** @class */ (function (_super) {
    __extends(Day5_2023, _super);
    function Day5_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 5;
        return _this;
    }
    Day5_2023.prototype.partOne = function (input) {
        var seedString = input.shift().split(": ")[1];
        input.shift(); // Drop one more newline
        var seeds = seedString.split(" ").map(function (s) { return parseInt(s); });
        var maps = this.parseMaps(input);
        for (var _i = 0, maps_1 = maps; _i < maps_1.length; _i++) {
            var m = maps_1[_i];
            console.log(m);
            console.log(m.ranges[0]);
        }
        var minLocation = Number.MAX_SAFE_INTEGER;
        for (var _a = 0, seeds_1 = seeds; _a < seeds_1.length; _a++) {
            var s = seeds_1[_a];
            minLocation = Math.min(minLocation, this.getLocation(s, maps));
        }
        return minLocation;
    };
    Day5_2023.prototype.parseMaps = function (input) {
        var maps = [];
        for (var i = 0; i < input.length; i++) {
            var mapInput = [];
            while (i < input.length && input[i] !== "") {
                mapInput = mapInput.concat(input[i]);
                i++;
            }
            maps = maps.concat(this.parseMap(mapInput));
        }
        return maps;
    };
    Day5_2023.prototype.parseMap = function (mapData) {
        var fullName = mapData[0].split(" ")[0];
        var source = fullName.split("-")[0];
        var dest = fullName.split("-")[2];
        var ranges = [];
        for (var i = 1; i < mapData.length; i++) {
            var _a = mapData[i].split(" "), destStart = _a[0], sourceStart = _a[1], length_1 = _a[2];
            ranges = ranges.concat({
                "destStart": parseInt(destStart),
                "sourceStart": parseInt(sourceStart),
                "length": parseInt(length_1)
            });
        }
        return {
            source: source,
            dest: dest,
            ranges: ranges,
        };
    };
    Day5_2023.prototype.getLocation = function (seedNum, maps) {
        var curLocation = seedNum;
        var curType = 'seed';
        while (curType !== 'location') {
            // console.log(curType + " " + curLocation);
            var mapToUse = maps.find(function (m) { return m.source === curType; });
            curType = mapToUse.dest;
            curLocation = this.useMap(curLocation, mapToUse);
        }
        return curLocation;
    };
    Day5_2023.prototype.useMap = function (location, map) {
        for (var _i = 0, _a = map.ranges; _i < _a.length; _i++) {
            var r = _a[_i];
            // If we're in this range...
            if (r.sourceStart <= location && location < r.sourceStart + r.length) {
                // ...return the mapped offset from the destination range
                var offset = location - r.sourceStart;
                return r.destStart + offset;
            }
        }
        // If no ranges were relevant, then the mapping remains the same
        return location;
    };
    Day5_2023.prototype.partTwo = function (input) {
        return this.partTwoWorkingBackwards(input);
    };
    /**
     * This solution tries working backwards!
     */
    Day5_2023.prototype.partTwoWorkingBackwards = function (input) {
        var seedString = input.shift().split(": ")[1];
        input.shift(); // Drop one more newline
        var seeds = seedString.split(" ").map(function (s) { return parseInt(s); });
        var maps = this.parseMaps(input);
        console.log(this.getLocation(3894936732, maps));
        console.log(Number.MAX_SAFE_INTEGER);
        for (var location_1 = 0; location_1 < Number.MAX_SAFE_INTEGER; location_1++) {
            var seed = this.getSeedFromLocation(location_1, maps);
            // Is this seed in the valid input range?
            for (var j = 0; j < seeds.length; j = j + 2) {
                var rangeStart = seeds[j];
                var rangeLength = seeds[j + 1];
                if (seed >= rangeStart && seed <= (rangeStart + rangeLength)) {
                    console.log("Valid location " + location_1 + " " + seed);
                    return location_1;
                }
            }
        }
        return 0;
    };
    Day5_2023.prototype.getSeedFromLocation = function (locationNum, maps) {
        var curLocation = locationNum;
        var curType = 'location';
        while (curType !== 'seed') {
            // console.log(curType + " " + curLocation);
            var mapToUse = maps.find(function (m) { return m.dest === curType; });
            curType = mapToUse.source;
            curLocation = this.useMapBackwards(curLocation, mapToUse);
        }
        return curLocation;
    };
    Day5_2023.prototype.useMapBackwards = function (location, map) {
        for (var _i = 0, _a = map.ranges; _i < _a.length; _i++) {
            var r = _a[_i];
            // If we're in this range...
            if (r.destStart <= location && location < r.destStart + r.length) {
                // ...return the mapped offset from the destination range
                var offset = location - r.destStart;
                return r.sourceStart + offset;
            }
        }
        // If no ranges were relevant, then the mapping remains the same
        return location;
    };
    return Day5_2023;
}(solution_1.Solution));
// Working ideas:
//  - Pad the provided maps with 'fake' ranges indicating the "stay the same"
//  - Work backwards from the lowest numbers and hope we hit it reasonably quickly
// utils.runSolution(new Day5_2023(), utils.ProblemParts.One);
utils.run(new Day5_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-5.js.map