import useSWR from "swr";
import { showPerson } from "@api/people";

const usePerson = (personId, params) => {
  const { data, error } = useSWR(
    personId ? showPerson.key(personId, params) : null,
    () => showPerson.fetcher(personId, params)
  );

  console.log({ data });

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePerson;
