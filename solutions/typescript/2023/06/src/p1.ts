import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
  const [times, distances] = input.split('\n')
    .map((line) => line
      .split(':')[1]
      .split(' ')
      .filter(Boolean)
      .map(Number));
  let output = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const record = distances[i];
    // distance = x * (time - x) = time * x - x^2
    // x^2 - time * x + distance = 0
    // x = (time +- sqrt(time^2 - 4 * distance)) / 2
    const low = Math.ceil((time - Math.sqrt(time * time - 4 * (record + 1))) / 2);
    const high = Math.floor((time + Math.sqrt(time * time - 4 * (record + 1))) / 2);
    const margin = high - low + 1;
    output *= margin;
  }
  return output;
};

await task(p1, packageJson.aoc); // 0.23 ms
