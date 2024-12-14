import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day11_2024 extends Solution {
  DAY = 11;

  // numFlips => cur, totalFlips
  cache: Map<number, Map<number, number>> = new Map();

  partOne(input: string[]): any {
    // Reset the cache
    this.cache = new Map();
    const NUM_FLIPS = 75;

    for (let i = 0; i <= NUM_FLIPS; i++) {
      this.cache.set(i, new Map());
    }

    let ans = 0;
    let nums = input[0].split(" ").map((n) => parseInt(n));
    for (let i = 0; i < nums.length; i++) {
      ans += this.simulate(nums[i], NUM_FLIPS);
    }
    return ans;
  }

  simulate(cur: number, flipsLeft: number): number {
    if (flipsLeft === 0) {
      return 1;
    }
    let perFlipCache = this.cache.get(flipsLeft)!;

    if (!perFlipCache.has(cur)) {
      let answerToCache;
      if (cur === 0) {
        answerToCache = this.simulate(1, flipsLeft - 1);
      } else if (this.numDigits(cur) % 2 === 0) {
        let splitNum = this.splitNumber(cur);
        answerToCache =
          this.simulate(splitNum[0], flipsLeft - 1) +
          this.simulate(splitNum[1], flipsLeft - 1);
      } else {
        answerToCache = this.simulate(cur * 2024, flipsLeft - 1);
      }

      perFlipCache.set(cur, answerToCache);
    }

    return perFlipCache.get(cur)!;
  }

  numDigits(n: number): number {
    if (n === 0) {
      return 1;
    }
    let numDigits = 0;
    while (n > 0) {
      numDigits++;
      n = Math.floor(n / 10);
    }
    return numDigits;
  }

  splitNumber(n: number): number[] {
    let s = n.toString();
    let mid = s.length / 2;
    return [parseInt(s.slice(0, mid)), parseInt(s.slice(mid))];
  }

  partTwo(input: string[]): any {
    this.cache = new Map();
  }
}

let sol = new Day11_2024();

utils.runTest(sol, utils.ProblemParts.One);
utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
// utils.runSolution(sol, utils.ProblemParts.Two);
