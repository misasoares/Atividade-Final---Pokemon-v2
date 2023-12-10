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
    console.log(id)
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
            <h4 style={{ position: "fixed", bottom: "70px", left: "65px", marginBlockEnd: "30px" }}>{pokemon.name}</h4>

            <div style={{ color: "#ffff00", borderRadius: " 0 0 10px 10px", height: "90px", fontSize: "15px", position: "relative", bottom: "65px" }}>
              <p>
                {pokemon.stats.map((stat) => (
                  <span key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat},&nbsp;
                  </span>
                ))}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.name}</p>
              <p onClick={() => handleFav(pokemon.id)}>{favPokemon.includes(pokemon.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</p>
            </div>

            <div style={{ position: "relative", bottom: "50px" }}>
              <h4 style={{ marginBlockStart: "50px", marginBlockEnd: "15px" }}>Stats:</h4>
              <p style={{ fontSize: "15px" }}>
                {pokemon.stats.map((stat) => (
                  <span key={stat.stat.name + stat.base_stat} style={{ fontSize: "12px" }}>
                    <span style={{ color: "yellow" }}>{stat.stat.name.toUpperCase()}:</span> Base stat: {stat.base_stat}, Effort: {stat.effort} <br />
                  </span>
                ))}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.id}</p>
              <p onClick={() => handleFav(pokemon.id)}>{favPokemon.includes(pokemon.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</p>
            </div>

            <div style={{ position: "relative", top: "40px" }}>
              <p style={{ fontSize: "20px", marginTop: "-20px" }}>
                <span>Base Experience: </span>
                {pokemon.base_experience}
              </p>

              <p>
                Abilities:{" "}
                {pokemon.abilities.map((ability) => (
                  <span style={{ display: "flex", flexDirection: "column", marginTop: "-10px" }}>
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
                  </span>
                ))}
              </p>

              <p style={{ marginBlockEnd: "-20px", fontSize: "20px" }}>Heigth: {pokemon.height}</p>
              <p style={{ fontSize: "20px" }}>Weigth: {pokemon.weight}</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", justifyContent: "space-between" }}>
              <p>{pokemon.id}</p>
              <p onClick={() => handleFav(pokemon.id)}>{favPokemon.includes(pokemon.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</p>
            </div>

            <p style={{ fontSize: "20px" }}>Held Items:</p>
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
