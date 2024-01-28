export type ColumnLetter = 'B' | 'I' | 'N' | 'G' | 'O';
export type ColumnLimits = {
    min: number,
    max: number
};
export type ColumnLimit = { [key in ColumnLetter]: ColumnLimits };

export type DrawFilter = {
    fromDate?: number,          // only include draws after certain date
    toDate?: number,            // only include draws before certain date
    jackpotSize?: number,       // minimum jackpot size
    jackpot?: boolean           // only include draws that drew jackpot
};