"use strict";

import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

/**
 * Notes from this problem:
 */

class Day6_2023 extends Solution {
  DAY = 6;

  partOne(input: string[]): any {
    let parse = (line: string) =>
      line
        .split(":")[1]
        .split(" ")
        .map((t) => parseInt(t))
        .filter((t) => !Number.isNaN(t));
    let times = parse(input[0]);
    let distances = parse(input[1]);

    let ans = 1;
    for (let i = 0; i < times.length; i++) {
      let numWaysToWin = 0;
      let time = times[i];
      for (let holdTime = 0; holdTime <= time; holdTime++) {
        let dTraveled = holdTime * (time - holdTime);
        if (dTraveled > distances[i]) {
          numWaysToWin++;
        }
      }
      ans = ans * numWaysToWin;
    }
    return ans;
  }

  partTwo(input: string[]): any {
    let parse = (line: string) => {
      let nums = line
        .split(":")[1]
        .split(" ")
        .filter((t) => t !== "");
      let totalNum = parseInt(nums.join(""));
      return [totalNum];
    };

    let times = parse(input[0]);
    let distances = parse(input[1]);
    console.log(times);
    console.log(distances);

    let ans = 1;
    for (let i = 0; i < times.length; i++) {
      let numWaysToWin = 0;
      let time = times[i];
      for (let holdTime = 0; holdTime <= time; holdTime++) {
        let dTraveled = holdTime * (time - holdTime);
        if (dTraveled > distances[i]) {
          numWaysToWin++;
        }
      }
      ans = ans * numWaysToWin;
    }
    return ans;
  }
}

// utils.runSolution(new Day6_2023(), utils.ProblemParts.One);
utils.runSolution(new Day6_2023(), utils.ProblemParts.Two);
