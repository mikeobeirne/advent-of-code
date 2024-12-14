import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";
import { Point, Direction } from "../utils/point";
import { timeStamp } from "console";

enum Tile {
  PLOT = ".",
  ROCK = "#",
}

class Day21_2023 extends Solution {
  DAY = 21;

  partOne(input: string[]): any {
    let { tiles, start } = this.parseBoard(input);

    let TARGET_STEPS = 64;

    let queue: Point[] = [start];
    let numSteps = 0;
    let lastSeen = this.getSeenState(tiles);
    let numSeen = 0;
    while (true) {
      // console.log('Step ' + numSteps);
      // this.printState(tiles, lastSeen);
      numSteps++;
      if (numSteps === TARGET_STEPS + 1) {
        break;
      }
      numSeen = 0;
      lastSeen = this.getSeenState(tiles);

      let newQueue: Point[] = [];

      for (let i = 0; i < queue.length; i++) {
        let cur = queue[i];

        let validate = (p: Point): boolean => {
          if (
            p.row < 0 ||
            p.row >= tiles.length ||
            p.col < 0 ||
            p.col >= tiles[0].length
          ) {
            return false;
          }

          if (lastSeen[p.row][p.col]) {
            return false;
          }

          if (tiles[p.row][p.col] === Tile.ROCK) {
            return false;
          }
          return true;
        };

        for (let d of [
          Direction.up,
          Direction.down,
          Direction.left,
          Direction.right,
        ]) {
          let newPoint = cur.move(d);
          if (validate(newPoint)) {
            newQueue.push(newPoint);
            lastSeen[newPoint.row][newPoint.col] = true;
            numSeen++;
          }
        }
      }
      queue = newQueue;
    }
    return numSeen;
  }

  printState(tiles: Tile[][], seen: boolean[][]): void {
    console.log("State");
    for (let i = 0; i < tiles.length; i++) {
      let buf = "";
      for (let j = 0; j < tiles[0].length; j++) {
        buf += seen[i][j] ? "O" : tiles[i][j];
      }
      console.log(buf);
    }
  }

  getSeenState(tiles: Tile[][]): boolean[][] {
    let ans: boolean[][] = [];
    for (let i = 0; i < tiles.length; i++) {
      ans[i] = [];
      for (let j = 0; j < tiles[0].length; j++) {
        ans[i][j] = false;
      }
    }
    return ans;
  }

  parseBoard(input: string[]): { tiles: Tile[][]; start: Point } {
    let ans: Tile[][] = [];
    let start: Point = new Point(-1, -1);
    for (let i = 0; i < input.length; i++) {
      ans[i] = [];
      for (let j = 0; j < input[0].length; j++) {
        if (input[i].charAt(j) === "S") {
          start = new Point(i, j);
        }
        switch (input[i].charAt(j)) {
          case ".":
            ans[i][j] = Tile.PLOT;
            break;
          case "S":
            ans[i][j] = Tile.PLOT;
            break;
          case "#":
            ans[i][j] = Tile.ROCK;
            break;
        }
      }
    }

    return {
      tiles: ans,
      start,
    };
  }

  partTwo(input: string[]): any {
    let { tiles, start } = this.parseBoard(input);

    let TARGET_STEPS = 5000;

    let queue: Point[] = [start];
    let lastSeen = this.getSeenArray(tiles);
    for (let steps = 0; steps < TARGET_STEPS; steps++) {
      // console.log("Step " + steps);
      // this.printState2(tiles, lastSeen);
      lastSeen = this.getSeenArray(tiles);

      let newQueue: Point[] = [];

      for (let i = 0; i < queue.length; i++) {
        let cur = queue[i];

        let wrapPoint = (p: Point): Point => {
          let newRow = ((p.row % tiles.length) + tiles.length) % tiles.length;
          let newCol =
            ((p.col % tiles[0].length) + tiles[0].length) % tiles[0].length;
          return new Point(newRow, newCol);
        };

        for (let d of [
          Direction.up,
          Direction.down,
          Direction.left,
          Direction.right,
        ]) {
          let newPoint = cur.move(d);
          newPoint.dir = null;
          let wrappedPoint = wrapPoint(newPoint);
          let stringRep = JSON.stringify(newPoint);
          if (tiles[wrappedPoint.row][wrappedPoint.col] === Tile.ROCK) {
            continue;
          }
          if (!lastSeen[wrappedPoint.row][wrappedPoint.col].has(stringRep)) {
            newQueue.push(newPoint);
            lastSeen[wrappedPoint.row][wrappedPoint.col].add(
              JSON.stringify(newPoint)
            );
          }
        }
      }
      queue = newQueue;
    }

    let ans = 0;
    for (let i = 0; i < lastSeen.length; i++) {
      for (let j = 0; j < lastSeen[0].length; j++) {
        ans += lastSeen[i][j].size;
      }
    }

    return ans;
  }

  // I kinda failed at this attempt because I assumed
  // I could represent the alternate universes by a simple
  // number, but if a single point walked back and forth
  // between a layer, I'd consider it 'new' universes which
  // was way over-counting

  // I had assumed this would be faster than a naive
  // approach but honestly the naive one may just work?

  partTwoFailed(input: string[]): any {
    let { tiles, start } = this.parseBoard(input);

    let TARGET_STEPS = 10;

    let queue: Point[] = [start];
    let numSteps = 0;
    let lastSeen = this.getSeenState(tiles);
    let numSeen = 0;

    let seen = this.getSeenArray(tiles);

    seen[start.row][start.col].add(JSON.stringify(start));
    for (let step = 0; step < TARGET_STEPS; step++) {
      let nextSeen = this.getSeenArray(tiles);
      this.printState2(tiles, seen);

      // Walk each square
      for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[0].length; j++) {
          if (tiles[i][j] === Tile.ROCK) {
            continue;
          }

          let wrapPoint = (p: Point): Point => {
            let newRow = (p.row + tiles.length) % tiles.length;
            let newCol = (p.col + tiles[0].length) % tiles[0].length;
            return new Point(newRow, newCol);
          };
          for (let l of seen[i][j]) {
            // Propagate seen 'layers' to neighbors
            let cur: Point = JSON.parse(l);
            console.log(cur);
            console.log(l);
            for (let d of [
              Direction.up,
              Direction.down,
              Direction.left,
              Direction.right,
            ]) {
              let newPoint = cur.move(d);
              // Properly align the new point
              let wrappedPoint = wrapPoint(newPoint);
              if (tiles[wrappedPoint.row][wrappedPoint.col] === Tile.ROCK) {
                continue;
              }

              nextSeen[wrappedPoint.row][wrappedPoint.col].add(
                JSON.stringify(newPoint)
              );
            }
          }
        }
      }

      seen = nextSeen;
    }
    this.printState2(tiles, seen);

    let ans = 0;
    for (let i = 0; i < seen.length; i++) {
      for (let j = 0; j < seen[0].length; j++) {
        ans += seen[i][j].size;
      }
    }
    return ans;
  }

  getSeenArray(tiles: Tile[][]): Set<string>[][] {
    let seen: Set<string>[][] = [];
    for (let i = 0; i < tiles.length; i++) {
      seen[i] = [];
      for (let j = 0; j < tiles[0].length; j++) {
        seen[i][j] = new Set();
      }
    }
    return seen;
  }

  printState2(tiles: Tile[][], seen: Set<string>[][]): void {
    console.log("State");
    for (let i = 0; i < tiles.length; i++) {
      let buf = "";
      for (let j = 0; j < tiles[0].length; j++) {
        buf += seen[i][j].size !== 0 ? seen[i][j].size : tiles[i][j];
      }
      console.log(buf);
    }
  }
}

let sol = new Day21_2023();
// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
utils.runTest(sol, utils.ProblemParts.Two);
// utils.run(sol, utils.ProblemParts.Two);
