"use strict";

import * as utils from "../utils/aoc-utils";
import { Solution } from "../utils/solution";

enum HandType {
  FIVE = 6,
  FOUR = 5,
  FULL_HOUSE = 4,
  THREE = 3,
  TWO_PAIR = 2,
  ONE_PAIR = 1,
  HIGH_CARD = 0,
}

/**
 * Notes from this problem:
 */

class Day7_2023 extends Solution {
  DAY = 7;

  partOne(input: string[]): any {
    let hands = [];
    for (let i = 0; i < input.length; i++) {
      let hand = this.parseHand(input[i].split(" ")[0]);
      let bid = parseInt(input[i].split(" ")[1]);

      hands = hands.concat({ hand: hand, bid: bid });
    }
    hands = hands.sort((a, b) => this.compareHands(a.hand, b.hand));

    let ans = 0;

    for (let i = 0; i < hands.length; i++) {
      let mult = i + 1;
      ans += hands[i].bid * mult;
    }
    return ans;
  }

  parseHand(hand: string): {} {
    let vals = new Array(15).fill(0, 0, 15);
    for (let i = 0; i < hand.length; i++) {
      let value = this.cardToVal(hand.charAt(i));
      vals[value] = vals[value] + 1;
    }

    // 5 of a kind
    for (let i = 2; i <= 14; i++) {
      if (vals[i] === 5) {
        return { type: HandType.FIVE, high: i, cards: hand };
      }
    }
    // 4 of a kind
    for (let i = 2; i <= 14; i++) {
      if (vals[i] === 4) {
        return { type: HandType.FOUR, high: i, cards: hand };
      }
    }

    // Full House
    for (let i = 2; i <= 14; i++) {
      if (vals[i] === 3) {
        for (let j = 2; j <= 14; j++) {
          if (i === j) {
            continue;
          }
          if (vals[j] === 2) {
            return { type: HandType.FULL_HOUSE, three: i, two: j, cards: hand };
          }
        }

        // If we got here, we must just be 3 of a kind
        return { type: HandType.THREE, three: i, cards: hand };
      }
    }

    // Two Pair
    for (let i = 2; i <= 14; i++) {
      if (vals[i] === 2) {
        for (let j = 2; j <= 14; j++) {
          if (i === j) {
            continue;
          }
          if (vals[j] === 2) {
            return {
              type: HandType.TWO_PAIR,
              high_two: j,
              low_two: i,
              cards: hand,
            };
          }
        }

        // If we got here, just a single pair
        return { type: HandType.ONE_PAIR, high_two: i, cards: hand };
      }
    }
    return { type: HandType.HIGH_CARD, cards: hand };
  }

  compareHands(h1: any, h2: any): number {
    // If one hand is outright better, just return
    if (h1.type - h2.type !== 0) {
      return h1.type - h2.type;
    }

    return this.breakTie(h1.cards, h2.cards);

    // LOL not needed

    // At this point we've determined they're equal; let's break ties
    // switch (h1.type) {
    //     case HandType.FIVE:
    //         return h1.high - h2.high;
    //     case HandType.FOUR:
    //         if (h1.high - h2.high === 0) {
    //             for (let i = 14; i >= 2; i--) {
    //                 if (h1.cards[i] - h2.cards[i] !== 0) {
    //                     return h1.cards[i] - h2.cards[i];
    //                 }
    //             }
    //             throw new Error("Tie breaker fail on FOUR");
    //         } else {
    //             return h1.high - h2.high;
    //         }
    //     case HandType.FULL_HOUSE:

    //     case HandType.THREE:
    //     case HandType.TWO_PAIR:
    //     case HandType.ONE_PAIR:
    //     case HandType.HIGH_CARD:
    // }
  }

  breakTie(h1: string, h2: string): number {
    for (let i = 0; i < h1.length; i++) {
      let h1Val = this.cardToVal(h1.charAt(i));
      let h2Val = this.cardToVal(h2.charAt(i));
      if (h1Val !== h2Val) {
        return h1Val - h2Val;
      }
    }
    return 0;
  }

  cardToVal(card: string): number {
    let num = parseInt(card);
    if (!Number.isNaN(num)) {
      return num;
    }
    switch (card) {
      case "A":
        return 14;
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        // NOTE: CHANGED FOR PART 2
        return 0;
      case "T":
        return 10;

      default:
        throw new Error(card);
    }
  }

  partTwo(input: string[]): any {
    let hands = [];
    for (let i = 0; i < input.length; i++) {
      let hand = this.parseHand2(input[i].split(" ")[0]);
      let bid = parseInt(input[i].split(" ")[1]);
      hands = hands.concat({ hand: hand, bid: bid });
    }
    hands = hands.sort((a, b) => this.compareHands(a.hand, b.hand));

    let ans = 0;

    for (let i = 0; i < hands.length; i++) {
      if (hands[i].hand.cards.includes("J")) {
        console.log(hands[i].hand);
      }
      let mult = i + 1;
      ans += hands[i].bid * mult;
    }
    return ans;
  }

  parseHand2(hand: string): {} {
    let vals = new Array(15).fill(0, 0, 15);
    for (let i = 0; i < hand.length; i++) {
      let value = this.cardToVal(hand.charAt(i));
      vals[value] = vals[value] + 1;
    }

    // 5 of a kind
    for (let i = 2; i <= 14; i++) {
      if (vals[0] + vals[i] === 5) {
        return { type: HandType.FIVE, high: i, cards: hand };
      }
    }
    // 4 of a kind
    for (let i = 2; i <= 14; i++) {
      if (vals[0] + vals[i] === 4) {
        return { type: HandType.FOUR, high: i, cards: hand };
      }
    }

    // Full House
    for (let i = 2; i <= 14; i++) {
      if (vals[0] + vals[i] === 3) {
        for (let j = 2; j <= 14; j++) {
          if (i === j) {
            continue;
          }

          let numJokersLeft = Math.max(0, vals[0] - (3 - vals[i]));

          if (numJokersLeft + vals[j] >= 2) {
            return { type: HandType.FULL_HOUSE, three: i, two: j, cards: hand };
          }
        }

        // If we got here, we must just be 3 of a kind
        return { type: HandType.THREE, three: i, cards: hand };
      }
    }

    // Two Pair
    for (let i = 2; i <= 14; i++) {
      if (vals[0] + vals[i] === 2) {
        for (let j = 2; j <= 14; j++) {
          if (i === j) {
            continue;
          }
          let numJokersLeft = Math.max(0, vals[0] - (2 - vals[i]));
          if (numJokersLeft + vals[j] === 2) {
            return {
              type: HandType.TWO_PAIR,
              high_two: j,
              low_two: i,
              cards: hand,
            };
          }
        }

        // If we got here, just a single pair
        return { type: HandType.ONE_PAIR, high_two: i, cards: hand };
      }
    }
    return { type: HandType.HIGH_CARD, cards: hand };
  }
}

// 5 of a kind
// 4 of a kind
// Full House
// Three of a kind
// Two pair
// One Pair
// High Card

// utils.runSolution(new Day7_2023(), utils.ProblemParts.One);
// utils.runSolution(new Day7_2023(), utils.ProblemParts.Two);
// utils.runTest(new Day7_2023(), utils.ProblemParts.Two);
utils.run(new Day7_2023(), utils.ProblemParts.Two);
