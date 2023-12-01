import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPokemons } from "../store/modules/pokemons/pokemonsSlice";
import "../components/CardPokemon.css";
import "../components/FlipTransition.css";
import "../app.css";
import { CSSTransition } from "react-transition-group";
import Grid from "@mui/material/Grid";
import Header from "../components/header/Header";
import { Pagination, Stack } from "@mui/material";

interface TransitionUnique {
  id: number;
  front: boolean;
}

export default function Home() {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const [showFront, setShowFront] = useState<TransitionUnique[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) {
      dispatch(getPokemons());
    } else {
      dispatch(getPokemons(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`));
      setShowFront([])
    }
  }, [page]);

  useEffect(() => {
    setTimeout(() => {
      const toTransit = pokemonsRedux.pokemons.map((pokemon) => {
        return {
          id: pokemon.id,
          front: true,
        };
      });
      setShowFront(toTransit);
    }, 300);
  }, [pokemonsRedux]);

  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <Header />
      <Grid container spacing={5}>
        {pokemonsRedux.pokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <div className="card-container">
              <CSSTransition in={showFront.find((item) => item.id === pokemon.id)?.front} timeout={300} classNames="flip">
                <div
                  key={pokemon.id}
                  className="card"
                  onClick={() => {
                    setShowFront(showFront.map((item) => (item.id === pokemon.id ? { ...item, front: !item.front } : item)));
                  }}
                >
                  <div className="card-back">
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.sprites.back_default} />
                  </div>
                  <div className="card-front">
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.sprites.front_default} />
                  </div>
                </div>
              </CSSTransition>
            </div>
          </Grid>
        ))}
      </Grid>

      <Stack mt={4} spacing={2}>
        <Pagination onChange={(_event, value) => setPage(value)} count={10} />
      </Stack>
    </div>
  );
}
