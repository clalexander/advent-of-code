import { task } from '@clalexander/advent-of-code-core';
import packageJson from '../package.json' assert { type: 'json' };

type HandType = 'five_of_a_kind' | 'four_of_a_kind' | 'full_house' | 'three_of_a_kind' | 'two_pair' | 'one_pair' | 'high_card';

const cardStrengthTable: Record<string, number> = [
  // jokers are now the lowest card
  'J',
  '2', '3', '4', '5', '6', '7', '8', '9', 'T',
  'Q', 'K', 'A',
].reduce((acc, card, index) => {
  acc[card] = index;
  return acc;
}, {});

const handStrengthTable: Record<HandType, number> = [
  'high_card',
  'one_pair',
  'two_pair',
  'three_of_a_kind',
  'full_house',
  'four_of_a_kind',
  'five_of_a_kind',
].reduce((acc, handType, index) => {
  acc[handType] = index;
  return acc;
}, {} as Record<HandType, number>);

const getHandType = (hand: string): HandType => {
  const cardCounts = hand.split('')
    .reduce((acc, card) => {
      acc[card] = (acc[card] ?? 0) + 1;
      return acc;
    }, {});
  // make jokers wild
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const jokers = cardCounts['J'] ?? 0; delete cardCounts['J'];
  const sortedCounts = Object.values(cardCounts).sort((a: number, b: number) => b - a);
  if (jokers === 5) {
    return 'five_of_a_kind';
  }
  sortedCounts[0] += jokers;
  if (sortedCounts[0] === 5) {
    return 'five_of_a_kind';
  }
  if (sortedCounts[0] === 4) {
    return 'four_of_a_kind';
  }
  if (sortedCounts[0] === 3 && sortedCounts[1] === 2) {
    return 'full_house';
  }
  if (sortedCounts[0] === 3) {
    return 'three_of_a_kind';
  }
  if (sortedCounts[0] === 2 && sortedCounts[1] === 2) {
    return 'two_pair';
  }
  if (sortedCounts[0] === 2) {
    return 'one_pair';
  }
  return 'high_card';
};

const compareHandTypes = (handTypeA: HandType, handTypeB: HandType): number => {
  return handStrengthTable[handTypeA] - handStrengthTable[handTypeB];
};

const compareHandsByCardStrength = (handA: string, handB: string): number => {
  for (let i = 0; i < handA.length; i++) {
    const diff = cardStrengthTable[handA[i]] - cardStrengthTable[handB[i]];
    if (diff !== 0) {
      return diff;
    }
  }
  return 0;
};

export const p2 = (input: string): number => {
  const games = input
    .split('\n')
    .map((line) => {
      const [hand, bid] = line.split(' ');
      const type = getHandType(hand);
      return { hand, bid: parseInt(bid, 10), type };
    })
    .sort((a, b) => compareHandTypes(a.type, b.type) || compareHandsByCardStrength(a.hand, b.hand));
  return games.reduce((acc, { bid }, index) => acc + bid * (index + 1), 0);
};

await task(p2, packageJson.aoc); // 5.8 ms
