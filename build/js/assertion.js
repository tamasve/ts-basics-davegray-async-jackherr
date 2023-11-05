"use strict";
// Applying Assertion
// Original JS code -> ? TS
// const year = document.getElementById("year")
// const thisYear = new Date().getFullYear();
// year.setAttribute("datetime", thisYear)
// year.textContent = thisYear
// Solution 1:
// TS inferences -> declarations + explicit toString() and check of null
// let year: HTMLElement | null = document.getElementById("year")
// let thisYear: string = new Date().getFullYear().toString();
// if (year) {
//     year.setAttribute("datetime", thisYear)
//     year.textContent = thisYear
// }
// Solution 2: applying Assertion -> we do not need the if
const year = document.getElementById("year");
const thisYear = new Date().getFullYear().toString();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
