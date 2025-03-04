import useSWR from "swr";
import { showSchools } from "@api/schools";

const useSchools = (params) => {
  const { data, error } = useSWR(
    // Only make the request if params.person_id exists (which comes from currentUser.id)
    params?.person_id || params?.status ? showSchools.key(params) : null,
    () => showSchools.fetcher(params)
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSchools;
