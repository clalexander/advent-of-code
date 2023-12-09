import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
  return input.split('\n')
    .map((line) => {
      const [wNums, myNums] = line.split(': ')[1]
        .split(' | ')
        .map((nums) => nums.split(' ')
          .filter(Boolean)
          .map((num) => parseInt(num, 10))
          .sort((a, b) => (a - b)));
      let j = 0;
      let count = 0;
      for (let i = 0; i < myNums.length && j < wNums.length; i++) {
        while (j < wNums.length && myNums[i] > wNums[j]) {
          j++;
        }
        if (myNums[i] === wNums[j]) {
          count++;
        }
      }
      return count > 0 ? 2 ** (count - 1) : 0;
    })
    .reduce((a, b) => a + b, 0);
};

await task(p1, packageJson.aoc);
