"use strict";
// Index signatures: to define type for computed access of object if we use variable
const todaysTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50
};
console.log(todaysTransactions.Pizza); // these work, but the one below would not work without index signatures
console.log(todaysTransactions['Pizza']);
let prop = 'Pizza';
console.log(todaysTransactions[prop]); // by declaring index type in index signature, it works now
const student = {
    name: 'Doug',
    GPA: 3.5,
    classes: [100, 500]
};
// console.log(student.test)    // with undefined declared above in index signature it is accepted
/////////////////////////
// iteration: problem if there is no index signature, but we can solve it here
for (const key in student) {
    console.log(`${key}: ${student[key]}`); // assertion can also be a solution
}
// this also works when we do not know the class name!  typeof student = Student, as above
Object.keys(student).map(key => { console.log(student[key]); });
// 3rd version: if key is a param - declare it as key of Student in function signature
const logStudentKey = (student, key) => {
    console.log(`Student ${key}: ${student[key]}`);
};
logStudentKey(student, 'GPA');
// this 2 together declare a structure
// an 'instance' of it:
const monthlyIncomes = {
    salary: 500,
    bonus: 'great',
    sidehustle: 250
};
// now loop through it!
for (const revenue in monthlyIncomes) {
    console.log(`${revenue}: ${monthlyIncomes[revenue]}`); // keyof helps
}
