import PokeMon, { move_name_power, move_stats } from './types';

export async function addRandomCharacters(){ 
    let newCharacterFromApi;
    let newCharacterFromApilist: PokeMon[] = [];
    while (newCharacterFromApilist.length < 3) {
        try {
            const randomNumber = Math.floor(Math.random() * 151);
            newCharacterFromApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
            newCharacterFromApi = await newCharacterFromApi.json();
           


        } catch (e) {
            console.error(e);
        }

        if (newCharacterFromApi && newCharacterFromApi?.name !== '' ) {
            const newPokemon: PokeMon ={
                name: newCharacterFromApi.name,
                id: newCharacterFromApi.id,
                abilities: newCharacterFromApi.abilities,
                stats: newCharacterFromApi.stats,
                types: newCharacterFromApi.types,
                weight: newCharacterFromApi.weight,
                moves: newCharacterFromApi.moves,
                image: newCharacterFromApi.sprites.front_default

            }
            newCharacterFromApilist = [...newCharacterFromApilist, newPokemon];

        }

    }
    return newCharacterFromApilist;
}
export async function getFourRandomMoves(pokemon:PokeMon ) {
    let movesReturned:move_name_power[] = [];
    let movesReturnedData: move_name_power[] = [];
    let index : number = 0;


    if(pokemon.moves.length <= 4){
        while(movesReturned.length <= movesReturned.length){

            const curr_move = await getMovesFromPokemons(pokemon.moves[index]);

            movesReturned = [...movesReturned, curr_move];
            index ++;
        }
    }else{
        while(movesReturned.length < 4){
        const randomNumber = Math.floor(Math.random() * pokemon.moves.length);
        const curr_move = await getMovesFromPokemons(pokemon.moves[randomNumber]);
        movesReturned = [...movesReturned, curr_move];
        }
        
    }


    return movesReturned;
}
export async function getMovesFromPokemons (pokemonMove:move_stats){
    const move_url = pokemonMove.move.url;
    let moveFullDataFetched:Response = await fetch(move_url);
    const moveFullData: any = await moveFullDataFetched.json();
    let retMoveData:move_name_power;
    if(moveFullData.power){
     retMoveData = {name: moveFullData.name, power:moveFullData.power}
    }else{
     retMoveData = {name: moveFullData.name, power:0}

    }
    return retMoveData;
}

function calcEffectiveness( moveType:string, pokeType:string ) {
	
	var typeKeys:{ [key:string]: number } = {
		normal: 0,
		fire: 1,
		water: 2,
		electric: 3,
		grass: 4,
		ice: 5,
		fighting: 6,
		poison: 7,
		ground: 8,
		flying: 9,
		psychic: 10,
		bug: 11,
		rock: 12,
		ghost: 13,
		dragon: 14
	};
	
	var calculator:{[key:string]: number[] }  = {
		normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1],
		fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5],
		water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5],
		electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5],
		grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5],
		ice: [1, 1, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2],
		fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1],
		poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 2, 0.5, 0.5, 1],
		ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1 ,1],
		flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1],
		psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1],
		bug: [1, 0.5, 1, 1, 2, 1, 0.5, 2, 1, 0.5, 2, 1, 1, 1, 1],
		rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1],
		ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1],
		dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]
	};
	
	return calculator[moveType][typeKeys[pokeType]];
}

export function ComputePowerOfMoveByPokemon(pokemon:PokeMon,pokemonMove:move_name_power,otherpokemon:PokeMon){

    const attack_stat = pokemon.stats[1].base_stat;
    const other_defense_stat = otherpokemon.stats[2].base_stat;
    const move_power = pokemonMove.power;
    const type_factor = calcEffectiveness(pokemon.types[0].type.name,otherpokemon.types[0].type.name);

    return (move_power+attack_stat)*type_factor - other_defense_stat;

}