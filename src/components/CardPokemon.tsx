import { PokemonType } from "../store/modules/pokemons/pokemonsSlice";
import "../components/CardPokemon.css";
import { EffectCards } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

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
              <div>
                <p>{ability.abilities? ability.abilities[0].name : null}</p>
              </div>
            ))}

          </SwiperSlide>
        </Swiper>
      ))}
    </>
  );
}
