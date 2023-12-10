import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

class AlmanacMap {
  private readonly map: number[][] = [];

  add(inStart: number, outStart: number, range: number) {
    // BST insert
    let i = 0;
    let j = this.map.length;
    while (i < j) {
      const mid = Math.floor((i + j) / 2);
      if (this.map[mid][0] < inStart) {
        i = mid + 1;
      } else {
        j = mid;
      }
    }
    this.map.splice(i, 0, [inStart, outStart, range]);
  }

  get(input: number): number {
    // BST search
    let i = 0;
    let j = this.map.length;
    while (i < j) {
      const mid = Math.floor((i + j) / 2);
      if (this.map[mid][0] < input) {
        i = mid + 1;
      } else {
        j = mid;
      }
    }
    i -= 1;
    if (i < 0) {
      return input;
    }
    const [inStart, outStart, range] = this.map[i];
    const offset = input - inStart;
    return offset >= range || offset < 0 ? input : outStart + offset;
  }
}

export const p1 = (input: string): number => {
  const groups = input.split('\n\n');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const seeds = groups.shift()!.split(': ')[1].split(' ').map(Number);
  const maps = groups.map((group) => {
    const map = new AlmanacMap();
    const lines = group.split('\n');
    lines.shift();
    lines.forEach((line) => {
      const [outStart, inStart, range] = line.split(' ').map(Number);
      map.add(inStart, outStart, range);
    });
    return map;
  });
  return seeds
    .map((seed) => maps.reduce((acc, map) => map.get(acc), seed))
    .reduce((acc, val) => (acc > val ? val : acc), Infinity);
};

await task(p1, packageJson.aoc); // 1.1 ms
