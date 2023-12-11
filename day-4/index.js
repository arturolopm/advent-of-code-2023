const readFile = require('../utils/readInput');

async function day4(fileName) {
  const inputs = await readFile(fileName);
  console.log(scratchCardsValue(inputs));
}
day4('day-4.txt');

const scratchCardsValue = (input) => {
  const cards = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const [, numbers] = line.split(':');
    const [winningNumbersStrings, yourNumbersStrings] = numbers.split(' | ');
    const yourNumbers = yourNumbersStrings.split(' ').filter((num) => num !== '');
    const winningNumbersObject = {};
    winningNumbersStrings
      .split(' ')
      .filter((num) => num !== '')
      .forEach((element) => {
        winningNumbersObject[element] = Number(element);
      });
    cards.push({ game: i, winningNumbers: winningNumbersObject, yourNumbers: yourNumbers });
  }
  const score = [];
  for (const card of cards) {
    let numbersMatched = 0;
    for (const number of card.yourNumbers) {
      if (card.winningNumbers[number]) {
        numbersMatched++;
      }
    }
    score.push(numbersMatched === 0 ? 0 : Math.pow(2, numbersMatched - 1));
  }
  return score.reduce((acc, value) => acc + value, 0);
};
