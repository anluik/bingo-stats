export interface SaleLocation {
    name: string; // name of the store
    county?: string;
    city?: string;
    street?: string;
    number?: string;
}

/**
 * Represents a single column of a combination. The value should never be modified.
 *
 * Number at index 0 corresponds to the number in the top row of the combination.
 * Number at index 1 corresponds to the number in the second row of the combination.
 * Etc.
 */
export type CombinationColumn = [number, number, number, number, number];

export type Combination = {
    'B': CombinationColumn,
    'I': CombinationColumn,
    'N': CombinationColumn,
    'G': CombinationColumn,
    'O': CombinationColumn,
}

export interface Ticket {
    combination: Combination;
    buyLocation?: SaleLocation;
}