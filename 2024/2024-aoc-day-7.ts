import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day7_2024 extends Solution {
  DAY = 7;

  partOne(input: string[]): any {
    let totalAns = 0;
    for (let i = 0; i < input.length; i++) {
      let nums = this.parseNumbers(input[i]);
      if (this.canExpressEquation(nums.t, nums.ops)) {
        // console.log(nums.t);
        totalAns += nums.t;
      }
    }
    return totalAns;
  }

  parseNumbers(input: string): { t: number; ops: number[] } {
    return {
      t: parseInt(input.split(":")[0]),
      ops: input
        .split(":")[1]
        .trimStart()
        .split(" ")
        .map((num) => parseInt(num)),
    };
  }

  canExpressEquation(total: number, operands: number[]): boolean {
    let operationOptions = this.buildOperations(operands.length - 1);
    for (let i = 0; i < operationOptions.length; i++) {
      let operandsCopy = [...operands];
      if (this.operate(operandsCopy, operationOptions[i]) === total) {
        return true;
      }
    }
    return false;
  }

  operate(operands: number[], ops: string): number {
    let ans = operands[0];
    // Consolidate all of the *'s until we only have +'s left
    // while (ops.includes("*")) {
    //   let idx = ops.indexOf("*");
    //   let val = operands[idx] * operands[idx + 1];

    //   ops = ops.substring(0, idx) + ops.substring(idx + 1);
    //   operands.splice(idx + 1, 1);
    //   operands[idx] = val;
    // }

    // for (let i = 0; i < operands.length; i++) {
    //   ans += operands[i];
    // }
    for (let i = 0; i < ops.length; i++) {
      if (ops.charAt(i) === "+") {
        ans = ans + operands[i + 1];
      } else if (ops.charAt(i) === "*") {
        ans = ans * operands[i + 1];
      } else {
        ans = this.concatOperator(ans, operands[i + 1]);
      }
    }
    return ans;
  }

  concatOperator(a: number, b: number): number {
    let numDigits = 0;
    let bCopy = b;
    while (bCopy > 0) {
      numDigits++;
      bCopy = Math.trunc(bCopy / 10);
    }

    if (b === 0) {
      numDigits = 1;
    }
    let ans = a * Math.pow(10, numDigits);
    return ans + b;
  }

  // Sure wish I could just Memoize this
  buildOperations(size: number): string[] {
    if (size === 0) {
      return [""];
    }
    let ops: string[] = [];
    ops = ops.concat(this.buildOperations(size - 1).map((o) => o + "+"));
    ops = ops.concat(this.buildOperations(size - 1).map((o) => o + "*"));
    ops = ops.concat(this.buildOperations(size - 1).map((o) => o + "|"));

    return ops;
  }

  partTwo(input: string[]): any {
    // Just did it in part 1
  }
}

let sol = new Day7_2024();

// utils.runTest(sol, utils.ProblemParts.One);
utils.runSolution(sol, utils.ProblemParts.One);

// utils.runTest(sol, utils.ProblemParts.Two);
// utils.runSolution(sol, utils.ProblemParts.Two);
