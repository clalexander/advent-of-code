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

const shapes = ['AX', 'BY', 'CZ'];
const conditions = [3, 6, 0];
const process = (input: string): number => {
  return input.split('\n')
    .map((line) => line.split(' ').map((char) => shapes.findIndex((value) => value.includes(char))))
    .map(([a, b]) => conditions[(b - a + 3) % 3] + b + 1)
    .reduce((acc, value) => acc + value, 0);
};

run('./data1.prod');
