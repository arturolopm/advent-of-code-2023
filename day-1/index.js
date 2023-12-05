const readFile = require('../utils/readInput.js');

(async () => {
  const inputs = await readFile('day-1.txt');
  console.log(getFirstAndLastNumbers(inputs));
  console.log(sumOfNumbers(inputs, numberStrings));
})();

const getFirstAndLastNumbers = (input) => {
  const numbers = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    let toAdd = [];
    for (let k = 0; k < line.length; k++) {
      if (!isNaN(line[k])) {
        toAdd.push(Number(line[k]));
        break;
      }
    }

    for (let l = line.length - 1; l >= 0; l--) {
      if (!isNaN(line[l])) {
        toAdd.push(Number(line[l]));
        break;
      }
    }
    toAdd = toAdd.join('');
    numbers.push(Number(toAdd));
  }
  const initialValue = 0;
  const result = numbers.reduce((acc, current) => acc + current, initialValue);
  return result;
};

const numberStrings = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const sumOfNumbers = (input, strs) => {
  const numbers = [];
  for (let i = 0; i < input.length; i++) {
    const toAddStrings = {};
    const line = input[i];
    for (let j = 0; j < strs.length; j++) {
      const indexStr = line.toLowerCase().indexOf(strs[j]);
      const lastIndexStr = line.toLowerCase().lastIndexOf(strs[j]);
      if (indexStr !== -1) {
        toAddStrings[indexStr] = j;
      }
      if (lastIndexStr !== -1 && lastIndexStr !== indexStr) {
        toAddStrings[lastIndexStr] = j;
      }
    }
    for (let i = 0; i < line.length; i++) {
      if (!isNaN(line[i])) {
        toAddStrings[i] = Number(line[i]);
      }
    }
    const allPositions = Object.keys(toAddStrings).map((i) => Number(i));

    const toAdd = [];
    const lowestIndex = Math.min(...allPositions);
    toAdd.push(toAddStrings[lowestIndex.toString()]);
    const maxIndex = Math.max(...allPositions);
    toAdd.push(toAddStrings[maxIndex.toString()]);
    numbers.push(Number(toAdd.join('')));
  }
  const result = numbers.reduce((acc, value) => acc + value, 0);
  return result;
};
