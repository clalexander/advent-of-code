import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

type PartNumber = {
  id: number;
  part: number;
};

export const p2 = (input: string): number => {
  let id = 1;
  let curPartNumber: PartNumber | null = null;
  let digit = 0;

  const schematic: (PartNumber | null | true)[][] = input
    .split('\n')
    .map((line) => line
      .split('')
      .map((char) => {
        if (char === '.') {
          curPartNumber = null;
          return null;
        }
        if (char === '*') {
          curPartNumber = null;
          return true;
        }
        digit = parseInt(char, 10);
        if (Number.isNaN(digit)) {
          curPartNumber = null;
          return null;
        }
        if (!curPartNumber) {
          curPartNumber = { id: id++, part: 0 };
        }
        curPartNumber.part = curPartNumber.part * 10 + digit;
        return curPartNumber;
      }));

  let sum = 0;
  let gearParts: PartNumber[] = [];

  for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic[i].length; j++) {
      if (schematic[i][j] === true) {
        gearParts = [];
        for (let ii = i - 1; ii <= i + 1 && ii < schematic.length; ii++) {
          for (let jj = j - 1; jj <= j + 1 && jj < schematic[0].length; jj++) {
            if (ii < 0 || jj < 0 || (ii === i && jj === j)) {
              continue;
            }
            if (typeof schematic[ii][jj] === 'object' && schematic[ii][jj] !== null && !gearParts.includes(schematic[ii][jj] as PartNumber)) {
              gearParts.push(schematic[ii][jj] as PartNumber);
            }
          }
        }
        if (gearParts.length === 2) {
          sum += gearParts[0].part * gearParts[1].part;
        }
      }
    }
  }

  return sum;
};

await task(p2, packageJson.aoc);
