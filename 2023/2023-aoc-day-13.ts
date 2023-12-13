import { hasUncaughtExceptionCaptureCallback } from "process";
import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day13_2023 extends Solution {
  DAY = 13;

  partOne(input: string[]): any {
    let curBuffer = [];
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i].length === 0) {
        let toAdd = this.solve(curBuffer);
        ans += toAdd;
        curBuffer = [];
      } else {
        curBuffer.push(input[i]);
      }
    }
    ans += this.solve(curBuffer);
    return ans;
  }

  solve(map: string[]): number {
    // Try each col
    for (let col = 0; col < map[0].length - 1; col++) {
      if (this.isColReflection(map, col) === 0) {
        return col + 1;
      }
    }

    // Try each row
    for (let row = 0; row < map.length - 1; row++) {
      if (this.isRowReflection(map, row) === 0) {
        return (row + 1) * 100;
      }
    }

    throw new Error("no reflection");
  }

  // Returns the number of differences
  isColReflection(map: string[], refCol: number): number {
    let dif = 0;
    for (let i = 0; i < map.length; i++) {
      let left = refCol;
      let right = refCol + 1;
      while (0 <= left && right < map[0].length) {
        if (map[i][left] !== map[i][right]) {
          dif++;
        }
        left--;
        right++;
      }
    }
    return dif;
  }

  // Returns the number of differences
  isRowReflection(map: string[], refRow: number): number {
    let dif = 0;
    for (let j = 0; j < map[0].length; j++) {
      let top = refRow;
      let bottom = refRow + 1;
      while (0 <= top && bottom < map.length) {
        if (map[top][j] !== map[bottom][j]) {
          dif++;
        }
        top--;
        bottom++;
      }
    }
    return dif;
  }

  partTwo(input: string[]): any {
    let curBuffer = [];
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i].length === 0) {
        let toAdd = this.solveSmudge(curBuffer);
        ans += toAdd;
        curBuffer = [];
      } else {
        curBuffer.push(input[i]);
      }
    }
    let toAdd = this.solveSmudge(curBuffer);
    ans += toAdd;
    return ans;
  }

  solveSmudge(map: string[]): number {
    // Try each col
    for (let col = 0; col < map[0].length - 1; col++) {
      if (this.isColReflection(map, col) === 1) {
        return col + 1;
      }
    }

    // Try each row
    for (let row = 0; row < map.length - 1; row++) {
      if (this.isRowReflection(map, row) === 1) {
        return (row + 1) * 100;
      }
    }

    throw new Error("no reflection");
  }
}

let sol = new Day13_2023();
utils.runTest(sol, utils.ProblemParts.One);
utils.run(sol, utils.ProblemParts.One);
utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
