import { ColumnLimit } from "../types";

const columnLimits: ColumnLimit = {
    B: { min: 1, max: 15 },
    I: { min: 16, max: 30 },
    N: { min: 31, max: 45 },
    G: { min: 46, max: 60 },
    O: { min: 61, max: 75 },
}

const hasDuplicateNumbers = (array: number[]) => {
    return (new Set(array)).size !== array.length;
}

export const validationUtils = {
    columnLimits,
    hasDuplicateNumbers
}