import useSWR from "swr";
import { showPersons } from "@api/people";

const usePersons = (filter) => {
  const { data, error } = useSWR(showPersons.key(filter), () =>
    showPersons.fetcher(filter)
  );

  // console.log({ data });

  return {
    people: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePersons;
//
