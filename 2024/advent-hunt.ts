import * as utils from "../utils/aoc-utils";
import { join } from "path";
import { readFileSync } from "fs";

const testInputPath = join(__dirname, `../2024/input/adventhunt.in`);
const readInput = (path: string): string[] => {
  try {
    return readFileSync(path, "utf-8").toString().trim().split("\n");
  } catch (e) {
    console.log("!!! No file found at " + path + " !!!");
    return [];
  }
};
const input = readInput(testInputPath);

for (let i = 0; i < input.length; i++) {
  let ans = "";
  for (let j = 0; j < input[i].length; j++) {
    let c = input[i].charAt(j);
    if (c === "i") {
      ans += ".";
    }
    if (c === "t") {
      ans += "-";
    }
  }
  console.log(ans);
}
