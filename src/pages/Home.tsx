import "../app.css";
import { Grid } from "@mui/material";
import "swiper/css";
import CardPokemon from "../components/CardPokemon";
import { useAppSelector } from "../store/hooks";

export default function Home() {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);

  return (
    <div className="App">
      <Grid container>
        <CardPokemon pokemons={pokemonsRedux.pokemons} />
      </Grid>
    </div>
  );
}
