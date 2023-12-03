import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
  const lines = input.split('\n');
  const values = lines.map((line) => {
    let digits = 0;
    let digit;
    for (let i = 0; i < line.length; i++) {
      digit = Number.parseInt(line[i], 10);
      if (!Number.isNaN(digit)) {
        digits = digit * 10;
        break;
      }
    }
    for (let i = line.length - 1; i > -1; i--) {
      digit = Number.parseInt(line[i], 10);
      if (!Number.isNaN(digit)) {
        digits += digit;
        break;
      }
    }
    return digits;
  });
  return values.reduce((acc, cur) => acc + cur, 0);
};

await task(p1, packageJson.aoc);
