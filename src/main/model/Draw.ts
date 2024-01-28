interface WinClass {
    drawId: number;
    winClassNumber: number;     // for Bingo: 1 - jackpot; 2 - full game; 3 - diagonals; 4 - corners; 5 - middle square; 6 - one missing
    quote: number;              // winning amount (each ticket)
    winners: number;            // number of winning tickets
    winningNumber: number[];    /* winning number(s) of the class. Jackpot, full game and one missing should have all numbers drawn in the game.
                                   Diagonals should have first 38 drawn numbers, corners first 33 drawn numbers, and middle square 1 number between 31-45 */
}

export interface Draw {
    id: number;                         // id of a draw of any type
    reference: string;                  // reference to a certain draw - references to draws of the same type should be sequential
    drawDate: number;                   // date in milliseconds
    forseeableJackpot: number | null;   /* close estimation of the jackpot size for this draw.
                                           Might differ slightly from actual depending on factors like number of tickets sold. */
    jackpotLimit: number | null;        // limit of numbers drawn to win jackpot. Might not be possible to be calculated for some draws.
    drawnNumbers: number[];             // drawn numbers in drawing order
    winClasses: WinClass[];
}