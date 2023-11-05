"use strict";
//////////////////
// Partial
// Partial: some props from the object
const updateAssignment = (assign, propsToUpdate) => {
    return { ...assign, ...propsToUpdate };
};
const assign1 = {
    studentId: 'compsci123',
    title: "Final Project",
    grade: 0
};
console.log(updateAssignment(assign1, { grade: 95 }));
const assignGraded = updateAssignment(assign1, { grade: 95 });
// Required and Readonly
// Required: all props from the object!
const recordAssignment = (assign) => {
    // sent to DB
    return assign;
};
const assignVerified = { ...assignGraded, verified: true }; // not writable! ->
// assignVerified.grade = 67       // error!
recordAssignment({ ...assignGraded, verified: true }); // this works only
/////////////////////
// Record type  - key and value combined
const hexColorMap = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF"
};
const finalGrades = {
    Sara: "B",
    Kelly: "U"
};
const gradeData = {
    'Sara': { assign1: 85, assign2: 93 },
    'Kelly': { assign1: 65, assign2: 99 }
};
const score = {
    studentId: "k123",
    grade: 85
};
const preview = {
    studentId: "k123",
    title: "Final Project"
};
// ReturnType and Parameters   ~ Java Reflection
// Return type: object
// type NewAssign = { title: string, points: number}
// 
// const createNewAssign = (title: string, points: number): NewAssign => {
//     return {title, points}
// }
// instead:
const createNewAssign = (title, points) => {
    return { title, points };
};
// if we change the function, it is automatically updated
const tsAssign = createNewAssign("Utility Types", 100);
console.log(tsAssign);
const assignArgs = ["Generics", 100];
const tsAssign2 = createNewAssign(...assignArgs);
console.log(tsAssign2);
// Awaited - helps us with the ReturnType of a Promise
// Awaited<ReturnType<typeof fetchUsers>>  - fetchUsers(): async fetch function
