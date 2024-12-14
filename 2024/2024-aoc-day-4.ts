import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day4_2024 extends Solution {
  DAY = 4;

  partOne(input: string[]): any {
    let numXmas = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        for (let d = 0; d < 8; d++) {
          if (this.isNeedlePresent(input, i, j, d, "XMAS")) {
            // console.log(`XMAS at (${i}, ${j}) direction ${d}`);
            numXmas++;
          }
        }
      }
    }
    return numXmas;
  }

  // d: direction from [0, 8) starting -> and going clockwise
  isNeedlePresent(
    input: string[],
    i: number,
    j: number,
    d: number,
    needle: string
  ): boolean {
    const directions = [
      [0, 1], // Right
      [1, 1], // Bottom-Right
      [1, 0], // Down
      [0, -1], // Left
      [1, -1], // Down-Left
      [-1, -1], // Up-Left
      [-1, 0], // Up
      [-1, 1], // Down-Left
    ];
    if (i < 0 || j < 0) {
      return false;
    }
    if (i >= input.length || j >= input[i].length) {
      return false;
    }

    for (let index = 0; index < needle.length; index++) {
      if (!this.isChar(input, i, j, needle.charAt(index))) {
        return false;
      }
      i += directions[d][0];
      j += directions[d][1];
    }
    return true;
  }

  isChar(input: string[], i: number, j: number, c: string): boolean {
    if (i < 0 || i >= input.length) {
      return false;
    }
    if (j < 0 || j >= input[i].length) {
      return false;
    }
    return input[i].charAt(j) === c;
  }

  partTwo(input: string[]): any {
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        if (input[i].charAt(j) === "A") {
          let upperLeft =
            this.isNeedlePresent(input, i - 1, j - 1, 1, "MAS") ||
            this.isNeedlePresent(input, i - 1, j - 1, 1, "SAM");
          let bottomLeft =
            this.isNeedlePresent(input, i + 1, j - 1, 7, "MAS") ||
            this.isNeedlePresent(input, i + 1, j - 1, 7, "SAM");

          if (upperLeft && bottomLeft) {
            // console.log(`X-MAS at (${i}, ${j})`);
            ans++;
          }
        }
      }
    }
    return ans;
  }
}

let sol = new Day4_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);

// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
