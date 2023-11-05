"use strict";
// Dave Gray's Typescript 8H tutorial
// 24-27 March 2023
// -- BASIC HOW TO DO --
// create folders, .ts and index.html, then:
// tsc --init -> tsconfig.json
// compiler watches for file change:  tsc -w  
//  - it compiles all files in rootDir into outDir and then watches changes...
// to run: open index.html with Live server (js link should be overwritten in <script ...>)
let username = 'Eve';
console.log(username);
let album = 7; // only specific times!
album = 'Dave';
const sum = (a, b) => a + b;
let meaningOfLife; // union type
// reasons for union type:
let postId;
let isActive;
// regular expression: a built-in interface
let re = /\w+/g;
// -- ARRAYS --
let mixedData = ['EVH', 1984, true]; // inferred type or declared type: it fixes possible types for later use
mixedData.push('hey');
mixedData.push(45);
let test1 = []; // TS infers any
let bands = []; // it is better
let mixedData2; // declared not inferred as above
// -- TUPLE --
// Tuple: more strict than an array - spec. type in spec. position + fixed length
let myTuple = ['John', 45, true];
myTuple[1] = 42;
// but it can not be inferred:
let mixed = ['John', 45, true]; // this will be mixed array not a tuple
// but:
mixed = myTuple; // OK!
//myTuple = mixed     // not OK!
// -- OBJECTS --
let myObj;
myObj = [];
myObj = mixedData;
myObj = {};
const examplObj = {
    prop1: "Dave",
    prop2: true,
};
let evh = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
};
let jp = {
    name: 'Jimmy',
    // active: true,
    albums: ['I', 'II', 'IV']
};
evh = jp; // OK
// function
const greetGuitarist = (guitarist) => {
    if (guitarist.active)
        return `Hello ${guitarist.name}! You are active? ${guitarist.active}`;
    return `Hello ${guitarist.name}!`;
};
console.log(greetGuitarist(jp));
// interface = class / object
// type = alias for any type of ts we might assign
// -- Literal type(s) --
let userName;
userName = 'Amy';
// -- FUNCTIONS --
const logMsg = (message) => {
    console.log(message);
};
const add = (a, b) => a + b;
logMsg("hello");
logMsg(add(3, 4)); // both work
let multiply = function (c, d) { return c * d; };
let divide = (c, d) => c / d; // name: signature = arrow function
console.log(divide(27, 4));
// optional param: last
const addAll = (a, b, c) => {
    if (typeof c !== 'undefined')
        return a + b + c;
    return a + b;
};
const sumAll = (a, b, c = 0) => {
    return a + b + c;
};
logMsg(addAll(2, 4));
logMsg(sumAll(2, 4));
// Rest parameter
const total = (...nums) => {
    return nums.reduce((prev, curr) => prev + curr);
};
logMsg(total(1, 2, 3, 4));
const createError = (errMsg) => { throw new Error(errMsg); }; // return type: never
// when it is useful?
const numberOrString = (value) => {
    if (typeof value === 'string')
        return 'string';
    if (typeof value === 'number')
        return 'number';
    return createError('this can never happen'); // without it TS is not satisfied (never type)
};
// the usage of any: instead of the 2nd check we can use this function:
const isNumber = (value) => {
    return typeof value === "number" ? true : false;
};
// -- CASTING or ASSERTION --
const addOrConcat = (a, b, c) => {
    if (c === 'add')
        return a + b;
    return '' + a + b;
};
let myVal = addOrConcat(2, 2, 'concat'); // 
// it is really useful in DOM
const elem = document.getElementById('#myId'); // infers as Element
const img = document.querySelector('img'); // we can specify it
const img2 = document.querySelector('img'); // 2nd version - but not in React!
// img.src
