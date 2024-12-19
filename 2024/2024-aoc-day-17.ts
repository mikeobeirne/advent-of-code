import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

enum INSTRUCTION {
  // The adv instruction (opcode 0) performs division. The numerator is the value in the A register.
  // The denominator is found by raising 2 to the power of the instruction's combo operand.
  // (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.)
  // The result of the division operation is truncated to an integer and then written to the A register.
  ADV = 0,

  // The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal operand,
  // then stores the result in register B.
  BXL = 1,

  // The bst instruction (opcode 2) calculates the value of its
  // combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
  BST = 2,

  // The jnz instruction (opcode 3) does nothing if the A register is 0.
  // However, if the A register is not zero, it jumps by setting the instruction pointer
  // to the value of its literal operand; if this instruction jumps,
  // the instruction pointer is not increased by 2 after this instruction.
  JNZ = 3,

  // The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C,
  // then stores the result in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
  BXC = 4,

  // The out instruction (opcode 5) calculates the value of its combo operand modulo 8,
  // then outputs that value. (If a program outputs multiple values, they are separated by commas.)
  OUT = 5,

  // The bdv instruction (opcode 6) works exactly like the adv instruction except
  // that the result is stored in the B register. (The numerator is still read from the A register.)
  BDV = 6,

  // The cdv instruction (opcode 7) works exactly like the adv instruction except that the result is stored in the C register. (The numerator is still read from the A register.)
  CDV = 7,
}

type State = {
  A: bigint;
  B: bigint;
  C: bigint;
  ptr: number;
};

class Day17_2024 extends Solution {
  DAY = 17;

  public numbers: bigint[] = [];
  public goalAns: number[] = [2, 4, 1, 3, 7, 5, 4, 2, 0, 3, 1, 5, 5, 5, 3, 0];

  partOne(input: string[]): any {
    this.numbers = [];

    let A: bigint = BigInt(input[0].split(" ")[2]);
    let B = parseInt(input[1].split(" ")[2]);
    let C = parseInt(input[2].split(" ")[2]);

    return this.fullEval(A);
  }

  fullEval(a: bigint): string {
    let p = "Program: 2,4,1,3,7,5,4,2,0,3,1,5,5,5,3,0";
    return this.eval(a, p);
  }

  eval(a: bigint, p: string): string {
    this.numbers = [];
    let program = p
      .split(" ")[1]
      .split(",")
      .map((c) => parseInt(c));
    // console.log(program);

    let state = {
      A: a,
      B: 0n,
      C: 0n,
      ptr: 0,
    };

    while (state.ptr < program.length - 1) {
      // console.log(state);
      // console.log(
      //   INSTRUCTION[program[state.ptr]] + " --- " + program[state.ptr + 1]
      // );
      let newState = this.performInstruction(
        state,
        program[state.ptr],
        program[state.ptr + 1]
      );
      state = newState;
      state.ptr += 2;
    }
    return this.numbers.join(",");
  }

  performInstruction(
    state: State,
    opcode: INSTRUCTION,
    operand: number
  ): State {
    let advOp = (state: State, operand: number): bigint => {
      let num: bigint = state.A;
      let denom: bigint = 2n ** this.getOperand(state, operand);
      let val: bigint = num / denom;
      return val;
    };
    switch (opcode) {
      case INSTRUCTION.ADV:
        state.A = advOp(state, operand);
        return state;
      case INSTRUCTION.BXL:
        state.B = state.B ^ BigInt(operand);
        return state;
      case INSTRUCTION.BST:
        state.B = this.getOperand(state, operand) % 8n;
        return state;
      case INSTRUCTION.JNZ:
        if (state.A === 0n) {
          return state;
        }
        // console.log("JUMPING");
        // Offset by 2 since we'll do += 2 after
        state.ptr = operand - 2;
        return state;
      case INSTRUCTION.BXC:
        state.B = state.B ^ state.C;
        return state;

      case INSTRUCTION.OUT:
        // console.log(
        //   `Adding ${this.getOperand(state, operand)} % 8 to the answer`
        // );
        let toOutput = this.getOperand(state, operand) % 8n;
        this.numbers.push(toOutput);
        return state;
      case INSTRUCTION.BDV:
        state.B = advOp(state, operand);
        return state;

      case INSTRUCTION.CDV:
        state.C = advOp(state, operand);
        return state;
    }
    return state;
  }

  getOperand(state: State, operand: number): bigint {
    if (operand <= 3n) {
      return BigInt(operand);
    }
    if (operand === 4) {
      return state.A;
    }
    if (operand === 5) {
      return state.B;
    }
    if (operand === 6) {
      return state.C;
    }
    if (operand === 7) {
      throw new Error("7 not to be used!");
    }
    throw new Error("Invalid operand: " + operand);
  }

  partTwo(input: string[]): any {
    console.log("Trying to backtrack");
    let potentialAns = this.partTwoNotADummy(input);

    console.log("Backtrack done");
    input[0] = `Register A: ${potentialAns}`;
    let ans = this.partOne(input);
    console.log(ans);
  }

  // Answer must be ~16 loops through this
  // each time

  // Operations [2, 4] + [1, 3] + [7, 5] + [4, 2] + [0, 3] + [1, 5] + [5, 5] + [3, 0]
  //            bst      bxl      adc      bxc     adv     bxl       out       jnz
  // B = A % 8
  // B = B ^ 3
  // C = A / 2^B
  // B = B ^ C
  // A = A / 2^3
  // B = B ^ 5
  // print last 3 bits of B
  // jump back to start

  // In summary:
  // B takes last 3 bits of A.
  // B then XORs with 011
  // C is then
  // Output = ((B^3)^C)^5

  partTwoNotADummy(input: string[]): any {
    let program = input[4]
      .split(" ")[1]
      .split(",")
      .map((c) => parseInt(c));
    console.log(program);

    // Let's go through, 3 bits at a time and work on finding these numbers!
    let ans = this.dumbBacktrack(program, 0, 0n);
    console.log("Hypothetical ans");
    console.log(ans);
    return ans;
  }

  // B = A % 8
  // B = B ^ 3
  // C = A / 2^B
  // B = B ^ C
  // A = A / 2^3
  // B = B ^ 5
  dumbBacktrack(targetNums: number[], index: number, previous: bigint): bigint {
    console.log(`${index} - ${previous}`);
    let spacing = ("" + index).repeat(index);
    if (index === targetNums.length) {
      console.log("We did it!");
      return previous;
    }

    for (let guess = 0n; guess <= 7; guess++) {
      let previousBits = (previous << 3n) + guess;

      // This guess is wrong!
      let needToMatch = targetNums[targetNums.length - 1 - index];
      let B = this.lazyEvaluate(previousBits);
      if (B !== BigInt(needToMatch)) {
        // console.log(
        //   `${spacing} ${B} is not equal to ${needToMatch} (${guess})`
        // );
        continue;
      } else {
        // console.log(`${spacing}${B} IS equal to ${needToMatch} (${guess})`);
      }

      let maybeAns = this.dumbBacktrack(targetNums, index + 1, previousBits);
      if (maybeAns !== 0n) {
        return maybeAns;
      }
      // console.log("COMING OUT");
    }

    return 0n;
  }

  lazyEvaluate(a: bigint): bigint {
    let e = this.eval(a, "Program: 2,4,1,3,7,5,4,2,0,3,1,5,5,5");
    console.log(`${a} evaluated to ${e}`);
    return BigInt(e);
  }
}

let sol = new Day17_2024();

// utils.runTest(sol, utils.ProblemParts.One);
// utils.run(sol, utils.ProblemParts.One);
// utils.runTest(sol, utils.ProblemParts.Two);
utils.run(sol, utils.ProblemParts.Two);
