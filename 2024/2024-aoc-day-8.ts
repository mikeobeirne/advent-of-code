import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day8_2024 extends Solution {
  DAY = 8;

  partOne(input: string[]): any {
    let coords = new Map<string, { x: number; y: number }[]>();

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        let c = input[i].charAt(j);
        if (c === ".") {
          continue;
        }
        let map = coords.get(c) ?? [];
        map = map.concat({ x: i, y: j });
        coords.set(c, map);
      }
    }

    let seen = new Set();

    for (let entry of coords) {
      let cds = entry[1];
      let nodes = this.findAntinodes(cds, input.length, input[0].length);
      for (let i = 0; i < nodes.length; i++) {
        let n = nodes[i];
        if (
          n.x >= 0 &&
          n.x < input.length &&
          n.y >= 0 &&
          n.y < input[0].length
        ) {
          // console.log(`${n.x} ${n.y}`);
          seen.add(n.x * input.length + n.y);
        }
      }
    }

    return seen.size;
  }

  findAntinodes(
    coords: { x: number; y: number }[],
    maxX: number,
    maxY: number
  ): { x: number; y: number }[] {
    coords = coords.sort((a, b) => {
      if (a.x != b.x) {
        return a.x - b.x;
      }
      return a.y - b.y;
    });
    let ans: { x: number; y: number }[] = [];
    for (let i = 0; i < coords.length; i++) {
      for (let j = 0; j < coords.length; j++) {
        if (i === j) {
          continue;
        }
        ans = ans.concat(coords[i], coords[j]);
        let xDist = coords[i].x - coords[j].x;
        let yDist = coords[i].y - coords[j].y;
        let gcd = this.gcd(Math.abs(xDist), Math.abs(yDist));
        console.log({
          gcd,
          xDist,
          yDist,
        });
        xDist = xDist / gcd;
        yDist = yDist / gcd;
        let coord1 = { x: coords[i].x + xDist, y: coords[i].y + yDist };
        let coord2 = { x: coords[j].x - xDist, y: coords[j].y - yDist };
        // console.log(coords[i]);
        // console.log(coords[j]);
        // console.log(coord1);
        // console.log(coord2);
        // console.log(" ");
        while (
          coord1.x >= 0 &&
          coord1.y >= 0 &&
          coord1.x < maxX &&
          coord1.y < maxY
        ) {
          ans = ans.concat(coord1);
          coord1 = { x: coord1.x + xDist, y: coord1.y + yDist };
        }
        while (
          coord2.x >= 0 &&
          coord2.y >= 0 &&
          coord2.x < maxX &&
          coord2.y < maxY
        ) {
          ans = ans.concat(coord2);
          coord2 = { x: coord2.x + xDist, y: coord2.y + yDist };
        }
      }
    }

    // - - - - - - - x
    // - - - - x - - -

    return ans;
  }

  gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {
      var temp = a;
      a = b;
      b = temp;
    }
    while (true) {
      if (b == 0) return a;
      a %= b;
      if (a == 0) return b;
      b %= a;
    }
  }

  primeFactorsSlow(n: number): number[] {
    let factors = [],
      f = 2;
    while (n > 1) {
      if (n % f === 0) {
        factors.push(f);
        n /= f;
      } else {
        f++;
      }
    }
    return factors;
  }

  lcmFunction(a: number, b: number): number {
    const gcdValue = this.gcd(a, b);
    return (a * b) / gcdValue;
  }

  lcd(a: number, b: number): number {
    if (a === 0 || b === 0) {
      return 0; // LCD is 0 if either number is 0
    }
    return Math.abs(a * b) / this.gcd(a, b);
  }

  partTwo(input: string[]): any {}
}

let sol = new Day8_2024();

utils.runTest(sol, utils.ProblemParts.One);
utils.runSolution(sol, utils.ProblemParts.One);

// utils.runTest(sol, utils.ProblemParts.Two);
// utils.runSolution(sol, utils.ProblemParts.Two);
