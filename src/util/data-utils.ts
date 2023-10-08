import { CombinationNumbers } from "../main/model/GameCombination";
import { ColumnLetter } from "../main/types";

export const getColumnLetter = (n: number): ColumnLetter => {
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

export const groupNumbersByColumn = (numbers: number[]) => {
    return numbers.reduce<Record<ColumnLetter, number[]>>((prev, curr) => {
        const groupKey = getColumnLetter(curr);
        const group = prev[groupKey] || [];
        group.push(curr);
        return { ...prev, [groupKey]: group };
    }, {
        'B': [], 
        'I': [], 
        'N': [], 
        'G': [], 
        'O': []
    });
}

export const groupCombinationByColumn = (combination: CombinationNumbers) => {
    return combination.reduce<Record<ColumnLetter, CombinationNumbers>>((prev, curr) => {
        const groupKey = getColumnLetter(curr.number);
        const group = prev[groupKey] || [];
        group.push(curr);
        return { ...prev, [groupKey]: group };
    }, {
        'B': [], 
        'I': [], 
        'N': [], 
        'G': [], 
        'O': []
    });
}