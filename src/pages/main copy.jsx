import React, { useEffect } from "react";
import {
 fetchAllPokemons,
 selectPokemons,
 selectIsloaded,
 setIsLoaded,
 selectLoading,
 setLoading,
} from "../redux/slices/pokemonSlice";
import { Container } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import ListCards from "../components/ListCards";
import Searchbar from "../components/Searchbar";

const Main = () => {
 //  const dispatch = useAppDispatch();
 //  const isLoaded = useAppSelector(selectIsloaded);
 //  const loading = useAppSelector(selectLoading);

 //  console.log("Loading ", loading);
 //  useEffect(() => {
 //   if (!isLoaded) {
 //    // Initial loading is false ? fetch : don't fetch
 //    console.log("fetching");
 //    dispatch(fetchAllPokemons());
 //   }
 //  }, [dispatch, isLoaded]);

 //  const fetchMoreData = () => {
 //   if (!loading) {
 //    console.log("je rentre ici ?");
 //    dispatch(fetchAllPokemons());
 //   }
 //  };

 //  const pokemons = useAppSelector(selectPokemons);
 //  console.log("pokemons ", pokemons.length);

 return (
  <Container>
   <Searchbar />
   <ListCards />
   {/* <InfiniteScroll
    dataLength={pokemons?.length} // to let InfiniteScroll know how many items are already rendered
    next={fetchMoreData} // fetches next data. Contains previous and next data
    hasMore={true}
    loader={<h4>Loading...</h4>}
    endMessage={
     <p style={{ textAlign: "center" }}>
      <b>The list is now over ...</b>
     </p>
    }
   >
    {pokemons?.map((pokemon, index) => (
     <div key={pokemon.id}>{pokemon.name}</div>
    ))}
   </InfiniteScroll> */}
  </Container>
 );
};

export default Main;
