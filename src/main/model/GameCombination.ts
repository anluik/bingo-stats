interface CombinationNumber {
    number: number;
    isInCorner: boolean;
    isOnDiagonal: boolean;
    isInCenter: boolean;
}

interface SaleLocation {
    name: string | "internet" | "unknown"; // name of the store
    county?: string;
    city?: string;
    street?: string;
    number?: string;
}

export type CombinationNumbers = CombinationNumber[];

export interface GameCombination {
    numbers: CombinationNumbers;
    buyLocation?: SaleLocation;
}