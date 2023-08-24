import { useState, useEffect } from "react";
import searchApi from "@api/search";
import useSWR from "swr";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);

  // cache for query and params.  use SWR for duplicate queries later.
  // const { data, error, isLoading } = useSWR(`/api/search`, () => peopleApi.show(personId).then(res => res.data))

  useEffect(() => {
    // rate limiter
    const timeoutId = setTimeout(() => {
      // api call w/ query to update results
      const fetch = async () => {
        // add url params or attach params for query and data...
        setIsSearching(true);
        searchApi
          .search(query, filters)
          .then((res) => {
            setIsSearching(false);
            setResults(res.data.data);
          })
          .catch((err) => {
            setIsSearching(false);
            setError(err);
          });
      };
      fetch();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [query, filters]);

  return { query, setQuery, filters, setFilters, results, isSearching, error };
};

export default useSearch;
