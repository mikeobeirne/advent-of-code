"use strict";

import * as utils from '../utils/aoc-utils';
import { Solution } from '../utils/solution';

/**
 * Notes from this problem:
 *  - I messed up rows/cols more than I'm proud of, let's use better variable names next time
 *  - I messed up processing handling the end of a row (i.e. forgot to flush buffer, basically)
 *  - Writing the 'is adjacent' math took longer than I'd like to admit as well
 */

type Part = {
    value: number,
    leftBound: number,
    rightBound: number,
    row: number,
};

class Day3_2023 extends Solution {
    DAY = 3;

    partOne(input: string[]): any {
        let parts = this.parseParts(input);
        let answer = 0;
        parts = parts.filter((p, index) => {
            return this.isAdjacentToSymbol(input, p);
        });
        for (let p of parts) {
            answer += p.value;
        }

        return answer;
    }

    parseParts(input: string[]): Part[] {
        let parts = [];
        for (let i = 0; i < input.length; i++) {
            let curNum = null;
            let curLeft = null;

            for (let j = 0; j < input[i].length; j++) {
                let isDigit = this.isDigit(input[i].charAt(j));

                // Are we terminating a part?
                if (!isDigit) {
                    if (curNum !== null) {
                        parts = parts.concat({ 'value': curNum, 'leftBound': curLeft, 'rightBound': j-1, 'row': i });
                        curNum = null;
                        curLeft = null;
                    }
                } else {
                    if (curNum === null) {
                        curLeft = j;
                        curNum = parseInt(input[i].charAt(j));
                    } else {
                        curNum = (curNum * 10) + parseInt(input[i].charAt(j));
                    }
                }
            }

            if (curNum !== null) {
                parts = parts.concat({ 'value': curNum, 'leftBound': curLeft, 'rightBound': j-1, 'row': i });
            }
        }

        return parts;
    }

    isAdjacentToSymbol(input: string[], part: Part) {
        for (let i = part.row - 1; i <= part.row + 1; i++) {
            for (let j = part.leftBound - 1; j <= part.rightBound + 1; j++) {
                if (this.isSymbol(input, i, j)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    isDigit(char: string) {
        return !Number.isNaN(parseInt(char));
    }

    isSymbol(input: string[], i: number, j: number): boolean {
        // If it's out of bounds, bail
        if (i < 0 || j < 0 || i >= input.length || j >= input[i].length) {
            return false;
        }
        let char = input[i].charAt(j);
        if (char === '.') {
            return false;
        }
        // we assume it's a symbol if it's not a number
        return Number.isNaN(parseInt(char));
    }

    partTwo(input: string[]): any {
        let parts = this.parseParts(input);
        let answer = 0;
        for (let i = 0; i < input.length; i++ ) {
            for (let j = 0; j < input[i].length; j++) {
                if (input[i].charAt(j) === '*') {
                    let adjparts = parts.filter(
                        (p, index) => {
                            let isAdjacent = this.isPartAdjacent(i, j, p);
                            return isAdjacent;
                        }
                    );
                    if (adjparts.length == 2) {
                        answer += adjparts[0].value * adjparts[1].value;
                    }

                }
            }
        }
        return answer;
    }

    // Gear at (i, j)
    isPartAdjacent(i: number, j: number, part: Part): boolean {
        let row = part.row;
        for (let col = part.leftBound; col <= part.rightBound; col++) {
            // if (x, y) adjacent to (i, j)
            // (0, 2) -> (1, 3)
            if (Math.abs(col - j) <= 1 && Math.abs(row - i) <= 1) {
                return true;   
            }
        }
        return false;
    }

}

// utils.runSolution(new Day3_2023(), utils.ProblemParts.One);
utils.runSolution(new Day3_2023(), utils.ProblemParts.Two);
