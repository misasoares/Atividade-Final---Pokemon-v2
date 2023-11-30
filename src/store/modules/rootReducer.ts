import { combineReducers } from "redux";
import pokemonsSlice from "./pokemons/pokemonsSlice";

export default combineReducers({
    pokemons: pokemonsSlice
})