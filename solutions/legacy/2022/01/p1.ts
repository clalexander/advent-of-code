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
  let maxCalories = 0;
  let curTotal = 0;
  input.split('\n').forEach((line) => {
    if (line === '') {
      curTotal = 0;
    } else {
      const calories = Number.parseInt(line, 10);
      curTotal += calories;
      if (curTotal > maxCalories) {
        maxCalories = curTotal;
      }
    }
  });
  return maxCalories;
};

run('./data1.prod');
