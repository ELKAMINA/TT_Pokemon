import React, { useState, useRef } from "react";
import { CircularProgress, Box, Container, Typography } from "@mui/material";
import Card from "./Card";
import useCards from "../hooks/useCards";

const Listcards = () => {
 const [page, setPage] = useState(1);
 const { results, isLoading, isError, error, hasNextPage } = useCards(page);

 const intObserver = useRef();

 if (isError) return <Typography>{error.message}</Typography>;

 const content = results.map((card, i) => {
  console.log("card ", card);
  if (results.length === i + 1) {
   return (
    <Card ref={intObserver} key={card.id} card={card}>
     {card.name}
    </Card>
   );
  }
  return <Card key={card.id} card={card}></Card>;
 });

 return (
  <Container>
   <Box>
    {content}
    {isLoading && (
     <>
      <Typography> More data is loading ... </Typography>
      <CircularProgress />
     </>
    )}
   </Box>
  </Container>
 );
};

export default Listcards;
