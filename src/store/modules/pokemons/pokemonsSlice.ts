/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TypePokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface NamedAPIResource {
  name: string;
  url: string;
}

interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

interface AbilitiesEffects {
  effect: string;
  short_effect: string;
}

interface Abilities {
  id: number;
  name: string;
  effect_entries: AbilitiesEffects[];
}

// interface Ability {
//   is_hidden: boolean;
//   slot: number;
//   abilities?: Abilities[];
// }

interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

export interface PokemonType {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Abilities[];
  forms: NamedAPIResource[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  type: TypePokemonType[];
  stats: PokemonStat[];
  sprites: {
    front_default: string;
    back_default: string;
  };
}

export interface PokemonsSliceType {
  count: number;
  next: string;
  previous: string | null;
  pokemons: PokemonType[];
  loading: boolean;
  favPokemons: number[];
}

const initialState: PokemonsSliceType = {
  count: 0,
  next: "",
  previous: "",
  pokemons: [],
  loading: false,
  favPokemons: [],
};

export const getPokemons = createAsyncThunk("pokemons/getPokemons", async (urlParams: string | undefined) => {
  const url = urlParams ? urlParams : "https://pokeapi.co/api/v2/pokemon";
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const { data } = response;

      const promisesPokemons = data.results.map(async (pokemonResource: NamedAPIResource) => {
        try {
          const responsePokemon = await axios.get(pokemonResource.url);
          const data = responsePokemon.data;

          const abilitiesPromises = data.abilities.map(async (abilityResource: any) => {
            try {
              const resAbilities = await axios.get(abilityResource.ability.url);
              return {
                id: resAbilities.data.id,
                name: resAbilities.data.name,
                effect_entries: resAbilities.data.effect_entries,
              };
            } catch (error) {
              console.error("Erro ao buscar habilidades:", error);
              return null;
            }
          });

          const abilitiesResolved = await Promise.all(abilitiesPromises);

          const pokemon: PokemonType = {
            id: data.id,
            name: data.name,
            sprites: {
              front_default: data.sprites.front_default,
              back_default: data.sprites.back_default,
            },
            type: data.types,
            base_experience: data.base_experience,
            height: data.height,
            weight: data.weight,
            abilities: abilitiesResolved.filter((a) => a !== null),
            forms: data.forms,
            held_items: data.held_items,
            location_area_encounters: data.location_area_encounters,
            moves: data.moves,
            stats: data.stats,
          };

          return pokemon;
        } catch (error) {
          console.error("Erro ao buscar informações do pokémon:", error);
          return null;
        }
      });

      const pokemonsResolved = (await Promise.all(promisesPokemons)).filter((p) => p !== null);

      return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        pokemons: pokemonsResolved,
        favPokemons: [],
      };
    }
  } catch (error) {
    console.error("Erro geral ao buscar pokemons:", error);
    throw error;
  }
});

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    clear() {
      return initialState;
    },
    toggleFav(state, action) {
      const pokemonId = action.payload;
      const isFavorite = state.favPokemons.includes(pokemonId);

      if (isFavorite) {
        state.favPokemons = state.favPokemons.filter((id) => id !== pokemonId);
      } else {
        state.favPokemons.push(pokemonId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.loading = true;
        return state;
      })
      .addCase(getPokemons.rejected, (state) => {
        state.loading = false;
        console.log("Erro no getPokemons");
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.count = action.payload?.count;
        state.next = action.payload?.next;
        state.previous = action.payload?.previous;
        state.pokemons = action.payload?.pokemons || [];
        state.favPokemons = state.favPokemons || [];

        state.loading = false;

        return state;
      });
  },
});

export const { clear, toggleFav } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
