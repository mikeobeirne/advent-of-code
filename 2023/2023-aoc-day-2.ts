import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

type GameMax = {
  blue: number;
  red: number;
  green: number;
};

class Day2_2023 extends Solution {
  DAY = 2;

  partOne(input: string[]): string {
    let ans = 0;
    for (let idx in input) {
      let game = input[idx];
      let maxPossible = this.gameToMaximum(game);
      // console.log(game);
      // console.log(maxPossible);
      if (
        maxPossible.red <= 12 &&
        maxPossible.green <= 13 &&
        maxPossible.blue <= 14
      ) {
        // console.log("Possible");
        ans += Number.parseInt(idx) + 1;
      } else {
        // console.log("Not possible");
      }
    }
    return ans.toString();
  }

  gameToMaximum(game: string): GameMax {
    game = game.split(":")[1].trim(); // Chop off 'Game:'
    let maxPossible = {
      blue: 0,
      red: 0,
      green: 0,
    };
    let rounds = game.split(";");
    // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    for (let r of rounds) {
      let max = this.roundToMaximum(r);
      for (let c in maxPossible) {
        maxPossible[c] = Math.max(maxPossible[c], max[c]);
      }
    }

    return maxPossible;
  }

  // 1 blue, 2 green; ==> {"blue": 1, "green": 2, "red": 0}
  roundToMaximum(round: string): GameMax {
    let max = {
      blue: 0,
      red: 0,
      green: 0,
    };
    for (let cube of round.split(",")) {
      cube = cube.trim();
      let amount = Number.parseInt(cube.split(" ")[0]);
      let color = cube.split(" ")[1];
      max[color] = Math.max(max[color], amount);
    }
    return max;
  }

  partTwo(input: string[]): any {
    let ans = 0;
    for (let idx in input) {
      let game = input[idx];
      let maxPossible = this.gameToMaximum(game);
      // console.log(game);
      // console.log(maxPossible);
      let power = maxPossible.blue * maxPossible.green * maxPossible.red;
      ans += power;
    }
    return ans.toString();
  }
}

// utils.runSolution(new Day2_2023(), utils.ProblemParts.One);
utils.runSolution(new Day2_2023(), utils.ProblemParts.Two);
