"use strict";

import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

/**
 * Notes from this problem:
 */

type Map = {
  source: string;
  dest: string;
  ranges: RangeMapping[];
};
type RangeMapping = {
  destStart: number;
  sourceStart: number;
  length: number;
};

type Range = {
  min: number;
  max: number;
};

class Day5_2023 extends Solution {
  DAY = 5;

  partOne(input: string[]): any {
    let seedString = input.shift().split(": ")[1];
    input.shift(); // Drop one more newline
    let seeds = seedString.split(" ").map((s) => parseInt(s));
    let maps = this.parseMaps(input);
    for (let m of maps) {
      console.log(m);
      console.log(m.ranges[0]);
    }

    let minLocation = Number.MAX_SAFE_INTEGER;
    for (let s of seeds) {
      minLocation = Math.min(minLocation, this.getLocation(s, maps));
    }
    return minLocation;
  }

  parseMaps(input: string[]): Map[] {
    let maps = [];

    for (let i = 0; i < input.length; i++) {
      let mapInput = [];
      while (i < input.length && input[i] !== "") {
        mapInput = mapInput.concat(input[i]);
        i++;
      }
      maps = maps.concat(this.parseMap(mapInput));
    }

    return maps;
  }

  parseMap(mapData: string[]): Map {
    let fullName = mapData[0].split(" ")[0];
    let source = fullName.split("-")[0];
    let dest = fullName.split("-")[2];
    let ranges = [];
    for (let i = 1; i < mapData.length; i++) {
      let [destStart, sourceStart, length] = mapData[i].split(" ");
      ranges = ranges.concat({
        destStart: parseInt(destStart),
        sourceStart: parseInt(sourceStart),
        length: parseInt(length),
      });
    }

    return {
      source,
      dest,
      ranges,
    };
  }

  getLocation(seedNum: number, maps: Map[]): number {
    let curLocation = seedNum;
    let curType = "seed";
    while (curType !== "location") {
      // console.log(curType + " " + curLocation);
      let mapToUse = maps.find((m) => m.source === curType);
      curType = mapToUse.dest;
      curLocation = this.useMap(curLocation, mapToUse);
    }
    return curLocation;
  }

  useMap(location: number, map: Map): number {
    for (let r of map.ranges) {
      // If we're in this range...
      if (r.sourceStart <= location && location < r.sourceStart + r.length) {
        // ...return the mapped offset from the destination range
        let offset = location - r.sourceStart;
        return r.destStart + offset;
      }
    }

    // If no ranges were relevant, then the mapping remains the same
    return location;
  }

  partTwo(input: string[]): any {
    return this.partTwoWorkingBackwards(input);
  }

  /**
   * This solution tries working backwards!
   */
  partTwoWorkingBackwards(input: string[]): any {
    let seedString = input.shift().split(": ")[1];
    input.shift(); // Drop one more newline
    let seeds = seedString.split(" ").map((s) => parseInt(s));
    let maps = this.parseMaps(input);

    console.log(this.getLocation(3894936732, maps));
    console.log(Number.MAX_SAFE_INTEGER);

    for (let location = 0; location < Number.MAX_SAFE_INTEGER; location++) {
      let seed = this.getSeedFromLocation(location, maps);

      // Is this seed in the valid input range?
      for (let j = 0; j < seeds.length; j = j + 2) {
        let rangeStart = seeds[j];
        let rangeLength = seeds[j + 1];
        if (seed >= rangeStart && seed <= rangeStart + rangeLength) {
          console.log("Valid location " + location + " " + seed);
          return location;
        }
      }
    }
    return 0;
  }

  getSeedFromLocation(locationNum: number, maps: Map[]): number {
    let curLocation = locationNum;
    let curType = "location";
    while (curType !== "seed") {
      // console.log(curType + " " + curLocation);
      let mapToUse = maps.find((m) => m.dest === curType);
      curType = mapToUse.source;
      curLocation = this.useMapBackwards(curLocation, mapToUse);
    }
    return curLocation;
  }

  useMapBackwards(location: number, map: Map): number {
    for (let r of map.ranges) {
      // If we're in this range...
      if (r.destStart <= location && location < r.destStart + r.length) {
        // ...return the mapped offset from the destination range
        let offset = location - r.destStart;
        return r.sourceStart + offset;
      }
    }

    // If no ranges were relevant, then the mapping remains the same
    return location;
  }
}

// Working ideas:
//  - Pad the provided maps with 'fake' ranges indicating the "stay the same"
//  - Work backwards from the lowest numbers and hope we hit it reasonably quickly

// utils.runSolution(new Day5_2023(), utils.ProblemParts.One);
utils.run(new Day5_2023(), utils.ProblemParts.Two);
