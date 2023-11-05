"use strict";
// const stringEcho = (arg: string): string => arg
// as GENERIC:
const echo = (arg) => arg;
// a generic function that checks if the arg is object:
const isObj = (arg) => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null);
};
console.log(isObj(true));
console.log(isObj('John'));
console.log(isObj([1, 2, 3]));
console.log(isObj({ name: 'John' })); // only for this returns true
console.log(isObj(null));
// another example: a 2boolean converter
const isTrue = (arg) => {
    if (Array.isArray(arg) && !arg.length) { // array with 0 length is excluded
        return { arg, is: false };
    }
    if (isObj(arg) && !Object.keys(arg).length) { // object with 0 length is excluded
        return { arg, is: false };
    }
    return { arg, is: !!arg }; // to boolean converter
};
console.log(isTrue('Dave'));
console.log(isTrue(null));
console.log(isTrue(NaN));
console.log(isTrue(0));
const checkBoolValue = (arg) => {
    if (Array.isArray(arg) && !arg.length) { // array with 0 length
        return { value: arg, is: false };
    }
    if (isObj(arg) && !Object.keys(arg).length) { // object with 0 length
        return { value: arg, is: false };
    }
    return { value: arg, is: !!arg }; // to boolean converter
};
console.log(checkBoolValue('Dave'));
console.log(checkBoolValue(null));
console.log(checkBoolValue(NaN));
console.log(checkBoolValue(0));
const processUser = (user) => {
    return user;
};
console.log(processUser({ id: 1, name: 'Dave' }));
// console.log(processUser({name: 'Dave'}))         // this does not work!
//////////////////////
// more extensions
const getUsersProperty = (users, key) => {
    return users.map(user => user[key]);
};
// !! T[K][] -> array of K values from T objects ( T[K] = T.K = K value of T )
const personsData = [
    {
        "id": 1,
        "name": "John",
        "email": "john@gmail.com"
    },
    {
        "id": 2,
        "name": "Anna",
        "email": "anna@gmail.com"
    },
    {
        "id": 3,
        "name": "Leslie",
        "email": "leslie@gmail.com"
    }
];
console.log(getUsersProperty(personsData, "name"));
console.log(getUsersProperty(personsData, "email"));
////////////////////
// generic in a class
class StateObject {
    constructor(value) {
        this.data = value;
    }
    get state() {
        return this.data;
    }
    set state(value) {
        this.data = value;
    }
}
const store = new StateObject("John"); // infers type of string! -> T type = string from now on !
const store2 = new StateObject("John"); // we too can specify it!
console.log(store.state);
store.state = 'Dave';
// store.state = 12    // not OK!
const myState = new StateObject(["John", 42]); // our specification instead of inference
myState.state = ['Dave', 47, true];
console.log(myState);
// Type check
const data = ["e", "r"];
console.log(typeof data[0]);
// My example
// class AddOrConcat<T> {
//     data: T[]
//     constructor(...data: T[]) {this.data = data}
//     result(): (string | number)[] {
//         return [typeof data[0], data[0] ]
//         // if (typeof this.data[0] === "string") return this.data.reduce( (prev, sum) => prev + sum )
//     }
// }
// const example = new AddOrConcat(1,2)
// console.log(example.result())
