import { Combination, Draw } from "../main";
import allWinClassesJackpotDrawJson from './data/all-win-classes-jackpot-draw.json';
import twentyRealDrawsJson from './data/twenty-real-draws.json';
import validCombinationJson from './data/valid-combination.json';
import duplicatesCombinationJson from './data/duplicates-combination.json';
import limitsViolatedCombinationJson from './data/limits-violated-combination.json';

export const twentyRealDraws = twentyRealDrawsJson as Draw[];
export const allWinClassesJackpotDraw = allWinClassesJackpotDrawJson as Draw;
export const validCombination = validCombinationJson as Combination;
export const duplicatesCombination = duplicatesCombinationJson as Combination;
export const limitsViolatedCombination = limitsViolatedCombinationJson as Combination;

// this equals to allWinClassesJackpotDraw.drawnNumbers
export const testDrawnNumbers = [
    26, 60, 40,  6,  7, 49,  4, 10, 24, 71,
    68, 53, 54, 55, 12, 56, 21, 16, 15, 67,
    42, 41, 38, 59, 62, 14,  9, 31, 32,  5,
    37, 66, 47,                                 // corners game
    57, 64, 17,  3, 73,                         // diagonals game
    11, 51, 25, 75, 50, 36, 19, 69, 28,  1,
    58, 70
];

// combination that won in all win classes except "one missing" class
export const winAllButOneMissing: Combination = {
    "B": [ 4,  3,  1,  6,  7],
    "I": [16, 17, 28, 26, 25],
    "N": [31, 42, 40, 38, 32],
    "G": [47, 57, 60, 53, 50],
    "O": [62, 66, 68, 64, 71]
};

// combination that wins only corners and diagonals
export const winCornersAndDiagonals: Combination = {
    "B": [ 4,  3,  8,  6, 7],
    "I": [16, 17, 18, 26, 22],
    "N": [36, 31, 42, 33, 43],
    "G": [47, 57, 52, 53, 50],
    "O": [62, 66, 68, 64, 71]
};

// combination that lost in all win classes
export const loseAll: Combination = {
    "B": [ 2,  3,  4,  6, 13],
    "I": [16, 17, 18, 19, 22],
    "N": [36, 31, 34, 33, 43],
    "G": [47, 48, 52, 53, 50],
    "O": [62, 66, 68, 64, 65]
};

// combination that wins one missing, but loses in all other win classes
// i.e. all numbers were drawn (except one), but not in the required amount of numbers
export const winOnlyOneMissing: Combination = {
    "B": [ 1,  3,  4,  6,  7], // 1 is drawn after corners and diagonals game
    "I": [19, 17, 21, 16, 24],
    "N": [31, 32, 41, 37, 36],
    "G": [47, 49, 48, 54, 50], // 48 not drawn
    "O": [71, 66, 68, 64, 75]
};

// combination that wins only full game, or jackpot if jackpot limit is 48 or higher
export const winsCombination: Combination = {
    "B": [ 1,  3,  4,  6,  7], // 1 is the 48th and last number to be drawn for this ticket
    "I": [19, 17, 21, 16, 24],
    "N": [31, 32, 41, 37, 36],
    "G": [47, 49, 53, 54, 50],
    "O": [62, 66, 68, 64, 67]
};
