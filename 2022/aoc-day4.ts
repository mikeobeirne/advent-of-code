import { readFileSync } from 'fs';

const DAY = 4;
const path = `aoc-${DAY}-input.txt`;

let input = readFileSync(path, 'utf-8').toString().trim().split('\n');

//Sample input:
/*
input = 
[
"2-4,6-8",
"2-3,4-5",
"5-7,7-9",
"2-8,3-7",
"6-6,4-6",
"2-6,4-8",
];
*/

// -------------------- PART 1 --------------------
console.log("Part 1:");
let partOneCount = 0;
for (let i = 0; i < input.length; i++) {
  let parts = input[i].split(",");
  let first = parts[0].split("-").map(p => parseInt(p));
  let second = parts[1].split("-").map(p => parseInt(p));

  let contains = (a: number[], b: number[]) => {
    if (a[0] <= b[0] && a[1] >= b[1]) {
      return true;
    }
  };

  if (contains(first, second) || contains(second, first)) {
    partOneCount++;
  }

}
console.log(partOneCount);


// -------------------- PART 2 --------------------
console.log("Part 2:");

let partTwoCount = 0;
for (let i = 0; i < input.length; i++) {
  let parts = input[i].split(",");
  let first = parts[0].split("-").map(p => parseInt(p));
  let second = parts[1].split("-").map(p => parseInt(p));

  let intersects = (a: number[], b: number[]) => {

    // Two possible scenarios
    // |-------|      OR        |------|
    //        |---|           |----|
    // 
    // 
    return (a[1] >= b[0] && a[1] <= b[1]) || 
      (b[1] >= a[0] && b[1] <= a[1]);
  }


  if (intersects(first, second)) {
    partTwoCount++;
  }
}
console.log(partTwoCount);
