import * as utils from '../utils/aoc-utils';
import { Solution } from '../utils/solution';


class Day1_2023 extends Solution {
  DAY = 1;

  partOne(input: string[]): any {
    let answer = [];
    for (let line in input) {
      let firstDigit = 0;
      let lastDigit = 0;
      for (let i = 0; i < line.length; i++) {
        let maybeInt = parseInt(line.charAt(i));
        let maybeSpelled = this.spelledVal(line.substring(i));
        if (maybeSpelled !== null) {
          firstDigit = maybeSpelled;
          break;
        } else if (!Number.isNaN(maybeInt)) {
          firstDigit = maybeInt;
          break;
        }
      }
      for (let i = line.length - 1; i >= 0; i--) {
        let maybeInt = parseInt(line.charAt(i));
        let maybeSpelled = this.spelledVal(line.substring(i));
        if (maybeSpelled !== null) {
          lastDigit = maybeSpelled;
          break;
        } else if (!Number.isNaN(maybeInt)) {
          lastDigit = maybeInt;
          break;
        }
      }
      answer = answer.concat(firstDigit * 10 + lastDigit);
    }
    return answer.reduce((partialSum, a) => partialSum + a, 0);
  }

  partTwo(input: string[]): any {
    let answer = input.map((line: string) => {
      let firstDigit = 0;
      let lastDigit = 0;
      for (let i = 0; i < line.length; i++) {
        let maybeInt = parseInt(line.charAt(i));
        let maybeSpelled = this.spelledVal(line.substring(i));
        if (maybeSpelled !== null) {
          firstDigit = maybeSpelled;
          break;
        } else if (!Number.isNaN(maybeInt)) {
          firstDigit = maybeInt;
          break;
        }
      }
      for (let i = line.length - 1; i >= 0; i--) {
        let maybeInt = parseInt(line.charAt(i));
        let maybeSpelled = this.spelledVal(line.substring(i));
        if (maybeSpelled !== null) {
          lastDigit = maybeSpelled;
          break;
        } else if (!Number.isNaN(maybeInt)) {
          lastDigit = maybeInt;
          break;
        }
      }
      return firstDigit * 10 + lastDigit;
    });
    return (answer.reduce((partialSum, a) => partialSum + a, 0)).toString();
  }

  spelledVal = (line: string) => {
    let lookup = {
      "one": 1,
      "two": 2,
      "three": 3,
      "four": 4,
      "five": 5,
      "six": 6,
      "seven": 7,
      "eight": 8,
      "nine": 9,
    };
    for (let key in lookup) {
      if (line.startsWith(key)) {
        return lookup[key];
      }
    }
    return null;
  }
}

utils.runSolution(new Day1_2023(), utils.ProblemParts.One);
utils.runSolution(new Day1_2023(), utils.ProblemParts.Two);
