// yarn add ts-jest jest -D
// yarn add @types/jest -D
// npx ts-jest config:init  to create jest config file
// yarn test

// it does not want to work because this project is not exactly a node js project...

import { getPokemonList } from "./getPokemon";

describe("getPokemon", () => {
    it("should get list", async () => {
        const list = await getPokemonList();
        expect(list.results[0].name).toBe("bulbasaur");
        }
    );
});
