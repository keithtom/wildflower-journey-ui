import useSWR from "swr";
import { showStep } from "@api/workflow/definition/steps";

const useStep = (processId, stepId) => {
  const { data, error } = useSWR(
    processId && stepId ? showStep.key(processId, stepId) : null,
    () => showStep.fetcher(processId, stepId),
    {
      revalidateOnFocus: false,
    }
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
