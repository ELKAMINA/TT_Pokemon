import { createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios";

const BASE_URL = "https://api.pokemontcg.io/v2";

const initialState = {
 pokemons: [],
 loading: true,
 isLoaded: false,
 page: 1,
 searchQuery: "",
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
  setIsLoaded: (state, action) => {
   state.isLoaded = action.payload;
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
 setIsLoaded,
 incrementPage,
 setSearchquery,
 setFilters,
 resetPage,
} = pokemonSlice.actions;

export const selectPokemons = (state) =>
 state.persistedReducer.pokemon.pokemons;
export const selectLoading = (state) => state.persistedReducer.pokemon.loading;
export const selectIsloaded = (state) =>
 state.persistedReducer.pokemon.isLoaded;
export const selectPage = (state) => state.persistedReducer.pokemon.page;
export const selectSearchquery = (state) =>
 state.persistedReducer.pokemon.searchQuery;
export const selectFilters = (state) => state.persistedReducer.pokemon.filters;

export default pokemonSlice.reducer;
