export interface PokemonList {
    count: number;
    next: string;
    previous?: any;
    results: {
        name: string;
        url: string;
    }[];
}

export interface Pokemon {
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



// 2nd version: list request and Pokemon request are separated

export const getPokemonList = async(): Promise<PokemonList> => {
    const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/");
    return await listResp.json(); 
}

export const getPokemon = async(url: string): Promise<Pokemon> => {
    const dataResp = await fetch(url);
    return await dataResp.json();
}




// alternatíve for 1st Pokemon request: gives back a new Pokemon defined with an async arrow function

export const getFirstPokemon = async (): Promise<Pokemon> => 
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