const readFile = require('../utils/readInput.js');

(async () => {
  const inputs = await readFile('day-1.txt');
  console.log(getFirstAndLastNumbers(inputs));
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
