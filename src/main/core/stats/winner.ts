import { Combination } from "../../model";
import { dataUtils } from '../../../util/data.utils';

/**
 * Check if all numbers of the ticket were drawn before the "jackpot limit".
 * 
 * The "jackpot limit" is initially 41. In the event that there is no winner at the jackpot winning level 
 * in a particular draw, the jackpot limit number increases by one number in the next draw (i.e. the
 * following draw will draw 41+1 numbers, in the subsequent draw 42+1, etc.). 
 * The jackpot limit increases until the jackpot winner(s) is determined and the jackpot limit resets to 41.
 * 
 * @param drawnNumbers - numbers drawn during the game.
 * @param combination  - ticket with numbers.
 * @param jackpotLimit - the limit of numbers to win jackpot.
 * @returns boolean    - if ticket won or not.
 */
export const wonJackpot = (
    drawnNumbers: number[],
    combination: Combination,
    jackpotLimit: number
) => {
    drawnNumbers = drawnNumbers.slice(0, jackpotLimit);
    return wonFullGame(drawnNumbers, combination);
}


/**
 * Check if all numbers of the ticket were drawn.
 * 
 * @param drawnNumbers - numbers drawn during the game.
 * @param combination  - ticket with numbers.
 * @returns boolean    - if ticket won or not.
 */
export const wonFullGame = (
    drawnNumbers: number[],
    combination: Combination
) => {
    const ticketNumbers = dataUtils.getCombinationNumbers(combination);
    return ticketNumbers.every(nr => drawnNumbers.includes(nr));
}

/**
 * Check if ticket won in the "diagonals" win class.
 * 
 * Ticket is a winner if all nine (9) numbers on the diagonals of the game 
 * combination are drawn among the first 38 numbers.
 * 
 * @param winningNumbers - winning numbers of the diagonals win class. All drawn numbers of the entire draw 
 *                         can be given (more than 38 numbers), but then they have to in the order they were 
 *                         drawn and only the first 38 numbers are considered.
 * @param combination    - ticket with numbers.
 * @returns boolean      - if ticket won or not.    
 *          null         - if there are less than 38 distinct winning numbers.
 */
export const wonDiagonals = (
    winningNumbers: number[],
    combination: Combination
) => {
    const distinctWinningNumbers = new Set(winningNumbers);
    if (distinctWinningNumbers.size < 38) {
        return null;
    }
    if (distinctWinningNumbers.size != 38) {
        winningNumbers = [...distinctWinningNumbers].slice(0, 38);
    }
    const diagonalNumbers = [
        combination.B[0],
        combination.B[4],
        combination.I[1],
        combination.I[3],
        combination.N[2],
        combination.G[1],
        combination.G[3],
        combination.O[0],
        combination.O[4],
    ];
    return diagonalNumbers.every(nr => winningNumbers.includes(nr));
}

/**
 * Check if ticket won in the "corners" win class.
 * 
 * Ticket is a winner if all four (4) numbers placed in the corners of the game 
 * combination are among the first 33 numbers drawn.
 * 
 * @param winningNumbers - winning numbers of the corners win class. All drawn numbers of the entire draw 
 *                         can be given (more than 33 numbers), but then they have to in the order they were 
 *                         drawn and only the first 33 numbers are considered.
 * @param combination    - ticket with numbers.
 * @returns boolean      - if ticket won or not.    
 *          null         - if there are less than 33 distinct winning numbers.
 */
export const wonCorners = (
    winningNumbers: number[],
    combination: Combination
) => {
    const distinctWinningNumbers = new Set(winningNumbers);
    if (distinctWinningNumbers.size < 33) {
        return null;
    }
    if (distinctWinningNumbers.size != 33) {
        winningNumbers = [...distinctWinningNumbers].slice(0, 33);
    }
    const cornerNumbers = [
        combination.B[0],
        combination.B[4],
        combination.O[0],
        combination.O[4],
    ];
    return cornerNumbers.every(nr => winningNumbers.includes(nr));
}

/**
 * Check if ticket won in the "middle square" win class.
 * 
 * Ticket is a winner if the first drawn number between 31-45 is in the middle square of the ticket.
 * 
 * @param winningNumbers - winning number(s) of the win class (or entire draw). If given an array, the 
 *                         numbers must be in the order they were drawn as the first number
 *                         between 31 and 45 is used to determine if the ticket won.
 * @param combination    - ticket with numbers.
 * @returns boolean      - if ticket won or not.
 */
export const wonMiddleSquare = (
    winningNumbers: number | number[],
    combination: Combination
) => {
    const middleSquareNumber = combination.N[2];
    if (Array.isArray(winningNumbers)) {
        const winningNumber = winningNumbers.find(nr => nr >= 31 && nr <= 45);
        return middleSquareNumber === winningNumber;
    }
    return middleSquareNumber === winningNumbers;
}

/**
 * Check if ticket won in the "one missing" win class.
 * 
 * Ticket is a winner if the game ends while the ticket has only one missing number.
 * 
 * @param drawnNumbers - numbers drawn during the game.
 * @param combination  - ticket with numbers.
 * @returns boolean    - if ticket won or not.
 */
export const wonOneMissing = (
    drawnNumbers: number[],
    combination: Combination
) => {
    const ticketNumbers = dataUtils.getCombinationNumbers(combination);
    const missedNumbers = ticketNumbers.filter(nr => !drawnNumbers.includes(nr));
    return missedNumbers.length === 1;
}