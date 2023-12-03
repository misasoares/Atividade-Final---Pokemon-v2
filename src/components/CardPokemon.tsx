import { PokemonType } from "../store/modules/pokemons/pokemonsSlice";
import "../components/CardPokemon.css";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Tooltip } from "@mui/material";

interface CardProps {
  pokemons: PokemonType[];
}

export default function CardPokemon({ pokemons }: CardProps) {
  return (
    <>
      {pokemons.map((pokemon) => (
        <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
          <SwiperSlide>
            <p style={{ display: "flex", alignSelf: "self-start", marginLeft: "20px" }}>{pokemon.id} </p>
            <img src={pokemon.sprites.front_default} />
            <h4 style={{ position: "relative", bottom: "50px" }}>{pokemon.name}</h4>
          </SwiperSlide>
          <SwiperSlide>
            <h4>Abilities:</h4>

            {pokemon.abilities.map((ability) => (
              <div style={{ display: "flex", flexDirection: "column" }}>
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
                  <Button style={{ color: "white" }}>{ability.name}</Button>
                </Tooltip>
              </div>
            ))}
          </SwiperSlide>
        </Swiper>
      ))}
    </>
  );
}
