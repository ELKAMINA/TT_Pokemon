import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Box, Container, Typography } from "@mui/material";

import Card from "./Card";
import useCards from "../hooks/useCards";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
 incrementPage,
 selectSearchquery,
 selectFilters,
 setSearchquery,
 selectLoading,
} from "../redux/slices/pokemonSlice";

const Listcards = () => {
 const { t } = useTranslation();
 const dispatch = useAppDispatch();
 const query = useAppSelector(selectSearchquery);
 const filters = useAppSelector(selectFilters);
 const loading = useAppSelector(selectLoading);
 const scrollableDivRef = useRef(null);

 const scrollToTop = () => {
  if (scrollableDivRef.current) {
   scrollableDivRef.current.scrollTop = 0;
  }
 };

 /* Using JSON as query and filters are arrays */
 useEffect(
  () => {
   // Reset scroll position when a new search is performed
   scrollToTop();
  },
  // eslint-disable-next-line
  [JSON.stringify(query)],
  [JSON.stringify(filters)]
 );

 const { results, isError, hasNextPage } = useCards();

 const fetchMoreCards = () => {
  if (hasNextPage && !loading) {
   dispatch(incrementPage());
  }
 };

 if (isError) {
  dispatch(setSearchquery(""));
  return (
   <Typography sx={{ color: "red", fontSize: "3rem", fontWeight: 300 }}>
    There was an error, please refresh the page
   </Typography>
  );
 }

 return (
  <Container
   ref={scrollableDivRef}
   sx={{
    minHeight: "50vh",
    minWidth: "80vw",
    overflow: "auto",
    borderRadius: 10,
    background:
     "linear-gradient(180deg, #edc228 0%, rgba(52, 102, 174, 0.49) 97%)",
   }}
   id="scrollableDiv"
  >
   <Box>
    <InfiniteScroll
     dataLength={results?.length} // to let InfiniteScroll know how many items are already rendered
     next={fetchMoreCards} // fetches next data. Contains previous and next data
     hasMore={hasNextPage}
     loader={
      loading && (
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
     <Link
      onClick={scrollToTop}
      style={{ cursor: "pointer" }}
      component="button"
      variant="h6"
      sx={{ m: 2 }}
     >
      {t("listcard.goTop")}
     </Link>
    </Typography>
   </Box>
  </Container>
 );
};

export default Listcards;
