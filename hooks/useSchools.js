import useSWR from "swr";
import { showSchools } from "@api/schools";

const useSchools = () => {
  const { data, error } = useSWR(showSchools.key(), () =>
    showSchools.fetcher()
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSchools;
