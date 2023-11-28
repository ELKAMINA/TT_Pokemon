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
    height: "800px",
    minWidth: "80vw",
    overflow: "auto",
    backgroundColor: "yellow",
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
       <Box
        sx={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
         m: 2,
        }}
       >
        <Typography
         sx={{ m: 2, fontSize: "20px", fontWeight: "bold", color: "#3762ac" }}
        >
         {t("listcard.loadingData")}
        </Typography>
        <CircularProgress />
       </Box>
      )
     }
     endMessage={
      <Typography
       sx={{ m: 2, fontSize: "20px", fontWeight: "bold", color: "#3762ac" }}
      >
       {t("listcard.loadingEnd")}
      </Typography>
     }
     scrollableTarget="scrollableDiv"
    >
     <Box
      sx={{
       display: "flex",
       flexWrap: "wrap",
       backgroundColor: "cyan",
       justifyContent: "center",
      }}
     >
      {results?.map((pokemon, index) => (
       <Box
        key={index}
        sx={{
         m: 2,
         maxWidth: "800px",
        }}
       >
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
   {isError && (
    <Typography sx={{ fontSize: "100px" }}>
     Please wait for the data to be fetched entirely to apply filter
    </Typography>
   )}
  </Container>
 );
};

export default Listcards;
