import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day12_2024 extends Solution {
  DAY = 12;

  partOne(input: string[]): any {
    let seen: Set<number> = new Set();
    let ans = 0;
    let ans2 = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        let stats = this.calculate(input, i, j, seen);
        ans += stats.area * stats.perim;
        ans2 += stats.area * stats.corners;
        if (stats.area !== 0) {
          console.log(
            `Area of ${input[i].charAt(j)} is ${stats.area} * ${stats.perim}`
          );
        }
      }
    }
    return ans2;
  }

  calculate(
    input: string[],
    i: number,
    j: number,
    seen: Set<number>
  ): { area: number; perim: number; corners: number } {
    if (seen.has(i * input[0].length + j)) {
      return { area: 0, perim: 0, corners: 0 };
    }
    seen = seen.add(i * input[0].length + j);
    const dirs = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    let char = input[i].charAt(j);

    let area = 1; // 1 counting this square
    let perim = 0;
    let corners = 0;

    for (let d of dirs) {
      if (this.getChar(input, i + d[0], j + d[1]) === char) {
        let additional = this.calculate(input, i + d[0], j + d[1], seen);
        area += additional.area;
        perim += additional.perim;
        corners += additional.corners;
      } else {
        // If this isn't part of the plot, it counts as perimeter
        perim += 1;
      }
    }

    corners += this.numCorners(input, i, j);

    return { area, perim, corners };
  }

  numCorners(input: string[], i: number, j: number): number {
    let char = input[i].charAt(j);
    // Let's figure out corners
    const cornerDeltas = [
      [
        [0, -1],
        [-1, 0],
      ],
      [
        [0, 1],
        [-1, 0],
      ],
      [
        [0, -1],
        [1, 0],
      ],
      [
        [0, 1],
        [1, 0],
      ],
    ];

    let corners = 0;
    for (let index = 0; index < cornerDeltas.length; index++) {
      let dirs = cornerDeltas[index];
      let isCorner = true;
      for (let d of dirs) {
        isCorner = isCorner && this.getChar(input, i + d[0], j + d[1]) !== char;
      }
      if (isCorner) {
        console.log(`${i},${j} has a corner at ${index}`);
        corners += 1;
      }
    }

    // Last annoying check:
    // instances where we have an L shaped corner, the inner
    // corner doesn't fit the prior patterns
    // c
    // Cc
    // and we need to count the top right corner of C
    for (let dX = -1; dX <= 1; dX++) {
      for (let dY = -1; dY <= 1; dY++) {
        if (dX && dY === 0) {
          continue;
        }
        const isJunction =
          this.getChar(input, i + dX, j) === char &&
          this.getChar(input, i, j + dY) === char &&
          this.getChar(input, i + dX, j + dY) !== char;
        if (isJunction) {
          console.log(`${i}, ${j} is a junction!`);
          corners += 1;
        }
      }
    }
    return corners;
  }

  getChar(input: string[], i: number, j: number): null | string {
    if (i < 0 || j < 0 || i >= input.length || j >= input[i].length) {
      return null;
    }

    return input[i].charAt(j);
  }

  partTwo(input: string[]): any {
    let seen: Set<number> = new Set();
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        let stats = this.calculate(input, i, j, seen);
        ans += stats.area * stats.corners;
        if (stats.area !== 0) {
          console.log(
            `Area of ${input[i].charAt(j)} is ${stats.area} * ${stats.corners}`
          );
        }
      }
    }
    return ans;
  }
}

let sol = new Day12_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
