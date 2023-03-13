import React from 'react'
import PokeMon from './types';

export interface CardProps {
    pokemon: PokeMon[];
    infoPokemon: React.Dispatch<React.SetStateAction<PokeMon| null>>;
}
const Card: React.FC<CardProps>  = ({pokemon,infoPokemon}) => {

    return (
        <>
        {
                pokemon.map((item) => {

                    return (
                       
                            <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
                                <h2>{item.id}</h2>
                                <img src={item.image} alt="" />
                                <h2>{item.name}</h2>
                            </div>
                    
                    )
                })
        }

        </>
    )
    }
export default Card;