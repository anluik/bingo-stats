import { Draw } from "./Draw";

interface GameModeResult {
    nrOfWinners: number;
    winningPrize: number; // amount of money each winner received
}

interface DrawingResults {
    centerGame: GameModeResult;
    cornersGame: GameModeResult;
    diagonalsGame: GameModeResult;
    fullGame: GameModeResult;
    oneMissing: GameModeResult;
    jackpot: GameModeResult;
}

export interface Drawing {
    id: number;
    reference?: string;         // any value to reference the actual real drawing
    draw: Draw;
    gameDayDate: string;        // date string in YYYY-MM-DD format
    country: string;            // country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Current_codes)
    forseeableJackpot: number;
    results: DrawingResults;
}