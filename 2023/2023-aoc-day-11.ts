import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

type Position = {
  row: number;
  col: number;
};

class Day11_2023 extends Solution {
  DAY = 11;

  partOne(input: string[]): any {
    // Go over all rows
    let emptyCols = new Array(input[0].length).fill(false);
    let emptyRows = new Array(input.length).fill(false);
    for (let i = 0; i < input.length; i++) {
      let isEmpty: boolean = true;
      for (let j = 0; j < input[i].length; j++) {
        if (input[i].charAt(j) !== ".") {
          isEmpty = false;
        }
      }
      if (isEmpty) {
        emptyRows[i] = true;
      }
    }

    // Go over all cols
    for (let j = 0; j < input[0].length; j++) {
      let isEmpty: boolean = true;
      for (let i = 0; i < input.length; i++) {
        if (input[i].charAt(j) !== ".") {
          isEmpty = false;
        }
      }
      if (isEmpty) {
        emptyCols[j] = true;
      }
    }

    let galaxies = [];
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (input[i].charAt(j) === "#") {
          galaxies.push({ row: i, col: j });
        }
      }
    }

    let ans = 0;
    for (let g1 = 0; g1 < galaxies.length; g1++) {
      for (let g2 = g1 + 1; g2 < galaxies.length; g2++) {
        let galaxyA = galaxies[g1];
        let galaxyB = galaxies[g2];
        let dist =
          Math.abs(galaxyA.row - galaxyB.row) +
          Math.abs(galaxyA.col - galaxyB.col);

        // Guaranteed to be gA row <= gB row due to how we sorted
        for (let r = galaxyA.row; r <= galaxyB.row; r++) {
          if (emptyRows[r]) {
            dist++;
            // Part 2: dist += 1000000 - 1;
          }
        }
        for (
          let c = Math.min(galaxyA.col, galaxyB.col);
          c <= Math.max(galaxyA.col, galaxyB.col);
          c++
        ) {
          if (emptyCols[c]) {
            dist++;
            // Part 2: dist += 1000000 - 1;
          }
        }
        // console.log("Galaxy " + (g1 + 1) + "-" + (g2 + 1) + " : " + dist);

        ans += dist;
      }
    }
    return ans;
  }

  partTwo(input: string[]): any {
    // I was lazy and just inlined the part 2 logic into part 1 since it was so trivial
  }
}

let sol = new Day11_2023();
utils.runTest(sol, utils.ProblemParts.One);
utils.run(sol, utils.ProblemParts.One);
utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
