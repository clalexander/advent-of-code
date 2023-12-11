import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
  return input.split('\n')
    .map((line) => {
      const nums = line.split(' ').map(Number);
      const layers = [nums];
      let currentLayer = nums;
      while (!currentLayer.every((val) => val === 0)) {
        const nextLayer = [] as number[];
        for (let i = 0; i < currentLayer.length - 1; i++) {
          nextLayer.push(currentLayer[i + 1] - currentLayer[i]);
        }
        layers.push(nextLayer);
        currentLayer = nextLayer;
      }
      return layers.reverse().reduce((acc, layer) => layer[0] - acc, 0);
    })
    .reduce((sum, val) => sum + val, 0);
};

await task(p2, packageJson.aoc); // 2.8 ms
