import { dataUtils } from './../../../util/data.utils';
import { describe, expect, it } from "vitest";
import { findFirstJackpot, findPreviousJackpot } from "../../../main/core/stats/jackpot";
import { twentyRealDraws } from '../../test.utils';

describe('jackpot', () => {

    describe('find last jackpot', () => {
        it("should find the previous jackpot among given data that is ordered by date", () => {
            const previousJackpotDraw = findPreviousJackpot(twentyRealDraws);
            expect(previousJackpotDraw?.id).toBe(2374);
        });
    
        it("should find the previous jackpot among draws even if they're sorted in another way", () => {
            const drawsReversed = dataUtils.cloneObject(twentyRealDraws).reverse();
            const previousJackpotDraw = findPreviousJackpot(drawsReversed);
            expect(previousJackpotDraw?.id).toBe(2374);
        });
    
        it("should return the previous jackpot since given datetime", () => {
            const previousJackpotDraw = findPreviousJackpot(twentyRealDraws, 1520440200000);
            expect(previousJackpotDraw?.id).toBe(1047);
        });

        it("should return null if jackpot not found", () => {
            const drawsNoJackpots = twentyRealDraws.slice(0, 3);
            const previousJackpotDraw = findPreviousJackpot(drawsNoJackpots);
            expect(previousJackpotDraw).toBeNull();
        });
    });

    describe('find first jackpot', () => {
        it("should find the first jackpot among given data that is ordered by date", () => {
            const firstJackpotDraw = findFirstJackpot(twentyRealDraws);
            expect(firstJackpotDraw?.id).toBe(1047);
        });
    
        it("should find the first jackpot among draws even if they're sorted in another way", () => {
            const drawsReversed = dataUtils.cloneObject(twentyRealDraws).reverse();
            const firstJackpotDraw = findFirstJackpot(drawsReversed);
            expect(firstJackpotDraw?.id).toBe(1047);
        });
    
        it("should return the first jackpot since given datetime", () => {
            const firstJackpotDraw = findFirstJackpot(twentyRealDraws, 1522855800000);
            expect(firstJackpotDraw?.id).toBe(2374);
        });

        it("should return null if jackpot not found", () => {
            const drawsNoJackpots = twentyRealDraws.slice(0, 3);
            const firstJackpotDraw = findFirstJackpot(drawsNoJackpots);
            expect(firstJackpotDraw).toBeNull();
        });
    });
});