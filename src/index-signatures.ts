// INDEX SIGNATURE: to define type for computed access of object if we use variable
// = we should define type for computed access to be able to use it with variable - that is index signature

interface TransactionObj {
    [index: string]: number     // declares index type (can be string, number, symbol or literal) + data types
    Pizza: number,
    Books: number,
    Job: number
}

const todaysTransactions: TransactionObj = {
    Pizza: -10, 
    Books: -5,
    Job: 50
}

console.log(todaysTransactions.Pizza)    // these work, but the one below would not work without index signatures
console.log(todaysTransactions['Pizza'])

let prop: string = 'Pizza'
console.log(todaysTransactions[prop])       // !! by declaring index type in index signature, it works now

//////////////////////////////

// we should add 'undefined' to the types of index signature in case of an optional prop

interface Student {
    [key: string]: string | number | number[] | undefined   // undefined: due to 'classes' being optional
    name: string,
    GPA: number,
    classes?: number[]
}

const student: Student = {
    name: 'Doug',
    GPA: 3.5,
    classes: [100, 500]
}

console.log(student.test)    // with undefined declared above in index signature it is also accepted


/////////////////////////
// iteration: problem if there is no index signature, but we can solve it here

for (const key in student) {
    console.log(`${key}: ${student[key as keyof Student]}`)     // assertion can also be a solution - it can be inserted in the middle of a command
}

// this also works when we do not know the class name!  typeof student = Student, as above
Object.keys(student).map(key => {console.log(student[key as keyof typeof student])})

// 3rd version: if key is a param - declare it as key of Student in function signature
const logStudentKey = (student: Student, key: keyof Student): void => {
    console.log(`Student ${key}: ${student[key]}`)
}

logStudentKey(student, 'GPA')


/////////////////////////////  +1 for the previous 3rd version...
// short declaration of more properties: Record
// and here also keyof is what can help us in 'for each'

// we would want this:
// interface Incomes {
//     [key: string]: number       // we can not give it here such as key: 'salary'...
// }

// instead: we define the object type structure with Record
type Keys = 'salary' | 'bonus' | 'sidehustle' | 'check'    // here we give the prop names (keys) - tha last one is my idea: how functions work in here...
type Incomes = Record<Keys, number | string | ((arg: number) => boolean)>     // prop names (keys) + the 2nd param: prop value types - the 2 together as union
                                                // function in union type: always in ()
// this 2 together declare a structure:
// 'Keys' gives the prop names, Record's 2nd param gives the value types --

// an 'instance' of this:
const monthlyIncomes: Incomes = {
    salary: 500,
    bonus: 'great',
    sidehustle: 250,
    check: (sum) => sum > 400         // or:  check(sum) { return sum > 400 }
}

// now loop through this!
for (const revenue in monthlyIncomes) {
    console.log(`${revenue}: ${monthlyIncomes[revenue as keyof Incomes]}`)       // keyof helps (with type assertion)
}