import React, { MouseEventHandler } from "react";
import PokeMon from "./types";
import Fight from "./Fight"
import { useState } from "react";

export interface PokeinfoProp {
    data?: PokeMon | null ;
    setFight(): void;
}
const Pokeinfo:React.FC<PokeinfoProp> =  ({data,setFight}) =>{
    
    return (
        <>
        {   
            (!data) ? "" : (
                <>
                    <h1>{data.name}</h1>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                    <div className="abilities">
                        {
                            (!data.abilities) ? "": (
                            data.abilities.map((poke,index)=>{
                            
                                return(
                                    
                                     <div className="group" key={index}>
                                        <h2>{poke.ability.name}</h2>
                                    </div>
                                   
                                )
                            })
                            )
                        }
                    </div>
                    <div className="base-stat">
                        {
                            data.stats.map((poke,index)=>{
                                return(
                                   
                                        <h3 key={index}>{poke.stat.name}:{poke.base_stat}</h3>
                                    
                                )
                            })
                        }
                    </div>
                    <div>
                        <br></br>
                    <button className='fightTime' onClick={() => setFight()}> I Choose You </button>
                    </div>
                </>
            )
        }

        </>
    )
}
export default Pokeinfo