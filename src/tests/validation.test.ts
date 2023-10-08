import { describe, expect, it } from "vitest";
import { validateNumbers } from "../main/validation";

describe('Validation', () => {
    describe('validateNumbers', () => {
        it("should return false if the count of numbers array is not 25", () => {
            expect(validateNumbers((Array(5).fill(2)))).toBe(false);
        });
    });

    describe('validateCombination', () => {});
});