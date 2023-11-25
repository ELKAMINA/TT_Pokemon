import { createSlice } from "@reduxjs/toolkit";
import api from "../../config/axios";

const BASE_URL = "https://api.pokemontcg.io/v2";

const initialState = {
 pokemons: [],
 loading: true,
 isLoaded: false,
 page: 1,
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
 },
});

export const { addPokemons, setLoading, setIsLoaded, incrementPage } =
 pokemonSlice.actions;

export const selectPokemons = (state) =>
 state.persistedReducer.pokemon.pokemons;
export const selectLoading = (state) => state.persistedReducer.pokemon.loading;
export const selectIsloaded = (state) =>
 state.persistedReducer.pokemon.isLoaded;
export const selectPage = (state) => state.persistedReducer.pokemon.page;

export default pokemonSlice.reducer;

export function fetchAllPokemons() {
 return async (dispatch, getState) => {
  try {
   const currentPage = getState().persistedReducer.pokemon.page;
   const response = await api.get(
    `${BASE_URL}/cards?page=${currentPage}&pageSize=10`
   );
   const data = response.data.data;
   dispatch(setLoading(false));
   dispatch(setIsLoaded(true));
   dispatch(addPokemons(data));
   dispatch(incrementPage());
  } catch (error) {
   console.error(error.data);
  }
 };
}
