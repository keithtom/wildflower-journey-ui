import useSWR from "swr";
import { showSchoolRelationships } from "@api/school_relationships";

const useSchoolRelationships = () => {
  const { data, error } = useSWR(
    schoolRelationshipId ? showSchoolRelationships.key() : null,
    () => showSchoolRelationships.fetcher()
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSchoolRelationships;
