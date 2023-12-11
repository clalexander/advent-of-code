import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

type Node = [string, string];

type Args = {
  start: string;
  target: string
};

export const p1 = (input: string, args: Args): number => {
  const [dirs, nodesStr] = input.split('\n\n');
  const nodesMap = nodesStr.split('\n')
    .reduce((acc, line) => {
      const [key, leavesStr] = line.split(' = ');
      const [left, right] = leavesStr.substring(1, leavesStr.length - 1).split(', ');
      acc.set(key, [left, right]);
      return acc;
    }, new Map<string, Node>());
  let current = args.start;
  let steps = 0;
  let i = 0;
  while (current !== args.target) {
    steps++;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [left, right] = nodesMap.get(current)!;
    const dir = dirs[i++];
    if (i === dirs.length) {
      i = 0;
    }
    if (dir === 'L') {
      current = left;
    } else {
      current = right;
    }
  }
  return steps;
};

const inputFile = process.argv[2];
await task(p1, packageJson.aoc, inputFile); // 6.5 ms
