import { statsUtils } from './stats.utils';
import { Combination } from './../../model/GameCombination';
import { Draw } from "../../model";
import { validateCombination } from '../validation';
import { dataUtils } from '../../../util/data.utils';
import { wonFullGame, wonCorners, wonDiagonals, wonMiddleSquare, wonOneMissing, wonJackpot } from './winner';

type Results = {
    drawId: number,
    winnings: Winnings,
    missedNumbers: number[]
};

type Winnings = {
    oneMissing: number| null,
    middleSquare: number | null,
    corners: number,
    diagonals: number,
    fullGame: number,
    jackpot: number | null,
    total: number
};

/**
 * Play Bingo using the numbers drawn during the given draw.
 * 
 * It might not be possible to determine winnings for some win classes.
 * They will be set to null for that reason.
 * 
 * @param draw        - game of bingo.
 * @param combination - ticket with numbers.
 * @returns Results
 *          null      - if given combination is invalid
 */
export const play = (draw: Draw, combination: Combination): Results | null => {
    const isValid = validateCombination(combination);
    if (!isValid)  {
        return null;
    }
    const missedNumbers = dataUtils.getCombinationNumbers(combination)
        .filter(nr => !draw.drawnNumbers.includes(nr));
    return {
        drawId: draw.id,
        winnings: calculateWinnings(draw, combination),
        missedNumbers
    };
}

/**
 * Calculates prize money combination would've won in a game of bingo.
 * 
 * @param draw        - game of bingo.
 * @param combination - ticket with numbers.
 * @returns Winnings  - object of winnings by win class and total.
 */
function calculateWinnings(draw: Draw, combination: Combination): Winnings {
    const winnings: Winnings = {
        oneMissing: winningsFromOneMissingWinClass(draw, combination),
        middleSquare: winningsFromMiddleSquareWinClass(draw, combination),
        corners: winningsFromCornersWinClass(draw, combination),
        diagonals: winningsFromDiagonalsWinClass(draw, combination),
        fullGame: winningsFromFullGameWinClass(draw, combination),
        jackpot: winningsFromJackpotWinClass(draw, combination),
        total: 0
    };
    const total = (winnings.oneMissing ?? 0) + (winnings.middleSquare ?? 0) + winnings.corners 
                + winnings.diagonals + winnings.fullGame + (winnings.jackpot ?? 0);
    winnings.total = +total.toFixed(2);
    return winnings;
}

function winningsFromJackpotWinClass(draw: Draw, combination: Combination) {
    const jackpotWinClass = draw.winClasses.find(winClass => winClass.winClassNumber === 1);
    // jackpot win class should never be missing
    if (!jackpotWinClass) {
        throw Error("Missing jackpot win class");
    }
    const someoneWonJackpot = jackpotWinClass.winners > 0;
    const jackpotLimit = someoneWonJackpot ? draw.drawnNumbers.length : draw.jackpotLimit;
    if (!jackpotLimit) {
        // cannot determine if combination would win jackpot as jackpot limit is unknown
        return null;
    }
    const jackpotWon = wonJackpot(draw.drawnNumbers, combination, jackpotLimit);
    if (jackpotWon) {
        // if jackpot wasn't won by anybody else, the exact jackpot prize is unknown,
        // so need to use the forseeable jackpot
        return someoneWonJackpot
            ? statsUtils.calculateNewQuote(jackpotWinClass.quote, jackpotWinClass.winners)
            : draw.forseeableJackpot;
    }
    return 0;
}

function winningsFromFullGameWinClass(draw: Draw, combination: Combination) {
    const fullGameWinClass = draw.winClasses.find(winClass => winClass.winClassNumber === 2);
    // full game win class should never be missing
    if (!fullGameWinClass) {
        throw Error("Missing full game win class");
    }
    const fullGameWon = wonFullGame(draw.drawnNumbers, combination);
    if (fullGameWon) {
        return statsUtils.calculateNewQuote(fullGameWinClass.quote, fullGameWinClass.winners);
    }
    return 0;
}

function winningsFromDiagonalsWinClass(draw: Draw, combination: Combination) {
    const diagonalsWinClass = draw.winClasses.find(winClass => winClass.winClassNumber === 3);
    // diagonals win class should never be missing
    if (!diagonalsWinClass) {
        throw Error("Missing diagonals win class");
    }
    const diagonalsWon = wonDiagonals(draw.drawnNumbers, combination);
    if (diagonalsWon) {
        return statsUtils.calculateNewQuote(diagonalsWinClass.quote, diagonalsWinClass.winners);
    }
    return 0;
}

function winningsFromCornersWinClass(draw: Draw, combination: Combination) {
    const cornersWinClass = draw.winClasses.find(winClass => winClass.winClassNumber === 4);
    // corners win class should never be missing
    if (!cornersWinClass) {
        throw Error("Missing corners win class");
    }
    const cornersWon = wonCorners(draw.drawnNumbers, combination);
    if (cornersWon) {
        return statsUtils.calculateNewQuote(cornersWinClass.quote, cornersWinClass.winners);
    }
    return 0;
}

function winningsFromMiddleSquareWinClass(draw: Draw, combination: Combination) {
    const middleSquareWinClass = draw.winClasses.find(winClass => winClass.winClassNumber === 5);
    // middle square win class has not always been part of the game and might actually be missing
    if (!middleSquareWinClass) {
        return null;
    }
    const middleSquareWon = wonMiddleSquare(draw.drawnNumbers, combination);
    if (middleSquareWon) {
        // middle square win class win amount is constant,
        // it does not depend on the amount of winners
        return middleSquareWinClass.quote;
    }
    return 0;
}

function winningsFromOneMissingWinClass(draw: Draw, combination: Combination) {
    const oneMissingWinClass = draw.winClasses.find(winClass => winClass.winClassNumber === 6);
    // one missing win class has not always been part of the game and might actually be missing
    if (!oneMissingWinClass) {
        return null;
    }
    const oneMissingWon = wonOneMissing(draw.drawnNumbers, combination);
    if (oneMissingWon) {
        // one missing win class win amount is constant,
        // it does not depend on the amount of winners
        return oneMissingWinClass.quote;
    }
    return 0;
}

export const exportedForTesting = {
    winningsFromJackpotWinClass,
    winningsFromFullGameWinClass,
    winningsFromDiagonalsWinClass,
    winningsFromCornersWinClass,
    winningsFromMiddleSquareWinClass,
    winningsFromOneMissingWinClass
}