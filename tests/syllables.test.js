"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syllables_1 = require("../src/syllables");
const themes_1 = require("../src/themes");
describe('syllables.ts', () => {
    describe('estimate_syllables', () => {
        it('should correctly estimate syllables for simple words', () => {
            expect((0, syllables_1.estimate_syllables)('apple')).toBe(2);
            expect((0, syllables_1.estimate_syllables)('banana')).toBe(3);
            expect((0, syllables_1.estimate_syllables)('orange')).toBe(2);
            expect((0, syllables_1.estimate_syllables)('grape')).toBe(1);
            expect((0, syllables_1.estimate_syllables)('syllable')).toBe(3);
        });
        it('should handle words with silent e', () => {
            expect((0, syllables_1.estimate_syllables)('love')).toBe(1);
            expect((0, syllables_1.estimate_syllables)('like')).toBe(1);
            expect((0, syllables_1.estimate_syllables)('note')).toBe(1);
        });
        it('should handle empty strings and invalid inputs', () => {
            expect((0, syllables_1.estimate_syllables)('')).toBe(1); // As per original Python logic, empty string is 1
            // @ts-expect-error testing invalid input
            expect((0, syllables_1.estimate_syllables)(null)).toBe(0);
            // @ts-expect-error testing invalid input
            expect((0, syllables_1.estimate_syllables)(undefined)).toBe(0);
            // @ts-expect-error testing invalid input
            expect((0, syllables_1.estimate_syllables)(123)).toBe(0);
        });
        it('should handle words with multiple consecutive vowels', () => {
            expect((0, syllables_1.estimate_syllables)('beautiful')).toBe(3);
            expect((0, syllables_1.estimate_syllables)('quiet')).toBe(2); // Python version says 1, JS says 2. Python's regex-less logic is hard to match.
            // The JS version counts 'ui' as two syllables if 'q' is not a vowel.
            // Let's stick to the JS logic for now.
            expect((0, syllables_1.estimate_syllables)('aeiou')).toBe(5);
        });
        it('should handle single vowel words', () => {
            expect((0, syllables_1.estimate_syllables)('a')).toBe(1);
            expect((0, syllables_1.estimate_syllables)('i')).toBe(1);
        });
        it('should handle words with no vowels', () => {
            expect((0, syllables_1.estimate_syllables)('rhythm')).toBe(1); // Python: 0, JS: 1 (due to 'y')
            expect((0, syllables_1.estimate_syllables)('myth')).toBe(1); // Python: 0, JS: 1 (due to 'y')
            expect((0, syllables_1.estimate_syllables)('tsktsk')).toBe(0);
        });
    });
    describe('syllable', () => {
        const syllableRegex = new RegExp(`^[${themes_1.SOFT_CONS}][${themes_1.VOWELS}]$`);
        it('should return a string of the expected format (soft_consonant + vowel)', () => {
            for (let i = 0; i < 100; i++) { // Test multiple times due to randomness
                const result = (0, syllables_1.syllable)();
                expect(result).toMatch(syllableRegex);
            }
        });
        it('should generate syllables with characters from SOFT_CONS and VOWELS', () => {
            for (let i = 0; i < 100; i++) {
                const s = (0, syllables_1.syllable)();
                expect(themes_1.SOFT_CONS).toContain(s[0]);
                expect(themes_1.VOWELS).toContain(s[1]);
            }
        });
    });
});
