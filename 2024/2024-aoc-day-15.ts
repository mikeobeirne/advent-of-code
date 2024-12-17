import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

enum Cell {
  EMPTY = ".",
  WALL = "#",
  BLOCK = "O",
  BOT = "@",

  BLOCK_LEFT = "[",
  BLOCK_RIGHT = "]",
}
type Point = {
  x: number;
  y: number;
};

class Day15_2024 extends Solution {
  DAY = 15;

  partOne(input: string[]): any {
    let blank = input.findIndex((val) => val.length === 0);
    let state = this.parseInput(input.slice(0, blank));
    let instructions = input.slice(blank + 1).join("");

    for (let i = 0; i < instructions.length; i++) {
      // this.printState(state);
      this.simulateMove(state, instructions.charAt(i));
    }

    return this.calculateAns(state);
  }

  printState(state: Cell[][]): void {
    for (let i = 0; i < state.length; i++) {
      let buf = "";
      for (let j = 0; j < state[0].length; j++) {
        if (state[i][j] === Cell.BLOCK) {
          buf += "O";
        }
        if (state[i][j] === Cell.BOT) {
          buf += "@";
        }
        if (state[i][j] === Cell.EMPTY) {
          buf += ".";
        }
        if (state[i][j] === Cell.WALL) {
          buf += "#";
        }
      }
      console.log(buf);
    }
    console.log("\n");
  }

  calculateAns(state: Cell[][]): number {
    let ans = 0;
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[0].length; j++) {
        if (state[i][j] === Cell.BLOCK || state[i][j] === Cell.BLOCK_LEFT) {
          ans += 100 * i + j;
        }
      }
    }
    return ans;
  }

  simulateMove(state: Cell[][], move: string): void {
    let botPos = this.findBot(state);
    const lookup = new Map([
      ["^", [-1, 0]],
      ["v", [1, 0]],
      [">", [0, 1]],
      ["<", [0, -1]],
    ]);
    this.pushStuff(state, botPos.x, botPos.y, lookup.get(move)!);
  }

  isWall(state: Cell[][], i: number, j: number): boolean {
    if (i < 0 || j < 0 || i >= state.length || j >= state[0].length) {
      return true;
    }
    return state[i][j] === Cell.WALL;
  }

  pushStuff(state: Cell[][], i: number, j: number, dir: number[]): void {
    const isVerticalMove = dir[0] !== 0;
    let curI = i;
    let curJ = j;
    while (true) {
      // If we encounter a wall at any point in this direction, we bail out
      // of movement completely
      if (this.isWall(state, curI, curJ)) {
        return;
      }
      if (state[curI][curJ] === Cell.EMPTY) {
        break;
      }
      curI += dir[0];
      curJ += dir[1];
    }
    // Walk backwards from the open space and shift stuff over
    while (true) {
      if (curI === i && curJ === j) {
        state[curI][curJ] = Cell.EMPTY;
        break;
      }
      state[curI][curJ] = state[curI - dir[0]][curJ - dir[1]];
      curI -= dir[0];
      curJ -= dir[1];
    }
  }

  push(state: Cell[][], i: number, j: number, dir: number[]): void {
    // console.log(`push ${i}, ${j}`);
    if (this.isWall(state, i, j)) {
      return;
    }
    if (state[i][j] === Cell.EMPTY) {
      return;
    }

    let isVertical = dir[0] !== 0;
    if (
      isVertical &&
      (state[i][j] === Cell.BLOCK_LEFT || state[i][j] === Cell.BLOCK_RIGHT)
    ) {
      let offset = state[i][j] === Cell.BLOCK_LEFT ? 1 : -1;
      this.push(state, i + dir[0], j + dir[1], dir);
      this.push(state, i + dir[0], j + offset + dir[1], dir);
      state[i + dir[0]][j + dir[1]] = state[i][j];
      state[i + dir[0]][j + offset + dir[1]] = state[i][j + offset];
      state[i][j + offset] = Cell.EMPTY;
      state[i][j] = Cell.EMPTY;
      return;
    }
    this.push(state, i + dir[0], j + dir[1], dir);

    state[i + dir[0]][j + dir[1]] = state[i][j];
    state[i][j] = Cell.EMPTY;
  }

  // Can we push the blocks in the direction?
  canPush(state: Cell[][], i: number, j: number, dir: number[]): boolean {
    if (this.isWall(state, i, j)) {
      return false;
    }
    if (state[i][j] === Cell.EMPTY) {
      return true;
    }

    let isVertical = dir[0] !== 0;
    if (
      isVertical &&
      (state[i][j] === Cell.BLOCK_LEFT || state[i][j] === Cell.BLOCK_RIGHT)
    ) {
      let offset = state[i][j] === Cell.BLOCK_LEFT ? 1 : -1;
      return (
        this.canPush(state, i + dir[0], j + dir[1], dir) &&
        this.canPush(state, i + dir[0], j + offset + dir[1], dir)
      );
    }
    return this.canPush(state, i + dir[0], j + dir[1], dir);
  }

  findBot(state: Cell[][]): Point {
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[0].length; j++) {
        if (state[i][j] === Cell.BOT) {
          return { x: i, y: j };
        }
      }
    }
    throw new Error("bot not found!");
  }

  parseInput(input: string[]): Cell[][] {
    let ans: Cell[][] = [];
    const lookup = new Map([
      ["#", Cell.WALL],
      ["O", Cell.BLOCK],
      [".", Cell.EMPTY],
      ["@", Cell.BOT],
    ]);
    for (let i = 0; i < input.length; i++) {
      ans[i] = [];
      for (let j = 0; j < input[0].length; j++) {
        const val = lookup.get(input[i].charAt(j))!;
        ans[i][j] = val;
      }
    }
    return ans;
  }

  parseInputPart2(input: string[]): Cell[][] {
    let ans: Cell[][] = [];
    const lookup = new Map([
      ["#", Cell.WALL],
      ["O", Cell.BLOCK],
      [".", Cell.EMPTY],
      ["@", Cell.BOT],
    ]);
    for (let i = 0; i < input.length; i++) {
      ans[i] = [];
      for (let j = 0; j < input[0].length; j++) {
        const val = lookup.get(input[i].charAt(j))!;
        if (val === Cell.BLOCK) {
          ans[i][2 * j] = Cell.BLOCK_LEFT;
          ans[i][2 * j + 1] = Cell.BLOCK_RIGHT;
        } else if (val === Cell.BOT) {
          ans[i][2 * j] = Cell.BOT;
          ans[i][2 * j + 1] = Cell.EMPTY;
        } else {
          ans[i][2 * j] = val;
          ans[i][2 * j + 1] = val;
        }
      }
    }
    return ans;
  }

  partTwo(input: string[]): any {
    let blank = input.findIndex((val) => val.length === 0);
    let state = this.parseInputPart2(input.slice(0, blank));
    let instructions = input.slice(blank + 1).join("");

    for (let i = 0; i < instructions.length; i++) {
      // utils.printArr(state);
      // console.log(" ");
      // console.log(" ");

      let botPos = this.findBot(state);
      const lookup = new Map([
        ["^", [-1, 0]],
        ["v", [1, 0]],
        [">", [0, 1]],
        ["<", [0, -1]],
      ]);
      let move = instructions[i];
      let dir = lookup.get(move)!;
      if (this.canPush(state, botPos.x, botPos.y, dir)) {
        this.push(state, botPos.x, botPos.y, dir);
      }
    }
    // utils.printArr(state);

    return this.calculateAns(state);
  }
}

let sol = new Day15_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
