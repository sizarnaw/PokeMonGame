

import PokeMon from "./types";

const addRandomenemy = async () => {
    let RandomEnemyFromApi;
        try {
            const randomNumber = Math.floor(Math.random() * 151);
            RandomEnemyFromApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
            RandomEnemyFromApi = await RandomEnemyFromApi.json();


        } catch (e) {
            console.error(e);
        }

        if (RandomEnemyFromApi && RandomEnemyFromApi?.name !== '' ) {
            RandomEnemyFromApi  ={
                name: RandomEnemyFromApi.name,
                id: RandomEnemyFromApi.id,
                abilities: RandomEnemyFromApi.abilities,
                stats: RandomEnemyFromApi.stats,
                types: RandomEnemyFromApi.types,
                weight: RandomEnemyFromApi.weight,
                moves: RandomEnemyFromApi.moves,
                image: RandomEnemyFromApi.sprites.front_default

            }
           

        }

    
    return RandomEnemyFromApi;
}


export default addRandomenemy;

