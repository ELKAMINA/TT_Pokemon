import React, { useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Box, Container, Typography } from "@mui/material";
import Card from "./Card";
import useCards from "../hooks/useCards";

const Listcards = () => {
 const [page, setPage] = useState(1);
 const { results, isLoading, isError, error, hasNextPage } = useCards(page);

 const lastCardInPost = useRef();
 const fetchMoreCards = () => {
  if (hasNextPage) {
   setPage((prev) => prev + 1);
  }
 };

 if (isError) return <Typography>{error.message}</Typography>;

 //  const content = results.map((card, i) => {
 //   console.log("card ", card);
 //   if (results.length === i + 1) {
 //    return (
 //     <Card ref={lastCardInPost} key={card.id} card={card}>
 //      {card.name}
 //     </Card>
 //    );
 //   }
 //   return <Card key={card.id} card={card}></Card>;
 //  });

 return (
  <Container>
   <Box>
    {/* {content} */}
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
    >
     {results?.map((pokemon, index) => (
      <Card key={pokemon.id} card={pokemon}></Card>
     ))}
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
