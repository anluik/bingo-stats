/**
 * Calculates new quote for a win class.
 * 
 * If a combination would have won, the amount of winners would have been 1 greater.
 * If the win class has a fixed winning fund, the amount that each winner is paid 
 * changes if the amount of winners changes.
 * 
 * @param quote    - original quote.
 * @param winners  - original number of winners.
 * @returns number - new quote.
 */
function calculateNewQuote(quote: number, winners: number) {
    const winningFund = quote * winners;
    const winnersPlusOne = winners + 1;
    return +(winningFund / winnersPlusOne).toFixed(2);
}

export const statsUtils = {
    calculateNewQuote
}