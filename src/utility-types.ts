//////////////////

// -- UTILITY TYPES --

// defining objects as dictionaries, filtering props in objects, keys, values in objects
// easy type checking of function args and return types



// -- Partial<...> --

interface Assignment {      // we define object structure...
    studentId: string,
    title: string,
    grade: number,
    verified?: boolean
}

// ...then:
// -- Partial<...>: some props from the object (any!) - here in a function where some props will be updated
const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
    return  { ...assign, ...propsToUpdate }
}

const assign1: Assignment = {
    studentId: 'compsci123',
    title: "Final Project",
    grade: 0
}

console.log(updateAssignment(assign1, {grade: 95}))
const assignGraded: Assignment = updateAssignment(assign1, {grade: 95})


// -- Required and Readonly --

// Required<...>: all props from the object!
const recordAssignment = (assign: Required<Assignment>): Assignment => {
    // sent to DB
    return assign
}

const assignVerified: Readonly<Assignment> = { ...assignGraded, verified: true }  // not writable! ->

// assignVerified.grade = 67       // error!

recordAssignment( { ...assignGraded, verified: true } )  // this works only



/////////////////////
// Record type  - key and value combined   ~ Map<K,V> in Java
// my interpretation:  much data with the same structure >> this is why we use Record - it defines this repeating structure

const hexColorMap: Record<string, string> = {   // simple types: key type, value type   ~ Map<K,V> in Java
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF"
}


// with literal types  ~ Java enums

type Students = "Sara" | "Kelly"
type LetterGrades = "A" | "B" | "C" | "D" | "U"

const finalGrades: Record<Students, LetterGrades> = {       // ~ K and V with enums in Java
    Sara: "B",
    Kelly: "U"
}

// with interface: value type is object, this object:

interface Grades {
    assign1: number,
    assign2: number
}

const gradeData: Record<Students, Grades> = {       // = Map<enum, object>
    'Sara': { assign1: 85, assign2: 93 },
    'Kelly': { assign1: 65, assign2: 99 }
}


/////////////////////////
// Pick and Omit  -  pick and omit props   - these are for keys...  --- we filter the keys

type AssignResult = Pick<Assignment, "studentId" | "grade">     // some keys only

const score: AssignResult = {
    studentId: "k123",
    grade: 85
}

type AssignPreview = Omit<Assignment, "grade" | "verified">     // every keys except some

const preview: AssignPreview = {
    studentId: "k123",
    title: "Final Project"
}


// Exclude and Extract  -  exclude and extract values   - these are for values...  --- we filter the values

type adjustedGrade = Exclude<LetterGrades, "U">

type highGrades = Extract<LetterGrades, "A" | "B">


// NonNullable  -  omit nullables: null and undefined

type AllPossibleGrades = "Dave" | "John" | null | undefined
type NamesOnly = NonNullable<AllPossibleGrades>


// -- Functions --
// -- ReturnType and Parameters   ~ Java Reflection

// Return type: object

// type NewAssign = { title: string, points: number}

// const createNewAssign = (title: string, points: number): NewAssign => {
//     return {title, points}
// }

// instead: the other way around -

const createNewAssign = (title: string, points: number) => {
    return {title, points}
}

type NewAssign = ReturnType<typeof createNewAssign>     // an object - ReturnType<...> takes out the return type of the function
// its main advantage: if we change the function, it is automatically updated!

// usage: this function creates an object from params
const tsAssign: NewAssign = createNewAssign("Utility Types", 100)
console.log(tsAssign)


// Parameters type: Tuple -> so that we can use spread op.

type AssignParams = Parameters<typeof createNewAssign>      // it is Tuple - Parameters<...> takes out args from the function into an array

const assignArgs: AssignParams = ["Generics", 100]      // so we can use it to indicate the type in the case of the parameters of a function
const tsAssign2: NewAssign = createNewAssign(...assignArgs)
console.log(tsAssign2)


// my interpretation - as a short version for the usage of this 2:

const args: Parameters<typeof createNewAssign> = ["Generics", 100]
const newAssign: ReturnType<typeof createNewAssign> = createNewAssign(...args);    // this way we can easily check the parameters and the return type of a function


// Help at Promises:
// Awaited - helps us with the ReturnType of a Promise - we wrap the above Returntype into an Awaited<...>
// - because it returns a Promise << Awaited<...> simulates await:
// Awaited<...> = the return data type from the returned Promise<return data type> of async fetchuser()
async function fetchUsers(): Promise<Response> {return fetch("")}
const users: Awaited<ReturnType<typeof fetchUsers>> = fetchUsers();
