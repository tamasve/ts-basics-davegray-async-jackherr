// Applying Type Assertion

// -- Type assertion allows you to set the type of a value and tell the compiler not to infer it. --
// (my interpretation:
//  type setting works on the left side of an expression,
//  but when this does not work, we can use type setting on the right side >> that is Type Assertion
//  When does normal type setting not work? In case of a subtype i.g. ...)

// So shortly: in case of subtypes instead of normal left-side type settings we use right-side version with 'as' or <...>


// Original JS code:

// const year = document.getElementById("year")
// const thisYear = new Date().getFullYear();
// year.setAttribute("datetime", thisYear)
// year.textContent = thisYear

// -> ? TS


// Solution 1:
// TS inferences -> declarations + explicit toString() and check if null

// let year: HTMLElement | null = document.getElementById("year")
// let thisYear: string = new Date().getFullYear().toString();
// if (year) {
//     year.setAttribute("datetime", thisYear)
//     year.textContent = thisYear
// }


// Solution 2: applying Type Assertion -> we do not need the if

let year = document.getElementById("year") as HTMLSpanElement;  // without it 'year' will be only of HTMLElement type
// let year: HTMLSpanElement | null = document.getElementById("year");  // this version is not sufficient for TS, without 'null' also does not work... that's why we need Assertion...
const thisYear: string = new Date().getFullYear().toString();
year.setAttribute("datetime", thisYear);    // without asserting 'year' of HTMLSpanElement type, these 2 lines do not work!
year.textContent = thisYear;
// the other version for Assertion - but not in React!
year = <HTMLSpanElement> document.getElementById("year");


// other examples for Type Assertion:

let code: any = 123; 
let employeeCode = <number> code;  // >> a number...

// with the 'as' keyword:

employeeCode = code as number;  // exactly the same! - but this is the only that works in React

// ...

interface Employee { 
    name: string; 
    code: number; 
} 

let employee = <Employee> { }; 
employee.name = "John"; // OK
employee.code = 123; // OK