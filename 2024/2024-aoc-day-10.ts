import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day10_2024 extends Solution {
  DAY = 10;

  partOne(input: string[]): any {
    let seen: Set<number> = new Set();
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (input[i].charAt(j) === "0") {
          let canSee = new Set(this.dfs(input, i, j, new Set()));
          console.log(`Trailhead at ${i}, ${j} has size ${canSee.size}`);
          ans += canSee.size;
          for (let n of canSee) {
            // console.log(
            //   `adding ${Math.floor(n / input.length)} ${n % input.length}`
            // );
            seen.add(n);
          }
        }
      }
    }
    return ans;
  }

  dfs(
    input: string[],
    i: number,
    j: number,
    visited: Set<number>
  ): Set<number> {
    let ans: Set<number> = new Set();
    if (visited.has(i * input.length + j)) {
      return new Set();
    }
    visited.add(i * input.length + j);
    let curTile = this.getTile(input, i, j);
    // console.log(`${i} ${j}: ${curTile}`);

    if (curTile === 9) {
      ans = ans.add(i * input.length + j);
    }

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    for (let d of directions) {
      let next = this.getTile(input, i + d[0], j + d[1]);
      if (next == curTile + 1) {
        let dfsResult = this.dfs(
          input,
          i + d[0],
          j + d[1],
          new Set([...visited])
        );
        for (let n of dfsResult) {
          ans.add(n);
        }
      }
    }
    return ans;
  }

  getTile(input: string[], i: number, j: number): number {
    if (i < 0 || j < 0 || i >= input.length || j >= input[0].length) {
      return -1;
    }
    return parseInt(input[i].charAt(j));
  }

  partTwo(input: string[]): any {
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (input[i].charAt(j) === "0") {
          let rank = this.dfs2(input, i, j, new Set());
          console.log(`Trailhead at ${i}, ${j} has rank ${rank}`);
          ans += rank;
        }
      }
    }
    return ans;
  }

  dfs2(input: string[], i: number, j: number, visited: Set<number>): number {
    let ans = 0;
    if (visited.has(i * input.length + j)) {
      return 0;
    }
    visited.add(i * input.length + j);
    let curTile = this.getTile(input, i, j);
    // console.log(`${i} ${j}: ${curTile}`);

    if (curTile === 9) {
      return 1;
    }

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    for (let d of directions) {
      let next = this.getTile(input, i + d[0], j + d[1]);
      if (next == curTile + 1) {
        let dfsResult = this.dfs2(
          input,
          i + d[0],
          j + d[1],
          new Set([...visited])
        );
        ans += dfsResult;
      }
    }
    return ans;
  }
}

let sol = new Day10_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
