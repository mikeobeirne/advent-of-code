import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day9_2024 extends Solution {
  DAY = 9;

  partOne(input: string[]): any {
    let ans = 0;

    let nums = this.parseInput(input[0]);

    let leftIndex = 0;
    let rightIndex = nums.length - 1;

    for (let i = 0; ; i++) {
      while (nums[leftIndex] === 0) {
        leftIndex++;
      }
      while (nums[rightIndex] === 0 || rightIndex % 2 === 1) {
        rightIndex--;
      }

      if (leftIndex > rightIndex) {
        break;
      }

      if (leftIndex % 2 === 0) {
        // Pull from the left
        // console.log(`${i} * ${Math.floor(leftIndex / 2)}`);
        ans += i * Math.floor(leftIndex / 2);
        nums[leftIndex] = nums[leftIndex] - 1;
      } else {
        // Pull from the right
        // console.log(`${i} * ${Math.floor(rightIndex / 2)}`);
        ans += i * Math.floor(rightIndex / 2);
        nums[rightIndex] = nums[rightIndex] - 1;
        nums[leftIndex] = nums[leftIndex] - 1;
      }
    }
    return ans;
  }

  parseInput(input: string): number[] {
    let nums: number[] = [];

    for (let i = 0; i < input.length; i++) {
      nums = nums.concat(parseInt(input[i]));
    }
    return nums;
  }

  partTwo(input: string[]): any {
    let ans = 0;

    let nums = this.parseInput(input[0]);

    let leftIndex = 0;
    let rightIndex = nums.length - 1;

    let fileIndex = 0;
    while (true) {
      while (nums[leftIndex] <= 0) {
        leftIndex++;
        // Make note of empty gaps leftover
        if (nums[leftIndex] < 0) {
          fileIndex += -1 * nums[leftIndex];
        }
      }
      while (nums[rightIndex] === 0 || rightIndex % 2 === 1) {
        rightIndex--;
      }

      if (leftIndex >= nums.length) {
        break;
      }

      if (leftIndex % 2 === 0) {
        // Pull from the left
        // console.log(`${fileIndex} * ${Math.floor(leftIndex / 2)}`);
        ans += fileIndex * Math.floor(leftIndex / 2);
        nums[leftIndex] = nums[leftIndex] - 1;
        fileIndex++;
      } else {
        // Pull from the right
        // Need to find a block that will fit!
        let fitIndex = this.findAFit(nums, nums[leftIndex]);
        if (fitIndex === -1) {
          // Nothing fits, continue along
          fileIndex += nums[leftIndex];
          nums[leftIndex] = 0;
          continue;
        } else {
          for (let numToCount = 0; numToCount < nums[fitIndex]; numToCount++) {
            // console.log(`${fileIndex} * ${Math.floor(fitIndex / 2)}`);
            ans += fileIndex * Math.floor(fitIndex / 2);
            fileIndex++;
          }
          nums[leftIndex] = nums[leftIndex] - nums[fitIndex];
          // Make a note of the size of the
          nums[fitIndex] = -1 * nums[fitIndex];
        }
      }
    }
    return ans;
  }

  // Returns the index of the fit
  findAFit(nums: number[], size: number): number {
    for (let i = nums.length - 1; i >= 0; i--) {
      if (i % 2 === 1) {
        continue;
      }
      if (nums[i] <= 0) {
        continue;
      }
      if (nums[i] <= size) {
        return i;
      }
    }

    return -1;
  }
}

let sol = new Day9_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);

// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
