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
    Day11_2023.prototype.partOne = function (input) { };
    Day11_2023.prototype.partTwo = function (input) { };
    return Day11_2023;
}(solution_1.Solution));
var sol = new Day11_2023();
utils.runTest(sol, utils.ProblemParts.One);
utils.run(sol, utils.ProblemParts.One);
utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-11.js.map