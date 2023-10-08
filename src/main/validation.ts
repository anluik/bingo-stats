import { groupCombinationByColumn, groupNumbersByColumn } from "../util/data-utils";
import { CombinationNumbers, GameCombination } from "./model/GameCombination";
import { ColumnLetter, ColumnLimit } from "./types";

export const columnLimits: ColumnLimit = {
    B: { min: 1, max: 15 },
    I: { min: 16, max: 30 },
    N: { min: 31, max: 45 },
    G: { min: 46, max: 60 },
    O: { min: 61, max: 75 },
}

const hasDuplicateNumbers = (array: number[]) => {
    return (new Set(array)).size !== array.length;
}

const anyNumberIsOutOfBounds = (array: number[]) => {
    return array.some(n => n < 1 || n > 75);
}

const validateColumn = (letter: ColumnLetter, column: CombinationNumbers): boolean => {
    if (column.length !== 5) {
        return false;
    }
    if (letter === 'B' || letter === 'O') {
        const corners = column.filter(cell => cell.isInCorner && cell.isOnDiagonal && !cell.isInCenter);
        if (corners.length !== 2) {
            return false;
        }
        const otherCells = column.filter(cell => !cell.isInCorner && !cell.isOnDiagonal && !cell.isInCenter);
        return otherCells.length === 3;
    }
    if (letter === 'I' || letter === 'G') {
        const diagonals = column.filter(cell => !cell.isInCorner && cell.isOnDiagonal && !cell.isInCenter);
        if (diagonals.length !== 2) {
            return false;
        }
        const otherCells = column.filter(cell => !cell.isInCorner && !cell.isOnDiagonal && !cell.isInCenter);
        return otherCells.length === 3;
    }
    const center = column.filter(cell => !cell.isInCorner && cell.isOnDiagonal && cell.isInCenter);
    if (center.length !== 1) {
        return false;
    }
    const otherCells = column.filter(cell => !cell.isInCorner && !cell.isOnDiagonal && !cell.isInCenter);
    return otherCells.length === 4;
}

/**
 * Validate if a valid game combination can be composed from given numbers.
 * Combination must contain 25 distinct numbers and there are 5 numbers in each column:
 * - B column numbers are in range 1-15.
 * - I column numbers are in range 16-30.
 * - N column numbers are in range 31-45.
 * - G column numbers are in range 46-60.
 * - O column numbers are in range 61-75.
 * 
 * @param numbers - numbers for the combination.
 * @returns true, if a valid game combination can be composed, else false.
 */
export const validateNumbers = (numbers: number[]): boolean => {
    if (numbers.length !== 25 || anyNumberIsOutOfBounds(numbers) || hasDuplicateNumbers(numbers)) {
        return false;
    }
    const numbersByLetter = groupNumbersByColumn(numbers);
    for (const columnLetter in numbersByLetter) {
        const columnNumbers = numbersByLetter[columnLetter as ColumnLetter];
        if (columnNumbers.length !== 5) {
            return false;
        }
    }
    return true;
};

/**
 * Validate if given game combination meets the rules of the game.
 * 
 * Numbers of the combination must be valid (@see {@link validateNumbers}).
 * 
 * Additionally, each column must follow:
 * - B and O columns have two numbers that are both corner and diagonal numbers.
 * - I and G columns have two numbers that are diagonal numbers.
 * - N column has one number that is both a diagonal and a center number.
 * - All other numbers in each column are neither corner nor diagonal nor center numbers.
 * 
 * @param game - game combination to be validated.
 * @returns true, if game combination meets the rules, else false.
 */
export const validateCombination = (combination: CombinationNumbers): boolean => {
    const numbers = combination.map(c => c.number);
    if (numbers.length !== 25 || anyNumberIsOutOfBounds(numbers) || hasDuplicateNumbers(numbers)) {
        return false;
    }
    const columnNumbersByLetter = groupCombinationByColumn(combination);
    for (const columnLetter in columnNumbersByLetter) {
        const columnNumbers = columnNumbersByLetter[columnLetter as ColumnLetter];
        return validateColumn(columnLetter as ColumnLetter, columnNumbers);
    }
    return true;
};
