#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { poetic_key } from './index';
import { THEMES } from './themes';
import { MODES } from './modes';

const argv = yargs(hideBin(process.argv))
  .option('theme', {
    alias: 't',
    type: 'string',
    default: 'haiku',
    choices: Object.keys(THEMES),
    description: 'Theme for word source',
  })
  .option('mode', {
    alias: 'm',
    type: 'string',
    default: 'haiku',
    choices: Object.keys(MODES),
    description: 'Poetic structure to use',
  })
  .option('count', {
    alias: 'c',
    type: 'number',
    default: 1,
    description: 'Number of keys to generate',
  })
  .parseSync();

const { theme, mode, count } = argv;

for (let i = 0; i < count; i++) {
  console.log(poetic_key(mode, theme));
}
