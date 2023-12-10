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

  get(start: number, inRange: number, acc: number[][] = []): number[][] {
    if (this.map.length === 0) {
      acc.push([start, inRange]);
      return acc;
    }
    // BST search
    let i = 0;
    let j = this.map.length;
    let mid = 0;
    while (i < j) {
      mid = Math.floor((i + j) / 2);
      if (this.map[mid][0] === start) {
        i = mid + 1;
        break;
      }
      if (this.map[mid][0] < start) {
        i = mid + 1;
      } else {
        j = mid;
      }
    }
    i -= 1;
    let ranged = 0;
    if (i === this.map.length - 1) {
      ranged = inRange;
    } else {
      const [inStart] = this.map[i + 1];
      ranged = Math.min(inRange, inStart - start);
    }
    if (i < 0) {
      acc.push([start, ranged]);
    } else {
      const [inStart, outStart, range] = this.map[i];
      const offset = start - inStart;
      if (offset < range && offset >= 0) {
        acc.push([outStart + offset, ranged]);
      } else {
        acc.push([start, ranged]);
      }
    }
    if (ranged === inRange) {
      return acc;
    }
    return this.get(start + ranged, inRange - ranged, acc);
  }
}

export const p2 = (input: string): number => {
  const groups = input.split('\n\n');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const seedRanges = groups.shift()!
    .split(': ')[1]
    .split(' ')
    .map(Number)
    .reduce((acc, val, index) => {
      if (index % 2 === 0) {
        acc.push([val]);
      } else {
        acc[acc.length - 1].push(val);
      }
      return acc;
    }, [] as number[][]);
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
  let lowest = Infinity;
  let location = 0;
  seedRanges
    .forEach((seedRange) => {
      location = maps
        .reduce((acc, map) => acc
          .map(([start, range]) => map.get(start, range)).flat(), [seedRange])
        .reduce((acc, [start]) => (acc > start ? start : acc), Infinity);
      if (location < lowest) {
        lowest = location;
      }
    });
  return lowest;
};

await task(p2, packageJson.aoc); // 2.9ms
