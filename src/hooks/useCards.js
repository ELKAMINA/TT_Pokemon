import { useState, useEffect, useRef } from "react";
import { getAllCardsPage } from "../services/requests";
import { useAppSelector } from "../redux/hooks/hooks";
import { selectSearchquery } from "../redux/slices/pokemonSlice";

const useCards = (page = 1) => {
 const [results, setResults] = useState([]);
 const [isLoading, setLoading] = useState(false);
 const [isError, setIsError] = useState(false);
 const [error, setError] = useState([]);
 const [hasNextPage, setHasNextPage] = useState(false);
 const query = useAppSelector(selectSearchquery);
 const lastQuery = useRef("");

 useEffect(() => {
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

  getAllCardsPage(page, 50, query, { signal })
   .then((data) => {
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
    //  console.log("Fetched Data:", data);
    setResults((prev) => {
     console.log("previous data ", prev);
     const updatedResults = isNewQuery ? data : [...prev, ...data];
     //   console.log("Updated Results:", updatedResults);
     return updatedResults;
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
  //   return () => abortController.abort(); // Cancel the request when the component is unmounting
 }, [page]);

 return { results, isLoading, isError, error, hasNextPage };
};

export default useCards;
