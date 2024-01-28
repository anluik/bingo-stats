import { Combination, Draw } from "../main";
import { ColumnLetter, DrawFilter } from "../main/core/types";

const getCombinationNumbers = (combination: Combination) => {
    const arrays = Object.values(combination);
    return arrays.flat();
}

const getColumnLetter = (n: number): ColumnLetter => {
    if (n >= 1 && n <= 15) {
        return 'B';
    }
    if (n <= 30) {
        return 'I';
    }
    if (n <= 45) {
        return 'N';
    }
    if (n <= 60) {
        return 'G';
    }
    if (n <= 75) {
        return 'O';
    }
    throw Error("Number of out bounds!")
}

const filterDraws = (draws: Draw[], filter: DrawFilter) => {
    return draws.filter(draw => {
        if (filter.fromDate && draw.drawDate < filter.fromDate) {
            return false;
        }
        if (filter.toDate && draw.drawDate > filter.toDate) {
            return false;
        }
        if (filter.jackpotSize && (draw.forseeableJackpot == null || draw.forseeableJackpot < filter.jackpotSize)) {
            return false;
        }
        if (filter.jackpot) {
            const jackpotWinClass = draw.winClasses.find(winClass => winClass.winClassNumber === 1);
            if (!jackpotWinClass || jackpotWinClass.winners < 1) {
                return false;
            }
        }
        return true;
    });
}

const cloneObject = <T>(object: T): T => {
    return JSON.parse(JSON.stringify(object));
}

export const dataUtils = {
    getCombinationNumbers,
    getColumnLetter,
    filterDraws,
    cloneObject
};