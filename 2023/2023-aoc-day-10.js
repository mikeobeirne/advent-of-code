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
var Day10_2023 = /** @class */ (function (_super) {
    __extends(Day10_2023, _super);
    function Day10_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 10;
        return _this;
    }
    Day10_2023.prototype.partOne = function (input) {
        var pipes = this.parsePipes(input);
        var dist = [];
        var ans = -1;
        for (var i = 0; i < input.length; i++) {
            dist[i] = [];
            for (var j = 0; j < input[i].length; j++) {
                dist[i][j] = this.distanceToAnimal(pipes, i, j);
                ans = Math.max(ans, dist[i][j]);
            }
        }
        // for (let i = 0; i < dist.length; i++) {
        //   console.log(dist[i].join(" "));
        // }
        return ans;
    };
    Day10_2023.prototype.parsePipes = function (input) {
        var pipes = [];
        for (var i = 0; i < input.length; i++) {
            pipes[i] = [];
            for (var j = 0; j < input[i].length; j++) {
                pipes[i][j] = this.parsePipeSection(input, i, j);
            }
        }
        return pipes;
    };
    Day10_2023.prototype.parsePipeSection = function (input, i, j) {
        if (i < 0 || i >= input.length || j < 0 || j >= input[i].length) {
            return null;
        }
        var char = input[i].charAt(j);
        if (input[i].charAt(j) === ".") {
            return null;
        }
        var ans = { pos: { row: i, col: j } };
        switch (char) {
            case "|":
                ans.in = { row: i - 1, col: j };
                ans.out = { row: i + 1, col: j };
                return ans;
            case "-":
                ans.in = { row: i, col: j - 1 };
                ans.out = { row: i, col: j + 1 };
                return ans;
            case "L":
                ans.in = { row: i - 1, col: j };
                ans.out = { row: i, col: j + 1 };
                return ans;
            case "J":
                ans.in = { row: i - 1, col: j };
                ans.out = { row: i, col: j - 1 };
                return ans;
            case "7":
                ans.in = { row: i + 1, col: j };
                ans.out = { row: i, col: j - 1 };
                return ans;
            case "F":
                ans.in = { row: i + 1, col: j };
                ans.out = { row: i, col: j + 1 };
                return ans;
            case "S":
                ans.isAnimal = true;
                return ans;
            default:
                throw new Error(char + " is not handled");
        }
    };
    Day10_2023.prototype.areConnected = function (a, b) {
        if (!this.areAdjacent(a.pos, b.pos)) {
            return false;
        }
        var aPointsToB = a.isAnimal || this.areEqual(a.out, b.pos) || this.areEqual(a.in, b.pos);
        var bPointsToA = b.isAnimal || this.areEqual(b.out, a.pos) || this.areEqual(b.in, a.pos);
        return aPointsToB && bPointsToA;
    };
    Day10_2023.prototype.areEqual = function (a, b) {
        if (a === null || b === null) {
            return false;
        }
        return a.row === b.row && a.col === b.col;
    };
    Day10_2023.prototype.areAdjacent = function (a, b) {
        var dist = Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
        return dist == 0 || dist == 1;
    };
    Day10_2023.prototype.distanceToAnimal = function (input, i, j) {
        // If not a pipe present
        if (input[i][j] === null) {
            return -1;
        }
        var seen = [];
        for (var i_1 = 0; i_1 < input.length; i_1++) {
            seen[i_1] = [];
            for (var j_1 = 0; j_1 < input[i_1].length; j_1++) {
                seen[i_1][j_1] = false;
            }
        }
        seen[i][j] = true;
        var queue = [{ pipe: input[i][j], dist: 0 }];
        var safeGet = function (row, col) {
            if (row < 0 ||
                col < 0 ||
                row >= input.length ||
                col >= input[row].length) {
                return null;
            }
            return input[row][col];
        };
        // Do a BFS to get shortest path
        while (queue.length !== 0) {
            var entry = queue.shift();
            // We found it!
            if (input[entry.pipe.pos.row][entry.pipe.pos.col].isAnimal === true) {
                return entry.dist;
            }
            var inPipe = safeGet(entry.pipe.in.row, entry.pipe.in.col);
            if (inPipe !== null &&
                !seen[inPipe.pos.row][inPipe.pos.col] &&
                this.areConnected(entry.pipe, inPipe)) {
                seen[inPipe.pos.row][inPipe.pos.col] = true;
                queue.push({ pipe: inPipe, dist: entry.dist + 1 });
            }
            var outPipe = safeGet(entry.pipe.out.row, entry.pipe.out.col);
            if (outPipe !== null &&
                !seen[outPipe.pos.row][outPipe.pos.col] &&
                this.areConnected(entry.pipe, outPipe)) {
                seen[outPipe.pos.row][outPipe.pos.col] = true;
                queue.push({ pipe: outPipe, dist: entry.dist + 1 });
            }
        }
        // Didn't find it, return a value we won't consider valid
        return -1;
    };
    /**
     * Option 1: blow up the array into something like this and then
     * divide the answer by 9
     * .p.    xxx   .p.   .p.
     * .p.    ---   .pp   pp.
     * .p.    xxx   ...   ...
     *
     * Option 2: change the flood fill algo to handle pipes
     *
     * I'm a caveman, so let's do Option (1)
     */
    Day10_2023.prototype.partTwo = function (input) {
        // Part 1: Identify the piping that's connected to the animal
        // and consider anything not a part of that as a "."
        var pipes = this.parsePipes(input);
        for (var i = 0; i < input.length; i++) {
            var line = "";
            for (var j = 0; j < input[i].length; j++) {
                var dist = this.distanceToAnimal(pipes, i, j);
                if (dist === -1) {
                    line += ".";
                }
                else {
                    line += input[i].charAt(j);
                }
            }
            input[i] = line;
        }
        // Part 2: Blow up the input into a 9x scale variant
        var collisionMap = this.makeCollisionMap(input);
        // this.printMap(collisionMap);
        var numStuck = 0;
        for (var i = 0; i < input.length; i++) {
            var buffer = "";
            for (var j = 0; j < input[i].length; j++) {
                if (input[i].charAt(j) === ".") {
                    var canEscape = this.canEscape(collisionMap, i, j);
                    buffer += canEscape ? "O" : "~";
                    if (!canEscape) {
                        numStuck++;
                    }
                }
                else {
                    buffer += input[i].charAt(j);
                }
            }
            // console.log((i % 10) + " " + buffer);
        }
        return numStuck;
    };
    /**
     * Attempts to make a 3x variant of this to account
     * for the pipe collision.
     *
     * true = you can move through it
     * false = a pipe blocks your way
     */
    Day10_2023.prototype.makeCollisionMap = function (input) {
        var map = new Array(input.length * 3);
        // 2-d array init, I hate this
        for (var i = 0; i < input.length * 3; i++) {
            map[i] = [];
            for (var j = 0; j < input.length * 3; j++) {
                map[i][j] = false;
            }
        }
        for (var i = 0; i < input.length; i++) {
            for (var j = 0; j < input[i].length; j++) {
                var row = i * 3;
                var col = j * 3;
                var expansionGrid = this.expandPipe(input[i].charAt(j));
                for (var r = 0; r < 3; r++) {
                    for (var c = 0; c < 3; c++) {
                        map[r + row][c + col] = expansionGrid[r].charAt(c) === "0";
                    }
                }
            }
        }
        return map;
    };
    // Given our collision map, can this make it to an edge?
    Day10_2023.prototype.canEscape = function (map, startingRow, startingCol) {
        // Adjust for our crazy collision map
        startingRow *= 3;
        startingCol *= 3;
        var seen = new Array(map.length);
        // 2-d array init, I hate this
        for (var i = 0; i < map.length; i++) {
            seen[i] = [];
            for (var j = 0; j < map[i].length; j++) {
                seen[i][j] = false;
            }
        }
        var queue = [{ row: startingRow, col: startingCol }];
        while (queue.length !== 0) {
            var cur = queue.pop();
            // We're on the edge, so we can escape!
            if (cur.row === 0 ||
                cur.row === map.length - 1 ||
                cur.col === 0 ||
                cur.col === map[0].length - 1) {
                return true;
            }
            // Ignore seen ones
            if (seen[cur.row][cur.col]) {
                continue;
            }
            seen[cur.row][cur.col] = true;
            // Ignore 'illegal' moves
            // (we do this lazily so we don't have aggressive bound checking)
            if (map[cur.row][cur.col] === false) {
                continue;
            }
            // Attempt a move in each direction
            if (!seen[cur.row + 1][cur.col]) {
                queue.push({ row: cur.row + 1, col: cur.col });
            }
            if (!seen[cur.row][cur.col + 1]) {
                queue.push({ row: cur.row, col: cur.col + 1 });
            }
            if (!seen[cur.row - 1][cur.col]) {
                queue.push({ row: cur.row - 1, col: cur.col });
            }
            if (!seen[cur.row][cur.col - 1]) {
                queue.push({ row: cur.row, col: cur.col - 1 });
            }
        }
        // Exhausted all moves, can't escape!
        return false;
    };
    Day10_2023.prototype.printMap = function (map) {
        for (var i = 0; i < map.length; i++) {
            var row = (i % 10) + ": ";
            for (var j = 0; j < map[i].length; j++) {
                row += map[i][j] ? "0" : "1";
            }
            console.log(row);
        }
    };
    Day10_2023.prototype.expandPipe = function (pipe) {
        switch (pipe) {
            case ".":
                return [
                    // Format prevention comment!
                    "000",
                    "000",
                    "000",
                ];
            case "-":
                return [
                    // Format prevention comment!
                    "000",
                    "111",
                    "000",
                ];
            case "|":
                return [
                    // Format prevention comment!
                    "010",
                    "010",
                    "010",
                ];
            case "L":
                return [
                    // Format prevention comment!
                    "010",
                    "011",
                    "000",
                ];
            case "J":
                return [
                    // Format prevention comment!
                    "010",
                    "110",
                    "000",
                ];
            case "7":
                return [
                    // Format prevention comment!
                    "000",
                    "110",
                    "010",
                ];
            case "F":
                return [
                    // Format prevention comment!
                    "000",
                    "011",
                    "010",
                ];
            // TODO: This one is weird; we may need to make it more specific
            // to what the pipe actually is...
            case "S":
                return [
                    // Format prevention comment!
                    "010",
                    "111",
                    "010",
                ];
        }
    };
    return Day10_2023;
}(solution_1.Solution));
// utils.run(new Day10_2023(), utils.ProblemParts.One);
utils.runSolution(new Day10_2023(), utils.ProblemParts.Two);
//# sourceMappingURL=2023-aoc-day-10.js.map