import { useState, useEffect } from "react";
import searchApi from "@api/search";
import useSWR from "swr";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(11);
  const [hasMore, setHasMore] = useState(false);
  const [noResults, setNoResults] = useState(true);

  // cache for query and params.  use SWR for duplicate queries later.
  // const { data, error, isLoading } = useSWR(`/api/search`, () => peopleApi.show(personId).then(res => res.data))

  useEffect(() => {
    // rate limiter
    const timeoutId = setTimeout(() => {
      // api call w/ query to update results
      const fetch = async () => {
        // add url params or attach params for query and data...

        setIsSearching(true);

        if (query && query !== "" && query !== "*") {
          setResults([]);
          setCurrentPage(1);
          setIsSearching(true);
          setNoResults(false);
          setHasMore(false);
        }

        searchApi
          .search(query, filters, { page: currentPage, perPage })
          .then((res) => {
            const allResults = res.data.data;
            const displayPerPage = perPage - 1;
            const displayedResults = allResults.slice(0, perPage);
            if (allResults.length === 0) {
              setNoResults(true);
              setHasMore(false);
            } else {
              if (allResults.length > displayPerPage) {
                setResults((prevResults) => {
                  const newResults = displayedResults.filter(
                    //don't show duplicate results
                    (newResult) =>
                      !prevResults.some(
                        (prevResult) => prevResult.id === newResult.id
                      )
                  );
                  return [...prevResults, ...newResults];
                });
                setTimeout(() => {
                  setHasMore(true);
                }, 250);
              } else if (allResults.length <= displayPerPage) {
                setResults((prevResults) => {
                  const newResults = displayedResults.filter(
                    //don't show duplicate results
                    (newResult) =>
                      !prevResults.some(
                        (prevResult) => prevResult.id === newResult.id
                      )
                  );
                  return [...prevResults, ...newResults];
                });
                setHasMore(false);
              }
            }

            setIsSearching(false);
          })
          .catch((err) => {
            setIsSearching(false);
            setError(err);
          });
      };
      fetch();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [query, filters, currentPage, perPage]);

  useEffect(() => {
    setResults([]);
    setNoResults(false);
  }, [filters]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    setResults,
    isSearching,
    setIsSearching,
    error,
    currentPage,
    handlePageChange,
    hasMore,
    noResults,
    perPage,
  };
};

export default useSearch;
