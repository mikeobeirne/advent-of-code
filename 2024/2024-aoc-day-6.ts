import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day6_2024 extends Solution {
  DAY = 6;

  partOne(input: string[]): any {
    let pos = this.findStartingPosition(input);
    return this.simulate(input, pos);
  }

  findStartingPosition(input: string[]): { row: number; col: number } {
    let pos = { row: -1, col: -1 };
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        let c = input[i].charAt(j);
        if (c !== "." && c !== "#") {
          pos = { row: i, col: j };
        }
      }
    }
    return pos;
  }

  simulate(input: string[], pos: { row: number; col: number }): number {
    const directions = [
      [-1, 0], // ^
      [0, 1], // >
      [1, 0], // v
      [0, -1], // <
    ];

    let seen = new Set();
    let seenWithDirection = [new Set(), new Set(), new Set(), new Set()];

    let d = -1;
    switch (input[pos.row].charAt(pos.col)) {
      case "^":
        d = 0;
        break;

      case ">":
        d = 1;
        break;

      case "v":
        d = 2;
        break;

      case "<":
        d = 3;
        break;
    }

    while (true) {
      if (pos.row < 0 || pos.col < 0) {
        break;
      }
      if (pos.row >= input.length || pos.col > input[0].length) {
        break;
      }
      let tileIndex = pos.row * input[0].length + pos.col;

      if (seenWithDirection[d].has(tileIndex)) {
        // If we've been in this same spot in this same direction, we
        // can confidently say we're looping
        // Return -1 to indicate a loop
        return -1;
      }
      seen.add(tileIndex);
      seenWithDirection[d].add(tileIndex);

      let nextSpot = {
        row: pos.row + directions[d][0],
        col: pos.col + directions[d][1],
      };
      // If a wall, turn right
      if (this.isWall(input, nextSpot.row, nextSpot.col)) {
        d = (d + 1) % 4;
      } else {
        // Else step forward
        pos = nextSpot;
      }
    }

    return seen.size;
  }

  isWall(input: string[], i: number, j: number): boolean {
    if (i < 0 || j < 0 || i >= input.length || j >= input[0].length) {
      return false;
    }
    return input[i].charAt(j) === "#";
  }

  partTwo(input: string[]): any {
    let ans = 0;
    let pos = this.findStartingPosition(input);
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        let c = input[i].charAt(j);
        let original = input[i];
        // Experiment with adding a wall
        if (c === ".") {
          input[i] = original.substring(0, j) + "#" + original.substring(j + 1);
          let isLoop = this.simulate(input, pos) === -1;
          if (isLoop) {
            console.log(i + " " + j);
            ans++;
          }
          // Revert back to how things were
          input[i] = original;
        }
      }
    }

    return ans;
  }
}

let sol = new Day6_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);

// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
