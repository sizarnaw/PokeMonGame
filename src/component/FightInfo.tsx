import React from 'react'
import PokeMon, { move_name_power, move_stats } from './types';
import  {ComputePowerOfMoveByPokemon} from './PokeAPI'
import { MouseEventHandler } from "react";

export interface FightInfoProp {
    AllSelected: React.Dispatch<React.SetStateAction<boolean>>;
    enemyPoke?: PokeMon;
    enemyMove?:move_name_power;
    MyPoke?: PokeMon;
    setPokeDex(value:PokeMon | null): void;
    MyPokeMove?:move_name_power;
    FightBegin:boolean;
    PokeMons:PokeMon[];
    setPokeMons:React.Dispatch<React.SetStateAction<PokeMon[]>>;
    setChoosePokemon() : void;
}


const FightInfo: React.FC<FightInfoProp> = ({AllSelected,enemyPoke,enemyMove,MyPoke,setPokeDex,MyPokeMove,FightBegin,PokeMons,setPokeMons,setChoosePokemon})=>{

    if(!MyPoke || !MyPokeMove || !enemyPoke || !enemyMove){
        return null
    }
    const myPokeTotPow= ComputePowerOfMoveByPokemon(MyPoke,MyPokeMove,enemyPoke);
    const enemyTotPow = ComputePowerOfMoveByPokemon(enemyPoke,enemyMove,MyPoke);
    // console.log(myPokeTotPow)
    const winner = myPokeTotPow >= enemyTotPow ? "You Win!!" : "You LOST!!";
    // console.log(FightBegin)

    const changePokeMons = () =>{
        if( myPokeTotPow >= enemyTotPow){
            PokeMons = [...PokeMons,enemyPoke];
            setPokeMons(PokeMons);
        }else{
            const temp_array = [MyPoke];
            const filtered_pokemons:PokeMon[] = PokeMons.filter(value => !temp_array.includes(value))
            setPokeMons(filtered_pokemons)
        }
        setPokeDex(null);
        setChoosePokemon();
        AllSelected(false);
    }
    return (
        <>
            {
                <div className="fightstate-container">
                    <h2>Move:{enemyMove.name} , Total Power :{enemyTotPow}</h2>
                    <h2>VS</h2>
                    <h2>Move:{MyPokeMove.name}, Total Power :<b>{myPokeTotPow}</b></h2>
                </div>
            
            }
            {
                <div className="winner-container">
                    <button className='winner' onClick = {() => changePokeMons()} ><h2><b>{winner} Click To Continue!</b></h2></button>
                    
                </div>
            }
        </>
    )
}

export default FightInfo;



