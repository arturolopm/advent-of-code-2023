const readFile = require('../utils/readInput');
(async () => {
  const inputs = await readFile('day-3.txt');
  console.log(getPartNumbers(inputs));
})();

class CardinalPoints {
  constructor(start, currentLine, input) {
    this.currentLine = currentLine;
    this.input = input;
    this.start = start;
    this.allPoints = [
      this.getNorth(),
      this.getNorthEast(),
      this.getNorthWest(),
      this.getEast(),
      this.getWest(),
      this.getSouth(),
      this.getSouthEast(),
      this.getSouthWest(),
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
