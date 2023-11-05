// import fetch from 'node-fetch';

// Jack Herrington: Mastering async code with Typescript and Javascript
// 03, 12 April 2023

// Final version of this async practise is in async-with-ts project, run on Node.js

// for PromisePoll at row 200
import PromisePool from '@supercharge/promise-pool';
// PromisePool part is only executable through Node js:
// npx ts-node async.ts    in src dir


interface PokemonList {
    count: number;
    next: string;
    previous?: any;
    results: {
        name: string;
        url: string;    // >> Pokemon
    }[];
}

interface Pokemon {
    id: number;
    name: string;
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        }
    }[];
}


// Basic code using fetch()

console.log("0th version: with fetch()");

// list of Pokemons
fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res => res.json())
    .then((data: PokemonList) => console.log(data.results))
    .catch((err) => console.error(err))
    .finally(() => console.log("finally part"))

// list of Pokemons, then choose 1 of them and shows it: a Pokemon
fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res => res.json())
    .then((data: PokemonList) => {
        fetch(data.results[0].url)       // nested: invoke a fetch to the data list, and later it can go further...
            .then((res) => res.json())
            .then((data) => {console.log(data.stats)})
            .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err));


// this can be handled better with async/await: no nested code, easier try-catch

(async function() {
    try {
        const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/");     // it gives a Promise
        const list: PokemonList = await listResp.json();                        // it also gives a Promise
        
        const dataResp = await fetch(list.results[0].url);   // with the chosen one: another fetch() -> Promise
        const data: Pokemon = await dataResp.json();
        console.log("1st version with async/await");
        console.log(data.stats)
    } catch (e) {
        console.error(e)
    }
})();


// 2nd version: list request and Pokemon request are separated

const getPokemonList = async(): Promise<PokemonList> => {
    const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/");
    return await listResp.json(); 
}

const getPokemon = async(url: string): Promise<Pokemon> => {
    const dataResp = await fetch(url);
    return await dataResp.json();
}

(async function() {
    try {
        const list: PokemonList = await getPokemonList();
        const pokemon: Pokemon = await getPokemon(list.results[0].url);
        console.log("2nd version");
        console.log("Pokemon name: " + pokemon.name)
        console.log(pokemon.stats)
    } catch (e) {
        console.error(e)
    }
})();


// alternatíve for 1st Pokemon request: gives back a new Pokemon defined with an async arrow function

const getFirstPokemon = async (): Promise<Pokemon> => 
    new Promise(
    async (resolve, reject) => {
        try {
            console.log('Getting the list')
            const list: PokemonList = await getPokemonList();
            resolve( await getPokemon(list.results[0].url) );
        } catch (error) {
            reject(error);
        }
    }
    );

// slightly modified async main function:
(async function() {
    try {
        // const pokemon: Pokemon = await getFirstPokemon();
        console.log("2nd/2 version");
        const pokemon = await getFirstPokemon();
        console.log("Pokemon name: " + pokemon.name)
        console.log(pokemon.stats)
    } catch (e) {
        console.error(e)
    }
})();

// 3rd version with 1 promise done twice (?) function:
(async function() {
    try {
        // const pokemon: Pokemon = await getFirstPokemon();  // instead: 2 times the same Promise - works?
        console.log("2nd/3 version");
        const pokemonPromise = getFirstPokemon();
        const pokemon = await pokemonPromise;
        console.log("Pokemon name: " + pokemon.name)
        const pokemon2 = await pokemonPromise;    // it does not execute the Promise twice: it works also like a cash
        console.log("Pokemon name: " + pokemon2.name)
        console.log(pokemon.stats)
    } catch (e) {
        console.error(e)
    }
})();

//  LOOPING THROUGH THE LIST RECEIVED FROM ASYNC FETCH

// loop through the list 1 - with forEach (declarative) - forEach is not compatible with async: simultanious - it can overflow
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


// loop through the list 2 - with for - better with sequential approach (imperative): it gives us all 20 sequentially...
(async function() {
    try {
        const list = await getPokemonList();
        for (const listItem of list.results) {
            const pokemon = await getPokemon(listItem.url);
            console.log(pokemon.name);
        }
    } catch (e) {console.error(e)}
})();

// loop through the list 3 - with reduce...
(async function() {
    try {
        const list = await getPokemonList();
        list.results.reduce<Promise<unknown>>(      // unknown type = any, but later should be casted
            async (prom, pokemon) =>  {    // callback in reduce: (prev val., next val.) = (promise, pokemon)
                await prom;
                return getPokemon(pokemon.url)      // this will be the next 'current value' - it is a promise that feeds back into itself...
                    .then((p) => console.log(p.name))
            }, Promise.resolve(undefined));     // current value in reduce: static method - gives a resolved Promise as a starter
        } catch (e) {console.error(e)}
})();


// using Promise.all()
(async function () {
    try {
        const list: PokemonList = await getPokemonList();
        const data: Pokemon[] = await Promise.all(     // rejected if any prom. is rejected inside this
            list.results.map( (pokemon) => getPokemon(pokemon.url) )
            );      // data will be an array of Pokemons
        console.log("... with Promise.all()...")
        console.log(data)
        console.log(">> DONE")
    } catch (e) {
        console.error(e);
    }
}) ();


// PROMISE POOLING: x request at a time, controlled with a framework: Supercharge
// yarn add @supercharge/promise-pool

(async function () {
    try {
        const list = await getPokemonList();
        
        const { results, errors } = await PromisePool
            .withConcurrency(2)
            .for(list.results)
            .process(async data => {
                return await getPokemon(data.url)
        })

        console.log("With Supercharge/PromisePool:")
        console.log(results.map(p => p.name))
        console.log(">> DONE")
    } catch (e) {
        console.error(e);
    }
}) ();

