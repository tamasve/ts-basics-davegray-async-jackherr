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

    secondLang!: string     // !: I intentionally do not want to initialize it - TS accepts it

    constructor(
        public readonly name: string,   // initialize with modifier keyword -> not necessary to define
        public music: string, 
        private age: number, 
        protected lang: string = "TS"       // default value -> optional
    ) {
        // this.name = name         // not required
        // this.music = music
        // this.age = age
        // this.lang = lang
    }

    public getAge() {               // not a "getter"! see below...
        return `Hello, I'm ${this.age}`
    }

}


const Dave = new Coder('Dave', 'rock', 42)

console.log(Dave.getAge())
// console.log(Dave.age)        // private, it does not work


class WebDev extends Coder {
    constructor(
        public computer: string,    // new prop with modifier
        name: string,               // props of super class without modifiers
        music: string, 
        age: number
    ) {
        super(name, music, age)     // obligatory
        this.computer = computer
    }

    public getLang() {
        return `I write ${this.lang}`
    }
}

const Sara = new WebDev('Mac', 'Sara', 'Lofi', 25)
console.log(Sara.getLang())


///////////////////////////////////////
// implementing interface

interface Musician {
    name: string,
    instrument: string,
    play(action: string): string
}

class Guitarists implements Musician {
    name: string
    instrument: string

    constructor(name: string, instrument: string) {
        this.name = name
        this.instrument = instrument
    }

    play(action: string) {
        return `${this.name} ${action} the ${this.instrument}`
    }
}

const Page = new Guitarists('Jimmy', 'guitar')
console.log(Page.play('strums'))

/////////////////////////////////////
// static members

class Peeps {
    static count: number = 0

    static getCount(): number {
        return Peeps.count
    }

    public id: number

    constructor(public name: string) {
        this.name = name
        this.id = ++Peeps.count
    }
    
}


const John = new Peeps('John')
const Steve = new Peeps('Steve')
const Amy = new Peeps('Amy')

console.log(Peeps.count)


////////////////////////////
// getters and setters  - setter can not have a return type annotation!

class Bands{
    private dataState: string[]

    constructor() {
        this.dataState = []
    }

    public get data(): string[] {
        return this.dataState
    }

    public set data(value: string[]) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {    // .every(predicate)
            this.dataState = value
        } else throw new Error('Param is not an array of strings')
    }
}

const myBands = new Bands();
myBands.data = ['Talk Talk', 'Tears for Fears', 'Duran Duran']
console.log(myBands.data)
myBands.data = [...myBands.data, 'OMD']     // add new one
console.log(myBands.data)

