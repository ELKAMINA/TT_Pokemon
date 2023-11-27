import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Box, Container, Typography } from "@mui/material";
import Card from "./Card";
import useCards from "../hooks/useCards";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
 incrementPage,
 selectSearchquery,
 selectPage,
 resetPage,
} from "../redux/slices/pokemonSlice";
import { useTranslation } from "react-i18next";

const Listcards = () => {
 const { t } = useTranslation();
 const dispatch = useAppDispatch();
 const page = useAppSelector(selectPage);
 const query = useAppSelector(selectSearchquery);

 //  const query = useAppSelector(selectSearchquery);

 const { results, isLoading, isError, error, hasNextPage } = useCards();

 const fetchMoreCards = () => {
  if (hasNextPage) {
   console.log("More pages");
   dispatch(incrementPage());
  }
 };

 if (isError) return <Typography>{error.message}</Typography>;

 console.log("FROM LIST CARDS -- page", page);
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
   <Box>
    <InfiniteScroll
     dataLength={results?.length} // to let InfiniteScroll know how many items are already rendered
     next={fetchMoreCards} // fetches next data. Contains previous and next data
     hasMore={hasNextPage}
     loader={
      isLoading && (
       <>
        <Typography> {t("listcard.loadingData")} </Typography>
        <CircularProgress />
       </>
      )
     }
     endMessage={<Typography> {t("listcard.loadingEnd")} </Typography>}
     scrollableTarget="scrollableDiv"
    >
     <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {results?.map((pokemon, index) => (
       <Box key={index} sx={{ m: 3 }}>
        <Card card={pokemon}></Card>
       </Box>
      ))}
     </Box>
    </InfiniteScroll>
    <Typography>
     {" "}
     <a href="#top"> {t("listcard.goTop")}</a>
    </Typography>
   </Box>
  </Container>
 );
};

export default Listcards;
