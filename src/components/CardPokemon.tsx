import { PokemonType, toggleFav } from "../store/modules/pokemons/pokemonsSlice";
import "../components/CardPokemon.css";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface CardProps {
  pokemons: PokemonType[];
}

export default function CardPokemon({ pokemons }: CardProps) {
  const favPokemon = useAppSelector((state) => state.pokemons.favPokemons);
  const dispatch = useAppDispatch();

  function handleFav(id: number) {
    dispatch(toggleFav(id));
  }

  return (
    <>
      {pokemons.map((pokemon) => (
        <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
          <SwiperSlide>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.id}</p>
              <p onClick={() => handleFav(pokemon.id)}>{favPokemon.includes(pokemon.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</p>
            </div>

            <img src={pokemon.sprites.front_default} />
            <h4 style={{ position: "relative", bottom: "50px" }}>{pokemon.name}</h4>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.name}</p>
              <p>
                <FavoriteBorderIcon />
              </p>
            </div>

            <h4>Stats:</h4>
            {pokemon.stats.map((stat) => (
              <div>
                <p style={{ fontSize: "20px", marginTop: "-20px" }}>{stat.stat.name}:</p>
                <p style={{ fontSize: "15px", marginTop: "-20px" }}>
                  Base stat: {stat.base_stat}, Effort: {stat.effort}
                </p>
              </div>
            ))}
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.name}</p>
              <p>
                <FavoriteBorderIcon />
              </p>
            </div>

            <h4>Base Experience:</h4>
            <p style={{ fontSize: "20px", marginTop: "-20px" }}>{pokemon.base_experience}</p>

            <h4>Abilities:</h4>

            {pokemon.abilities.map((ability) => (
              <div style={{ display: "flex", flexDirection: "column", marginTop: "-10px" }}>
                <Tooltip
                  title={ability.effect_entries.map((fx) => (
                    <div style={{ fontSize: "10px" }}>
                      <p>
                        <span style={{ color: "red" }}>Effect: </span>
                        {fx.effect}
                      </p>
                      <p>
                        <span style={{ color: "red" }}>Short Effect: </span>
                        {fx.short_effect}
                      </p>
                    </div>
                  ))}
                  arrow
                >
                  <Button style={{ color: "white", fontSize: "15px" }}>
                    <u>{ability.name}</u>
                  </Button>
                </Tooltip>
              </div>
            ))}
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.name}</p>
              <p>
                <FavoriteBorderIcon />
              </p>
            </div>

            <h4>Height:</h4>
            <p>{pokemon.height}</p>

            <h4>Weight:</h4>
            <p>{pokemon.weight}</p>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.name}</p>
              <p>
                <FavoriteBorderIcon />
              </p>
            </div>

            <h4>Held Items:</h4>
            {pokemon.held_items.length > 0 ? (
              pokemon.held_items.map((item) => (
                <div>
                  <p>{item.item.name}</p>
                </div>
              ))
            ) : (
              <div>
                <p>None</p>
              </div>
            )}
          </SwiperSlide>
        </Swiper>
      ))}
    </>
  );
}
