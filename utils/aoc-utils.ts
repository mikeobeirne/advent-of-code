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
    let buf = a[i].join("");
    console.log(buf);
  }
}
