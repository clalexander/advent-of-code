import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

const numbersMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numberStringLengths = [3, 4, 5];

export const p2 = (input: string): number => {
  const lines = input.split('\n');
  let digits = 0;
  let digit;
  let numberString;
  let i;
  let j;
  const values = lines.map((line) => {
    for (i = 0; i < line.length; i++) {
      digit = Number.parseInt(line[i], 10);
      if (!Number.isNaN(digit)) {
        digits = digit * 10;
        break;
      }
      for (j = 0; j < numberStringLengths.length; j++) {
        numberString = line.substring(i, i + numberStringLengths[j]);
        if (numbersMap[numberString] !== undefined) {
          digits = numbersMap[numberString] * 10;
          i = line.length;
          break;
        }
      }
    }
    for (i = line.length - 1; i > -1; i--) {
      digit = Number.parseInt(line[i], 10);
      if (!Number.isNaN(digit)) {
        digits += digit;
        break;
      }
      for (j = 0; j < numberStringLengths.length; j++) {
        numberString = line.substring(i + 1, i + 1 - numberStringLengths[j]);
        if (numbersMap[numberString] !== undefined) {
          digits += numbersMap[numberString];
          i = -1;
          break;
        }
      }
    }
    console.log(line, digits);
    return digits;
  });
  return values.reduce((acc, cur) => acc + cur, 0);
};

await task(p2, packageJson.aoc);
