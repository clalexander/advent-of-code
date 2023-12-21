import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse';

export const p1 = (input: string): number => {
  const [, startNode] = parse(input);
  let steps = 1;
  let prev = startNode;
  let current = startNode.children[0];
  while (current !== startNode) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    const next = current.children.find((child) => child !== prev);
    prev = current;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    current = next!;
    steps++;
  }
  return Math.round(steps / 2);
};

const inputFile = process.argv[2];
await task(p1, packageJson.aoc, inputFile); // 37 ms
