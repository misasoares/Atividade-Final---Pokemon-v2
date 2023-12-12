// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Pagination, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPokemons } from "../../store/modules/pokemons/pokemonsSlice";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

interface NavProps {
  children: React.ReactNode;
}

export default function Nav({ children }: NavProps) {
  const dispatch = useAppDispatch();
  const countPokemons = useAppSelector((state) => state.pokemons.count);
  const countPokemonsFav = useAppSelector((state) => state.pokemons.favPokemons.length);
  const [value, setValue] = React.useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const countPageHome = Math.ceil(countPokemons / 20);
  const countPageFav = Math.ceil(countPokemonsFav / 20);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (page === 1) {
      dispatch(getPokemons());
    } else {
      dispatch(getPokemons(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page * 20}`));
    }
  }, [page, search]);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", padding: "10px" }}>
        <BottomNavigation
          sx={{ justifyContent: "space-evenly" }}
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CatchingPokemonIcon sx={{ color: "#666666" }} />
            <Typography variant="h5" fontWeight="bold" color="#666666">
              {" "}
              {value === 1 ? "POKEMONS" : "POKEDEX"}
              {" "}
            </Typography>
          </div>
          <BottomNavigationAction onClick={() => navigate("/")} label="All" icon={<HomeIcon />} />
          <BottomNavigationAction onClick={() => navigate("/favorites")} label="Pokedex" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </div>
      <TextField value={search} onChange={(e) => setSearch(e.target.value)} label="Search" />

      {children}

      <Stack mt={4} spacing={2}>
        {/* <Pagination onChange={(_event, value) => setPage(value)} count={value === 1 ? countPageHome : countPageFav} /> */}
        <Pagination onChange={(_event, value) => { setPage(value); scrollToTop(); }} count={value === 1 ? countPageHome : countPageFav} />
      </Stack>
    </Box>
  );
}
