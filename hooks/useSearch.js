import { useState, useEffect } from "react";
import searchApi from "@api/search";

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {


    if (query !== "") {
      // rate limiter
      const timeoutId = setTimeout(() => {
        // api call w/ query to update results
        const fetch = async () => {
          try {
            // add url params or attach params for query and data...
            const response = await searchApi.search(query);
            setResults(response.data.data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [query]);

  return { query, setQuery, results };
};

export default useSearch;
