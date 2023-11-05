"use strict";
// Basic declaration formula:
// class Coder {
//     name: string
//     music: string
//     age: number
//     lang: string
//     constructor(
//         name: string, 
//         music: string, 
//         age: number, 
//         lang: string
//     ) {
//         this.name = name
//         this.music = music
//         this.age = age
//         this.lang = lang
//     }
// }
// simpler version: using modifiers, and even the assignments are not required
class Coder {
    constructor(name, // initialize with modifier keyword -> not necessary to define
    music, age, lang = "TS" // default value -> optional
    ) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        // this.name = name         // not required
        // this.music = music
        // this.age = age
        // this.lang = lang
    }
    getAge() {
        return `Hello, I'm ${this.age}`;
    }
}
const Dave = new Coder('Dave', 'rock', 42);
console.log(Dave.getAge());
// console.log(Dave.age)        // private, it does not work
class WebDev extends Coder {
    constructor(computer, // new prop with modifier
    name, // props of super class without modifiers
    music, age) {
        super(name, music, age); // obligatory
        this.computer = computer;
        this.computer = computer;
    }
    getLang() {
        return `I write ${this.lang}`;
    }
}
const Sara = new WebDev('Mac', 'Sara', 'Lofi', 25);
console.log(Sara.getLang());
class Guitarists {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
    play(action) {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}
const Page = new Guitarists('Jimmy', 'guitar');
console.log(Page.play('strums'));
/////////////////////////////////////
// static members
class Peeps {
    static getCount() {
        return Peeps.count;
    }
    constructor(name) {
        this.name = name;
        this.name = name;
        this.id = ++Peeps.count;
    }
}
Peeps.count = 0;
const John = new Peeps('John');
const Steve = new Peeps('Steve');
const Amy = new Peeps('Amy');
console.log(Peeps.count);
////////////////////////////
// getters and setters  - setter can not have a return type annotation!
class Bands {
    constructor() {
        this.dataState = [];
    }
    get data() {
        return this.dataState;
    }
    set data(value) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) { // .every(predicate)
            this.dataState = value;
        }
        else
            throw new Error('Param is not an array of strings');
    }
}
const myBands = new Bands();
myBands.data = ['Talk Talk', 'Tears for Fears', 'Duran Duran'];
console.log(myBands.data);
myBands.data = [...myBands.data, 'OMD']; // add new one
console.log(myBands.data);
