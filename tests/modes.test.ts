import { MODES, haiku, lace, mirrora, rune_key, sonnet, sigil, seed, mantra, quartz } from '../src/modes';
import { THEMES, RUNES } from '../src/themes';

describe('modes.ts', () => {
  const testTheme = 'haiku'; // Use a consistent theme for most tests

  describe('MODES object', () => {
    it('should contain all expected modes', () => {
      expect(Object.keys(MODES)).toEqual([
        'haiku', 'lace', 'mirrora', 'rune', 'sonnet', 'sigil', 'seed', 'mantra', 'quartz'
      ]);
    });
  });

  Object.entries(MODES).forEach(([modeName, modeFunction]) => {
    describe(`${modeName} mode`, () => {
      it('should return a non-empty string when called with a valid theme', () => {
        // Mirrora is a special case, it doesn't take a theme
        const result = modeName === 'mirrora' ? (modeFunction as () => string)() : modeFunction(testTheme);
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });

  describe('haiku mode specific tests', () => {
    it('should return a string with three parts separated by hyphens', () => {
      const result = haiku(testTheme);
      expect(result.split('-').length).toBe(3);
    });

    it('should return "incomplete-haiku" if lines cannot be formed', () => {
        // Temporarily mock THEMES to be empty to force incomplete haiku
        const originalThemes = { ...THEMES };
        for (const key in THEMES) delete THEMES[key]; // Empty THEMES
        THEMES['empty'] = ['a']; // Add a single short word to avoid other errors but ensure haiku fails

        const result = haiku('empty');
        expect(result).toBe('incomplete-haiku');

        // Restore THEMES
        for (const key in originalThemes) THEMES[key] = originalThemes[key];
        delete THEMES['empty'];
      });
  });

  describe('lace mode specific tests', () => {
    it('should have a mirrored middle part and a reversed end part', () => {
      const result = lace(testTheme); // e.g., wordXY-YXdrow
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
      const result = mirrora(); // e.g., yx-xy
      const parts = result.split('-');
      expect(parts.length).toBe(2);
      expect(parts[0].split('').reverse().join('')).toBe(parts[1]);
    });
  });

  describe('rune_key mode specific tests', () => {
    it('should end with an underscore and a valid rune', () => {
      const result = rune_key(testTheme);
      const parts = result.split('_');
      expect(parts.length).toBe(2);
      expect(RUNES).toContain(parts[1]);
    });
  });

  describe('sonnet mode specific tests', () => {
    it('should have two capitalized words followed by two characters, separated by a hyphen', () => {
      const result = sonnet(testTheme); // e.g., WordAB-WordCD
      const parts = result.split('-');
      expect(parts.length).toBe(2);
      expect(parts[0]).toMatch(/^[A-Z][a-z]+[a-z]{2}$/);
      expect(parts[1]).toMatch(/^[A-Z][a-z]+[a-z]{2}$/);
    });
  });

  describe('sigil mode specific tests', () => {
    it('should have two capitalized words separated by a 3-digit number', () => {
      const result = sigil(testTheme); // e.g., Word-123-Word
      const parts = result.split('-');
      expect(parts.length).toBe(3);
      expect(parts[0]).toMatch(/^[A-Z][a-z]+$/);
      expect(parts[1]).toMatch(/^\d{3}$/);
      expect(parts[2]).toMatch(/^[A-Z][a-z]+$/);
    });
  });

  describe('seed mode specific tests', () => {
    it('should have a 4-char capitalized word part and a 4-digit hex number', () => {
      const result = seed(testTheme); // e.g., Word-abcd
      const parts = result.split('-');
      expect(parts.length).toBe(2);
      expect(parts[0]).toMatch(/^[A-Z][a-z]{0,3}$/); // Capitalized, up to 4 chars
      expect(parts[1]).toMatch(/^[0-9a-f]{4}$/);
    });
  });

  describe('mantra mode specific tests', () => {
    it('should have three capitalized words, with the first two being identical', () => {
      const result = mantra(testTheme); // e.g., Word-Word-Differentword
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
      const result = quartz(testTheme); // e.g. Crystal23.32latsy
      expect(result).toMatch(/^[A-Z][a-z]*\d{2}\.\d{2}[a-z]{1,4}$/); // Adjusted regex
      const mainWord = result.match(/^[A-Z][a-z]*/)?.[0]; // Adjusted mainWord match
      const firstNum = result.match(/\d{2}\./)?.[0].slice(0,2);
      const secondNum = result.match(/\.\d{2}/)?.[0].slice(1,3);
      const reversedWordPart = result.match(/[a-z]{1,4}$/)?.[0]; // Adjusted reversedWordPart match

      expect(firstNum).toBeDefined();
      expect(secondNum).toBeDefined();
      expect(mainWord).toBeDefined();
      expect(reversedWordPart).toBeDefined();

      expect(firstNum).toBe(secondNum);
      if(mainWord && reversedWordPart) {
        // Ensure the check uses lowercase for mainWord before reversing, similar to the implementation
        expect(mainWord.toLowerCase().split('').reverse().join('').substring(0, Math.min(mainWord.length, 4))).toBe(reversedWordPart);
      }
    });
  });
});
