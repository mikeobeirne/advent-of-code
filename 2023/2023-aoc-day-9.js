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
var Day9_2023 = /** @class */ (function (_super) {
    __extends(Day9_2023, _super);
    function Day9_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 9;
        return _this;
    }
    Day9_2023.prototype.partOne = function (input) {
        var ans = 0;
        for (var i = 0; i < input.length; i++) {
            var seq = input[i]
                .split(" ")
                .map(function (num) { return parseInt(num); })
                .filter(function (n) { return !Number.isNaN(n); });
            console.log(seq);
            var e = this.extrapolate(seq);
            ans += e;
        }
        return ans;
    };
    Day9_2023.prototype.extrapolate = function (seq) {
        var sequences = [];
        sequences[0] = seq;
        var curSeq = seq;
        for (var i = 1; i < seq.length; i++) {
            if (curSeq.every(function (v) { return v === 0; })) {
                break;
            }
            var diff = this.getDifferenceArray(curSeq);
            sequences[i] = diff;
            curSeq = diff;
        }
        for (var i = 0; i < sequences.length; i++) {
            console.log(" ".repeat(2 * i) + sequences[i].join(" "));
        }
        // console.log(sequences);
        var curExtrap = 0;
        for (var i = sequences.length - 1; i >= 1; i--) {
            console.log(curExtrap);
            var nextSeq = sequences[i - 1];
            curExtrap = nextSeq[nextSeq.length - 1] + curExtrap;
        }
        return curExtrap;
    };
    Day9_2023.prototype.getDifferenceArray = function (seq) {
        var differences = [];
        for (var i = 0; i < seq.length - 1; i++) {
            differences = differences.concat(seq[i + 1] - seq[i]);
        }
        return differences;
    };
    Day9_2023.prototype.partTwo = function (input) {
        var ans = 0;
        for (var i = 0; i < input.length; i++) {
            var seq = input[i]
                .split(" ")
                .map(function (num) { return parseInt(num); })
                .filter(function (n) { return !Number.isNaN(n); });
            var e = this.extrapolateFront(seq);
            ans += e;
        }
        return ans;
    };
    Day9_2023.prototype.extrapolateFront = function (seq) {
        var sequences = [];
        sequences[0] = seq;
        var curSeq = seq;
        for (var i = 1; i < seq.length; i++) {
            if (curSeq.every(function (v) { return v === 0; })) {
                break;
            }
            var diff = this.getDifferenceArray(curSeq);
            sequences[i] = diff;
            curSeq = diff;
        }
        // for (let i = 0; i < sequences.length; i++) {
        //   console.log(" ".repeat(2 * i) + sequences[i].join(" "));
        // }
        // console.log(sequences);
        var curExtrap = 0;
        for (var i = sequences.length - 1; i >= 1; i--) {
            var nextSeq = sequences[i - 1];
            curExtrap = nextSeq[0] - curExtrap;
        }
        return curExtrap;
    };
    return Day9_2023;
}(solution_1.Solution));
// utils.runSolution(new Day9_2023(), utils.ProblemParts.One);
utils.runSolution(new Day9_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-9.js.map