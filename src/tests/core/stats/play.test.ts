import { winCornersAndDiagonals } from './../../test.utils';
import { statsUtils } from './../../../main/core/stats/stats.utils';
import { describe, expect, it, vi } from "vitest";
import { allWinClassesJackpotDraw, limitsViolatedCombination, loseAll, winAllButOneMissing, winOnlyOneMissing, winsCombination } from '../../test.utils';
import { dataUtils } from '../../../util/data.utils';
import { exportedForTesting, play } from "../../../main/core/stats/play";

const {
    winningsFromJackpotWinClass,
    winningsFromFullGameWinClass,
    winningsFromDiagonalsWinClass,
    winningsFromCornersWinClass,
    winningsFromMiddleSquareWinClass,
    winningsFromOneMissingWinClass
} = exportedForTesting;

describe('play', () => {
    // for allWinClassesJackpotDraw draw if combination wins
    const jackpotWinnings = 247387.27;
    const fullGameWinnings = 10319.93;
    const diagonalsWinnings = 59.65;
    const cornersWinnings = 10.4;
    const middleSquareWinnings = 2; // constant for this win class

    describe('play a game of bingo', () => {
        it("should return null if combination is invalid", () => {
            const won = play(allWinClassesJackpotDraw, limitsViolatedCombination);
            expect(won).toBeNull();
        });
        it("should return results as expected", () => {
            const results = play(allWinClassesJackpotDraw, winAllButOneMissing);
            if (results == null) {
                return Promise.reject("Results should have not been null");
            }
            const expectedWinnings = jackpotWinnings + fullGameWinnings + diagonalsWinnings
                                    + cornersWinnings + middleSquareWinnings;
            expect(results.winnings.total).toBeCloseTo(+expectedWinnings.toFixed(2));
            expect(results.missedNumbers).toEqual([]);
        });
        it("should return results as expected 2", () => {
            const results = play(allWinClassesJackpotDraw, winsCombination);
            if (results == null) {
                return Promise.reject("Results should have not been null");
            }
            const expectedWinnings = jackpotWinnings + fullGameWinnings;
            expect(results.winnings.total).toBeCloseTo(expectedWinnings);
            expect(results.missedNumbers).toEqual([]);
        });
        it("should return results as expected 3", () => {
            const results = play(allWinClassesJackpotDraw, winOnlyOneMissing);
            if (results == null) {
                return Promise.reject("Results should have not been null");
            }
            const expectedWinnings = allWinClassesJackpotDraw.winClasses.find(winClass => winClass.winClassNumber === 6)?.quote;
            expect(results.winnings.total).toEqual(expectedWinnings);
            expect(results.missedNumbers).toEqual([48]);
        });
        it("should return results as expected 4", () => {
            const results = play(allWinClassesJackpotDraw, loseAll);
            if (results == null) {
                return Promise.reject("Results should have not been null");
            }
            expect(results.winnings.total).toEqual(0);
            expect(results.missedNumbers.length).toBeGreaterThan(0);
        });
        it("should return results as expected 5", () => {
            const results = play(allWinClassesJackpotDraw, winCornersAndDiagonals);
            if (results == null) {
                return Promise.reject("Results should have not been null");
            }
            const expectedWinnings = diagonalsWinnings + cornersWinnings;
            expect(results.winnings.total).toBeCloseTo(expectedWinnings);
            expect(results.missedNumbers.length).toBeGreaterThan(0);
        });
    });

    describe('winnings', () => {
        describe('jackpot', () => {
            it("should throw error win class is missing", () => {
                const copyDraw = dataUtils.cloneObject(allWinClassesJackpotDraw);
                copyDraw.winClasses = [];
                expect(() => winningsFromJackpotWinClass(copyDraw, winAllButOneMissing)).toThrowError();
            });
            it("should return null if jackpot limit is missing and nobody else won jackpot", () => {
                const copyDraw = dataUtils.cloneObject(allWinClassesJackpotDraw);
                const winClass = copyDraw.winClasses.find(winClass => winClass.winClassNumber === 1);
                winClass!.winners = 0;
                copyDraw.jackpotLimit = null;
                const winnings = winningsFromJackpotWinClass(copyDraw, winAllButOneMissing);
                expect(winnings).toBeNull();
            });
            it("should calculate new quote if combination shared jackpot with someone else", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const winnings = winningsFromJackpotWinClass(allWinClassesJackpotDraw, winAllButOneMissing);
                const winClass = allWinClassesJackpotDraw.winClasses.find(winClass => winClass.winClassNumber === 1);
                expect(spy).toBeCalledWith(winClass?.quote, winClass?.winners);
                expect(winnings).toEqual(jackpotWinnings);
            });
            it("should return forseeable jackpot if combination was single jackpot winner", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const copyDraw = dataUtils.cloneObject(allWinClassesJackpotDraw);
                const winClass = copyDraw.winClasses.find(winClass => winClass.winClassNumber === 1);
                winClass!.winners = 0;
                const winnings = winningsFromJackpotWinClass(copyDraw, winAllButOneMissing);
                expect(spy).not.toBeCalled();
                expect(winnings).toEqual(copyDraw.forseeableJackpot);
            });
            it("should return zero if combination did not win jackpot", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const winnings = winningsFromJackpotWinClass(allWinClassesJackpotDraw, loseAll);
                expect(spy).not.toBeCalled();
                expect(winnings).toEqual(0);
            });
        });

        describe('full game', () => {
            it("should throw error win class is missing", () => {
                const copyDraw = dataUtils.cloneObject(allWinClassesJackpotDraw);
                copyDraw.winClasses = [];
                expect(() => winningsFromFullGameWinClass(copyDraw, winAllButOneMissing)).toThrowError();
            });
            it("should calculate new quote if combination won full game", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const winnings = winningsFromFullGameWinClass(allWinClassesJackpotDraw, winAllButOneMissing);
                const winClass = allWinClassesJackpotDraw.winClasses.find(winClass => winClass.winClassNumber === 2);
                expect(spy).toBeCalledWith(winClass?.quote, winClass?.winners);
                expect(winnings).toEqual(fullGameWinnings);
            });
            it("should return zero if combination did not win one missing", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const winnings = winningsFromFullGameWinClass(allWinClassesJackpotDraw, loseAll);
                expect(spy).not.toBeCalled();
                expect(winnings).toEqual(0);
            });
        });

        describe('diagonals', () => {
            it("should throw error win class is missing", () => {
                const copyDraw = dataUtils.cloneObject(allWinClassesJackpotDraw);
                copyDraw.winClasses = [];
                expect(() => winningsFromDiagonalsWinClass(copyDraw, winAllButOneMissing)).toThrowError();
            });
            it("should calculate new quote if combination won diagonals", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const winnings = winningsFromDiagonalsWinClass(allWinClassesJackpotDraw, winAllButOneMissing);
                const winClass = allWinClassesJackpotDraw.winClasses.find(winClass => winClass.winClassNumber === 3);
                expect(spy).toBeCalledWith(winClass?.quote, winClass?.winners);
                expect(winnings).toEqual(diagonalsWinnings);
            });
            it("should return zero if combination did not win one missing", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const winnings = winningsFromDiagonalsWinClass(allWinClassesJackpotDraw, loseAll);
                expect(spy).not.toBeCalled();
                expect(winnings).toEqual(0);
            });
        });

        describe('corners', () => {
            it("should throw error win class is missing", () => {
                const copyDraw = dataUtils.cloneObject(allWinClassesJackpotDraw);
                copyDraw.winClasses = [];
                expect(() => winningsFromCornersWinClass(copyDraw, winAllButOneMissing)).toThrowError();
            });
            it("should calculate new quote if combination won corners", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const winnings = winningsFromCornersWinClass(allWinClassesJackpotDraw, winAllButOneMissing);
                const winClass = allWinClassesJackpotDraw.winClasses.find(winClass => winClass.winClassNumber === 4);
                expect(spy).toBeCalledWith(winClass?.quote, winClass?.winners);
                expect(winnings).toEqual(cornersWinnings);
            });
            it("should return zero if combination did not win one missing", () => {
                const spy = vi.spyOn(statsUtils, "calculateNewQuote");
                const winnings = winningsFromCornersWinClass(allWinClassesJackpotDraw, loseAll);
                expect(spy).not.toBeCalled();
                expect(winnings).toEqual(0);
            });
        });

        describe('middle square', () => {
            it("should return null win class is missing", () => {
                const copyDraw = dataUtils.cloneObject(allWinClassesJackpotDraw);
                copyDraw.winClasses = [];
                const result = winningsFromMiddleSquareWinClass(copyDraw, winAllButOneMissing);
                expect(result).toBeNull();
            });
            it("should return win class quote if combination won middle square", () => {
                const winnings = winningsFromMiddleSquareWinClass(allWinClassesJackpotDraw, winAllButOneMissing);
                const winClass = allWinClassesJackpotDraw.winClasses.find(winClass => winClass.winClassNumber === 5);
                expect(winnings).toEqual(winClass?.quote);
            });
            it("should return zero if combination did not win one missing", () => {
                const winnings = winningsFromMiddleSquareWinClass(allWinClassesJackpotDraw, loseAll);
                expect(winnings).toEqual(0);
            });
        });

        describe('one missing', () => {
            it("should return null win class is missing", () => {
                const copyDraw = dataUtils.cloneObject(allWinClassesJackpotDraw);
                copyDraw.winClasses = [];
                const result = winningsFromOneMissingWinClass(copyDraw, winOnlyOneMissing);
                expect(result).toBeNull();
            });
            it("should return win class quote if combination won one missing", () => {
                const winnings = winningsFromOneMissingWinClass(allWinClassesJackpotDraw, winOnlyOneMissing);
                const winClass = allWinClassesJackpotDraw.winClasses.find(winClass => winClass.winClassNumber === 6);
                expect(winnings).toEqual(winClass?.quote);
            });
            it("should return zero if combination did not win one missing", () => {
                const winnings = winningsFromOneMissingWinClass(allWinClassesJackpotDraw, winAllButOneMissing);
                expect(winnings).toEqual(0);
            });
        });
    });
});