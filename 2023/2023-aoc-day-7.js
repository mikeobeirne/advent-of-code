"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("../utils/aoc-utils");
var solution_1 = require("../utils/solution");
var HandType;
(function (HandType) {
    HandType[HandType["FIVE"] = 6] = "FIVE";
    HandType[HandType["FOUR"] = 5] = "FOUR";
    HandType[HandType["FULL_HOUSE"] = 4] = "FULL_HOUSE";
    HandType[HandType["THREE"] = 3] = "THREE";
    HandType[HandType["TWO_PAIR"] = 2] = "TWO_PAIR";
    HandType[HandType["ONE_PAIR"] = 1] = "ONE_PAIR";
    HandType[HandType["HIGH_CARD"] = 0] = "HIGH_CARD";
})(HandType || (HandType = {}));
/**
 * Notes from this problem:
 */
var Day7_2023 = /** @class */ (function (_super) {
    __extends(Day7_2023, _super);
    function Day7_2023() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DAY = 7;
        return _this;
    }
    Day7_2023.prototype.partOne = function (input) {
        var _this = this;
        var hands = [];
        for (var i = 0; i < input.length; i++) {
            var hand = this.parseHand(input[i].split(" ")[0]);
            var bid = parseInt(input[i].split(" ")[1]);
            hands = hands.concat({ "hand": hand, "bid": bid });
        }
        hands = hands.sort(function (a, b) { return _this.compareHands(a.hand, b.hand); });
        var ans = 0;
        for (var i = 0; i < hands.length; i++) {
            var mult = i + 1;
            ans += (hands[i].bid * mult);
        }
        return ans;
    };
    Day7_2023.prototype.parseHand = function (hand) {
        var vals = (new Array(15)).fill(0, 0, 15);
        for (var i = 0; i < hand.length; i++) {
            var value = this.cardToVal(hand.charAt(i));
            vals[value] = vals[value] + 1;
        }
        // 5 of a kind
        for (var i = 2; i <= 14; i++) {
            if (vals[i] === 5) {
                return { "type": HandType.FIVE, "high": i, "cards": hand };
            }
        }
        // 4 of a kind
        for (var i = 2; i <= 14; i++) {
            if (vals[i] === 4) {
                return { "type": HandType.FOUR, "high": i, "cards": hand };
            }
        }
        // Full House
        for (var i = 2; i <= 14; i++) {
            if (vals[i] === 3) {
                for (var j = 2; j <= 14; j++) {
                    if (i === j) {
                        continue;
                    }
                    if (vals[j] === 2) {
                        return { "type": HandType.FULL_HOUSE, "three": i, "two": j, "cards": hand };
                    }
                }
                // If we got here, we must just be 3 of a kind
                return { "type": HandType.THREE, "three": i, "cards": hand };
            }
        }
        // Two Pair
        for (var i = 2; i <= 14; i++) {
            if (vals[i] === 2) {
                for (var j = 2; j <= 14; j++) {
                    if (i === j) {
                        continue;
                    }
                    if (vals[j] === 2) {
                        return { "type": HandType.TWO_PAIR, "high_two": j, "low_two": i, "cards": hand };
                    }
                }
                // If we got here, just a single pair
                return { "type": HandType.ONE_PAIR, "high_two": i, "cards": hand };
            }
        }
        return { "type": HandType.HIGH_CARD, "cards": hand };
    };
    Day7_2023.prototype.compareHands = function (h1, h2) {
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
    };
    Day7_2023.prototype.breakTie = function (h1, h2) {
        for (var i = 0; i < h1.length; i++) {
            var h1Val = this.cardToVal(h1.charAt(i));
            var h2Val = this.cardToVal(h2.charAt(i));
            if (h1Val !== h2Val) {
                return h1Val - h2Val;
            }
        }
        return 0;
    };
    Day7_2023.prototype.cardToVal = function (card) {
        var num = parseInt(card);
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
    };
    Day7_2023.prototype.partTwo = function (input) {
        var _this = this;
        var hands = [];
        for (var i = 0; i < input.length; i++) {
            var hand = this.parseHand2(input[i].split(" ")[0]);
            var bid = parseInt(input[i].split(" ")[1]);
            hands = hands.concat({ "hand": hand, "bid": bid });
        }
        hands = hands.sort(function (a, b) { return _this.compareHands(a.hand, b.hand); });
        var ans = 0;
        for (var i = 0; i < hands.length; i++) {
            if (hands[i].hand.cards.includes("J")) {
                console.log(hands[i].hand);
            }
            var mult = i + 1;
            ans += (hands[i].bid * mult);
        }
        return ans;
    };
    Day7_2023.prototype.parseHand2 = function (hand) {
        var vals = (new Array(15)).fill(0, 0, 15);
        for (var i = 0; i < hand.length; i++) {
            var value = this.cardToVal(hand.charAt(i));
            vals[value] = vals[value] + 1;
        }
        // 5 of a kind
        for (var i = 2; i <= 14; i++) {
            if (vals[0] + vals[i] === 5) {
                return { "type": HandType.FIVE, "high": i, "cards": hand };
            }
        }
        // 4 of a kind
        for (var i = 2; i <= 14; i++) {
            if (vals[0] + vals[i] === 4) {
                return { "type": HandType.FOUR, "high": i, "cards": hand };
            }
        }
        // Full House
        for (var i = 2; i <= 14; i++) {
            if (vals[0] + vals[i] === 3) {
                for (var j = 2; j <= 14; j++) {
                    if (i === j) {
                        continue;
                    }
                    var numJokersLeft = Math.max(0, vals[0] - (3 - vals[i]));
                    if (numJokersLeft + vals[j] >= 2) {
                        return { "type": HandType.FULL_HOUSE, "three": i, "two": j, "cards": hand };
                    }
                }
                // If we got here, we must just be 3 of a kind
                return { "type": HandType.THREE, "three": i, "cards": hand };
            }
        }
        // Two Pair
        for (var i = 2; i <= 14; i++) {
            if (vals[0] + vals[i] === 2) {
                for (var j = 2; j <= 14; j++) {
                    if (i === j) {
                        continue;
                    }
                    var numJokersLeft = Math.max(0, vals[0] - (2 - vals[i]));
                    if (numJokersLeft + vals[j] === 2) {
                        return { "type": HandType.TWO_PAIR, "high_two": j, "low_two": i, "cards": hand };
                    }
                }
                // If we got here, just a single pair
                return { "type": HandType.ONE_PAIR, "high_two": i, "cards": hand };
            }
        }
        return { "type": HandType.HIGH_CARD, "cards": hand };
    };
    return Day7_2023;
}(solution_1.Solution));
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
//# sourceMappingURL=2023-aoc-day-7.js.map