import React from "react"
import Card from "./Card";
import { useState } from "react";
import {addRandomCharacters} from "./PokeAPI";
import {useEffect} from "react";
import Pokeinfo from "./Pokeinfo";
import {PokeMon,move_name_power} from "./types";
import PlayerPokemonInfo from "./PlayerPokemonInfo";
import addRandomEnemy from "./RandomEnemyApi";
import FightInfo from "./FightInfo"
import { MouseEventHandler } from "react";


export interface FightProp {
    data?: PokeMon| null ;
    setPokeDex(value:PokeMon | null): void;
    PokeMons: PokeMon[]
    setPokeMons: React.Dispatch<React.SetStateAction<PokeMon[]>>;
    setChoosePokemon() : void;
}



const Fight: React.FC<FightProp> = ({ data,setPokeDex,PokeMons,setPokeMons,setChoosePokemon}) => {
    const [enemyData, setEnemyData] = useState<PokeMon>()
    const [enemySelectedMove,setenemySelectedMove] = useState<move_name_power>();
    const [friendlySelectedMove,setfriendlySelectedMove] = useState<move_name_power>();
    const [BeginFight,setBeginFight] = useState<boolean>(false);
    const [enemySelected,setenemySelected]=useState<boolean>(false);
    const [myPokeSelected,setmyPokeSelected]=useState<boolean>(false);
    const pokeStart = async () => {
        const res = await addRandomEnemy(); 
        setEnemyData(res)
    }
    useEffect(() => {
        pokeStart();
    }, [])
    let FightBegin = false;


    if(enemySelected && myPokeSelected){
        FightBegin = true;
    }

    return (
        <>
            {
                (!data) ? "" : (
                    (!FightBegin) ? (
                    <div className="fight-container">
                        
                        <div className="Pokemon-container">
                       <PlayerPokemonInfo pokemon={enemyData} isEnemy={true} SetPoke={setenemySelectedMove}toSelect={setenemySelected} />
                        </div>
                        
                        <div className="middle-content">
                            <b>FIGHT!!!!!</b>
                        </div>
                        <div className="Pokemon-container">

                        <PlayerPokemonInfo pokemon={data} isEnemy={false} SetPoke={setfriendlySelectedMove}toSelect={setmyPokeSelected} />
                        </div>


                    </div>


                    ):(
                    <div className="fight-container">
                        
                        <div className="Pokemon-container">
                       <PlayerPokemonInfo pokemon={enemyData} isEnemy={true} SetPoke={setenemySelectedMove}toSelect={setenemySelected} />
                        </div>
                        
                        <FightInfo AllSelected={() =>setBeginFight} enemyPoke={enemyData} enemyMove={enemySelectedMove} MyPoke={data} setPokeDex={setPokeDex} MyPokeMove={friendlySelectedMove} FightBegin={FightBegin} PokeMons={PokeMons} setPokeMons={setPokeMons} setChoosePokemon={setChoosePokemon} />
                        <div className="Pokemon-container">

                        <PlayerPokemonInfo pokemon={data} isEnemy={false} SetPoke={setfriendlySelectedMove}toSelect={setmyPokeSelected} />
                        </div>


                    </div>
                )
                )
            }
        </>
    )
}
export default Fight;