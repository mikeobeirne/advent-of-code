import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

type Point = {
  x: number;
  y: number;
};

enum Direction {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
}

type State = {
  p: Point;
  d: Direction;
  cost: number;
  previous: State | null;
};

class Day16_2024 extends Solution {
  DAY = 16;

  partOne(input: string[]): any {
    let start = this.findStart(input);
    let queue: State[] = [
      { p: start, d: Direction.RIGHT, cost: 0, previous: null },
    ];

    const dirLookup: Map<Direction, number[]> = new Map([
      [Direction.DOWN, [1, 0]],
      [Direction.UP, [-1, 0]],
      [Direction.LEFT, [0, -1]],
      [Direction.RIGHT, [0, 1]],
    ]);

    let cache: Map<number, number>[] = [
      new Map(),
      new Map(),
      new Map(),
      new Map(),
    ];
    let best = [];
    let bestVal: null | number = null;

    while (queue.length !== 0) {
      let cur = queue.pop()!;
      // console.log(
      //   `${cur.p.x}, ${cur.p.y} (${cur.cost}) ${this.getDirectionChar(cur.d)}`
      // );
      // this.printCurPath(input, cur);

      let cacheKey = input.length * cur.p.x + cur.p.y;

      // If we've already been here more cheaply, bail
      if (cache[cur.d].has(cacheKey)) {
        if (cache[cur.d].get(cacheKey)! < cur.cost) {
          continue;
        }
      }
      cache[cur.d].set(cacheKey, cur.cost);

      if (bestVal !== null) {
        if (cur.cost > bestVal) {
          continue;
        }
      }

      if (input[cur.p.x][cur.p.y] === "E") {
        console.log(`${cur.p.x}, ${cur.p.y} (${cur.cost})`);
        this.printCurPath(input, cur);
        best.push(cur);
        bestVal = cur.cost;
        console.log(`Best val set to ${bestVal}`);
        continue;
      }
      let dir = dirLookup.get(cur.d)!;
      let newX = cur.p.x + dir[0];
      let newY = cur.p.y + dir[1];
      // Walk forward?
      if (this.isValid(input, newX, newY)) {
        queue.push({
          p: { x: newX, y: newY },
          d: cur.d,
          cost: cur.cost + 1,
          previous: cur,
        });
      }
      // Rotate right
      queue.push({
        p: cur.p,
        d: (cur.d + 1) % 4,
        cost: cur.cost + 1000,
        previous: cur,
      });

      // Rotate left
      queue.push({
        p: cur.p,
        // 3 rights makes a left lolz
        d: (cur.d - 1 + 4) % 4,
        cost: cur.cost + 1000,
        previous: cur,
      });

      queue = queue.sort((a, b) => b.cost - a.cost);
    }

    console.log(best);
    let ansCache = this.countBest(input, best);
    this.printAnswer(input, ansCache);

    return ansCache.size;
  }

  getDirectionChar(d: Direction): string {
    return ["^", ">", "v", "<"][d];
  }

  printCurPath(input: string[], state: State): void {
    let path: Set<number> = new Set();
    let cur: State | null = state;
    while (cur != null) {
      path.add(cur.p.x * input.length + cur.p.y);
      cur = cur.previous;
    }

    for (let i = 0; i < input.length; i++) {
      let buf = "";
      for (let j = 0; j < input[0].length; j++) {
        if (i === state.p.x && j === state.p.y) {
          buf += "@";
        } else if (path.has(i * input.length + j)) {
          buf += "O";
        } else {
          buf += input[i].charAt(j);
        }
      }
      console.log(buf);
    }
  }

  printAnswer(input: string[], answer: Set<number>): void {
    for (let i = 0; i < input.length; i++) {
      let buf = "";
      for (let j = 0; j < input[0].length; j++) {
        if (answer.has(i * input.length + j)) {
          buf += "O";
        } else {
          buf += input[i].charAt(j);
        }
      }
      console.log(buf);
    }
  }

  countBest(input: string[], best: State[]): Set<number> {
    let cache: Set<number> = new Set();
    for (let i = 0; i < best.length; i++) {
      let cur: State | null = best[i];
      while (cur !== null) {
        cache.add(cur.p.x * input.length + cur.p.y);
        cur = cur.previous;
      }
    }

    return cache;
  }

  getCacheKey(input: string[], s: State): number {
    let cacheKey = s.p.x * input.length + s.p.y;
    cacheKey += input.length * input[0].length * s.d;
    return cacheKey;
  }

  rotateRight(d: Direction): Direction {
    switch (d) {
      case Direction.UP:
        return Direction.RIGHT;
      case Direction.RIGHT:
        return Direction.DOWN;
      case Direction.DOWN:
        return Direction.LEFT;
      case Direction.LEFT:
        return Direction.UP;
    }
  }

  isValid(input: string[], i: number, j: number): boolean {
    if (i < 0 || j < 0 || i >= input.length || j >= input[0].length) {
      return false;
    }
    return input[i].charAt(j) !== "#";
  }

  findStart(input: string[]): Point {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (input[i].charAt(j) === "S") {
          return { x: i, y: j };
        }
      }
    }
    throw new Error("no start");
  }

  partTwo(input: string[]): any {}
}

let sol = new Day16_2024();

utils.runTest(sol, utils.ProblemParts.One);
utils.runSolution(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
// utils.runSolution(sol, utils.ProblemParts.Two);
