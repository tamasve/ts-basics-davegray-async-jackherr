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

let album: any = 7;     // only specific times!
album = 'Dave'

const sum = (a: number, b: string) => a + b;

let meaningOfLife: string | number;     // union type

// reasons for union type:
let postId: string | number;
let isActive: number | boolean | string;

// regular expression: a built-in interface
let re: RegExp = /\w+/g;


// -- ARRAYS --

let mixedData = ['EVH', 1984, true];  // inferred type or declared type: it fixes possible types for later use
mixedData.push('hey');
mixedData.push(45);

let test1 = []       // TS infers any
let bands: string[] = [];   // it is better

let mixedData2: (string | number | boolean)[]       // declared not inferred as above


// -- TUPLE --
// Tuple: more strict than an array - spec. type in spec. position + fixed length

let myTuple: [string, number, boolean] = ['John', 45, true]
myTuple[1] = 42
// but it can not be inferred:
let mixed = ['John', 45, true]      // this will be mixed array not a tuple
// but:
mixed = myTuple     // OK!
//myTuple = mixed     // not OK!


// -- OBJECTS --

let myObj: object
myObj = []
myObj = mixedData
myObj = {}

const examplObj = {     // inference also works here
    prop1: "Dave",
    prop2: true,
}

// -- INTERFACES --

// type Guitarist = {      // for declaring object type structure + class
interface Guitarist {       // these 2 seem the same, but not exactly  (see a bit later)
    name: string,
    active?: boolean,           // optional
    albums: (string | number)[]
}


let evh: Guitarist = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
}

let jp: Guitarist = {
    name: 'Jimmy',
    // active: true,
    albums: ['I', 'II', 'IV']
}

evh = jp        // OK

// function
const greetGuitarist = (guitarist: Guitarist) => {
    if (guitarist.active)    return `Hello ${guitarist.name}! You are active? ${guitarist.active}`
    return `Hello ${guitarist.name}!`
}

console.log(greetGuitarist(jp));


// -- TYPE ALIASES --

type stringOrNumber = string | number
type stringOrNumberArray = (string | number)[]

type UserId = stringOrNumber        // we can not do it with an interface

// interface = class / object
// type = alias for any type of ts we might assign


// -- Literal type(s) --

let userName: 'John' | 'Amy' | 'Emily'
userName = 'Amy'


// -- FUNCTIONS --

const logMsg = (message: any): void => {
    console.log(message)
}

const add = (a: number, b: number): number => a + b;

logMsg("hello")
logMsg(add(3,4))        // both work

type mathFunction = (a: number, b: number) => number    // alias for function signature
interface mathFunction2 { (a: number, b: number): number }   // the same with interface

let multiply: mathFunction = function (c, d) { return c*d}
let divide: mathFunction = (c, d) => c/d     // name: signature = arrow function

console.log(divide(27,4))

// optional param: last
const addAll = (a: number, b: number, c?: number):number => {   // optional should be the last
    if (typeof c !== 'undefined') return a+b+c
    return a+b
}

const sumAll = (a: number, b: number, c: number = 0):number => {
    return a+b+c
}

logMsg(addAll(2,4))
logMsg(sumAll(2,4))


// Rest parameter

const total = (...nums: number[]): number => {
    return nums.reduce( (prev, curr) => prev+curr )
}

logMsg( total(1,2,3,4) )


const createError = (errMsg: string) => {throw new Error(errMsg)}   // return type: never

// when it is useful?
const numberOrString = (value: string | number): string => {
    if (typeof value === 'string') return 'string'
    if (typeof value === 'number') return 'number'
    return createError('this can never happen')     // without it TS is not satisfied (never type)
}

// the usage of any: instead of the 2nd check we can use this function:
const isNumber = (value: any): boolean => {
    return typeof value === "number" ? true : false
}



// -- CASTING or ASSERTION --

const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string => {
    if (c === 'add')  return a + b
    return '' + a + b
}

let myVal: string = addOrConcat(2,2,'concat') as string;    // 

// it is really useful in DOM
const elem = document.getElementById('#myId')     // infers as Element
const img = document.querySelector('img') as HTMLImageElement   // we can specify it
const img2 = <HTMLImageElement>document.querySelector('img')    // 2nd version - but not in React!

// img.src

