import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day19_2024 extends Solution {
  DAY = 19;

  public cache: Map<string, number> = new Map();

  partOne(input: string[]): any {
    this.cache = new Map();
    let options = input[0].split(", ");

    let ans = 0;
    for (let i = 2; i < input.length; i++) {
      if (this.canMake(options, input[i]) > 0) {
        ans += 1;
      }
    }
    return ans;
  }

  canMake(options: string[], target: string): number {
    if (target.length === 0) {
      return 1;
    }
    if (this.cache.has(target)) {
      return this.cache.get(target)!;
    }

    let numWays = 0;
    for (let i = 0; i < options.length; i++) {
      if (target.startsWith(options[i])) {
        let canMake = this.canMake(
          options,
          target.substring(options[i].length)
        );
        numWays += canMake;
      }
    }
    this.cache.set(target, numWays);
    return numWays;
  }

  partTwo(input: string[]): any {
    this.cache = new Map();
    let options = input[0].split(", ");

    let ans = 0;
    for (let i = 2; i < input.length; i++) {
      let numWays = this.canMake(options, input[i]);
      ans += numWays;
    }
    return ans;
  }
}

let sol = new Day19_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
