import React from "react"
import Card from "./Card";
import { useState, MouseEventHandler } from "react";
import {addRandomCharacters} from "./PokeAPI";
import { useEffect } from "react";
import Pokeinfo from "./Pokeinfo";
import PokeMon from "./types";
import Fight from "./Fight";

const STEPS = {
    CHOOSE_POKEMON: 1,
    FIGHT: 2
};

const Main = () => {
    const [pokeData, setMyPokeData] = useState<PokeMon[]>([])
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [PokeDex, setPokeDex] = useState<PokeMon | null>(null)
    const [isFightTime, setIsFightTime] = useState(false);
    const [activeStep, setActiveStep] = useState(STEPS.CHOOSE_POKEMON);

    const handleClick = () => {
        return (event: React.MouseEvent) => {
            setIsFightTime(current => !current);
        }
    };

    const pokeStart = async () => {
        const res = await addRandomCharacters();
        setMyPokeData(res)


    }
    
    useEffect(() => {
        pokeStart();
    }, [])


    const FightComponent = () => {
        return (
            <Fight data={PokeDex} setPokeDex={(value) =>  setPokeDex(value)} PokeMons={pokeData} setPokeMons={setMyPokeData} setChoosePokemon={() => setActiveStep(STEPS.CHOOSE_POKEMON)}/>

        )
    }

    const ChoosePokemon = () => {
        return (
            <div className="container">
                    <div className="left-content">
                        <h1>You Have "{pokeData.length}" Pokemons</h1>
                        <Card pokemon={pokeData} infoPokemon={setPokeDex} />
                    </div>
                    <div className="right-content">
                        <Pokeinfo data={PokeDex} setFight={() => setActiveStep(STEPS.FIGHT)} />
                    </div>
                </div>
        )
    }

    return (
        <>
            { activeStep === STEPS.CHOOSE_POKEMON && <ChoosePokemon />}
            { activeStep === STEPS.FIGHT && <FightComponent />}
          
        </>

    )
}

export default Main;