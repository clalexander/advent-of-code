import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

type Args = {
  red: number;
  green: number;
  blue: number;
};

export const p1 = (input: string, args: Args): number => {
  return input.split('\n')
    .map((line) => {
      const [game, playsStr] = line.split(': ');
      const [,id] = game.split(' ');
      const plays = playsStr.split('; ');
      for (let i = 0; i < plays.length; i++) {
        const pulls = plays[i].split(', ');
        for (let j = 0; j < pulls.length; j++) {
          const [numStr, color] = pulls[j].split(' ');
          const num = parseInt(numStr, 10);
          if (num > args[color as keyof Args]) {
            return 0;
          }
        }
      }
      return parseInt(id, 10);
    })
    .reduce((acc, cur) => acc + cur, 0);
};

await task(p1, packageJson.aoc);
