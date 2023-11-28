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

 useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  //   console.log("USECARD filter = ", filters);
  dispatch(setLoading(true));
  setIsError(false);
  setError({});

  /* ***** */
  //   console.log("lastqury", lastQuery.current);
  //   console.log("query", query);
  //   console.log("filters.length ", filters.length);
  //   console.log("lastFilters.current ", lastFilter.current.length);
  const isNewQuery = compareArrays(lastQuery.current, query) ? false : true;
  const isNewFilter = filters.length !== lastFilter.current.length;
  if (isNewQuery || isNewFilter || (isNewQuery && isNewFilter)) {
   setResults([]);
   dispatch(resetPage());
  }
  getAllCardsPage(page, 50, query, filters, { signal })
   .then((data) => {
    // console.log("Fetched Data:", data.length);
    setHasNextPage(Boolean(data?.length)); // Recall : 0 is false
    if (query.length > 0 || filters.length > 0) {
     if (data.length < 50) setHasNextPage(false);
    }
    setResults((prev) => {
     const updatedResults = isNewQuery ? data : [...prev, ...data];
     const finalResults = getResultWithFilters(updatedResults, filters);
     return finalResults;
    });

    setLoading(false);
    dispatch(setLoading(false));
   })
   .catch((error) => {
    console.log("ici ?", error);
    setIsError(true);
    if (signal.aborted) return; // If the request is aborted, don't update the state bc error created on purpose
    setError(error);
    setLoading(false);
    dispatch(setLoading(false));
   });

  lastQuery.current = query;
  lastFilter.current = filters;

  //   return () => {
  //    abortController.abort();
  //   };
 }, [page, query, filters.length, filters, isError]);

 return { results, isError, error, hasNextPage };
};

export default useCards;
