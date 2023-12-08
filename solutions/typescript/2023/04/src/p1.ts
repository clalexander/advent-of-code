import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
  const schematic = input.split('\n');

  let sum = 0;
  let digit = 0;
  let curNum = 0;
  let i;
  let j;
  let shouldAdd = false;

  function maybeAddAndReset() {
    if (shouldAdd) {
      sum += curNum;
    }
    shouldAdd = false;
    curNum = 0;
  }

  function check() {
    if (shouldAdd) {
      return;
    }

    for (let ii = i - 1; ii <= i + 1 && ii < schematic.length; ii++) {
      for (let jj = curNum < 10 ? j - 1 : j + 1; jj <= j + 1 && jj < schematic[0].length; jj++) {
        if (ii < 0 || jj < 0 || (ii === i && jj === j)) {
          continue;
        }
        if (!/[\d.]/.test(schematic[ii][jj])) {
          shouldAdd = true;
          return;
        }
      }
    }
  }

  for (i = 0; i < schematic.length; i++) {
    for (j = 0; j < schematic[i].length; j++) {
      digit = parseInt(schematic[i][j], 10);
      if (Number.isNaN(digit)) {
        maybeAddAndReset();
      } else {
        curNum = curNum * 10 + digit;
        check();
      }
    }
    maybeAddAndReset();
  }

  return sum;
};

await task(p1, packageJson.aoc);
