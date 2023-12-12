import "../app.css";
import { Box, CircularProgress, Grid } from "@mui/material";
import "swiper/css";
import CardPokemon from "../components/CardPokemon";
import { useAppSelector } from "../store/hooks";

export default function Home() {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);

  return (
    <div className="App">
      {pokemonsRedux.loading ? (
        <Box sx={{ display: "flex", height:'100vh', justifyContent:'center', alignItems:'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container>
          <CardPokemon pokemons={pokemonsRedux.pokemons} />
        </Grid>
      )}
    </div>
  );
}
