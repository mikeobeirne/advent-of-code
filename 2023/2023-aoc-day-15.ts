import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day15_2023 extends Solution {
  DAY = 15;

  partOne(input: string[]): any {
    let pieces = input[0].split(",");
    let ans = 0;
    for (let i = 0; i < pieces.length; i++) {
      let hash = this.partOneHash(pieces[i]);
      // console.log(hash);
      ans += hash;
    }
    return ans;
  }

  partOneHash(input: string): number {
    let curVal = 0;
    for (let i = 0; i < input.length; i++) {
      let v: number = input.charCodeAt(i);
      curVal += v;
      curVal *= 17;
      curVal = curVal % 256;
    }
    return curVal;
  }

  partTwo(input: string[]): any {
    let pieces = input[0].split(",");
    let ans = 0;
    let map: Map<number, {}[]> = new Map();
    for (let i = 0; i < 256; i++) {
      map.set(i, []);
    }
    let hash = 0;
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].includes("=")) {
        let label = pieces[i].split("=")[0];
        hash = this.partOneHash(label);
        let length = parseInt(pieces[i].split("=")[1]);

        let box = map.get(hash) ?? [];

        // box = box.filter()
        let idx = box.findIndex((l) => l.label === label);
        if (idx === -1) {
          box.push({ label, length });
        } else {
          box[idx].length = length;
        }
        map = map.set(hash, box);
      } else {
        let label = pieces[i].split("-")[0];
        hash = this.partOneHash(label);
        let box: any[] = map.get(hash) ?? [];

        let newBox = box.filter((l) => l.label !== label);
        map = map.set(hash, newBox);
      }
    }

    for (let i = 0; i < 256; i++) {
      let toAdd = (i + 1) * this.sumLenses(map.get(i) ?? []);
      ans += toAdd;
    }
    return ans;
  }

  sumLenses(box: { label; length }[]): number {
    let ans = 0;
    for (let i = 0; i < box.length; i++) {
      ans += (i + 1) * box[i].length;
    }
    return ans;
  }
}

let sol = new Day15_2023();
// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
