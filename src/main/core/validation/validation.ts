import { Combination, CombinationColumn } from "../../model/GameCombination";
import { ColumnLetter } from "../types";
import { validationUtils } from "./validation.utils";

/**
 * Validate if given column meets the rules of the game.
 * 
 * Each column must have 5 distinct numbers that are within column limits by letter.
 * 
 * @param letter - column letter.
 * @param column - a single column of a combination to be validated.
 * @returns true, if column is valid, else false.
 */
export const validateColumn = (letter: ColumnLetter, column: CombinationColumn): boolean => {
    if (column.length !== 5 || validationUtils.hasDuplicateNumbers(column)) {
        return false;
    }
    const limits = validationUtils.columnLimits[letter];
    return column.every(number => number >= limits.min && number <= limits.max);
}

/**
 * Validate if given game combination meets the rules of the game.
 * 
 * @param combination - combination to be validated.
 * @returns true, if all columns of the game combination are valid, else false.
 */
export const validateCombination = (combination: Combination): boolean => {
    for (const columnLetter in combination) {
        const column = combination[columnLetter as ColumnLetter];
        const columnIsValid = validateColumn(columnLetter as ColumnLetter, column);
        if (!columnIsValid) {
            return false;
        }
    }
    return true;
};