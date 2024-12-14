import { assert } from "console";
import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day13_2024 extends Solution {
  DAY = 13;

  partOne(input: string[]): any {
    let index = 0;
    let ans = 0;
    while (index < input.length) {
      let buttonA = this.parseButton(input[index]);
      let buttonB = this.parseButton(input[index + 1]);
      let target = this.parseTargets(input[index + 2]);
      index += 4;

      let solution = this.solveFast(buttonA, buttonB, target);
      if (solution !== -1) {
        ans += solution;
      }
    }

    return ans;
  }

  solve(
    A: { x: number; y: number },
    B: { x: number; y: number },
    targets: { x: number; y: number }
  ): number {
    // console.log(A);
    // console.log(B);
    // console.log(targets);
    let minCost = 2 << 25;
    for (let i = 0; i <= 100; i++) {
      for (let j = 0; j <= 100; j++) {
        let newX = i * A.x + j * B.x;
        let newY = i * A.y + j * B.y;
        if (newX === targets.x && newY === targets.y) {
          // 3 to push A, 1 to push B
          const thisCost = 3 * i + j;
          minCost = Math.min(minCost, thisCost);
        }
      }
    }
    if (minCost === 2 << 25) {
      return -1;
    }
    return minCost;
  }

  solveFast(
    A: { x: number; y: number },
    B: { x: number; y: number },
    targets: { x: number; y: number }
  ): number {
    // Ax * i + Bx * j - targets.x = 0
    // Ay * i + By * j - targets.y = 0
    // Solve system of linear equations via cross multiplication
    const i =
      (B.x * -1 * targets.y + B.y * targets.x) / (A.x * B.y - A.y * B.x);
    const j =
      (-1 * targets.x * A.y + targets.y * A.x) / (A.x * B.y - A.y * B.x);
    // console.log(`${i} ${j}`);

    // If these require non-whole numbers, it can't be done
    if (i % 1 !== 0 || j % 1 !== 0) {
      return -1;
    }

    return 3 * i + j;
  }

  parseButton(line: string): { x: number; y: number } {
    const regex = /X\+(\d+), Y\+(\d+)/g;
    let results = regex.exec(line)!;
    return {
      x: parseInt(results[1]),
      y: parseInt(results[2]),
    };
  }

  parseTargets(line: string): { x: number; y: number } {
    const regex = /X\=(\d+), Y\=(\d+)/g;
    let results = regex.exec(line)!;
    return {
      x: parseInt(results[1]) + 10000000000000,
      y: parseInt(results[2]) + 10000000000000,
    };
  }

  partTwo(input: string[]): any {}
}

let sol = new Day13_2024();

// utils.runTest(sol, utils.ProblemParts.One);
utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
// utils.runSolution(sol, utils.ProblemParts.Two);
