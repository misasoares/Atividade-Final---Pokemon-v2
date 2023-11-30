/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TypePokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
export interface PokemonType {
  id: number;
  name: string;
  type: TypePokemonType[];
  sprites: {
    front_default: string;
    back_default: string;
  };
}

interface PokemonsSliceType {
  count: number;
  next: string;
  previous: string | null;
  pokemons: PokemonType[];
  loading: boolean;
}

const initialState: PokemonsSliceType = {
  count: 0,
  next: '',
  previous: '',
  pokemons: [],
  loading: false
};

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async (urlParams: string | undefined) => {
  const url = urlParams ? urlParams : 'https://pokeapi.co/api/v2/pokemon';
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const { data } = response;

      const promises = data.results.map(async (pokemon: any) => {
        const response = await axios.get(pokemon.url);

        if (response.status === 200) {
          const { data } = response;
          const pokemon: PokemonType = {
            id: data.id,
            name: data.name,
            sprites: {
              front_default: data.sprites.front_default,
              back_default: data.sprites.back_default
            },
            type: data.types
          };
          return pokemon;
        }

        return null;
      });

      const pokemons = await Promise.all(promises);

      return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        pokemons: pokemons as PokemonType[]
      };
    }
  } catch (error) {
    throw 'Erro ao buscar pokemons';
  }
});

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    clear() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.loading = true;
        return state;
      })
      .addCase(getPokemons.rejected, (state) => {
        state.loading = false;
        console.log('Erro no getPokemons');
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.count = action.payload?.count;
        state.next = action.payload?.next;
        state.previous = action.payload?.previous;
        state.pokemons = action.payload?.pokemons || [];

        state.loading = false;

        return state;
      });
  }
});

export const { clear } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
