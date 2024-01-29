import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getInitialPokemonData } from '../reducers/getInitialPokemonData';
import { getPokemonsData } from '../reducers/getPokemonsData';
import {
  PokemonInitialStateType,
  generatedPokemonType,
} from '../../utils/types';

const initialState: PokemonInitialStateType = {
  allPokemon: undefined,
  randomPokemons: undefined,
  compareQueue: [],
  userPokemons: [],
  currentPokemon: undefined,
  selectedType: null,
};

export const PokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      if (index === -1) {
        if (state.compareQueue.length === 2) {
          state.compareQueue.pop();
        }
        state.compareQueue.unshift(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      const queue = [...state.compareQueue];
      queue.splice(index, 1);
      state.compareQueue = queue;
    },
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
    resetRandomPokemons: (state) => {
      state.randomPokemons = undefined;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
    clearSelectedType: (state) => {
      state.selectedType = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload;
    });
    builder.addCase(getPokemonsData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload;
    });
  },
});

export const {
  addToCompare,
  removeFromCompare,
  setCurrentPokemon,
  resetRandomPokemons,
  setSelectedType,
  clearSelectedType,
} = PokemonSlice.actions;

export default PokemonSlice.reducer;
