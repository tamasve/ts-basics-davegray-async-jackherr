"use strict";
// import fetch from 'node-fetch';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Jack Herrington: Mastering async code with Typescript and Javascript
// 03, 12 April 2023
// for PromisePoll at row 200
const promise_pool_1 = __importDefault(require("@supercharge/promise-pool"));
// PromisePool part is only executable through Node js:
// npx ts-node async.ts    in src dir
const getPokemon_1 = require("./getPokemon");
// Basic code using fetch()
console.log("0th version: with fetch()");
// list of Pokemons
fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res => res.json())
    .then((data) => console.log(data.results));
// list of Pokemons, then choose 1 of them and shows it: a Pokemon
fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res => res.json())
    .then((data) => {
    fetch(data.results[0].url) // nested: invoke a fetch to the data list, and later it can go further...
        .then((res) => res.json())
        .then((data) => { console.log(data.stats); })
        .catch((err) => console.error(err));
})
    .catch((err) => console.error(err));
// this can be handled better with async/await: no nested code, easier try-catch
(async function () {
    try {
        const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/"); // it gives a Promise
        const list = await listResp.json(); // it also gives a Promise
        const dataResp = await fetch(list.results[0].url); // with the chosen one: another fetch() -> Promise
        const data = await dataResp.json();
        console.log("1st version with async/await");
        console.log(data.stats);
    }
    catch (e) {
        console.error(e);
    }
})();
// 2nd version: list request and Pokemon request are separated
(async function () {
    try {
        const list = await (0, getPokemon_1.getPokemonList)();
        const pokemon = await (0, getPokemon_1.getPokemon)(list.results[0].url);
        console.log("2nd version");
        console.log("Pokemon name: " + pokemon.name);
        console.log(pokemon.stats);
    }
    catch (e) {
        console.error(e);
    }
})();
// alternatíve for 1st Pokemon request: gives back a new Pokemon defined with an async arrow function
// slightly modified async main function:
(async function () {
    try {
        // const pokemon: Pokemon = await getFirstPokemon();
        console.log("2nd/2 version");
        const pokemon = await (0, getPokemon_1.getFirstPokemon)();
        console.log("Pokemon name: " + pokemon.name);
        console.log(pokemon.stats);
    }
    catch (e) {
        console.error(e);
    }
})();
// 3rd version with 1 promise done twice (?) function:
(async function () {
    try {
        // const pokemon: Pokemon = await getFirstPokemon();  // instead: 2 times the same Promise - works?
        console.log("2nd/3 version");
        const pokemonPromise = (0, getPokemon_1.getFirstPokemon)();
        const pokemon = await pokemonPromise;
        console.log("Pokemon name: " + pokemon.name);
        const pokemon2 = await pokemonPromise; // it does not execute the Promise twice: it works also like a cash
        console.log("Pokemon name: " + pokemon2.name);
        console.log(pokemon.stats);
    }
    catch (e) {
        console.error(e);
    }
})();
//  LOOPING THROUGH THE LIST RECEIVED FROM ASYNC FETCH
// loop through the list 1 - with forEach - forEach is not compatible with async: simultanious - it can overflow
//  - too many requests... we must use slice
// (async function() {
//     try {
//         const list = await getPokemonList();
//         list.results.slice(0, 10).forEach( async (listItem) => {
//             const pokemon = await getPokemon(listItem.url);
//             console.log(pokemon.name);
//         })
//     } catch (e) {console.error(e)}
// })();
// loop through the list 2 - with for - better with sequential approach: it gives us all 20 sequentially...
// (async function() {
//     try {
//         const list = await getPokemonList();
//         for (const listItem of list.results) {
//             const pokemon = await getPokemon(listItem.url);
//             console.log(pokemon.name);
//         }
//     } catch (e) {console.error(e)}
// })();
// loop through the list 3 - with reduce...
// (async function() {
//     try {
//         const list = await getPokemonList();
//         list.results.reduce<Promise<unknown>>(      // unknown type = any, but later should be casted
//             async (prom, pokemon) =>  {    // reduce: (prev val., next val.) = (promise, pokemon)
//                 await prom;
//                 return getPokemon(pokemon.url)      // promise that feeds back into itself...
//                     .then((p) => console.log(p.name))
//             }, Promise.resolve(undefined));     // static method: gives a resolved Promise as a starter
//         } catch (e) {console.error(e)}
// })();
// using Promise.all()
(async function () {
    try {
        const list = await (0, getPokemon_1.getPokemonList)();
        const data = await Promise.all(// rejected if any prom. is rejected
        list.results.map((pokemon) => (0, getPokemon_1.getPokemon)(pokemon.url))); // data will be an array of Pokemons
        console.log("... with Promise.all()...");
        console.log(data);
        console.log(">> DONE");
    }
    catch (e) {
        console.error(e);
    }
})();
// PROMISE POOLING: x request at a time, controlled with a framework: Supercharge
// yarn add @supercharge/promise-pool
(async function () {
    try {
        const list = await (0, getPokemon_1.getPokemonList)();
        const { results, errors } = await promise_pool_1.default
            .withConcurrency(2)
            .for(list.results)
            .process(async (data) => {
            return await (0, getPokemon_1.getPokemon)(data.url);
        });
        console.log("With Supercharge/PromisePool:");
        console.log(results.map(p => p.name));
        console.log(">> DONE");
    }
    catch (e) {
        console.error(e);
    }
})();
