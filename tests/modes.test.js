"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modes_1 = require("../src/modes");
const themes_1 = require("../src/themes");
describe('modes.ts', () => {
    const testTheme = 'haiku'; // Use a consistent theme for most tests
    describe('MODES object', () => {
        it('should contain all expected modes', () => {
            expect(Object.keys(modes_1.MODES)).toEqual([
                'haiku', 'lace', 'mirrora', 'rune', 'sonnet', 'sigil', 'seed', 'mantra', 'quartz'
            ]);
        });
    });
    Object.entries(modes_1.MODES).forEach(([modeName, modeFunction]) => {
        describe(`${modeName} mode`, () => {
            it('should return a non-empty string when called with a valid theme', () => {
                // Mirrora is a special case, it doesn't take a theme
                const result = modeName === 'mirrora' ? modeFunction() : modeFunction(testTheme);
                expect(result).toBeDefined();
                expect(typeof result).toBe('string');
                expect(result.length).toBeGreaterThan(0);
            });
        });
    });
    describe('haiku mode specific tests', () => {
        it('should return a string with three parts separated by hyphens', () => {
            const result = (0, modes_1.haiku)(testTheme);
            expect(result.split('-').length).toBe(3);
        });
        it('should return "incomplete-haiku" if lines cannot be formed', () => {
            // Temporarily mock THEMES to be empty to force incomplete haiku
            const originalThemes = { ...themes_1.THEMES };
            for (const key in themes_1.THEMES)
                delete themes_1.THEMES[key]; // Empty THEMES
            themes_1.THEMES['empty'] = ['a']; // Add a single short word to avoid other errors but ensure haiku fails
            const result = (0, modes_1.haiku)('empty');
            expect(result).toBe('incomplete-haiku');
            // Restore THEMES
            for (const key in originalThemes)
                themes_1.THEMES[key] = originalThemes[key];
            delete themes_1.THEMES['empty'];
        });
    });
    describe('lace mode specific tests', () => {
        it('should have a mirrored middle part and a reversed end part', () => {
            const result = (0, modes_1.lace)(testTheme); // e.g., wordXY-YXdrow
            const parts = result.split('-');
            expect(parts.length).toBe(2);
            const [firstPart, secondPart] = parts;
            const word = firstPart.slice(0, -2); // Assuming syllable is length 2
            const midSyllable = firstPart.slice(-2);
            expect(midSyllable.split('').reverse().join('')).toBe(secondPart.slice(0, 2));
            expect(word.split('').reverse().join('')).toBe(secondPart.slice(2));
        });
    });
    describe('mirrora mode specific tests', () => {
        it('should have two parts, where the first is the reverse of the second', () => {
            const result = (0, modes_1.mirrora)(); // e.g., yx-xy
            const parts = result.split('-');
            expect(parts.length).toBe(2);
            expect(parts[0].split('').reverse().join('')).toBe(parts[1]);
        });
    });
    describe('rune_key mode specific tests', () => {
        it('should end with an underscore and a valid rune', () => {
            const result = (0, modes_1.rune_key)(testTheme);
            const parts = result.split('_');
            expect(parts.length).toBe(2);
            expect(themes_1.RUNES).toContain(parts[1]);
        });
    });
    describe('sonnet mode specific tests', () => {
        it('should have two capitalized words followed by two characters, separated by a hyphen', () => {
            const result = (0, modes_1.sonnet)(testTheme); // e.g., WordAB-WordCD
            const parts = result.split('-');
            expect(parts.length).toBe(2);
            expect(parts[0]).toMatch(/^[A-Z][a-z]+[a-z]{2}$/);
            expect(parts[1]).toMatch(/^[A-Z][a-z]+[a-z]{2}$/);
        });
    });
    describe('sigil mode specific tests', () => {
        it('should have two capitalized words separated by a 3-digit number', () => {
            const result = (0, modes_1.sigil)(testTheme); // e.g., Word-123-Word
            const parts = result.split('-');
            expect(parts.length).toBe(3);
            expect(parts[0]).toMatch(/^[A-Z][a-z]+$/);
            expect(parts[1]).toMatch(/^\d{3}$/);
            expect(parts[2]).toMatch(/^[A-Z][a-z]+$/);
        });
    });
    describe('seed mode specific tests', () => {
        it('should have a 4-char capitalized word part and a 4-digit hex number', () => {
            const result = (0, modes_1.seed)(testTheme); // e.g., Word-abcd
            const parts = result.split('-');
            expect(parts.length).toBe(2);
            expect(parts[0]).toMatch(/^[A-Z][a-z]{0,3}$/); // Capitalized, up to 4 chars
            expect(parts[1]).toMatch(/^[0-9a-f]{4}$/);
        });
    });
    describe('mantra mode specific tests', () => {
        it('should have three capitalized words, with the first two being identical', () => {
            const result = (0, modes_1.mantra)(testTheme); // e.g., Word-Word-Differentword
            const parts = result.split('-');
            expect(parts.length).toBe(3);
            expect(parts[0]).toMatch(/^[A-Z][a-z]+$/);
            expect(parts[1]).toMatch(/^[A-Z][a-z]+$/);
            expect(parts[2]).toMatch(/^[A-Z][a-z]+$/);
            expect(parts[0]).toBe(parts[1]);
        });
    });
    describe('quartz mode specific tests', () => {
        it('should follow the pattern WordNN.NNdroW', () => {
            const result = (0, modes_1.quartz)(testTheme); // e.g. Crystal23.32latsy
            expect(result).toMatch(/^[A-Z][a-z]+\d{2}\.\d{2}[a-z]{4}$/);
            const mainWord = result.match(/^[A-Z][a-z]+/)?.[0];
            const firstNum = result.match(/\d{2}\./)?.[0].slice(0, 2);
            const secondNum = result.match(/\.\d{2}/)?.[0].slice(1, 3);
            const reversedWordPart = result.match(/[a-z]{4}$/)?.[0];
            expect(firstNum).toBeDefined();
            expect(secondNum).toBeDefined();
            expect(mainWord).toBeDefined();
            expect(reversedWordPart).toBeDefined();
            expect(firstNum).toBe(secondNum);
            if (mainWord && reversedWordPart) {
                expect(mainWord.split('').reverse().join('').slice(0, 4)).toBe(reversedWordPart);
            }
        });
    });
});
