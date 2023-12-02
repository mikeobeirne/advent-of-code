import { readFileSync } from 'fs';

const DAY = 3;
const path = `aoc-${DAY}-input.txt`;

let input = readFileSync(path, 'utf-8').toString().trim().split('\n');

//Sample input:
/*
input = 
[
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];
*/

let findCommon = (l: string, r: string) => {
  for (let i = 0; i < l.length; i++) {
    for (let j = 0; j < r.length; j++) {
      if (l.charAt(i) === r.charAt(j)) {
        return l.charAt(i);
      }
    }
  }

  // Failure case
  return null;
}

let score = (c) => {
  let charCode = c.charCodeAt(0);
  if (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) {
    return charCode - 'a'.charCodeAt(0) + 1;
  } else {
    return charCode - 'A'.charCodeAt(0) + 27;
  }
}

console.log("Part 1:");
let part1Score = 0;
for (let i = 0; i < input.length; i++) {
  let left = input[i].slice(0, input[i].length/2);
  let right = input[i].slice(input[i].length/2);
  let c = findCommon(left, right);

  //console.log(c);
  let s = score(c);
  //console.log(s);
  part1Score += s;
}
console.log(part1Score);



// -------------------- PART 2 --------------------
console.log("Part 2:");
let findCommon3 = (l: string, m: string, r: string) => {
  for (let i = 0; i < l.length; i++) {
    let c = l.charAt(i);
    // If in both other strings, bail
    if (m.indexOf(c) !== -1 && r.indexOf(c) !== -1) {
      return c;
    }
  }
  return null;
}

let p2Score = 0;
for (let i = 0; i < input.length; i += 3) {
  let l = input[i];
  let m = input[i+1];
  let r = input[i+2];

  let c = findCommon3(l, m, r);
  p2Score += score(c);
}

console.log(p2Score);
