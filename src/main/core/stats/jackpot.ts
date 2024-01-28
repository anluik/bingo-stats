import { dataUtils } from "../../../util/data.utils";
import { Draw } from "../../model";

/**
 * Find the earliest draw by date that had a jackpot winner.
 * 
 * @param draws
 * @param datetime - searches among draws after given date time.
 * @returns earliest draw that won jackpot or null, if no jackpot draw was found.
 */
export const findFirstJackpot = (draws: Draw[], datetime?: number): Draw | null  => {
    if (datetime !== undefined) {
        draws = draws.filter(draw => draw.drawDate >= datetime);
    }
    const sortedByDateAsc = dataUtils.cloneObject(draws).sort((a, b) => a.drawDate - b.drawDate);
    return sortedByDateAsc.find(draw => {
        const jackpotClass = draw.winClasses.find(winClass => winClass.winClassNumber === 1);
        return jackpotClass?.quote && jackpotClass.quote > 0;
    }) ?? null;
}

/**
 * Find the latest draw with a jackpot winner before a certain draw.
 * 
 * @param draws
 * @param datetime - searches among draws before given date time.
 * @returns latest draw that won jackpot or null, if no jackpot draw was found.
 */
export const findPreviousJackpot = (draws: Draw[], datetime?: number): Draw | null  => {
    if (datetime !== undefined) {
        draws = draws.filter(draw => draw.drawDate <= datetime);
    }
    const sortedByDateDesc = dataUtils.cloneObject(draws).sort((a, b) => b.drawDate - a.drawDate);
    return sortedByDateDesc.find(draw => {
        const jackpotClass = draw.winClasses.find(winClass => winClass.winClassNumber === 1);
        return jackpotClass?.quote && jackpotClass.quote > 0;
    }) ?? null;
}