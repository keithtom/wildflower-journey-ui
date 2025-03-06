import useSWR from "swr";
import { showSchools } from "@api/schools";

const useSchools = (params = {}) => {
  const { data, error } = useSWR(showSchools.key(params), () =>
    showSchools.fetcher(params)
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSchools;
