const readFile = require('../utils/readInput');

async function day4(fileName) {
  const inputs = await readFile(fileName);
  // console.log(scratchCardsValue(inputs));
  console.log(scratchCardsValuesRecurring(inputs));
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

const scratchCardsValuesRecurring = (input) => {
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
    cards.push({
      game: i,
      amount: 1,
      winningNumbers: winningNumbersObject,
      yourNumbers: yourNumbers,
    });
  }
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    let numbersMatched = 0;
    for (const number of card.yourNumbers) {
      if (card.winningNumbers[number]) {
        numbersMatched++;
      }
    }

    for (let j = i + 1; j < numbersMatched + i + 1; j++) {
      if (j < cards.length) {
        cards[j].amount = cards[j].amount + cards[i].amount;
      }
    }
  }
  let numberOfCards = [];
  for (let i = 0; i < cards.length; i++) {
    numberOfCards.push(cards[i].amount);
  }
  return numberOfCards.reduce((acc, value) => acc + value, 0);
};
