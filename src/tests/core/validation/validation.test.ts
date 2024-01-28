import { describe, expect, it, vi } from "vitest";
import { ColumnLetter } from "../../../main/core/types";
import { Combination, CombinationColumn } from "../../../main/model/GameCombination";
import { validationUtils } from "../../../main/core/validation/validation.utils";
import { validateColumn, validateCombination } from "../../../main/core/validation/validation";
import { dataUtils } from "../../../util/data.utils";
import { duplicatesCombination, limitsViolatedCombination, validCombination } from "../../test.utils";

describe('Validation', () => {
    describe('validationUtils', () => {
        describe('validateColumn', () => {
            it('should return false if column length is not five', () => {
                const spy = vi.spyOn(validationUtils, "hasDuplicateNumbers");
                const invalidLengthArray = validCombination.B.slice(0, 4) as CombinationColumn;
                const isValid = validateColumn('B', invalidLengthArray);
                expect(isValid).toBeFalsy();
                expect(spy).not.toBeCalled();
            });

            it.each([
                ['B', limitsViolatedCombination.B],     
                ['I', limitsViolatedCombination.I],
                ['N', limitsViolatedCombination.N],
                ['G', limitsViolatedCombination.G],
                ['O', limitsViolatedCombination.O],
            ])('should return false if %s column contains numbers outside of column limits', (letter, column) => {
                const spy = vi.spyOn(validationUtils, "hasDuplicateNumbers");
                const isValid = validateColumn(letter as ColumnLetter, column as CombinationColumn);
                expect(isValid).toBeFalsy();
                expect(spy).toBeCalled();
            });

            it('should return false if column has duplicate numbers', () => {
                const spy = vi.spyOn(validationUtils, "hasDuplicateNumbers");
                const isValid = validateColumn('B', duplicatesCombination.B as CombinationColumn);
                expect(isValid).toBeFalsy();
                expect(spy).toBeCalled();
            });
        });
    });

    describe('validateCombination', () => {
        it("should validate all columns of the combination and return true", () => {
            // given
            const spy = vi.spyOn(validationUtils, "hasDuplicateNumbers");
            const combination = dataUtils.cloneObject(validCombination) as Combination;

            // when
            const result = validateCombination(combination);

            // then
            expect(result).toBeTruthy();
            expect(spy).toBeCalledTimes(5);
        });

        it("should not validate any further if combination is known to be invalid", () => {
            // given
            const spy = vi.spyOn(validationUtils, "hasDuplicateNumbers");
            const combination = dataUtils.cloneObject(validCombination) as Combination;

            // when
            combination.N[0] = 100;
            const result = validateCombination(combination);

            // then
            expect(result).toBeFalsy();
            expect(spy).toBeCalledTimes(3);
        });
    });
});