// const stringEcho = (arg: string): string => arg
// as GENERIC:
const echo = <T>(arg: T): T => arg      // <T> indicates that we use a generic type ~ Java


// a generic function that checks if the arg is object:

const isObj = <T>(arg: T): boolean => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}

console.log(isObj(true))
console.log(isObj('John'))
console.log(isObj([1,2,3]))
console.log(isObj({name: 'John'}))      // only for this returns true
console.log(isObj(null))


// another example: a 2boolean converter

const isTrue = <T>(arg: T): { arg: T, is: boolean } => {
    if (Array.isArray(arg) && !arg.length) {        // array with 0 length is excluded
        return { arg, is: false }
    }
    if (isObj(arg) && !Object.keys(arg as keyof T).length) {    // object with 0 length is excluded
        return { arg, is: false }
    }
    return { arg, is: !!arg }       // to boolean converter
}

console.log( isTrue('Dave') )
console.log( isTrue(null) )
console.log( isTrue(NaN) )
console.log( isTrue(0) )


// define it again with an interface - a generic interface!
interface BoolCheck<T> {
    value: T,
    is: boolean
}

const checkBoolValue = <T>(arg: T): BoolCheck<T> => {
    if (Array.isArray(arg) && !arg.length) {        // array with 0 length
        return { value: arg, is: false }
    }
    if (isObj(arg) && !Object.keys(arg as keyof T).length) {    // object with 0 length
        return { value: arg, is: false }
    }
    return { value: arg, is: !!arg }       // to boolean converter
}

console.log( checkBoolValue('Dave') )
console.log( checkBoolValue(null) )
console.log( checkBoolValue(NaN) )
console.log( checkBoolValue(0) )


/////////////////
// generic with type extension

interface HasID {
    id: number
}

const processUser = <T extends HasID>(user: T): T => {      // arg should have id prop!
    return user
}

console.log(processUser({id: 1, name: 'Dave'}))
// console.log(processUser({name: 'Dave'}))         // error!


//////////////////////
// more extensions

const getUsersProperty = <T extends HasID, K extends keyof T>(users: T[], key: K): T[K][] => {  // T should have 'id' prop, K should be an array of keys from T - the latter is the return type
    return users.map(user => user[key])
}
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
]

console.log( getUsersProperty(personsData, "name") )
console.log( getUsersProperty(personsData, "email") )


////////////////////
// generic in a class

class StateObject<T> {
    private data: T
    constructor(value: T) {
        this.data = value
    }

    get state(): T {
        return this.data
    }

    set state(value: T) {
        this.data = value
    }
}

const store = new StateObject("John")   // infers type of string! -> T type = string from now on !
const store2 = new StateObject<string>("John")   // we too can specify it!
console.log(store.state)
store.state = 'Dave'
// store.state = 12    // error!

const myState = new StateObject<(string|number|boolean)[]> (["John",42])   // our specification instead of inference
myState.state = ['Dave', 47, true]
console.log(myState)


// Type check
const data: string[] = ["e", "r"]
console.log(typeof data[0])


// My original example - the problem is (analyzing it in October) that first we should examine all elements and if any of them is string we should concatenate:
// '' + prev + sum in .reduce...

class AddOrConcat<T> {

    data: T[]

    constructor(...data: T[]) {this.data = data}

    result(): (string | number)[] {
        return [typeof data[0], data[0] ]
        // if (typeof this.data[0] === "string") return this.data.reduce( (prev, sum) => prev + sum )
    }
}

const example = new AddOrConcat(1,2)
console.log(example.result())