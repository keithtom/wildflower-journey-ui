import useSWR from "swr";
import { showSchoolRelationship } from "@api/school_relationships";

const useSchoolRelationship = (schoolRelationshipId) => {
  const { data, error } = useSWR(
    schoolRelationshipId
      ? showSchoolRelationship.key(schoolRelationshipId)
      : null,
    () => showSchoolRelationship.fetcher(schoolRelationshipId)
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSchoolRelationship;
