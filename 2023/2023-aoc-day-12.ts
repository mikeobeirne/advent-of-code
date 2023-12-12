import { stringify } from "querystring";
import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

class Day12_2023 extends Solution {
  DAY = 12;

  partOne(input: string[]): any {
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      let [map, toParse] = input[i].split(" ");
      let order = toParse.split(",").map((num) => parseInt(num));
      ans += this.numValidCombos(map, order);
    }
    return ans;
  }

  numValidCombos(map: string, order: number[]): number {
    // Option 1: Generate all combos that fit x,y,z and retroactively check them
    let allCombos = this.backtrack("", map);
    allCombos = allCombos.filter((c) => this.validate(c, order));
    return allCombos.length;
  }

  // Generate all possible combinations (adhering to the map), we'll
  // check them later
  backtrack(curString: string, map: string): string[] {
    if (curString.length === map.length) {
      return [curString];
    }
    let ans: string[] = [];
    let nextIndex = curString.length;
    // If a wildcard, try both
    if (map.charAt(nextIndex) === "?") {
      return ans.concat(
        this.backtrack(curString + ".", map),
        this.backtrack(curString + "#", map)
      );
    } else {
      return this.backtrack(curString + map.charAt(nextIndex), map);
    }
  }

  validate(pattern: string, order: number[]): boolean {
    let thisOrder: number[] = [];
    let curStreak = 0;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern.charAt(i) === ".") {
        thisOrder.push(curStreak);
        curStreak = 0;
      } else {
        curStreak++;
      }
    }
    thisOrder.push(curStreak);
    thisOrder = thisOrder.filter((num) => num !== 0);

    if (thisOrder.length !== order.length) {
      return false;
    }
    for (let i = 0; i < order.length; i++) {
      if (thisOrder[i] !== order[i]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Part 2 times out pretty aggressively, so it's
   * reasonably clear that this should actually be a dynamic programming
   * solution, which can be modeled as such
   *
   * solution(i, n): the number of ways at index i of the 'map' at index
   * n of the 'grouping' list.
   *
   * That's probably enough to prevent re-calculating things a bajillion times
   */
  partTwo(input: string[]): any {
    let ans = 0;
    for (let i = 0; i < input.length; i++) {
      this.resetCache();

      let [map, toParse] = input[i].split(" ");
      // I'm a clown and this was how I represented the modifications to the
      // inputs
      let order = toParse.split(",").map((num) => parseInt(num));
      map = map + "?" + map + "?" + map + "?" + map + "?" + map;
      let groupSizes = order.concat(order, order, order, order);

      ans += this.batchBacktrack("", map, 0, groupSizes);
    }
    return ans;
  }

  /**
   * Is this how you do caches/static state in JS!?
   */
  resetCache(): void {
    Day12_2023.cache = [];
    for (let i = 0; i < 1000; i++) {
      Day12_2023.cache[i] = [];
      for (let j = 0; j < 1000; j++) {
        Day12_2023.cache[i][j] = -1;
      }
    }
  }

  // Cache used for memoizing subsets of the solution
  static cache: number[][];

  batchBacktrack(
    curString: string,
    map: string,
    groupIndex: number,
    groupSizes: number[]
  ): number {
    if (curString.length === map.length) {
      let baseCase = this.validate(curString, groupSizes) ? 1 : 0;
      Day12_2023.cache[curString.length][groupIndex] = baseCase;
      return baseCase;
    }
    // If cached, return it
    let cacheVal = Day12_2023.cache[curString.length][groupIndex];
    if (cacheVal !== -1) {
      return cacheVal;
    }
    let ans: number = 0;
    let nextIndex = curString.length;

    let canHash =
      map.charAt(nextIndex) === "#" || map.charAt(nextIndex) === "?";
    let canDot = map.charAt(nextIndex) === "." || map.charAt(nextIndex) === "?";

    // If we drop a '.', proceed one step forward
    if (canDot) {
      ans += this.batchBacktrack(curString + ".", map, groupIndex, groupSizes);
    }

    // If we drop a #, we try to finish out the run of #'s
    if (canHash) {
      // If we choose to drop a #, we have to do it in a run of
      // a specified length. Let's check if that is even possible
      let numHashes =
        groupIndex >= groupSizes.length ? 0 : groupSizes[groupIndex];
      let isLegal = numHashes !== 0; // If the run is 0, this isn't legal (since we're out of hash groups to allocate)

      for (let i = 0; i < numHashes; i++) {
        // If this would put us past the total length possible, bail
        if (nextIndex + i >= map.length) {
          isLegal = false;
        }
        // ... or if there's not already a # or a ?
        else if (map.charAt(nextIndex + i) === ".") {
          isLegal = false;
        }
      }
      // Finally, we need a . to terminate the run (or ensure this the end of the line)
      let needExplicitEnd = curString.length + numHashes !== map.length;

      // This isn't legal if we can't place a . there (if one is needed)
      if (needExplicitEnd && map.charAt(nextIndex + numHashes) === "#") {
        isLegal = false;
      }

      if (isLegal) {
        let batch = "#".repeat(numHashes) + (needExplicitEnd ? "." : "");
        ans += this.batchBacktrack(
          curString + batch,
          map,
          groupIndex + 1,
          groupSizes
        );
      }
    }

    Day12_2023.cache[curString.length][groupIndex] = ans;
    return ans;
  }
}

let sol = new Day12_2023();
// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
