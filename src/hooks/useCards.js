import {
 selectSearchquery,
 selectFilters,
 selectPage,
 setLoading,
 resetPage,
} from "../redux/slices/pokemonSlice";
import { useState, useEffect, useRef } from "react";
import { compareArrays } from "../utils/arrays";
import { getAllCardsPage } from "../services/requests";
import { getResultWithFilters } from "../utils/resultWithFilters";
import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";

const useCards = () => {
 const dispatch = useAppDispatch();
 const [error, setError] = useState([]);
 const [results, setResults] = useState([]);
 const [isError, setIsError] = useState(false);
 const [hasNextPage, setHasNextPage] = useState(false);
 const query = useAppSelector(selectSearchquery);
 const page = useAppSelector(selectPage);
 const lastQuery = useRef([]);
 const lastFilter = useRef([]);
 const filters = useAppSelector(selectFilters);
 const abortControllerRef = useRef(null);

 useEffect(() => {
  /* If 2 requests collide, abort the first one */
  if (!abortControllerRef.current) {
   abortControllerRef.current = new AbortController();
  } else {
   abortControllerRef.current.abort();
   abortControllerRef.current = new AbortController();
  }
  const signal = abortControllerRef.current.signal;
  /* ***** */

  /* Resetting states when comp re-render */
  dispatch(setLoading(true));
  setIsError(false);
  setError({});

  /* Know if continuation of data with pagination or new req */
  const isNewQuery = compareArrays(lastQuery.current, query) ? false : true;
  const isNewFilter = filters.length !== lastFilter.current.length;
  if (isNewQuery || isNewFilter || (isNewQuery && isNewFilter)) {
   /* If new query or new filter, reset page & result array*/
   setResults([]);
   dispatch(resetPage());
  }

  /* Fetching data */
  getAllCardsPage(page, 50, query, filters, {
   signal: abortControllerRef.current.signal,
  })
   .then((data) => {
    /* If request is not aborted, do */
    if (!signal.aborted) {
     setHasNextPage(Boolean(data?.length)); // Recall : 0 is false
     if (query.length > 0 || filters.length > 0) {
      if (data?.length < 50) setHasNextPage(false);
     }
     setResults((prev) => {
      if (!prev) return;
      const updatedResults = isNewQuery ? data : [...prev, ...data];
      const finalResults = getResultWithFilters(updatedResults, filters);
      return finalResults;
     });
     setLoading(false);
     dispatch(setLoading(false));
    }
   })
   .catch((error) => {
    setIsError(true);
    setError(error);
    setLoading(false);
    dispatch(setLoading(false));
    if (error.name === "CanceledError" && signal.aborted) {
     console.error("Fetch aborted");
     setResults([]);
     dispatch(resetPage());
     dispatch(setLoading(true));
     setIsError(false);
     setError({});
     setHasNextPage(false);
     return; // Early return for aborted requests
    }
   });

  /* Keeping track of last query and filters to compare with new ones */
  lastQuery.current = query;
  lastFilter.current = filters;

  /* Unmounting, abort the previous request */
  return () => {
   abortControllerRef.current.abort();
  };
  // eslint-disable-next-line
 }, [page, query, filters.length, filters, isError]);

 return { results, isError, error, hasNextPage };
};

export default useCards;
