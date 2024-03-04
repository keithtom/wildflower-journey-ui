import useSWR from "swr";
import { showSteps } from "@api/workflow/definition/steps";

const useSteps = () => {
  //Fetch the data using SWR
  const { data, error, isValidating } = useSWR(showSteps.key(), () =>
    showSteps.fetcher()
  );

  // console.log({ data });
  // console.log({ error });

  return {
    steps: data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  };
};

export default useSteps;
