import { Grid } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import CardPokemon from "../components/CardPokemon";

export default function FavPokemons() {
  const favPokemons = useAppSelector((state) => state.pokemons.favPokemons);
  const pokemons = useAppSelector((state) => state.pokemons.pokemons);

  const filtered = pokemons.filter((pokemon) => favPokemons.includes(pokemon.id));

  return (
    <>
      <Grid container>
        <CardPokemon pokemons={filtered} />
      </Grid>
    </>
  );
}
