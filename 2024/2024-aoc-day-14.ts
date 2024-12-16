import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

enum QUAD {
  UP_LEFT = 0,
  UP_RIGHT = 1,
  DOWN_LEFT = 2,
  DOWN_RIGHT = 3,
}

type Input = {
  pX: number;
  pY: number;
  vX: number;
  vY: number;
};

class Day14_2024 extends Solution {
  DAY = 14;

  partOne(input: string[]): any {
    const NUM_ROWS = 103;
    const NUM_COLS = 101;
    const NUM_STEPS = 100;

    let movers = [];
    for (let i = 0; i < input.length; i++) {
      movers.push(this.parseVelocity(input[i]));
    }

    let resultMap: Map<QUAD, number> = new Map();
    for (let i = 0; i < movers.length; i++) {
      let coords = this.simulate(NUM_ROWS, NUM_COLS, movers[i], NUM_STEPS);
      // console.log(coords);
      let quad = this.toQuad(NUM_ROWS, NUM_COLS, coords.x, coords.y);
      // console.log(quad);
      if (quad !== null) {
        let num = resultMap.get(quad) ?? 0;
        resultMap.set(quad, num + 1);
      }
    }

    return (
      resultMap.get(QUAD.UP_LEFT)! *
      resultMap.get(QUAD.UP_RIGHT)! *
      resultMap.get(QUAD.DOWN_LEFT)! *
      resultMap.get(QUAD.DOWN_RIGHT)!
    );
  }

  simulate(
    numRows: number,
    numCols: number,
    mover: Input,
    numSteps: number
  ): { x: number; y: number } {
    let finalX = (mover.pX + numSteps * mover.vX) % numRows;
    if (finalX < 0) {
      finalX += numRows;
    }
    let finalY = (mover.pY + numSteps * mover.vY) % numCols;
    if (finalY < 0) {
      finalY += numCols;
    }

    return {
      x: finalX,
      y: finalY,
    };
  }

  // Parses into our representation:
  // x = row
  // y = col
  parseVelocity(input: string): Input {
    const regex = /p\=(-?\d+),(-?\d+) v\=(-?\d+),(-?\d+)/g;
    let result = regex.exec(input)!;

    return {
      pX: parseInt(result[2]),
      pY: parseInt(result[1]),
      vX: parseInt(result[4]),
      vY: parseInt(result[3]),
    };
  }

  toQuad(
    numRows: number,
    numCols: number,
    row: number,
    col: number
  ): QUAD | null {
    // if on the boundary
    let midpointHeight = Math.floor(numRows / 2);
    let midpointWidth = Math.floor(numCols / 2);
    if (row == midpointHeight || col === midpointWidth) {
      return null;
    }

    if (row < midpointHeight) {
      return col < midpointWidth ? QUAD.UP_LEFT : QUAD.UP_RIGHT;
    }
    return col < midpointWidth ? QUAD.DOWN_LEFT : QUAD.DOWN_RIGHT;
  }

  runSimulation(input: string[], numSec: number): boolean {
    const NUM_ROWS = 103;
    const NUM_COLS = 101;
    const NUM_STEPS = numSec;

    let movers = [];
    for (let i = 0; i < input.length; i++) {
      movers.push(this.parseVelocity(input[i]));
    }

    let coords: number[][] = [];
    for (let i = 0; i < NUM_ROWS; i++) {
      coords[i] = [];
      for (let j = 0; j < NUM_COLS; j++) {
        coords[i][j] = 0;
      }
    }

    for (let i = 0; i < movers.length; i++) {
      let c = this.simulate(NUM_ROWS, NUM_COLS, movers[i], NUM_STEPS);
      coords[c.x][c.y] += 1;
    }

    // Look for a straight line
    let shouldPrint = false;
    for (let i = 0; i < coords.length; i++) {
      let maxConsec = 0;
      let curRun = 0;
      for (let j = 0; j < coords[i].length; j++) {
        if (coords[i][j] > 0) {
          curRun++;
        } else {
          maxConsec = Math.max(curRun, maxConsec);
          curRun = 0;
        }
      }
      if (maxConsec > 10 || curRun > 10) {
        shouldPrint = true;
      }
    }
    if (shouldPrint) {
      console.log(numSec);
      this.printIt(coords);
      console.log("");
      return true;
    }
    return false;
  }

  partTwo(input: string[]): any {
    for (let i = 0; i < 10000; i++) {
      setTimeout(() => {}, 1000);
      if (this.runSimulation(input, i)) {
        return i;
      }
    }
    return 0;
  }

  printIt(nums: number[][]): void {
    for (let i = 0; i < nums.length; i++) {
      let buf = "";
      for (let j = 0; j < nums[i].length; j++) {
        if (nums[i][j] === 0) {
          buf += " ";
        } else {
          buf += nums[i][j].toString();
        }
      }
      console.log(buf);
    }
    console.log(
      "-------------------------------------------------------------"
    );
  }
}

let sol = new Day14_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);
// // utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
