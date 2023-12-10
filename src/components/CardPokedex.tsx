import { PokemonType, toggleFav } from "../store/modules/pokemons/pokemonsSlice";
import "../components/CardPokemon.css";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../store/hooks";
interface CardProps {
  pokemons: PokemonType[];
}

export default function CardPokedex({ pokemons }: CardProps) {
  const favPokemon = useAppSelector((state) => state.pokemons.favPokemons);
  const dispatch = useAppDispatch();

  function handleFav(id: number) {
    dispatch(toggleFav(id));
  }

  return (
    <>
      {pokemons.map((pokemon) => (
        <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
          <SwiperSlide onClick={() => handleFav(pokemon.id)}>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.id}</p>
              <p>{favPokemon.includes(pokemon.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</p>
            </div>

            <img src={pokemon.sprites.front_default} />
            <h4 style={{ position: "fixed", bottom: "40px", left: "65px", marginBlockEnd: "30px" }}>{pokemon.name}</h4>
          </SwiperSlide>
          <SwiperSlide onClick={() => handleFav(pokemon.id)}>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.id}</p>
              <p>{favPokemon.includes(pokemon.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</p>
            </div>

            <img src={pokemon.sprites.back_default} />
            <h4 style={{ position: "fixed", bottom: "40px", left: "65px", marginBlockEnd: "30px" }}>{pokemon.name}</h4>
          </SwiperSlide>
        </Swiper>
      ))}
    </>
  );
}
