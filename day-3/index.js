const readFile = require('../utils/readInput');
(async () => {
  const inputs = await readFile('day-3.txt');
  // console.log(getPartNumbers(inputs));
  console.log(getGearRatios(inputs, '*'));
})();

class CardinalPoints {
  constructor(start, currentLine, input) {
    this.currentLine = currentLine;
    this.input = input;
    this.start = start;
    this.allPoints = [
      this.getNorthWest(),
      this.getNorth(),
      this.getNorthEast(),
      this.getWest(),
      this.getEast(),
      this.getSouthWest(),
      this.getSouth(),
      this.getSouthEast(),
    ];
  }
  getNorth() {
    if (this.currentLine === 0) {
      return undefined;
    } else {
      return this.input[this.currentLine - 1][this.start];
    }
  }
  getNorthEast() {
    if (this.currentLine === 0) {
      return undefined;
    } else {
      return this.input[this.currentLine - 1][this.start + 1];
    }
  }
  getNorthWest() {
    if (this.currentLine === 0) {
      return undefined;
    } else {
      return this.input[this.currentLine - 1][this.start - 1];
    }
  }

  getSouth() {
    if (this.currentLine === this.input.length - 1) {
      return undefined;
    } else {
      return this.input[this.currentLine + 1][this.start];
    }
  }
  getSouthEast() {
    if (this.currentLine === this.input.length - 1) {
      return undefined;
    } else {
      return this.input[this.currentLine + 1][this.start + 1];
    }
  }
  getSouthWest() {
    if (this.currentLine === this.input.length - 1) {
      return undefined;
    } else {
      return this.input[this.currentLine + 1][this.start - 1];
    }
  }
  getEast() {
    if (this.start === this.input.length - 1) {
      return undefined;
    } else {
      return this.input[this.currentLine][this.start + 1];
    }
  }
  getWest() {
    if (this.start === 0) {
      return undefined;
    } else {
      return this.input[this.currentLine][this.start - 1];
    }
  }
}

const getPartNumbers = (input) => {
  const t1 = performance.now();
  const partNumbers = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    let k = 0;
    while (k < line.length) {
      let numberToAdd = [];
      let numberToAddFormatted;
      const firstIndex = k;
      let lastIndex = k;

      while (!isNaN(line[k])) {
        if (!isNaN(line[lastIndex])) {
          numberToAdd.push(line[lastIndex]);
          lastIndex++;
        } else {
          numberToAddFormatted = Number(numberToAdd.join(''));

          k = lastIndex;
          let shouldBeAdded = false;
          for (let j = firstIndex; j < lastIndex; j++) {
            let { allPoints } = new CardinalPoints(j, i, input);
            for (let m = 0; m < allPoints.length; m++) {
              if (typeof allPoints[m] === 'string' && isNaN(allPoints[m]) && allPoints[m] !== '.') {
                shouldBeAdded = true;
                j = Infinity;
                if (numberToAddFormatted === 381) {
                }
                partNumbers.push(numberToAddFormatted);
              }
            }
          }
        }
      }
      k++;
    }
  }
  const t2 = performance.now();
  console.log(t2 - t1);
  const result = partNumbers.reduce((acc, current) => acc + current, 0);
  return result;
};

const getGearRatios = (input, symbolSearch, numbersTouched) => {
  const gearRatios = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    for (let k = 0; k < line.length; k++) {
      if (line[k] === symbolSearch) {
        const { allPoints } = new CardinalPoints(k, i, input);

        const toAdd = new Set();
        for (let j = 0; j < allPoints.length; j++) {
          if (!isNaN(allPoints[j])) {
            let firstIndex;
            let lastIndex;
            const currentLine = j < 3 ? i - 1 : j < 5 ? i : i + 1;
            if (j === 0 || j === 3 || j === 5) {
              firstIndex = k - 1;
              lastIndex = k - 1;
            } else if (j === 1 || j === 6) {
              firstIndex = k;
              lastIndex = k;
            } else {
              firstIndex = k + 1;
              lastIndex = k + 1;
            }
            let sameNumber = true;
            while (sameNumber) {
              if (!isNaN(input[currentLine][firstIndex])) {
                firstIndex--;
              } else {
                if (!isNaN(input[currentLine][lastIndex])) {
                  lastIndex++;
                } else {
                  sameNumber = false;
                  let numberToAdd = [];
                  for (let m = firstIndex + 1; m < lastIndex; m++) {
                    numberToAdd.push(input[currentLine][m]);
                  }
                  let numberToAddFormatted = Number(numberToAdd.join(''));

                  toAdd.add(numberToAddFormatted);
                  // if (lastIndex >= k) {
                  //   j = j + (lastIndex - k);
                  // }
                }
              }
            }
          }
        }
        if (toAdd.size === 2) {
          const final = [];
          for (const item of toAdd) {
            final.push(item);
          }
          gearRatios.push(final[0] * final[1]);
        }
      }
    }
  }
  return gearRatios.reduce((acc, value) => acc + value);
};
