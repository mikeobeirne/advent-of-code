import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

enum RockType {
  NONE = ".",
  ROCK = "O",
  SQUARE_ROCK = "#",
}

class Day14_2023 extends Solution {
  DAY = 14;

  partOne(map: string[]): any {
    let parsed = this.parseInput(map);
    parsed = this.slideNorth(parsed);

    return this.calculateAnswer(parsed);
  }

  slideNorth(parsed: RockType[][]): RockType[][] {
    while (true) {
      let somethingMoved = false;
      for (let i = 0; i < parsed.length; i++) {
        for (let j = 0; j < parsed[0].length; j++) {
          if (parsed[i][j] !== RockType.ROCK) {
            continue;
          }

          let newRow = i;
          while (newRow - 1 >= 0 && parsed[newRow - 1][j] === RockType.NONE) {
            newRow--;
          }
          if (newRow !== i) {
            somethingMoved = true;
            parsed[i][j] = RockType.NONE;
            parsed[newRow][j] = RockType.ROCK;
          }
        }
      }

      if (!somethingMoved) {
        break;
      }
    }
    return parsed;
  }

  printMap(map: RockType[][]) {
    console.log("MAP:");
    for (let i = 0; i < map.length; i++) {
      let buf = "";
      for (let j = 0; j < map[0].length; j++) {
        buf += map[i][j];
      }
      console.log((i % 10) + " " + buf);
    }
  }

  rotateMapRight(map: RockType[][]): RockType[][] {
    let newMap: RockType[][] = [];
    for (let j = 0; j < map[0].length; j++) {
      newMap[j] = [];
    }

    let index = 0;
    for (let j = 0; j < map[0].length; j++) {
      for (let i = map.length - 1; i >= 0; i--) {
        let newRow = Math.floor(index / map[0].length);
        let newCol = index % map[0].length;
        newMap[newRow][newCol] = map[i][j];
        index++;
      }
    }
    return newMap;
  }

  parseInput(map: string[]): RockType[][] {
    let parsed: RockType[][] = [];
    for (let i = 0; i < map.length; i++) {
      parsed[i] = [];
      for (let j = 0; j < map[0].length; j++) {
        let cell = map[i].charAt(j);
        if (cell === ".") {
          parsed[i].push(RockType.NONE);
        }
        if (cell === "O") {
          parsed[i].push(RockType.ROCK);
        }
        if (cell === "#") {
          parsed[i].push(RockType.SQUARE_ROCK);
        }
      }
    }
    return parsed;
  }

  calculateAnswer(map: RockType[][]): number {
    let ans = 0;
    for (let i = 0; i < map.length; i++) {
      let rowValue = map.length - i;
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === RockType.ROCK) {
          ans += rowValue;
        }
      }
    }
    return ans;
  }

  partTwo(input: string[]): any {
    let parsed = this.parseInput(input);
    let cache = new Map();
    let MAX_CYCLES = 1000000000;
    for (let cycle = 0; cycle < MAX_CYCLES; cycle++) {
      let key = this.getKey(parsed);

      // Try to find cycles and 'shortcut'
      if (cache.has(key)) {
        let numCycles = cycle - cache.get(key);
        console.log("cycle found!");
        console.log(cache.get(key) + " -> " + cycle);
        let jumped = false;
        while (cycle + numCycles < MAX_CYCLES) {
          jumped = true;
          cycle += numCycles;
        }
        if (jumped) {
          console.log("Jumped forward to " + cycle);
        }
      }

      cache.set(key, cycle);
      // North
      parsed = this.slideNorth(parsed);
      parsed = this.rotateMapRight(parsed);

      // West
      parsed = this.slideNorth(parsed);
      parsed = this.rotateMapRight(parsed);

      // South
      parsed = this.slideNorth(parsed);
      parsed = this.rotateMapRight(parsed);

      // East
      parsed = this.slideNorth(parsed);
      parsed = this.rotateMapRight(parsed);
      // this.printMap(parsed);
    }
    return this.calculateAnswer(parsed);
  }

  getKey(map: RockType[][]): string {
    let key = "";
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        key += map[i][j];
      }
    }

    return key;
  }
}

let sol = new Day14_2023();
// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
