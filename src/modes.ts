import { THEMES, RUNES } from './themes';
import { syllable, estimate_syllables } from './syllables';

// Helper function to get a random element from an array
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to get a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function haiku(theme: string): string {
  const all_words: string[] = Object.values(THEMES).flat().filter(word => !!word);
  // Fisher-Yates shuffle
  for (let i = all_words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all_words[i], all_words[j]] = [all_words[j], all_words[i]];
  }

  const used_words = new Set<string>();

  function find_words(target_syllables: number): string[] {
    const result: string[] = [];
    let total = 0;
    for (const word of all_words) {
      if (!word || used_words.has(word)) {
        continue;
      }
      const syll = estimate_syllables(word);
      if (syll === 0) {
        continue;
      }
      if (total + syll <= target_syllables) {
        result.push(word.charAt(0).toUpperCase() + word.slice(1));
        used_words.add(word);
        total += syll;
        if (total === target_syllables) {
          break;
        }
      }
    }
    return total === target_syllables ? result : [];
  }

  const line1 = find_words(5);
  const line2 = find_words(7);
  const line3 = find_words(5);

  if (!(line1.length && line2.length && line3.length)) {
    return "incomplete-haiku";
  }

  return `${line1.join("")}-${line2.join("")}-${line3.join("")}`;
}

export function lace(theme: string): string {
  const roots = THEMES[theme] || THEMES['haiku'];
  const word = getRandomElement(roots);
  const mid = syllable();
  return `${word}${mid}-${mid.split('').reverse().join('')}${word.split('').reverse().join('')}`;
}

export function mirrora(): string {
  const s = syllable();
  return `${s.split('').reverse().join('')}-${s}`;
}

export function rune_key(theme: string): string {
  const base = haiku(theme).charAt(0).toUpperCase() + haiku(theme).slice(1);
  const rune = getRandomElement(RUNES);
  return `${base}_${rune}`;
}

export function sonnet(theme: string): string {
  const roots = THEMES[theme] || THEMES['haiku'];
  const root1 = getRandomElement(roots);
  const root2 = getRandomElement(roots);
  return `${(root1.charAt(0).toUpperCase() + root1.slice(1))}${syllable().substring(0, 2)}-${(root2.charAt(0).toUpperCase() + root2.slice(1))}${syllable().substring(0, 2)}`;
}

export function sigil(theme: string): string {
  const roots = THEMES[theme] || THEMES['haiku'];
  const root1 = getRandomElement(roots);
  const root2 = getRandomElement(roots);
  return `${(root1.charAt(0).toUpperCase() + root1.slice(1))}-${getRandomInt(100, 999)}-${(root2.charAt(0).toUpperCase() + root2.slice(1))}`;
}

export function seed(theme: string): string {
  const roots = THEMES[theme] || THEMES['haiku'];
  const rootWord = getRandomElement(roots);
  return `${(rootWord.charAt(0).toUpperCase() + rootWord.slice(1)).substring(0, 4)}-${getRandomInt(0x1000, 0x9999).toString(16).padStart(4, '0')}`;
}

export function mantra(theme: string): string {
  const themeWords = THEMES[theme] || THEMES['haiku'];
  const word1 = getRandomElement(themeWords);
  const word3 = getRandomElement(themeWords); // For the third part, can be different
  const capitalizedWord1 = word1.charAt(0).toUpperCase() + word1.slice(1);
  const capitalizedWord3 = word3.charAt(0).toUpperCase() + word3.slice(1);
  return `${capitalizedWord1}-${capitalizedWord1}-${capitalizedWord3}`;
}

export function quartz(theme: string): string {
  const selectedRoot = getRandomElement(THEMES[theme] || THEMES['haiku']);
  const root = selectedRoot.charAt(0).toUpperCase() + selectedRoot.slice(1);
  // Ensure the reversed part is lowercase and handles short words gracefully
  const rev = root.toLowerCase().split('').reverse().join('').substring(0, Math.min(root.length, 4));
  const num = getRandomInt(10, 99).toString();
  return `${root}${num}.${num}${rev}`;
}

export const MODES: Record<string, (theme: string) => string> = {
  'haiku': haiku,
  'lace': lace,
  'mirrora': () => mirrora(), // Ensure mirrora is called without arguments
  'rune': rune_key,
  'sonnet': sonnet,
  'sigil': sigil,
  'seed': seed,
  'mantra': mantra,
  'quartz': quartz
};
