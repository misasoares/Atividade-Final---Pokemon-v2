import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPokemons } from "../store/modules/pokemons/pokemonsSlice";
import "../app.css";
import Header from "../components/header/Header";
import { Grid, Pagination, Stack } from "@mui/material";

import "swiper/css";
import CardPokemon from "../components/CardPokemon";

export default function Home() {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) {
      dispatch(getPokemons());
    } else {
      dispatch(getPokemons(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`));
    }
  }, [page]);

  return (
    <div className="App">
      <Header />

      <Grid container>
        <CardPokemon pokemons={pokemonsRedux.pokemons} />
      </Grid>

      <Stack mt={4} spacing={2}>
        <Pagination onChange={(_event, value) => setPage(value)} count={10} />
      </Stack>
    </div>
  );
}
