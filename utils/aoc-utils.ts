import { readFileSync } from "fs";
import { Solution } from "./solution";
import { join } from "path";

export enum ProblemParts {
  One = "one",
  Two = "two",
}

const readInput = (path: string): string[] => {
  try {
    return readFileSync(path, "utf-8").toString().trim().split("\n");
  } catch (e) {
    console.log("!!! No file found at " + path + " !!!");
    return [];
  }
};

export function runTest(sol: Solution, part: ProblemParts): void {
  const testInputPath = join(
    __dirname,
    `../2024/input/${sol.DAY}-part-one-test.in`
  );
  const testInput = readInput(testInputPath);
  if (
    testInput.length === 0 ||
    (testInput.length === 1 && testInput[0] === "")
  ) {
    console.log(`No input for part ${part}:`);
  } else {
    console.log("Running test:");
    console.log(
      part == ProblemParts.One ? sol.partOne(testInput) : sol.partTwo(testInput)
    );
    console.log();
  }
}

export function run(sol: Solution, part: ProblemParts): void {
  const inputPath = join(__dirname, `../2024/input/${sol.DAY}-part-one.in`);

  const input = readInput(inputPath);
  if (input.length === 0 || (input.length === 1 && input[0] === "")) {
    console.log(`No input for part ${part}:`);
  } else {
    console.log(`Running solution part ${part}:`);
    console.log(
      part == ProblemParts.One ? sol.partOne(input) : sol.partTwo(input)
    );
    console.log();
  }
}

export function runSolution(sol: Solution, part: ProblemParts): void {
  runTest(sol, part);
  run(sol, part);
}

export function printArr(a: string[][] | number[][]): void {
  for (let i = 0; i < a.length; i++) {
    let buf = "";
    for (let j = 0; j < a[i].length; j++) {
      buf += a[i][j];
    }
    console.log(buf);
  }
}

export function parseInto2DString(input: string[]): string[][] {
  let ans: string[][] = [];
  for (let i = 0; i < input.length; i++) {
    ans[i] = [];
    for (let j = 0; j < input[0].length; j++) {
      ans[i][j] = input[i].charAt(j);
    }
  }
  return ans;
}

export function findInGrid(
  input: any[][],
  needle: any
): { x: number; y: number } | null {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === needle) {
        return { x: i, y: j };
      }
    }
  }
  return null;
}

export function isInBounds(input: any[][], i: number, j: number): boolean {
  if (i < 0 || j < 0 || i >= input.length || j >= input[0].length) {
    return false;
  }
  return true;
}

export function manhattanDistance(
  x: number,
  y: number,
  i: number,
  j: number
): number {
  return Math.abs(x - i) + Math.abs(y - j);
}

export function directionArray(): number[][] {
  return [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
}
