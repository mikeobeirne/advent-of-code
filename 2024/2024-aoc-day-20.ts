import { createSecureContext } from "tls";
import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

type State = {
  x: number;
  y: number;
  cost: number;
};

type Cheat = {
  xStart: number;
  yStart: number;
  xFinish: number;
  yFinish: number;
};

class Day20_2024 extends Solution {
  DAY = 20;

  partOne(input: string[]): any {
    let state: string[][] = utils.parseInto2DString(input);
    let costsWithCheats: number[] = [];

    let bogusCheat = { xStart: -1, yStart: -1, xFinish: -1, yFinish: -1 };
    let baseCost = this.solveMaze(state, bogusCheat);
    console.log(baseCost);

    const MAX_CHEAT_DISTANCE = 19;

    // Simulate all possible cheats by unsetting one wall at a time
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[0].length; j++) {
        // Can't start a cheat in the wall
        if (state[i][j] === "#") {
          continue;
        }
        for (let x = 0; x < state.length; x++) {
          for (let y = 0; y < state[0].length; y++) {
            if (utils.manhattanDistance(i, j, x, y) > MAX_CHEAT_DISTANCE) {
              continue;
            }
            // Can't technically end the cheat in the wall
            if (state[x][y] === "#") {
              continue;
            }
            let cheat = {
              xStart: i,
              yStart: j,
              xFinish: x,
              yFinish: y,
            };

            let costWithCheat = this.solveMaze(state, cheat);
            costsWithCheats.push(costWithCheat);
          }
        }
      }
    }

    // TODO:
    // Run the pathfinding naievely but save a 2-d array of "cost to the end from here".
    // Run through all possible cheats and go "cost = d(cheat spot) + d(cheat) + d(cheat end)"

    let savings = costsWithCheats
      .map((c) => baseCost - c)
      .filter((c) => c !== 0)
      .sort((a, b) => b - a);
    console.log("Overall");
    console.log(savings);

    return savings.filter((s) => s >= 100).length;
  }

  // Maps the idx to the distance to get there from start
  getDistanceMap(
    state: string[][],
    start: { x: number; y: number }
  ): Map<number, number> {
    let seen: Map<number, number> = new Map();
    let q: State[] = [{ x: start.x, y: start.y, cost: 0 }];
    while (q.length != 0) {
      let cur = q.shift()!;
      let idx = cur.x * state[0].length + cur.y;
      if (seen.has(idx)) {
        continue;
      }
      seen.set(idx, cur.cost);

      for (let d of utils.directionArray()) {
        let newX = cur.x + d[0];
        let newY = cur.y + d[1];
        if (this.canWalk(state, newX, newY)) {
          q.push({ x: newX, y: newY, cost: cur.cost + 1 });
        }
      }
    }

    return seen;
  }

  solveMaze(state: string[][], cheat: Cheat): number {
    let seen: Set<number> = new Set();
    let start = utils.findInGrid(state, "S")!;

    let q: State[] = [{ x: start.x, y: start.y, cost: 0 }];
    while (q.length != 0) {
      let cur = q.shift()!;
      let idx = cur.x * state[0].length + cur.y;
      if (seen.has(idx)) {
        continue;
      }
      seen.add(idx);

      if (state[cur.x][cur.y] === "E") {
        return cur.cost;
      }

      // Pretend the cheat allows us to effectively teleport at a cost
      if (cheat.xStart === cur.x && cheat.yStart === cur.y) {
        q.push({
          x: cheat.xFinish,
          y: cheat.yFinish,
          cost:
            cur.cost +
            utils.manhattanDistance(cur.x, cur.y, cheat.xFinish, cheat.yFinish),
        });
      }

      for (let d of utils.directionArray()) {
        let newX = cur.x + d[0];
        let newY = cur.y + d[1];
        if (this.canWalk(state, newX, newY)) {
          q.push({ x: newX, y: newY, cost: cur.cost + 1 });
        }
      }
    }

    throw new Error("lost in the maze!");
  }

  canWalk(state: string[][], i: number, j: number): boolean {
    if (!utils.isInBounds(state, i, j)) {
      return false;
    }
    return state[i][j] !== "#";
  }

  partTwo(input: string[]): any {
    let state: string[][] = utils.parseInto2DString(input);
    let cheatImprovements: number[] = [];
    const MAX_CHEAT_DISTANCE = 20;

    let start = utils.findInGrid(state, "S")!;
    let end = utils.findInGrid(state, "E")!;

    let startDistances = this.getDistanceMap(state, start);
    let endDistances = this.getDistanceMap(state, end);

    let baseDistance = startDistances.get(this.getIndex(state, end.x, end.y))!;
    console.log(`Base distance is ${baseDistance}`);

    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[0].length; j++) {
        // Can't start a cheat in the wall
        if (state[i][j] === "#") {
          continue;
        }
        for (let x = 0; x < state.length; x++) {
          for (let y = 0; y < state[0].length; y++) {
            if (utils.manhattanDistance(i, j, x, y) > MAX_CHEAT_DISTANCE) {
              continue;
            }
            // Can't technically end the cheat in the wall
            if (state[x][y] === "#") {
              continue;
            }

            let distanceToCheat = startDistances.get(
              this.getIndex(state, i, j)
            )!;
            let cheatDistance = utils.manhattanDistance(i, j, x, y);
            let cheatToEnd = endDistances.get(this.getIndex(state, x, y))!;
            // If either of these are unreachable, bail out
            if (distanceToCheat === -1 || cheatToEnd === -1) {
              continue;
            }
            let totalDistance = distanceToCheat + cheatDistance + cheatToEnd;
            cheatImprovements.push(baseDistance - totalDistance);
          }
        }
      }
    }

    cheatImprovements = cheatImprovements.filter((c) => c >= 100);
    console.log(cheatImprovements);

    return cheatImprovements.length;
  }

  getIndex(state: string[][], i: number, j: number): number {
    return i * state[0].length + j;
  }
}

let sol = new Day20_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.runSolution(sol, utils.ProblemParts.Two);
