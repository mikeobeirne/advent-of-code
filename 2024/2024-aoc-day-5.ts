import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day5_2024 extends Solution {
  DAY = 5;

  partOne(input: string[]): any {
    let finalAns = 0;

    let dependencies = new Map<number, Set<number>>();
    let i = 0;
    for (; i < input.length; i++) {
      if (input[i].length === 0) {
        i++;
        break;
      }
      let l = parseInt(input[i].split("|")[0]);
      let r = parseInt(input[i].split("|")[1]);
      let d = dependencies.get(r) ?? new Set();
      d.add(l); // l has to happen before r
      dependencies.set(r, d);
    }

    for (; i < input.length; i++) {
      let nums = input[i].split(",").map((num) => parseInt(num));
      let numsToPrint = new Set();
      nums.forEach((n) => numsToPrint.add(n));

      let isCorrect = true;
      for (let j = 0; j < nums.length; j++) {
        let nextUp = nums[j];
        let d = dependencies.get(nextUp) ?? new Set();

        for (let dep of d) {
          if (numsToPrint.has(dep)) {
            isCorrect = false;
            break;
          }
        }
        numsToPrint.delete(nextUp);
      }
      if (isCorrect) {
        let middleIndex = Math.trunc(nums.length / 2);
        finalAns += nums[middleIndex];
      }
    }
    return finalAns;
  }

  partTwo(input: string[]): any {
    let finalAns = 0;

    let dependencies = new Map<number, Set<number>>();
    let i = 0;
    for (; i < input.length; i++) {
      if (input[i].length === 0) {
        i++;
        break;
      }
      let l = parseInt(input[i].split("|")[0]);
      let r = parseInt(input[i].split("|")[1]);
      let d = dependencies.get(r) ?? new Set();
      d.add(l); // l has to happen before r
      dependencies.set(r, d);
    }

    for (; i < input.length; i++) {
      let nums = input[i].split(",").map((num) => parseInt(num));
      let numsToPrint = new Set();
      nums.forEach((n) => numsToPrint.add(n));

      let isCorrect = true;
      for (let j = 0; j < nums.length; j++) {
        let nextUp = nums[j];
        let d = dependencies.get(nextUp) ?? new Set();

        for (let dep of d) {
          if (numsToPrint.has(dep)) {
            isCorrect = false;
            break;
          }
        }
        numsToPrint.delete(nextUp);
      }
      if (!isCorrect) {
        finalAns += this.part2Reorder(dependencies, nums);
      }
    }
    return finalAns;
  }

  part2Reorder(dependencies: Map<number, Set<number>>, nums: number[]): number {
    let finalNums = [];
    let numsToPrint = new Set();
    nums.forEach((n) => numsToPrint.add(n));

    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        // If we've already handled this one, bail out
        if (!numsToPrint.has(nums[j])) {
          continue;
        }
        let nextUp = nums[j];
        // Does it have any unresolved dependencies?
        let d = dependencies.get(nextUp) ?? new Set();
        let valid = true;
        for (let dep of d) {
          if (numsToPrint.has(dep)) {
            valid = false;
            break;
          }
        }

        if (valid) {
          finalNums.push(nextUp);
          numsToPrint.delete(nextUp);
          break;
        }
      }
    }
    console.log(finalNums);
    return finalNums[Math.trunc(finalNums.length / 2)];
  }
}

let sol = new Day5_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);

utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
