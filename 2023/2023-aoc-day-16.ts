import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

enum MirrorType {}

class Day16_2023 extends Solution {
  DAY = 16;

  partOne(input: string[]): any {
    let seen = this.makeSeenArray(input);

    this.dfs(input, 0, 0, "right", seen);

    let ans = this.getChargeCount(seen);
    return ans;
  }

  dfs(
    input: string[],
    curRow: number,
    curCol: number,
    dir: string,
    seen: boolean[][][]
  ): void {
    if (
      curRow < 0 ||
      curCol < 0 ||
      curRow >= input.length ||
      curCol >= input[0].length
    ) {
      return;
    }
    if (seen[curRow][curCol][this.directionToNum(dir)]) {
      return;
    }
    seen[curRow][curCol][this.directionToNum(dir)] = true;
    let curType = input[curRow].charAt(curCol);

    switch (curType) {
      case "|":
        if (dir === "left" || dir === "right") {
          this.dfs(input, curRow - 1, curCol, "up", seen);
          this.dfs(input, curRow + 1, curCol, "down", seen);
        } else {
          this.dfs(
            input,
            dir === "up" ? curRow - 1 : curRow + 1,
            curCol,
            dir,
            seen
          );
        }
        break;
      case "-":
        if (dir === "left" || dir === "right") {
          this.dfs(
            input,
            curRow,
            dir === "left" ? curCol - 1 : curCol + 1,
            dir,
            seen
          );
        } else {
          this.dfs(input, curRow, curCol - 1, "left", seen);
          this.dfs(input, curRow, curCol + 1, "right", seen);
        }
        break;
      case "/":
        if (dir === "left") {
          this.dfs(input, curRow + 1, curCol, "down", seen);
        } else if (dir === "right") {
          this.dfs(input, curRow - 1, curCol, "up", seen);
        } else if (dir === "up") {
          this.dfs(input, curRow, curCol + 1, "right", seen);
        } else if (dir === "down") {
          this.dfs(input, curRow, curCol - 1, "left", seen);
        }
        break;
      case "\\":
        if (dir === "left") {
          this.dfs(input, curRow - 1, curCol, "up", seen);
        } else if (dir === "right") {
          this.dfs(input, curRow + 1, curCol, "down", seen);
        } else if (dir === "up") {
          this.dfs(input, curRow, curCol - 1, "left", seen);
        } else if (dir === "down") {
          this.dfs(input, curRow, curCol + 1, "right", seen);
        }
        break;
      case ".":
        if (dir == "left" || dir === "right") {
          this.dfs(
            input,
            curRow,
            dir === "left" ? curCol - 1 : curCol + 1,
            dir,
            seen
          );
        } else {
          this.dfs(
            input,
            dir === "up" ? curRow - 1 : curRow + 1,
            curCol,
            dir,
            seen
          );
        }
        break;
    }
  }

  directionToNum(dir: string): number {
    return ["up", "down", "left", "right"].findIndex((d) => d === dir);
  }

  partTwo(input: string[]): any {
    let maxAns = -1;
    for (let startingRow = 0; startingRow < input.length; startingRow++) {
      for (let type = 0; type < 2; type++) {
        let seen = this.makeSeenArray(input);
        this.dfs(
          input,
          startingRow,
          type === 0 ? 0 : input[0].length - 1,
          type === 0 ? "right" : "left",
          seen
        );

        let ans = this.getChargeCount(seen);
        maxAns = Math.max(maxAns, ans);
      }
    }

    for (let startingCol = 0; startingCol < input[0].length; startingCol++) {
      for (let type = 0; type < 2; type++) {
        let seen = this.makeSeenArray(input);
        this.dfs(
          input,
          type === 0 ? 0 : input.length - 1,
          startingCol,
          type === 0 ? "down" : "up",
          seen
        );

        let ans = this.getChargeCount(seen);
        maxAns = Math.max(maxAns, ans);
      }
    }

    return maxAns;
  }

  makeSeenArray(input: string[]): boolean[][][] {
    let seen: boolean[][][] = [];
    for (let i = 0; i < input.length; i++) {
      seen[i] = [];
      for (let j = 0; j < input[0].length; j++) {
        seen[i][j] = Array(4).fill(false);
      }
    }
    return seen;
  }

  getChargeCount(seen: boolean[][][]): number {
    let ans = 0;
    for (let i = 0; i < seen.length; i++) {
      for (let j = 0; j < seen[i].length; j++) {
        let charged: boolean = false;
        for (let k = 0; k < 4; k++) {
          if (seen[i][j][k]) {
            charged = true;
          }
        }
        if (charged) {
          ans++;
        }
      }
    }
    return ans;
  }
}

let sol = new Day16_2023();
// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
