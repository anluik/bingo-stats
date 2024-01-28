import { describe, expect, it } from "vitest";
import { wonCorners, wonDiagonals, wonFullGame, wonJackpot, wonMiddleSquare, wonOneMissing } from '../../../main/core/stats/winner';
import { loseAll, testDrawnNumbers, winAllButOneMissing, winOnlyOneMissing, winsCombination } from "../../test.utils";

describe('winner', () => {

    describe('won jackpot', () => {
        it("should return true if jackpot limit was given and all numbers were drawn within the jackpot limit", () => {
            const won = wonJackpot(testDrawnNumbers, winsCombination, 48);
            expect(won).toBeTruthy();
        });
        it("should return false if all numbers were drawn but jackpot limit was given and breached", () => {
            const won = wonJackpot(testDrawnNumbers, winsCombination, 47);
            expect(won).toBeFalsy();
        });
    });

    describe('won full game', () => {
        it("should return true if all numbers drawn are present on the ticket", () => {
            const won = wonFullGame(testDrawnNumbers, winsCombination);
            expect(won).toBeTruthy();
        });
        it("should return false if all numbers on the ticket were not drawn", () => {
            const won = wonFullGame(testDrawnNumbers, loseAll);
            expect(won).toBeFalsy();
        });
        it("should return false if all numbers on the ticket were not drawn 2", () => {
            const won = wonFullGame(testDrawnNumbers, winOnlyOneMissing);
            expect(won).toBeFalsy();
        });
    });

    describe('won diagonals', () => {
        it("should return null if less than 38 distinct winning numbers are given", () => {
            const thirtyFiveNumbers = testDrawnNumbers.slice(0, 35);
            const thirtyEightNumbers = thirtyFiveNumbers.concat(thirtyFiveNumbers.slice(0, 3));
            expect(thirtyEightNumbers.length).toBeGreaterThanOrEqual(38);
            const won = wonDiagonals(thirtyEightNumbers, winAllButOneMissing);
            expect(won).toBeNull();
        });
        it("should return false if all diagonals were drawn, but not in the first 38 numbers", () => {
            const won = wonDiagonals(testDrawnNumbers, winOnlyOneMissing);
            expect(won).toBeFalsy();
        });
        it("should return true if the diagonals of the ticket were drawn among first 38 numbers", () => {
            const won = wonDiagonals(testDrawnNumbers, winAllButOneMissing);
            expect(won).toBeTruthy();
        });
        it("should return false if all diagonals were not drawn", () => {
            const won = wonDiagonals(testDrawnNumbers, loseAll);
            expect(won).toBeFalsy();
        });
    });

    describe('won corners', () => {
        it("should return null if less than 33 distinct winning numbers are given", () => {
            const thirtyNumbers = testDrawnNumbers.slice(0, 30);
            const thirtyThreeNumbers = thirtyNumbers.concat(thirtyNumbers.slice(0, 3));
            expect(thirtyThreeNumbers.length).toBeGreaterThanOrEqual(33);
            const won = wonCorners(thirtyThreeNumbers, winAllButOneMissing);
            expect(won).toBeNull();
        });
        it("should return false if all corners were drawn, but not in the first 33 numbers", () => {
            const won = wonCorners(testDrawnNumbers, winOnlyOneMissing);
            expect(won).toBeFalsy();
        });
        it("should return true if the corners of the ticket were drawn among first 33 numbers", () => {
            const won = wonCorners(testDrawnNumbers, winAllButOneMissing);
            expect(won).toBeTruthy();
        });
        it("should return false if all corners were not drawn", () => {
            const won = wonCorners(testDrawnNumbers, loseAll);
            expect(won).toBeFalsy();
        });
    });

    describe('won middle square', () => {
        it("should return true middle square win class winning number is in the middle square of the combination", () => {
            const won = wonMiddleSquare(40, winAllButOneMissing);
            expect(won).toBeTruthy();
        });
        it("should return false winning number was not in the middle of the combination", () => {
            const won = wonMiddleSquare(10, winAllButOneMissing);
            expect(won).toBeFalsy();
        });
        it("should return true if first drawn N column number is in the middle square of the ticket", () => {
            const middleSquareNumber = winAllButOneMissing.N[2];
            expect(testDrawnNumbers).toContain(middleSquareNumber);
            const won = wonMiddleSquare(testDrawnNumbers, winAllButOneMissing);
            expect(won).toBeTruthy();
        });
        it("should return false if the middle square number was not drawn", () => {
            const middleSquareNumber = loseAll.N[2];
            expect(testDrawnNumbers).not.toContain(middleSquareNumber);
            const won = wonMiddleSquare(testDrawnNumbers, loseAll);
            expect(won).toBeFalsy();
        });
        it("should return false if the middle square number was drawn but it was not the first N column number drawn", () => {
            const middleSquareNumber = winOnlyOneMissing.N[2];
            expect(testDrawnNumbers).toContain(middleSquareNumber);
            const won = wonMiddleSquare(testDrawnNumbers, winOnlyOneMissing);
            expect(won).toBeFalsy();
        });
    });

    describe('won one missing', () => {
        it("should return true if the ticket has one missed number after game ends", () => {
            const won = wonOneMissing(testDrawnNumbers, winOnlyOneMissing);
            expect(won).toBeTruthy();
        });
        it("should return false if the ticket does not have a single missed number after game ends", () => {
            const won = wonOneMissing(testDrawnNumbers, loseAll);
            expect(won).toBeFalsy();
        });
        it("should return false if the ticket does not have a single missed number after game ends 2", () => {
            const won = wonOneMissing(testDrawnNumbers, winAllButOneMissing);
            expect(won).toBeFalsy();
        });
    });
});