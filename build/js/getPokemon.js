"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstPokemon = exports.getPokemon = exports.getPokemonList = void 0;
// 2nd version: list request and Pokemon request are separated
const getPokemonList = async () => {
    const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/");
    return await listResp.json();
};
exports.getPokemonList = getPokemonList;
const getPokemon = async (url) => {
    const dataResp = await fetch(url);
    return await dataResp.json();
};
exports.getPokemon = getPokemon;
// alternatíve for 1st Pokemon request: gives back a new Pokemon defined with an async arrow function
const getFirstPokemon = async () => new Promise(async (resolve, reject) => {
    try {
        console.log('Getting the list');
        const list = await (0, exports.getPokemonList)();
        resolve(await (0, exports.getPokemon)(list.results[0].url));
    }
    catch (error) {
        reject(error);
    }
});
exports.getFirstPokemon = getFirstPokemon;
