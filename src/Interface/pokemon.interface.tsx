export interface Pokemon {
    id: number
    name: string;
        types: Array<{
            slot: number;
            type: {
                name: string;
                url: string;
            };
        }>;
        sprites: {
            other: {
                ["official-artwork"]: {
                    front_default: string
                }
            }
        }
        abilities: Array<{
            ability: {
                name: string
            }
        }>
}

export interface PokemonType {
    results: Array<{
        name: string
    }>
}

export interface PokemonURL{
    results: Array<[
        {
            name: string,
            url: string
        }
    ]>
}