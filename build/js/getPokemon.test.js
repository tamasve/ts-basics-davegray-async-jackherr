"use strict";
// yarn add ts-jest jest -D
// yarn add @types/jest -D
// npx ts-jest config:init  to create jest config file
// yarn test
Object.defineProperty(exports, "__esModule", { value: true });
// it does not want to work because this project is not exactly a node js project...
const getPokemon_1 = require("./getPokemon");
describe("getPokemon", () => {
    it("should get list", async () => {
        const list = await (0, getPokemon_1.getPokemonList)();
        expect(list.results[0].name).toBe("bulbasaur");
    });
});
