"use strict";

import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

/**
 * Notes from this problem:
 */

class Day9_2023 extends Solution {
  DAY = 9;

  partOne(input: string[]): any {
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      let seq = input[i]
        .split(" ")
        .map((num) => parseInt(num))
        .filter((n) => !Number.isNaN(n));
      console.log(seq);

      let e = this.extrapolate(seq);
      ans += e;
    }

    return ans;
  }

  extrapolate(seq: number[]): number {
    let sequences = [];
    sequences[0] = seq;
    let curSeq = seq;
    for (let i = 1; i < seq.length; i++) {
      if (curSeq.every((v) => v === 0)) {
        break;
      }
      let diff = this.getDifferenceArray(curSeq);
      sequences[i] = diff;
      curSeq = diff;
    }
    for (let i = 0; i < sequences.length; i++) {
      console.log(" ".repeat(2 * i) + sequences[i].join(" "));
    }
    // console.log(sequences);

    let curExtrap = 0;
    for (let i = sequences.length - 1; i >= 1; i--) {
      console.log(curExtrap);
      let nextSeq = sequences[i - 1];
      curExtrap = nextSeq[nextSeq.length - 1] + curExtrap;
    }
    return curExtrap;
  }

  getDifferenceArray(seq: number[]): number[] {
    let differences = [];
    for (let i = 0; i < seq.length - 1; i++) {
      differences = differences.concat(seq[i + 1] - seq[i]);
    }
    return differences;
  }

  partTwo(input: string[]): any {
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      let seq = input[i]
        .split(" ")
        .map((num) => parseInt(num))
        .filter((n) => !Number.isNaN(n));

      let e = this.extrapolateFront(seq);
      ans += e;
    }

    return ans;
  }

  extrapolateFront(seq: number[]): number {
    let sequences = [];
    sequences[0] = seq;
    let curSeq = seq;
    for (let i = 1; i < seq.length; i++) {
      if (curSeq.every((v) => v === 0)) {
        break;
      }
      let diff = this.getDifferenceArray(curSeq);
      sequences[i] = diff;
      curSeq = diff;
    }
    // for (let i = 0; i < sequences.length; i++) {
    //   console.log(" ".repeat(2 * i) + sequences[i].join(" "));
    // }
    // console.log(sequences);

    let curExtrap = 0;
    for (let i = sequences.length - 1; i >= 1; i--) {
      let nextSeq = sequences[i - 1];
      curExtrap = nextSeq[0] - curExtrap;
    }
    return curExtrap;
  }
}

// utils.runSolution(new Day9_2023(), utils.ProblemParts.One);
utils.runSolution(new Day9_2023(), utils.ProblemParts.Two);
