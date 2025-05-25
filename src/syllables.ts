import { SOFT_CONS, VOWELS } from './themes';

export function syllable(): string {
  return SOFT_CONS[Math.floor(Math.random() * SOFT_CONS.length)] + VOWELS[Math.floor(Math.random() * VOWELS.length)];
}

export function estimate_syllables(word: string): number {
  if (!word || typeof word !== 'string') {
    return 0;
  }
  word = word.toLowerCase();
  const vowels = 'aeiouy';
  let count = 0;
  let prev_char = '';
  for (const char of word) {
    if (vowels.includes(char) && !vowels.includes(prev_char)) {
      count += 1;
    }
    prev_char = char;
  }
  if (word.endsWith("e") && count > 1) {
    count -= 1;
  }
  return Math.max(1, count);
}
