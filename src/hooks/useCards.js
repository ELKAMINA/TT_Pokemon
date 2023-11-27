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

 const query = useAppSelector(selectSearchquery);
 const page = useAppSelector(selectPage);
 const lastQuery = useRef("");
 const lastFilter = useRef([]);
 const filters = useAppSelector(selectFilters);

 useEffect(() => {
  console.log("USECARD filter = ", filters);
  setLoading(true);
  setIsError(false);
  setError({});

  /* Cancel the request when the component is unmounting */
  const abortController = new AbortController();
  const signal = abortController.signal;
  /* ***** */

  const isNewQuery = query !== lastQuery.current;
  const isNewFilter = filters.length !== lastFilter.current.length;
  if (isNewQuery || isNewFilter || (isNewQuery && isNewFilter)) {
   console.log("lastqury", lastQuery.current);
   console.log("query", query);
   console.log("filters.length ", filters.length);
   console.log("lastFilters.current ", lastFilter.current.length);
   //    console.log("newQuery ", isNewQuery);
   setResults([]);
  }
  getAllCardsPage(page, 50, query, filters, { signal })
   .then((data) => {
    console.log("Fetched Data:", data.length);
    setHasNextPage(Boolean(data.length)); // Recall : 0 is false
    if (query) {
     if (data.length < 50) setHasNextPage(false);
    }
    setResults((prev) => {
     const updatedResults = isNewQuery ? data : [...prev, ...data];
     console.log("Final result :", updatedResults);
     const finalResults = getResultWithFilters(updatedResults, filters);
     return finalResults;
    });

    setLoading(false);
   })
   .catch((error) => {
    if (error.name === "AbortError") {
     console.log("Fetch aborted");
    }
    setIsError(true);
    if (signal.aborted) return; // If the request is aborted, don't update the state bc error created on purpose
    setError(error);
    setLoading(false);
   });

  lastQuery.current = query;

  //   return () => {
  // Check if it's a component unmount or a query change
  //    if (!isUnmounting.current) {
  //    abortController.abort(); // Only abort if it's not a component unmount
  //    }
  //   };
 }, [page, query, filters.length, filters]);

 return { results, isLoading, isError, error, hasNextPage };
};

export default useCards;
