import { readFileSync } from 'fs';

const DAY = 7;
const path = `aoc-${DAY}-input.txt`;
const testPath = `aoc-${DAY}-input-test.txt`;

let input = readFileSync(path, 'utf-8').toString().split('\n');
//input = readFileSync(testPath, 'utf-8').toString().split('\n');


// -------------------- PART 1 --------------------

// -------------------- PART 2 --------------------


let lineNumber = 0;
let answer = [];
while (lineNumber < input.length) {

    let line = input[lineNumber];
    let firstDigit = 0;
    let lastDigit = 0;
    for (let i = 0; i < line.length; i++) {
        let maybeInt = parseInt(line.charAt(i));
        if (!Number.isNaN(maybeInt))  {
            firstDigit = maybeInt;
            break;
        }
    }
    for (let i = line.length - 1; i >= 0; i--) {
        let maybeInt = parseInt(line.charAt(i));
        if (!Number.isNaN(maybeInt))  {
            lastDigit = maybeInt;
            break;
        }
    }
    answer.concat(firstDigit * 10 + lastDigit);
}
let finalAns = answer.reduce((partialSum, a) => partialSum + a, 0);
console.log(answer);
console.log(finalAns);
