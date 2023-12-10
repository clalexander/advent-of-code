import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
  const [time, record] = input.split('\n')
    .map((line) => parseInt(line
      .split(':')[1]
      .replaceAll(' ', ''), 10));
  // distance = x * (time - x) = time * x - x^2
  // x^2 - time * x + distance = 0
  // x = (time +- sqrt(time^2 - 4 * distance)) / 2
  const low = Math.ceil((time - Math.sqrt(time * time - 4 * (record + 1))) / 2);
  const high = Math.floor((time + Math.sqrt(time * time - 4 * (record + 1))) / 2);
  return high - low + 1;
};

await task(p2, packageJson.aoc); // 0.19 ms
