import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day3_2024 extends Solution {
  DAY = 3;

  partOne(input: string[]): any {
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      ans += this.solveCommand(input[i]);
    }
    return ans;
  }

  partTwo(input: string[]): any {
    let ans = 0;
    let isEnabled = true;
    for (let i = 0; i < input.length; i++) {
      let result = this.solvePart2Command(input[i], isEnabled);
      ans += result.val;
      isEnabled = result.enabled;
    }
    return ans;
  }

  solvePart2Command(
    command: string,
    isEnabled: boolean
  ): { val: number; enabled: boolean } {
    let doDontRegex = /do\(\)|don't\(\)/g;
    let ans = 0;

    let left = 0;
    let right = 0;
    while (true) {
      let match = doDontRegex.exec(command);
      if (match === null) {
        // Handle match being null
        right = command.length;
        break;
      }
      let isDo = match[0].startsWith("do()");
      right = match.index;
      if (isEnabled) {
        let sub = command.substring(left, right);
        ans += this.solveCommand(sub);
      }

      // Cleanup for next chunk
      isEnabled = isDo;
      left = right + match[0].length;
    }

    if (isEnabled) {
      let sub = command.substring(left, right);
      ans += this.solveCommand(sub);
    }

    return { val: ans, enabled: isEnabled };
  }

  solveCommand(command: string): number {
    let regex = /mul\((\d{1,3}?),(\d{1,3}?)\)/g;
    let ans = 0;
    while (true) {
      let mul = regex.exec(command);
      if (mul === null) {
        break;
      }
      let a = parseInt(mul[1]);
      let b = parseInt(mul[2]);

      ans += a * b;
    }
    return ans;
  }
}

let sol = new Day3_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);

// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
