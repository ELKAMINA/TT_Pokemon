import { useState, useEffect, useRef } from "react";
import { getAllCardsPage } from "../services/requests";
import { useAppSelector } from "../redux/hooks/hooks";
import {
 selectSearchquery,
 selectFilters,
 selectPage,
} from "../redux/slices/pokemonSlice";
import { getResultWithFilters } from "../utils/resultWithFilters";

const useCards = () => {
 const [results, setResults] = useState([]);
 const [isLoading, setLoading] = useState(false);
 const [isError, setIsError] = useState(false);
 const [error, setError] = useState([]);
 const [hasNextPage, setHasNextPage] = useState(false);
 const [isSearching, setIsSearching] = useState(false);

 const query = useAppSelector(selectSearchquery);
 const page = useAppSelector(selectPage);
 const lastQuery = useRef("");
 const filters = useAppSelector(selectFilters);

 useEffect(() => {
  //   console.log("je rentre ici");
  //   console.log("lastqury", lastQuery.current);
  //   console.log("query", query);
  //   console.log("page", page);
  /* Resetting the states when re-fetching */
  setLoading(true);
  setIsError(false);
  setError({});
  /* ***** */

  /* Cancel the request when the component is unmounting */
  const abortController = new AbortController();
  const signal = abortController.signal;
  /* ***** */

  /* To distinguish between New query or pagination */
  //   console.log("query", query);
  const isNewQuery = query !== lastQuery.current;
  if (isNewQuery) {
   setResults([]);
  }
  //   console.log("newQuery ", isNewQuery);
  setIsSearching(true);
  getAllCardsPage(page, 50, query, { signal })
   .then((data) => {
    // console.log("Fetched Data:", data.length);
    setHasNextPage(Boolean(data.length)); // Recall : 0 is false
    if (query) {
     //   setResults(data); // Concatenating the previous results with the new ones
     if (data.length < 50) setHasNextPage(false);
    }
    /* 
        If newQuery is true means that it's a new query => so we get all the data
        else it's about pagination => so we concatenate the previous results with the new ones
        */
    //  console.log("isNewQuery:", isNewQuery);
    setResults((prev) => {
     const updatedResults = isNewQuery ? data : [...prev, ...data];
     const finalResults = getResultWithFilters(updatedResults, filters);
     //  console.log(`for page : ${page} && query : ${query}`);
     console.log("Final result :", finalResults);

     //   console.log("Updated Results:", updatedResults);
     return finalResults;
    });

    //  setResults((prev) => (isNewQuery ? data : (prev) => [...prev, ...data])); // Concatenating the previous results with the new ones
    setLoading(false);
   })
   .catch((error) => {
    setIsError(true);
    if (signal.aborted) return; // If the request is aborted, don't update the state bc error created on purpose
    setError(error);
    setLoading(false);
   });

  lastQuery.current = query;
  //   console.log("FIN");
  //   console.log("FIN Query ", query);
  //   console.log("FIN page ", page);
  return () => {
   // Check if it's a component unmount or a query change
   //    if (!isUnmounting.current) {
   //     abortController.abort(); // Only abort if it's not a component unmount
   //    }
  };
 }, [page, query, filters]);

 return { results, isLoading, isError, error, hasNextPage };
};

export default useCards;
