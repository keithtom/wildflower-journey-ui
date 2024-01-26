import useSWR from "swr";
import { showSchool } from "@api/schools";

const useSchool = (schoolId, params) => {
  const { data, error } = useSWR(
    schoolId ? showSchool.key(schoolId, params) : null,
    () => showSchool.fetcher(schoolId, params)
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSchool;
