"use strict";

import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

/**
 * Notes from this problem:
 */

class Day8_2023 extends Solution {
  DAY = 8;

  partOne(input: string[]): any {
    let pattern = input[0];
    let routes = this.parseRoutes(input);

    return this.findZCycleLength(
      pattern,
      routes,
      "AAA",
      (place) => place === "ZZZ"
    );
  }

  parseRoutes(input: string[]): {} {
    let routes = {};
    // This parsing is gross I'm sorry, one
    // day I'll learn to parse with regex properly
    for (let i = 2; i < input.length; i++) {
      let [start, paths] = input[i].split("=");
      start = start.trim();
      // (BBB, CCC)
      let [leftPath, rightPath] = paths.split(",");
      leftPath = leftPath.split("(")[1].trim();
      rightPath = rightPath.split(")")[0].trim();
      routes[start] = { L: leftPath, R: rightPath };
    }
    return routes;
  }

  /**
   * Number of moves it takes to get to ZZZ
   */
  findZCycleLength(
    pattern: string,
    routes: {},
    start: string,
    isFinished: (place: string) => boolean
  ) {
    let numMoves = 0;
    let curPlace = start;
    let pIndex = 0;
    while (!isFinished(curPlace)) {
      numMoves++;
      curPlace = routes[curPlace][pattern[pIndex]];
      pIndex = (pIndex + 1) % pattern.length;
    }
    return numMoves;
  }

  partTwo(input: string[]): any {
    let pattern = input[0];
    let routes = this.parseRoutes(input);

    // Gather all of the cycle lengths
    // (aka time to get to the finish)
    let cycleLengths = [];
    for (let place in routes) {
      // If this is a starting place
      if (place.charAt(2) === "A") {
        let cLength = this.findZCycleLength(
          pattern,
          routes,
          place,
          (p) => p.charAt(2) === "Z"
        );
        cycleLengths = cycleLengths.concat(cLength);
      }
    }
    cycleLengths = cycleLengths.sort().reverse();
    // Now just find the least common denominator of cycle lengths
    // We leverage the fact that LCM is communtative
    return cycleLengths.reduce((lcm, num) => this.lcm(lcm, num));
  }

  // Least Common Multiple
  lcm(a: number, b: number): number {
    let lcm = a;
    while (lcm % b !== 0) {
      lcm += a;
    }
    return lcm;
  }
}

// utils.runSolution(new Day8_2023(), utils.ProblemParts.One);
utils.runSolution(new Day8_2023(), utils.ProblemParts.Two);
