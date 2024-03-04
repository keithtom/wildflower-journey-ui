import useSWR from "swr";
import { showStep } from "@api/workflow/definition/steps";

const useStep = (id) => {
  const { data, error } = useSWR(id ? showStep.key(id) : null, () =>
    showStep.fetcher(id)
  );

  // console.log({ data });
  // console.log({ error });
  return {
    step: data?.data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useStep;
