import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Box, Container, Typography } from "@mui/material";
import Card from "./Card";
import useCards from "../hooks/useCards";
import { useAppSelector } from "../redux/hooks/hooks";
import { selectSearchquery } from "../redux/slices/pokemonSlice";

const Listcards = () => {
 const [page, setPage] = useState(1);
 const query = useAppSelector(selectSearchquery);
 const { results, isLoading, isError, error, hasNextPage } = useCards(page);

 useEffect(() => {
  setPage(1);
 }, [query]);

 const fetchMoreCards = () => {
  if (hasNextPage) {
   setPage((prev) => prev + 1);
  }
 };

 if (isError) return <Typography>{error.message}</Typography>;
 console.log("results", results);
 return (
  <Container
   sx={{
    maxHeight: "800px", // Adjust this height as needed
    overflow: "auto",
    backgroundColor: "yellow",
    padding: "16px",
   }}
   id="scrollableDiv"
  >
   <Box
    sx={
     {
      //  backgroundColor: "red",
      //  maxHeight: "90%",
     }
    }
   >
    <InfiniteScroll
     dataLength={results.length} // to let InfiniteScroll know how many items are already rendered
     next={fetchMoreCards} // fetches next data. Contains previous and next data
     hasMore={true}
     loader={
      isLoading && (
       <>
        <Typography> More data is loading ... </Typography>
        <CircularProgress />
       </>
      )
     }
     endMessage={<Typography> You've seen all card available ... </Typography>}
     scrollableTarget="scrollableDiv"
    >
     <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {results?.map((pokemon, index) => (
       <Box sx={{ m: 1 }} key={index}>
        <Card card={pokemon}></Card>
       </Box>
      ))}
     </Box>
    </InfiniteScroll>
    <Typography>
     {" "}
     <a href="#top"> Back to top</a>
    </Typography>
   </Box>
  </Container>
 );
};

export default Listcards;
