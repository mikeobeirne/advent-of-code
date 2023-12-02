import { readFileSync } from 'fs';

const DAY = 6;
const path = `aoc-${DAY}-input.txt`;
const testPath = `aoc-${DAY}-input-test.txt`;

let input = readFileSync(path, 'utf-8').toString().split('\n');
//input = readFileSync(testPath, 'utf-8').toString().split('\n');


// -------------------- PART 1 --------------------
let isUnique = (lastFour: string[]) => {
  return !(
    lastFour[0] === lastFour[1] ||
    lastFour[0] === lastFour[2] ||
    lastFour[0] === lastFour[3] ||
    lastFour[1] === lastFour[2] ||
    lastFour[1] === lastFour[3] ||
    lastFour[2] === lastFour[3]
  );
}

let solve = (signal: string) => {
  let buffer: string[] = [
    signal.charAt(0),
    signal.charAt(1),
    signal.charAt(2),
    signal.charAt(3),
  ];
  if (isUnique(buffer)) {
    return 4;
  }

  for (let i = 4; i < signal.length; i++) {
    buffer.shift();
    buffer.push(signal.charAt(i));

    if (isUnique(buffer)) {
      return i + 1;
    }
  }
}

for (let i = 0; i < input.length; i++) {
  let signal = input[i];
  let ans = solve(signal);
  console.log(ans);
}


// -------------------- PART 2 --------------------
console.log("Part 2");
// Alright fine, they called me on my BS and I have to write a better 'isUnique' function

let isUniqueV2 = (freqCount: {[key: number]: number}) => {
  let a = 'a'.charCodeAt(0);
  for (let c = a; c < a + 26; c++) {
    if (freqCount[c] > 1) {
      return false;
    }
  }
  return true;
}

let solvePartTwo = (signal: string) => {
  // Build frequency map
  let freq: {[key: number]: number} = {};
  let a = 'a'.charCodeAt(0);
  for (let c = a; c < a + 26; c++) {
    freq[c] = 0;
  }

  // Grab the first 14
  for (let i = 0; i < 14; i++) {
    let char = signal.charCodeAt(i);
    freq[char]++;
  }
  if (isUniqueV2(freq)) {
    return 14;
  }

  for (let i = 14; i < signal.length; i++) {
    let dropped = signal.charCodeAt(i - 14);
    let added = signal.charCodeAt(i);
    freq[dropped]--;
    freq[added]++;
    if (isUniqueV2(freq)) {
      return i + 1;
    }
  }
}

for (let i = 0; i < input.length; i++) {
  console.log(solvePartTwo(input[i]));
}