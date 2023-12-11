import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

/**
 * Notes for Mike:
 *  - I still need to figure out how to not waste like 20 minutes every time
 *    I need 2d arrays in Javascript, this is getting silly
 */

type PipeSection = {
  // Directionality is not really a thing
  // but can't think of better names
  in?: Position;
  out?: Position;
  pos: Position;
  isAnimal?: boolean;
};

type Position = {
  row: number;
  col: number;
};

class Day10_2023 extends Solution {
  DAY = 10;

  partOne(input: string[]): any {
    let pipes = this.parsePipes(input);
    let dist = [];
    let ans = -1;
    for (let i = 0; i < input.length; i++) {
      dist[i] = [];
      for (let j = 0; j < input[i].length; j++) {
        dist[i][j] = this.distanceToAnimal(pipes, i, j);
        ans = Math.max(ans, dist[i][j]);
      }
    }

    // for (let i = 0; i < dist.length; i++) {
    //   console.log(dist[i].join(" "));
    // }

    return ans;
  }

  parsePipes(input: string[]) {
    let pipes: PipeSection[][] = [];
    for (let i = 0; i < input.length; i++) {
      pipes[i] = [];
      for (let j = 0; j < input[i].length; j++) {
        pipes[i][j] = this.parsePipeSection(input, i, j);
      }
    }

    return pipes;
  }

  parsePipeSection(input: string[], i: number, j: number): PipeSection | null {
    if (i < 0 || i >= input.length || j < 0 || j >= input[i].length) {
      return null;
    }
    let char = input[i].charAt(j);
    if (input[i].charAt(j) === ".") {
      return null;
    }
    let ans: PipeSection = { pos: { row: i, col: j } };
    switch (char) {
      case "|":
        ans.in = { row: i - 1, col: j };
        ans.out = { row: i + 1, col: j };
        return ans;
      case "-":
        ans.in = { row: i, col: j - 1 };
        ans.out = { row: i, col: j + 1 };
        return ans;
      case "L":
        ans.in = { row: i - 1, col: j };
        ans.out = { row: i, col: j + 1 };
        return ans;
      case "J":
        ans.in = { row: i - 1, col: j };
        ans.out = { row: i, col: j - 1 };
        return ans;
      case "7":
        ans.in = { row: i + 1, col: j };
        ans.out = { row: i, col: j - 1 };
        return ans;
      case "F":
        ans.in = { row: i + 1, col: j };
        ans.out = { row: i, col: j + 1 };
        return ans;
      case "S":
        ans.isAnimal = true;
        return ans;
      default:
        throw new Error(char + " is not handled");
    }
  }

  areConnected(a: PipeSection, b: PipeSection): boolean {
    if (!this.areAdjacent(a.pos, b.pos)) {
      return false;
    }

    let aPointsToB =
      a.isAnimal || this.areEqual(a.out, b.pos) || this.areEqual(a.in, b.pos);
    let bPointsToA =
      b.isAnimal || this.areEqual(b.out, a.pos) || this.areEqual(b.in, a.pos);

    return aPointsToB && bPointsToA;
  }

  areEqual(a: Position, b: Position): boolean {
    if (a === null || b === null) {
      return false;
    }
    return a.row === b.row && a.col === b.col;
  }

  areAdjacent(a: Position, b: Position): boolean {
    let dist = Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    return dist == 0 || dist == 1;
  }

  distanceToAnimal(input: PipeSection[][], i: number, j: number): number {
    // If not a pipe present
    if (input[i][j] === null) {
      return -1;
    }
    let seen = [];
    for (let i = 0; i < input.length; i++) {
      seen[i] = [];
      for (let j = 0; j < input[i].length; j++) {
        seen[i][j] = false;
      }
    }

    seen[i][j] = true;
    let queue = [{ pipe: input[i][j], dist: 0 }];

    let safeGet = (row: number, col: number): PipeSection => {
      if (
        row < 0 ||
        col < 0 ||
        row >= input.length ||
        col >= input[row].length
      ) {
        return null;
      }
      return input[row][col];
    };

    // Do a BFS to get shortest path
    while (queue.length !== 0) {
      let entry = queue.shift();
      // We found it!
      if (input[entry.pipe.pos.row][entry.pipe.pos.col].isAnimal === true) {
        return entry.dist;
      }

      let inPipe = safeGet(entry.pipe.in.row, entry.pipe.in.col);
      if (
        inPipe !== null &&
        !seen[inPipe.pos.row][inPipe.pos.col] &&
        this.areConnected(entry.pipe, inPipe)
      ) {
        seen[inPipe.pos.row][inPipe.pos.col] = true;
        queue.push({ pipe: inPipe, dist: entry.dist + 1 });
      }
      let outPipe = safeGet(entry.pipe.out.row, entry.pipe.out.col);
      if (
        outPipe !== null &&
        !seen[outPipe.pos.row][outPipe.pos.col] &&
        this.areConnected(entry.pipe, outPipe)
      ) {
        seen[outPipe.pos.row][outPipe.pos.col] = true;
        queue.push({ pipe: outPipe, dist: entry.dist + 1 });
      }
    }

    // Didn't find it, return a value we won't consider valid
    return -1;
  }

  /**
   * Option 1: blow up the array into something like this and then
   * divide the answer by 9
   * .p.    xxx   .p.   .p.
   * .p.    ---   .pp   pp.
   * .p.    xxx   ...   ...
   *
   * Option 2: change the flood fill algo to handle pipes
   *
   * I'm a caveman, so let's do Option (1)
   */
  partTwo(input: string[]): any {
    // Part 1: Identify the piping that's connected to the animal
    // and consider anything not a part of that as a "."
    let pipes = this.parsePipes(input);
    for (let i = 0; i < input.length; i++) {
      let line = "";
      for (let j = 0; j < input[i].length; j++) {
        let dist = this.distanceToAnimal(pipes, i, j);
        if (dist === -1) {
          line += ".";
        } else {
          line += input[i].charAt(j);
        }
      }
      input[i] = line;
    }

    // Part 2: Blow up the input into a 9x scale variant
    let collisionMap = this.makeCollisionMap(input);
    // this.printMap(collisionMap);
    let numStuck = 0;
    for (let i = 0; i < input.length; i++) {
      let buffer = "";
      for (let j = 0; j < input[i].length; j++) {
        if (input[i].charAt(j) === ".") {
          let canEscape = this.canEscape(collisionMap, i, j);
          buffer += canEscape ? "O" : "~";
          if (!canEscape) {
            numStuck++;
          }
        } else {
          buffer += input[i].charAt(j);
        }
      }
      // console.log((i % 10) + " " + buffer);
    }
    return numStuck;
  }

  /**
   * Attempts to make a 3x variant of this to account
   * for the pipe collision.
   *
   * true = you can move through it
   * false = a pipe blocks your way
   */
  makeCollisionMap(input: string[]): boolean[][] {
    let map: boolean[][] = new Array(input.length * 3);
    // 2-d array init, I hate this
    for (let i = 0; i < input.length * 3; i++) {
      map[i] = [];
      for (let j = 0; j < input.length * 3; j++) {
        map[i][j] = false;
      }
    }

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        let row = i * 3;
        let col = j * 3;
        let expansionGrid = this.expandPipe(input[i].charAt(j));
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            map[r + row][c + col] = expansionGrid[r].charAt(c) === "0";
          }
        }
      }
    }

    return map;
  }

  // Given our collision map, can this make it to an edge?
  canEscape(
    map: boolean[][],
    startingRow: number,
    startingCol: number
  ): boolean {
    // Adjust for our crazy collision map
    startingRow *= 3;
    startingCol *= 3;

    let seen: boolean[][] = new Array(map.length);
    // 2-d array init, I hate this
    for (let i = 0; i < map.length; i++) {
      seen[i] = [];
      for (let j = 0; j < map[i].length; j++) {
        seen[i][j] = false;
      }
    }

    let queue = [{ row: startingRow, col: startingCol }];
    while (queue.length !== 0) {
      let cur = queue.pop();
      // We're on the edge, so we can escape!
      if (
        cur.row === 0 ||
        cur.row === map.length - 1 ||
        cur.col === 0 ||
        cur.col === map[0].length - 1
      ) {
        return true;
      }
      // Ignore seen ones
      if (seen[cur.row][cur.col]) {
        continue;
      }
      seen[cur.row][cur.col] = true;
      // Ignore 'illegal' moves
      // (we do this lazily so we don't have aggressive bound checking)
      if (map[cur.row][cur.col] === false) {
        continue;
      }

      // Attempt a move in each direction
      if (!seen[cur.row + 1][cur.col]) {
        queue.push({ row: cur.row + 1, col: cur.col });
      }
      if (!seen[cur.row][cur.col + 1]) {
        queue.push({ row: cur.row, col: cur.col + 1 });
      }
      if (!seen[cur.row - 1][cur.col]) {
        queue.push({ row: cur.row - 1, col: cur.col });
      }
      if (!seen[cur.row][cur.col - 1]) {
        queue.push({ row: cur.row, col: cur.col - 1 });
      }
    }

    // Exhausted all moves, can't escape!
    return false;
  }

  printMap(map: boolean[][]): void {
    for (let i = 0; i < map.length; i++) {
      let row = (i % 10) + ": ";
      for (let j = 0; j < map[i].length; j++) {
        row += map[i][j] ? "0" : "1";
      }
      console.log(row);
    }
  }

  expandPipe(pipe: string): string[] {
    switch (pipe) {
      case ".":
        return [
          // Format prevention comment!
          "000",
          "000",
          "000",
        ];
      case "-":
        return [
          // Format prevention comment!
          "000",
          "111",
          "000",
        ];
      case "|":
        return [
          // Format prevention comment!
          "010",
          "010",
          "010",
        ];
      case "L":
        return [
          // Format prevention comment!
          "010",
          "011",
          "000",
        ];
      case "J":
        return [
          // Format prevention comment!
          "010",
          "110",
          "000",
        ];
      case "7":
        return [
          // Format prevention comment!
          "000",
          "110",
          "010",
        ];
      case "F":
        return [
          // Format prevention comment!
          "000",
          "011",
          "010",
        ];
      // TODO: This one is weird; we may need to make it more specific
      // to what the pipe actually is...
      case "S":
        return [
          // Format prevention comment!
          "010",
          "111",
          "010",
        ];
    }
  }
}

// utils.run(new Day10_2023(), utils.ProblemParts.One);
utils.runSolution(new Day10_2023(), utils.ProblemParts.Two);
