import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPokemons } from "../store/modules/pokemons/pokemonsSlice";
import '../app.css'

export default function Home(){

    const pokemonsRedux = useAppSelector((state) => state.pokemons);

    useEffect(()=>{
        dispatch(getPokemons())
    },[])

    const dispatch = useAppDispatch();
    return (
        <div className="App">
            {pokemonsRedux.pokemons.map((pokemon)=>(
                <div  key={pokemon.id}>
                    <p>{pokemon.name}</p>
                </div>
            ))}
        </div>
    )
}