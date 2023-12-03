import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

type ColorCounts = {
  red: number;
  green: number;
  blue: number;
};

export const p2 = (input: string): number => {
  return input.split('\n')
    .map((line) => {
      const [, playsStr] = line.split(': ');
      const plays = playsStr.split('; ');
      const colorCounts: ColorCounts = { red: 0, green: 0, blue: 0 };
      for (let i = 0; i < plays.length; i++) {
        const pulls = plays[i].split(', ');
        for (let j = 0; j < pulls.length; j++) {
          const [numStr, color] = pulls[j].split(' ');
          const num = parseInt(numStr, 10);
          if (num > colorCounts[color as keyof ColorCounts]) {
            colorCounts[color as keyof ColorCounts] = num;
          }
        }
      }
      return colorCounts.red * colorCounts.green * colorCounts.blue;
    })
    .reduce((acc, cur) => acc + cur, 0);
};

await task(p2, packageJson.aoc);
