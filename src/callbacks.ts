const numbers: number[] = [1,2,3,4];
console.log(numbers);
console.log( numbers.map( (val) => val*2 ));

const mutator = (
    arr: number[],
    cbCalc: (val: number) => number,
    cbPred: (val: number) => boolean
    ): number[] => {
    return arr.filter(cbPred).map(cbCalc);
}

console.log( mutator(numbers, (val) => val*val, (val) => val>2) );