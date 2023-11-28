import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 pokemons: [],
 loading: true,
 page: 1,
 searchQuery: [],
 filters: [],
};

const pokemonSlice = createSlice({
 name: "pokemon",
 initialState,
 reducers: {
  addPokemons: (state, action) => {
   state.pokemons = [...state.pokemons, ...action.payload];
  },
  setLoading: (state, action) => {
   state.loading = action.payload;
  },
  incrementPage: (state) => {
   state.page += 1;
  },
  resetPage: (state) => {
   state.page = 1;
  },
  setSearchquery: (state, action) => {
   state.searchQuery = action.payload;
  },
  setFilters: (state, action) => {
   state.filters = action.payload;
  },
 },
});

export const {
 addPokemons,
 setLoading,
 incrementPage,
 setSearchquery,
 setFilters,
 resetPage,
} = pokemonSlice.actions;

export const selectPokemons = (state) =>
 state.persistedReducer.pokemon.pokemons;
export const selectSearchquery = (state) =>
 state.persistedReducer.pokemon.searchQuery;
export const selectPage = (state) => state.persistedReducer.pokemon.page;
export const selectFilters = (state) => state.persistedReducer.pokemon.filters;
export const selectLoading = (state) => state.persistedReducer.pokemon.loading;

export default pokemonSlice.reducer;
