import * as fs from 'fs/promises';

const run = async (filename: string) => {
  try {
    const data = await fs.readFile(filename);
    const input = data.toString();
    const result = process(input);
    console.log('Result:', result);
  } catch (error) {
    console.log(error);
  }
};

const process = (input: string): number => {
  let group: string[] = [];
  const top3 = [0, 0, 0];
  let top3Min = 0;
  input.split('\n').reduce<string[][]>((acc, line) => {
    if (line === '') {
      group = [];
    } else {
      if (group.length === 0) {
        acc.push(group);
      }
      group.push(line);
    }
    return acc;
  }, [])
    .map((g) => g.map((value) => Number.parseInt(value, 10)).reduce((acc, value) => acc + value, 0))
    .forEach((total) => {
      if (total > top3Min) {
        const index = top3.findIndex((value) => value === top3Min);
        top3[index] = total;
        top3Min = Math.min(...top3);
      }
    });
  return top3.reduce((acc, value) => acc + value, 0);
};

run('./data2.prod');
