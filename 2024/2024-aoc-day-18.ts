import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

type State = {
  row: number;
  col: number;
  cost: number;
  prev: State | null;
};

class Day18_2024 extends Solution {
  DAY = 18;

  partOne(input: string[]): any {
    let state = this.setupState(input, 1024);
    this.solve(state);
  }

  solve(state: number[][]): number {
    let cache: Set<number> = new Set();
    let queue: State[] = [{ row: 0, col: 0, cost: 0, prev: null }];

    let solution: null | State = null;

    while (queue.length !== 0) {
      let cur = queue.shift()!;
      let idx = cur.row * state.length + cur.col;
      if (cache.has(idx)) {
        continue;
      }
      cache.add(idx);

      if (cur.row === state.length - 1 && cur.col === state[0].length - 1) {
        solution = cur;
        break;
      }

      const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (let d of dirs) {
        let newRow = cur.row + d[0];
        let newCol = cur.col + d[1];
        if (this.canStep(state, newRow, newCol)) {
          queue.push({
            row: newRow,
            col: newCol,
            cost: cur.cost + 1,
            prev: cur,
          });
        }
      }
    }

    let ans = solution?.cost;

    while (solution != null) {
      state[solution.row][solution.col] = 8;
      solution = solution.prev;
    }

    // utils.printArr(state);

    return ans ?? -1;
  }

  canStep(state: number[][], i: number, j: number) {
    if (i < 0 || j < 0 || i >= state.length || j >= state[0].length) {
      return false;
    }
    return state[i][j] !== 1;
  }

  setupState(input: string[], numBytes: number): number[][] {
    const NUM_ROWS = 71;
    const NUM_COLS = 71;
    const NUM_TO_CONSIDER = numBytes;

    let board: number[][] = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      board[i] = [];
      for (let j = 0; j < NUM_COLS; j++) {
        board[i][j] = 0;
      }
    }

    for (let i = 0; i < Math.min(NUM_TO_CONSIDER, input.length); i++) {
      let x = parseInt(input[i].split(",")[0]);
      let y = parseInt(input[i].split(",")[1]);
      board[y][x] = 1;
    }

    return board;
  }

  partTwo(input: string[]): any {
    for (let numBytes = 0; numBytes < input.length; numBytes++) {
      let state = this.setupState(input, numBytes);
      let sol = this.solve(state);
      if (sol === -1) {
        return input[numBytes - 1];
      }
    }
    return -1;
  }
}

let sol = new Day18_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
