"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const modes_1 = require("../src/modes"); // Import haiku for fallback check
const themes_1 = require("../src/themes");
describe('index.ts', () => {
    describe('poetic_key', () => {
        it('should return a non-empty string with default arguments (haiku, haiku)', () => {
            const key = (0, index_1.poetic_key)();
            expect(typeof key).toBe('string');
            expect(key.length).toBeGreaterThan(0);
            // Check if it looks like a haiku (three parts)
            expect(key.split('-').length).toBe(3);
        });
        it('should use the specified mode and theme', () => {
            const theme = 'nocturnal';
            const mode = 'seed';
            const key = (0, index_1.poetic_key)(mode, theme);
            expect(typeof key).toBe('string');
            expect(key.length).toBeGreaterThan(0);
            // Seed format: Word-xxxx (hex)
            const parts = key.split('-');
            expect(parts.length).toBe(2);
            expect(themes_1.THEMES[theme]).toContain(parts[0].toLowerCase().slice(0, 4)); // Check if first part is from theme
            expect(parts[1]).toMatch(/^[0-9a-f]{4}$/);
        });
        it('should use the specified mode and default theme if theme is invalid/not provided', () => {
            const mode = 'sonnet';
            // @ts-expect-error testing invalid theme
            const key = (0, index_1.poetic_key)(mode, "invalidTheme");
            expect(typeof key).toBe('string');
            expect(key.length).toBeGreaterThan(0);
            // Sonnet format: WordAB-WordCD
            const parts = key.split('-');
            expect(parts.length).toBe(2);
            expect(parts[0]).toMatch(/^[A-Z][a-z]+[a-z]{2}$/);
            expect(parts[1]).toMatch(/^[A-Z][a-z]+[a-z]{2}$/);
            // Check if words are from the default 'haiku' theme
            const defaultThemeWords = themes_1.THEMES['haiku'];
            expect(defaultThemeWords).toContain(parts[0].slice(0, -2).toLowerCase());
            expect(defaultThemeWords).toContain(parts[1].slice(0, -2).toLowerCase());
        });
        it('should fall back to "haiku" mode if an invalid mode is specified', () => {
            const theme = 'celestial';
            // @ts-expect-error testing invalid mode
            const keyWithInvalidMode = (0, index_1.poetic_key)('invalidMode', theme);
            const keyWithHaikuMode = (0, modes_1.haiku)(theme); // Generate a haiku with the same theme for structure comparison
            expect(typeof keyWithInvalidMode).toBe('string');
            expect(keyWithInvalidMode.length).toBeGreaterThan(0);
            // Check if it looks like a haiku (three parts)
            expect(keyWithInvalidMode.split('-').length).toBe(3);
            // This test is tricky because haiku generation is random.
            // We can't expect keyWithInvalidMode to be *identical* to keyWithHaikuMode.
            // We primarily check that it *behaves* like haiku mode (e.g. structure).
            // The fact that it doesn't error out and produces a structured output is key.
        });
        it('should correctly call mirrora when mode is "mirrora" (no theme)', () => {
            const key = (0, index_1.poetic_key)('mirrora');
            expect(typeof key).toBe('string');
            expect(key.length).toBeGreaterThan(0);
            const parts = key.split('-');
            expect(parts.length).toBe(2);
            expect(parts[0].split('').reverse().join('')).toBe(parts[1]); // yx-xy
        });
        it('should correctly call a mode that expects a theme when mode and theme are provided', () => {
            const key = (0, index_1.poetic_key)('lace', 'oceanic');
            expect(typeof key).toBe('string');
            expect(key.length).toBeGreaterThan(0);
            const parts = key.split('-');
            expect(parts.length).toBe(2);
            const word = parts[0].slice(0, -2);
            const midSyllable = parts[0].slice(-2);
            expect(themes_1.THEMES['oceanic']).toContain(word.toLowerCase());
            expect(midSyllable.split('').reverse().join('')).toBe(parts[1].slice(0, 2));
            expect(word.split('').reverse().join('')).toBe(parts[1].slice(2));
        });
    });
});
