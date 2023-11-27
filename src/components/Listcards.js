import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Box, Container, Typography } from "@mui/material";
import Card from "./Card";
import useCards from "../hooks/useCards";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { incrementPage, selectSearchquery } from "../redux/slices/pokemonSlice";
import { useTranslation } from "react-i18next";
import Link from "@mui/material/Link";

const Listcards = () => {
 const { t } = useTranslation();
 const dispatch = useAppDispatch();
 const query = useAppSelector(selectSearchquery);

 const scrollableDivRef = useRef(null);

 useEffect(() => {
  // Reset scroll position when a new search is performed
  scrollableDivRef.current.scrollTop = 0;
 }, [query]);

 const { results, isLoading, isError, error, hasNextPage } = useCards();

 const fetchMoreCards = () => {
  if (hasNextPage && !isLoading) {
   dispatch(incrementPage());
  }
 };

 const scrollToTop = () => {
  if (scrollableDivRef.current) {
   scrollableDivRef.current.scrollTop = 0;
  }
 };

 if (isError) return <Typography>{error.message}</Typography>;

 return (
  <Container
   ref={scrollableDivRef}
   sx={{
    maxHeight: "800px",
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
     <Link
      onClick={scrollToTop}
      style={{ cursor: "pointer" }}
      component="button"
      variant="body2"
     >
      {t("listcard.goTop")}
     </Link>
    </Typography>
   </Box>
  </Container>
 );
};

export default Listcards;
