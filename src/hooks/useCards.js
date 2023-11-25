import { useState, useEffect } from "react";
import { getAllCardsPage } from "../services/requests";

const useCards = (page = 1) => {
 const [results, setResults] = useState([]);
 const [isLoading, setLoading] = useState(false);
 const [isError, setIsError] = useState(false);
 const [error, setError] = useState([]);
 const [hasNextPage, setHasNextPage] = useState(false);

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

  getAllCardsPage(page, 10, { signal })
   .then((data) => {
    setResults((prev) => [...prev, ...data]); // Concatenating the previous results with the new ones
    setHasNextPage(Boolean(data.length)); // Recall : 0 is false
    setLoading(false);
   })
   .catch((error) => {
    setIsError(true);
    if (signal.aborted) return; // If the request is aborted, don't update the state bc error created on purpose
    setError(error);
    setLoading(false);
   });

  return () => abortController.abort(); // Cancel the request when the component is unmounting
 }, [page]);

 return { results, isLoading, isError, error, hasNextPage };
};

export default useCards;
