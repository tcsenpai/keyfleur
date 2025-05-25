import { MODES } from './modes';
import { THEMES } from './themes';

export function poetic_key(mode: string = 'haiku', theme: string = 'haiku'): string {
  const func = MODES[mode] || MODES['haiku'];
  // The 'mirrora' function is the only one that doesn't take a theme.
  // All other functions in MODES expect a theme argument.
  if (mode === 'mirrora') {
    return (func as () => string)();
  }
  return (func as (theme: string) => string)(theme);
}

export { THEMES, MODES };
