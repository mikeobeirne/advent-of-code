import { doesNotThrow } from "assert";
import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";
import { uptime } from "process";

type State = {
  point: Point;
  cost: number;
  prev: State | null;
};

enum Direction {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
}

class Point {
  row: number;
  col: number;
  dir: Direction | null;

  constructor(r: number, c: number, dir: Direction | null = null) {
    this.row = r;
    this.col = c;
    this.dir = dir;
  }

  move(dir: Direction): Point {
    let newCol = this.col + { up: 0, down: 0, left: -1, right: 1 }[dir];
    let newRow = this.row + { up: -1, down: 1, left: 0, right: 0 }[dir];

    return new Point(newRow, newCol, dir);
  }
}

// Hilarious bug, somehow had arrays that contained references to the same goddamn array

class Day17_2023 extends Solution {
  DAY = 17;

  partOne(input: string[]): any {
    let map = this.parse(input);
    let cache: number[][][] = [];
    for (let i = 0; i < map.length; i++) {
      cache[i] = [];
      for (let j = 0; j < map[0].length; j++) {
        cache[i][j] = [];
        for (let k = 0; k < 4; k++) {
          cache[i][j][k] = Number.MAX_SAFE_INTEGER;
        }
      }
    }

    let queue: State[] = [
      { point: new Point(0, 0, Direction.right), cost: 0, prev: null },
      { point: new Point(0, 0, Direction.down), cost: 0, prev: null },
    ];

    let inBounds = (row: number, col: number) => {
      return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
    };
    let oppositeDir = (dir: Direction) => {
      return { up: "down", down: "up", left: "right", right: "left" }[dir];
    };
    let dirIndex = (dir: Direction) => {
      return ["up", "down", "left", "right"].findIndex((d) => d === dir);
    };

    while (queue.length !== 0) {
      // Get the current 'cheapest'
      // Not very efficient, yay javascript
      queue.sort((a, b) => b.cost - a.cost);
      let cur = queue.pop()!;
      let p = cur.point;
      // console.log(p.row + " " + p.col + " (" + cur.cost + ") " + p.dir);

      // if (p.row === 12 && p.col === 12) {
      //   console.log("destination");
      //   this.printPath(cur);
      // }

      if (cur.cost >= cache[p.row][p.col][dirIndex(p.dir!)]) {
        continue;
      }

      cache[p.row][p.col][dirIndex(p.dir!)] = cur.cost;

      for (let newDir of [
        Direction.up,
        Direction.down,
        Direction.left,
        Direction.right,
      ]) {
        let newCost: number = cur.cost;
        let newPoint = new Point(p.row, p.col, newDir);
        // We don't want to continue the way we have
        // and no point in backtracking
        if (newDir === p.dir || newDir === oppositeDir(p.dir!)) {
          continue;
        }

        for (let numSteps = 1; numSteps <= 3; numSteps++) {
          newPoint = newPoint.move(newDir);

          if (!inBounds(newPoint.row, newPoint.col)) {
            continue;
          }
          newCost += map[newPoint.row][newPoint.col];
          queue.push({ point: newPoint, cost: newCost, prev: cur });
        }
      }
    }
    // console.log(cache[input.length - 1][input[0].length - 1]);
    // Return the lowest value
    return Math.min(...cache[input.length - 1][map[0].length - 1]);
  }

  printPath(p: State): void {
    let path: Point[] = [];
    while (true) {
      path.push(p.point);
      if (p.prev === null) {
        break;
      }
      p = p.prev;
    }
    path = path.reverse();

    console.log("PATH");
    for (let i = 0; i < path.length; i++) {
      console.log(path[i].row + " " + path[i].col);
    }
  }

  parse(input: string[]): number[][] {
    let map: number[][] = new Array(input.length)
      .fill([])
      .map((_) => new Array(input[0].length).fill(-1));
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        map[i][j] = parseInt(input[i].charAt(j));
      }
    }
    return map;
  }

  partTwo(input: string[]): any {
    let map = this.parse(input);
    let cache: number[][][] = [];
    for (let i = 0; i < map.length; i++) {
      cache[i] = [];
      for (let j = 0; j < map[0].length; j++) {
        cache[i][j] = [];
        for (let k = 0; k < 4; k++) {
          cache[i][j][k] = Number.MAX_SAFE_INTEGER;
        }
      }
    }

    let queue: State[] = [
      { point: new Point(0, 0, Direction.right), cost: 0, prev: null },
      { point: new Point(0, 0, Direction.down), cost: 0, prev: null },
    ];

    let inBounds = (row: number, col: number) => {
      return row >= 0 && row < map.length && col >= 0 && col < map[0].length;
    };
    let oppositeDir = (dir: Direction) => {
      return { up: "down", down: "up", left: "right", right: "left" }[dir];
    };
    let dirIndex = (dir: Direction) => {
      return ["up", "down", "left", "right"].findIndex((d) => d === dir);
    };

    let bucketQueue: State[][] = [];
    for (let i = 0; i < 10000; i++) {
      bucketQueue[i] = [];
    }
    bucketQueue[0].push(
      { point: new Point(0, 0, Direction.right), cost: 0, prev: null },
      { point: new Point(0, 0, Direction.down), cost: 0, prev: null }
    );

    let index = 0;
    while (index < 10000) {
      while (bucketQueue[index].length === 0) {
        // console.log(index);
        index++;
      }
      let cur = bucketQueue[index].pop()!;
      let p = cur.point;
      // console.log(p.row + " " + p.col + " (" + cur.cost + ") " + p.dir);

      if (p.row === map.length - 1 && p.col === map[0].length - 1) {
        console.log(cur.cost);
        console.log("destination");
        // this.printPath(cur);
      }

      if (cur.cost >= cache[p.row][p.col][dirIndex(p.dir!)]) {
        continue;
      }

      cache[p.row][p.col][dirIndex(p.dir!)] = cur.cost;

      for (let newDir of [
        Direction.up,
        Direction.down,
        Direction.left,
        Direction.right,
      ]) {
        let newCost: number = cur.cost;
        let newPoint = new Point(p.row, p.col, newDir);
        // We don't want to continue the way we have
        // and no point in backtracking
        if (newDir === p.dir || newDir === oppositeDir(p.dir!)) {
          continue;
        }

        for (let numSteps = 1; numSteps <= 10; numSteps++) {
          newPoint = newPoint.move(newDir);

          if (!inBounds(newPoint.row, newPoint.col)) {
            continue;
          }
          newCost += map[newPoint.row][newPoint.col];
          if (numSteps >= 4) {
            bucketQueue[newCost].push({
              point: newPoint,
              cost: newCost,
              prev: cur,
            });
            // queue.push({ point: newPoint, cost: newCost, prev: cur });
          }
        }
      }
    }
    // console.log(cache[input.length - 1][input[0].length - 1]);
    // Return the lowest value
    return Math.min(...cache[map.length - 1][map[0].length - 1]);
  }
}

let sol = new Day17_2023();
// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
