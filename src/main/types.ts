export type ColumnLetter = 'B' | 'I' | 'N' | 'G' | 'O';
export type ColumnLimits = {
    min: number,
    max: number
};
export type ColumnLimit = { [key in ColumnLetter]: ColumnLimits };