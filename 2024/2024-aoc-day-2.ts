import { count } from "console";
import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day2_2024 extends Solution {
  DAY = 2;

  partOne(input: string[]): any {
    let numSafe = 0;
    for (let i = 0; i < input.length; i++) {
      let nums = input[i].split(" ").map((n) => parseInt(n));
      if (this.isSafe(nums)) {
        numSafe += 1;
      }
    }
    return numSafe;
  }

  isSafe(nums: number[]): boolean {
    let counts = {
      increasing: 0,
      decreasing: 0,
    };
    for (let i = 1; i < nums.length; i++) {
      let diff = nums[i] - nums[i - 1];

      let safeDiff = Math.abs(diff) >= 1 && Math.abs(diff) <= 3;
      if (!safeDiff) {
        return false;
      }

      if (diff === 0) {
        return false;
      }

      if (diff > 0) {
        counts.increasing += 1;
      } else if (diff < 0) {
        counts.decreasing += 1;
      }
    }

    return counts.decreasing === 0 || counts.increasing === 0;
  }

  partTwo(input: string[]): any {
    let numSafe = 0;
    for (let i = 0; i < input.length; i++) {
      let nums = input[i].split(" ").map((n) => parseInt(n));
      if (this.isSafeP2(nums)) {
        numSafe += 1;
      }
    }
    return numSafe;
  }

  isSafeP2(nums: number[]): boolean {
    if (this.isSafe(nums)) {
      return true;
    }
    for (let i = 0; i < nums.length; i++) {
      let copy = [...nums];
      copy.splice(i, 1);
      if (this.isSafe(copy)) {
        return true;
      }
    }
    return false;
  }
}

let sol = new Day2_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);

utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
