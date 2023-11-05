"use strict";
const numbers = [1, 2, 3, 4];
console.log(numbers);
console.log(numbers.map((val) => val * 2));
const mutator = (arr, cbCalc, cbPred) => {
    return arr.filter(cbPred).map(cbCalc);
};
console.log(mutator(numbers, (val) => val * val, (val) => val > 2));
