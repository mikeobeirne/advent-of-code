import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day1_2024 extends Solution {
  DAY = 1;

  partOne(input: string[]): any {
    let leftNums = [];
    let rightNums = [];
    for (let i = 0; i < input.length; i++) {
      let nums = input[i].split(" ");
      console.log(nums);
      leftNums.push(parseInt(nums[0].trim()));
      rightNums.push(parseInt(nums[nums.length - 1].trim()));
    }
    leftNums = leftNums.sort((a, b) => a - b);
    rightNums = rightNums.sort((a, b) => a - b);

    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      ans += Math.abs(leftNums[i] - rightNums[i]);
    }
    return ans;
  }

  partTwo(input: string[]): any {
    let leftNums = [];
    let rightNums = new Map<number, number>();
    for (let i = 0; i < input.length; i++) {
      let nums = input[i].split(" ");
      leftNums.push(parseInt(nums[0].trim()));
      let rNum = parseInt(nums[nums.length - 1].trim());
      rightNums.set(rNum, (rightNums.get(rNum) ?? 0) + 1);
    }
    leftNums = leftNums.sort((a, b) => a - b);

    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      ans += leftNums[i] * (rightNums.get(leftNums[i]) ?? 0);
    }
    return ans;
  }
}

let sol = new Day1_2024();

utils.runTest(sol, utils.ProblemParts.One);
utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.One);
utils.runSolution(sol, utils.ProblemParts.Two);
