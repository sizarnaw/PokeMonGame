import React from 'react'
import PokeMon, { move_name_power, move_stats } from './types';
import {getFourRandomMoves} from './PokeAPI'
import { useState } from 'react';
import { useEffect } from 'react';


export interface PlayerPokemonInfoProps {
    pokemon?: PokeMon;
    isEnemy:boolean;
    SetPoke: React.Dispatch<React.SetStateAction<move_name_power| undefined>>;
    toSelect:React.Dispatch<React.SetStateAction<boolean>>;
    
}



const PlayerPokemonInfo: React.FC<PlayerPokemonInfoProps> = ({ pokemon,isEnemy,SetPoke,toSelect }) => {

    const [pokeMoves, setpokeMoves] = useState<move_name_power[]>([])
    const PokeMovesGen = async(pokemon:PokeMon) => {
        const pokemon_moves = await getFourRandomMoves(pokemon);
        setpokeMoves(pokemon_moves);
    }
    const checkSelectedFriendly= (moves:move_name_power ) => {
        SetPoke(moves);

        toSelect(true);
        
    }
    const checkSelectedEnemy= (moves:move_name_power ) => {
        SetPoke(moves);
        toSelect(true);
    }
    
    // put css to be selected as we select move 
    useEffect(() => {
        if(pokemon){
        PokeMovesGen(pokemon);
        }
    }, [pokemon])
    return (
        <>
            {
               (!isEnemy) ? 
                (!pokemon) ? "" : (
                  
                    <div className="pokemon-container">

                        <h2>{pokemon.name}</h2>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="" />
                        <div className="moves">
                        {
                            (!pokemon.moves) ? "": (
                                pokeMoves.map((move,index)=>{
                                return(
                                 
                                     <div className="move_group" key={index}>
                                     <button className='move' onClick={()=>checkSelectedFriendly(move) } ><h2>{move.name} {move.power}</h2> </button>
                                    
                                    </div>
                                   
                                )
                            })
                            )
                        }
                    </div>
                    
                       
                        
                    </div>


                )
                :
                (!pokemon) ? "" : (
                  
                    <div className="pokemon-container">

                        <div className="moves">
                        {
                            (!pokemon.moves) ? "": (
                                pokeMoves.map((move,index)=>{
                                return(
                                    
                                     <div className="move_group" key={index}>
                                     <button className='move' onClick={()=>checkSelectedEnemy(move)}><h2>{move.name} {move.power}</h2> </button>

                                    </div>
                                    
                                )
                            })
                            )
                        }
                    </div>

                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="" />
                    <h2>{pokemon.name}</h2>

                       
                        
                    </div>


                )
                
            }
        </>
    )
}
export default PlayerPokemonInfo;