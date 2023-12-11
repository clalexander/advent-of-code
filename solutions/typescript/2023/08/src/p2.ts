/**
 * Apparently lcm of the steps to the first terminal locations was the solution...
 * I had considered it, but I still don't understand what information in the problem
 * statement would have led me to that conclusion. I don't see why any of the locations
 * would necessarily lead to a cycle given the complex instructions and graph.
 *
 * Also, this should have been modeled using a graph instead of a string map. A lot of
 * computation was wasted on hashing and lookup.
 *
 * Nonetheless, I'm happy with the dynamic programming solution here.
 */

import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

type Node = [string, string];
type Termination = [number, string];

const getNextTermination = (
  nodesMap: Map<string, Node>,
  key: string,
  dirs: string,
  dirIndex: number,
  terminationsMap: Map<string, Termination>,
): Termination => {
  const mapKey = `${key}:${dirIndex}`;
  const existing = terminationsMap.get(mapKey);
  if (existing) {
    console.log('cache hit', mapKey);
    return existing;
  }
  let current = key;
  let steps = 0;
  let i = dirIndex;
  while (current[2] !== 'Z' || steps === 0) {
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
  const termination = [steps, current] as Termination;
  terminationsMap.set(mapKey, termination);
  return termination;
};

export const p2 = (input: string): number => {
  const [dirs, nodesStr] = input.split('\n\n');
  const nodesMap = nodesStr.split('\n')
    .reduce((acc, line) => {
      const [key, leavesStr] = line.split(' = ');
      const [left, right] = leavesStr.substring(1, leavesStr.length - 1).split(', ');
      acc.set(key, [left, right]);
      return acc;
    }, new Map<string, Node>());
  const keys = [...nodesMap.keys()];
  const terminationsMap = new Map<string, Termination>();
  let steps = 0;
  let i = 0;
  const starts = keys.filter((key) => key[2] === 'A');
  console.log(starts);
  const currents = starts.map((key) => getNextTermination(nodesMap, key, dirs, 0, terminationsMap));
  let maxSteps = currents.reduce((acc, [curSteps]) => Math.max(acc, curSteps), 0);
  while (maxSteps > 0) {
    steps += maxSteps;
    for (let j = 0; j < currents.length; j++) {
      const current = currents[j];
      let [curSteps, curNextNode] = current;
      current[0] -= maxSteps;
      let ii = i;
      while (current[0] < 0) {
        ii = (ii + curSteps) % dirs.length;
        [curSteps, curNextNode] = getNextTermination(
          nodesMap,
          curNextNode,
          dirs,
          ii,
          terminationsMap,
        );
        current[0] += curSteps;
      }
      current[1] = curNextNode;
    }
    i = (i + maxSteps) % dirs.length;
    maxSteps = currents.reduce((acc, [curSteps]) => Math.max(acc, curSteps), 0);
  }
  return steps;
};

const inputFile = process.argv[2];
await task(p2, packageJson.aoc, inputFile); // 4.6e5 ms
