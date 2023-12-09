import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
  const dupsQueue: number[] = [];
  return input.split('\n')
    .map((line) => {
      const [wNums, myNums] = line.split(': ')[1]
        .split(' | ')
        .map((nums) => nums.split(' ')
          .filter(Boolean)
          .map((num) => parseInt(num, 10))
          .sort((a, b) => (a - b)));
      const dups = dupsQueue.shift() || 0;
      const cards = dups + 1;
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
      for (let i = 0; i < count; i++) {
        if (i < dupsQueue.length) {
          dupsQueue[i] += cards;
        } else {
          dupsQueue.push(cards);
        }
      }
      return cards;
    })
    .reduce((a, b) => a + b, 0);
};

await task(p2, packageJson.aoc);
