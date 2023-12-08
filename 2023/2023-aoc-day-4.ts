"use strict";

import * as utils from '../utils/aoc-utils';
import { Solution } from '../utils/solution';

/**
 * Notes from this problem:
 */

class Day4_2023 extends Solution {
    DAY = 4

    partOne(input: string[]): any {
        let totalAnswer = 0;
        for (let card of input) {
            // Cut off 'Card __:'
            card = card.split(":")[1].trim();
            let winners = new Set(card.split("|")[0].trim().split(" "));
            let myNums = card.split("|")[1].trim().split(" ").filter(s => s !== '');

            let power = 0;
            for (let n of myNums) {
                if (winners.has(n)) {
                    power++;
                }
            }
            let ans = 0;
            if (power !== 0) {
                ans = Math.pow(2, power - 1);
            }
            totalAnswer += ans;
        }
        return totalAnswer;
    }

    partTwo(input: string[]): any {
        let totalAnswer = 0;
        for (let card of input) {
            // Cut off 'Card __:'
            card = card.split(":")[1].trim();
            let winners = new Set(card.split("|")[0].trim().split(" "));
            let myNums = card.split("|")[1].trim().split(" ").filter(s => s !== '');

            let power = 0;
            for (let n of myNums) {
                if (winners.has(n)) {
                    power++;
                }
            }
            let ans = 0;
            if (power !== 0) {
                ans = Math.pow(2, power - 1);
            }
            totalAnswer += ans;
        }
        return totalAnswer;
    }
}

utils.runSolution(new Day4_2023(), utils.ProblemParts.One);
// utils.runSolution(new Day3_2023(), utils.ProblemParts.Two);
