import { useState, useEffect } from "react";
import search from "../api/search";

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
            // reusable for multiple searches...
            // add url params or attach params for query and data...
            const response = await search.get(`?search%5Bq%5D=${query}`);
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
