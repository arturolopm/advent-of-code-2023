const readFile = require('../utils/readInput.js');
(async () => {
  const inputs = await readFile('day-2.txt');
  console.log(possibleGames(inputs, restrictions));
})();
const restrictions = { red: 12, green: 13, blue: 14 };
const possibleGames = (input, restrictions) => {
  const games = {};

  // format string
  for (let i = 1; i <= input.length; i++) {
    const gamesPerID = [];
    const line = input[i - 1];
    const cubes = line.split(': ');
    const currentSet = cubes[1];
    const eachGame = currentSet.split('; ');
    let shouldBeAdded = true;
    for (let j = 0; j < eachGame.length; j++) {
      const eachCube = eachGame[j].split(', ');
      const subGames = {};
      for (let k = 0; k < eachCube.length; k++) {
        const toMap = eachCube[k].split(' ');
        subGames[toMap[1]] = toMap[0];

        if (subGames[toMap[1]] > restrictions[toMap[1]]) {
          shouldBeAdded = false;
        }
      }
      gamesPerID.push(subGames);
    }
    if (shouldBeAdded === true) {
      games[i] = gamesPerID;
    }
  }
  //   console.log(games);

  const objectKeys = Object.keys(games).map((key) => Number(key));
  const result = objectKeys.reduce((acc, value) => acc + value);
  return result;
};
