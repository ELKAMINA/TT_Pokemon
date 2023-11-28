import { useState, useEffect, useRef } from "react";
import { getAllCardsPage } from "../services/requests";
import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import {
 selectSearchquery,
 selectFilters,
 selectPage,
 setFilters,
 setSearchquery,
 setLoading,
 resetPage,
 selectLoading,
} from "../redux/slices/pokemonSlice";
import { getResultWithFilters } from "../utils/resultWithFilters";
import { compareArrays } from "../utils/arrays";

const useCards = () => {
 const [results, setResults] = useState([]);
 //  const [isLoading, setLoading] = useState(false);
 const [isError, setIsError] = useState(false);
 const [error, setError] = useState([]);
 const [hasNextPage, setHasNextPage] = useState(false);
 const dispatch = useAppDispatch();

 const query = useAppSelector(selectSearchquery);
 const page = useAppSelector(selectPage);
 const lastQuery = useRef([]);
 const lastFilter = useRef([]);
 const filters = useAppSelector(selectFilters);
 const abortControllerRef = useRef(null);

 useEffect(() => {
  if (!abortControllerRef.current) {
   abortControllerRef.current = new AbortController();
  } else {
   abortControllerRef.current.abort();
   abortControllerRef.current = new AbortController();
  }
  const signal = abortControllerRef.current.signal;

  //   const abortController = new AbortController();
  //   const signal = abortController.signal;
  //   console.log("USECARD filter = ", filters);
  dispatch(setLoading(true));
  setIsError(false);
  setError({});
  console.log("ici 1 ");
  /* ***** */
  //   console.log("lastqury", lastQuery.current);
  //   console.log("query", query);
  //   console.log("filters.length ", filters.length);
  //   console.log("lastFilters.current ", lastFilter.current.length);
  const isNewQuery = compareArrays(lastQuery.current, query) ? false : true;
  const isNewFilter = filters.length !== lastFilter.current.length;
  console.log("ici 2 ");
  if (isNewQuery || isNewFilter || (isNewQuery && isNewFilter)) {
   setResults([]);
   dispatch(resetPage());
   console.log("ici 3 ");
  }
  getAllCardsPage(page, 50, query, filters, {
   signal: abortControllerRef.current.signal,
  })
   .then((data) => {
    console.log("ici 6 ");
    if (!signal.aborted) {
     setHasNextPage(Boolean(data?.length)); // Recall : 0 is false
     if (query.length > 0 || filters.length > 0) {
      console.log("ici 7 ");

      if (data?.length < 50) setHasNextPage(false);
     }
     setResults((prev) => {
      if (!prev) return;
      console.log("ici 8 ");

      const updatedResults = isNewQuery ? data : [...prev, ...data];
      console.log("finalResults", updatedResults);
      const finalResults = getResultWithFilters(updatedResults, filters);
      return finalResults;
     });

     setLoading(false);
     dispatch(setLoading(false));
    }
    // console.log("Fetched Data:", data.length);
   })
   .catch((error) => {
    console.log("ici ?", error);
    setIsError(true);
    setError(error);
    setLoading(false);
    dispatch(setLoading(false));
    if (error.name === "CanceledError" && signal.aborted) {
     setResults([]);
     dispatch(resetPage());
     dispatch(setLoading(true));
     setIsError(false);
     setError({});
     setHasNextPage(false);
     console.log("Fetch aborted");
     return; // Early return for aborted requests
    }
    // if (signal.aborted) return; // If the request is aborted, don't update the state bc error created on purpose
   });

  lastQuery.current = query;
  lastFilter.current = filters;

  return () => {
   abortControllerRef.current.abort();
  };
 }, [page, query, filters.length, filters, isError]);

 return { results, isError, error, hasNextPage };
};

export default useCards;
