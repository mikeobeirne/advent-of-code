import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";
import { Point, Direction } from "../utils/point";


class Day18_2023 extends Solution {
  DAY = 18;

  partOne(input: string[]): any {
    let board = this.createBoard(input);
    // board = this.trimInput(board);
    let ans = 0;
    for (let i = 0; i < board.length; i++) {
      let buf = "";
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== -1) {
          ans++;
        }
        buf += board[i][j] >= 0 ? "#" : ".";
      }
      console.log(buf + " " + (i % 2));
    }

    return ans;
    // utils.printArr(board);
  }

  createBoard(input: string[]): number[][] {
    let ans: number[][] = [];
    for (let i = 0; i < 600; i++) {
      ans[i] = [];
      for (let j = 0; j < 600; j++) {
        ans[i][j] = -1;
      }
    }

    let rowOffset = 300;
    let colOffset = 300;
    let cur = new Point(rowOffset, colOffset);

    for (let i = 0; i < input.length; i++) {
      // console.log("Instruction " + i);
      let [rawDir, stepsString, rawHex] = input[i].split(" ");
      let numSteps = parseInt(stepsString);
      let hex = Number("0x" + rawHex.substring(2, rawHex.length - 1));
      let dir = {
        U: Direction.up,
        L: Direction.left,
        R: Direction.right,
        D: Direction.down,
      }[rawDir]!;
      if (cur.row >= 600 || cur.col >= 600) {
        throw new Error("Out of bounds!");
      }
      ans[cur.row][cur.col] = hex;
      // console.log(cur.row + " " + cur.col);
      for (let s = 0; s < numSteps; s++) {
        cur = cur.move(dir);
        ans[cur.row][cur.col] = hex;
      }
    }

    // Now walk those directions again but attempt to flood fill on either end
    cur = new Point(rowOffset, colOffset);
    for (let i = 0; i < input.length; i++) {
      let [rawDir, stepsString, rawHex] = input[i].split(" ");
      let numSteps = parseInt(stepsString);
      let hex = Number("0x" + rawHex.substring(2, rawHex.length - 1));
      let dir = {
        U: Direction.up,
        L: Direction.left,
        R: Direction.right,
        D: Direction.down,
      }[rawDir]!;
      // console.log(cur.row + " " + cur.col);
      for (let s = 0; s < numSteps; s++) {
        cur = cur.move(dir);
        // Now look to our right, and attempt a fill on that cell
        let right = cur.moveRelative(Direction.right);
        ans = this.flood(ans, right.row, right.col);
        return ans;
      }
    }

    // for (let i = 0; i <= rowMax; i++) {
    //   finalAns[i] = [];
    //   for (let j = 0; j <= colMax; j++) {
    //     finalAns[i][j] = ans[i][j];
    //   }
    // }

    // Now we go through and label the interior pieces
    // for (let i = 0; i < finalAns.length; i++) {
    //   let numWalls = 0;
    //   for (let j = 0; j < finalAns[0].length; j++) {
    //     if (finalAns[i][j] !== -1) {
    //       numWalls++;
    //       // Continue walking the length of the wall
    //       while (j < finalAns[0].length - 1 && finalAns[i][j + 1] !== -1) {
    //         j++;
    //       }
    //     } else {
    //       finalAns[i][j] = numWalls % 2 === 1 ? 0 : -1;
    //     }
    //   }
    // }

    return ans;
  }

  flood(board: number[][], startRow: number, startCol: number): number[][] {
    let queue = [new Point(startRow, startCol)];
    while (queue.length !== 0) {
      let cur = queue.pop()!;
      // If out of bounds, skip
      if (
        cur.row < 0 ||
        cur.col < 0 ||
        cur.row >= board.length ||
        cur.col >= board[0].length
      ) {
        continue;
      }
      // If already filled in
      if (board[cur.row][cur.col] >= 0) {
        continue;
      }
      board[cur.row][cur.col] = 0;

      queue = queue.concat([
        cur.move(Direction.up),
        cur.move(Direction.down),
        cur.move(Direction.left),
        cur.move(Direction.right),
      ]);
    }
    return board;
  }

  trimInput(board: number[][]): number[][] {
    let maxRow = 0;
    let minRow = board.length - 1;
    let maxCol = 0;
    let minCol = board[0].length;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== -1) {
          minRow = Math.min(minRow, i);
          maxRow = Math.max(maxRow, i);
          minCol = Math.min(minCol, j);
          maxCol = Math.max(maxCol, j);
        }
      }
    }

    let ans: number[][] = [];
    for (let i = minRow; i <= maxRow; i++) {
      ans[i - minRow] = [];
      for (let j = minCol; j <= maxCol; j++) {
        ans[i - minRow][j - minRow] = board[i][j];
      }
    }

    return ans;
  }

  partTwo(input: string[]): any {
    let parsedInput = this.parseInput(input);

    // Let's try this one with coordinate compression
    let coordinates = this.getCoordinates(parsedInput);
    for (let c of coordinates) {
      console.log(c);
    }

    let rowSet = new Set([...coordinates].sort((a, b) => a.row - b.row).map(p => p.row));
    let rows = this.injectSpace(Array.from(rowSet));
    let colSet = new Set([...coordinates].sort((a, b) => a.col - b.col).map(p => p.col));
    let cols = this.injectSpace(Array.from(colSet));

    // Create a compressed 2-d array
    let cMap: string[][] = [];
    for (let i = 0; i < rows.length; i++) {
      cMap[i] = [];
      for (let j = 0; j < cols.length; j++) {
        cMap[i][j] = ".";
      }
    }

    // Re-walk the array and plop down our boundaries
    let cur = new Point(0, 0);
    while (rows[cur.row] !== 0) {
      cur = cur.move(Direction.down);
    }
    while (cols[cur.col] !== 0) {
      cur = cur.move(Direction.right);
    }
    let initialPoint = cur;
    for (let i = 0; i < parsedInput.length; i++) {
      utils.printArr(cMap);
      let {dir, numSteps} = parsedInput[i];
      // The next coordinate
      let coordinate = coordinates[(i+1)%coordinates.length];

      // Walk along our compressed map
      cMap[cur.row][cur.col] = "#";
      while (rows[cur.row] !== coordinate.row || cols[cur.col] !== coordinate.col) {
        cur = cur.move(dir);
        cMap[cur.row][cur.col] = "#";
      }
    }

    console.log("pre-flood");
    utils.printArr(cMap);
    console.log(" ");

    cMap = this.flood2(cMap, initialPoint.row+1, initialPoint.col+1);
    console.log("post flood");
    utils.printArr(cMap);

    return this.sumBoard(cMap, rows, cols);
  }

  flood2(board: string[][], startRow: number, startCol: number): string[][] {
    let queue = [new Point(startRow, startCol)];
    while (queue.length !== 0) {
      let cur = queue.pop()!;
      // If out of bounds, skip
      if (
        cur.row < 0 ||
        cur.col < 0 ||
        cur.row >= board.length ||
        cur.col >= board[0].length
      ) {
        continue;
      }
      // If already filled in
      if (board[cur.row][cur.col] === '#') {
        continue;
      }
      board[cur.row][cur.col] = '#';

      queue = queue.concat([
        cur.move(Direction.up),
        cur.move(Direction.down),
        cur.move(Direction.left),
        cur.move(Direction.right),
      ]);
    }
    return board;
  }

  sumBoard(board: string[][], rows: number[], cols: number[]): number {
    let ans = 0; 
    for (let i = 0; i < board.length-1; i++) {
      for (let j = 0; j < board[0].length-1; j++) {
        if (board[i][j] === '#' && board[i+1][j] === '#' && board[i][j+1] === '#' && board[i+1][j+1] === '#') {
          let a =  Math.abs(rows[i+1] - rows[i] + 1)  * Math.abs(cols[j+1] - cols[j] + 1);
          ans += a;
        }
      }
    }
    return ans;
  }

  // Given a coordinate space, injects 
  // additional coordinates between each one
  injectSpace(arr: number[]): number[] {
    let withSpace = new Set([...arr]);
    for (let i = 0; i < arr.length - 1; i++) {
      withSpace.add(arr[i]-1);
      withSpace.add(arr[i]+1);
    }
    let ans = Array.from(withSpace);
    ans.sort((a, b) => a-b);
    return ans;
  }

  parseInput(input: string[]): {dir: Direction, numSteps: number}[] {
    let ans = [];
    for (let i = 0; i < input.length; i++) {
      // console.log("Instruction " + i);
      let [rawDir, stepsString, rawHex] = input[i].split(" ");
      let numSteps = parseInt(stepsString);
      let dir = {
        U: Direction.up,
        L: Direction.left,
        R: Direction.right,
        D: Direction.down,
      }[rawDir]!;
      ans.push({dir, numSteps});
    }

    return ans;
  }

  parseInputHex(input: string[]): {dir: Direction, numSteps: number}[] {
    // return [
    //   {dir: Direction.right, numSteps: 1},
    //   {dir: Direction.down, numSteps: 1},
    //   {dir: Direction.left, numSteps: 1},
    //   {dir: Direction.up, numSteps: 1},
    // ];
    let ans = [];
    for (let i = 0; i < input.length; i++) {
      let rawHex = input[i].split(" ")[2];
      let {dir, numSteps} = this.parseHex(rawHex);
      ans.push({dir, numSteps});
    }

    return ans;
  }

  getCoordinates(parsedInput: {dir: Direction, numSteps: number}[]): Point[] {
    let cur = new Point(0, 0);
    let coords = [cur];
    for (let i = 0; i < parsedInput.length; i++) {
      let {dir, numSteps} = parsedInput[i];
      let dirVec = this.getDirectionVector(dir);

      let newRow = cur.row + dirVec[0] * numSteps;
      let newCol = cur.col + dirVec[1] * numSteps;

      cur = new Point(newRow, newCol);
      coords.push(cur);
    }
    // There's always a redundant (0, 0) added
    coords.pop();

    return coords;
  }

  getDirectionVector(dir: Direction): number[] {
    return {
      "up": [-1, 0],
      "down": [1, 0],
      "left": [0, -1],
      "right": [0, 1],
    }[dir];
  }

  parseHex(rawHex: string): {dir: Direction, numSteps: number} {
      let hex = rawHex.substring(2, rawHex.length - 1);
      let directionIdx = Number("0x" + hex.charAt(hex.length - 1));
      let dir = [Direction.right, Direction.down, Direction.left, Direction.up][directionIdx];
      let numSteps = Number("0x" + hex.substring(0, hex.length -1 ));

      return {dir, numSteps};
  }
}

let sol = new Day18_2023();
// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
utils.runTest(sol, utils.ProblemParts.Two);
// utils.run(sol, utils.ProblemParts.Two);
