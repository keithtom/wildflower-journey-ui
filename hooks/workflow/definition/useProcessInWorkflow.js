import useSWR from "swr";
import { showProcessInWorkflow } from "@api/workflow/definition/workflows";

const useProcessInWorkflow = (workflowId, processId) => {
  const { data, error } = useSWR(
    workflowId && processId
      ? showProcessInWorkflow.key(workflowId, processId)
      : null,
    () => showProcessInWorkflow.fetcher(workflowId, processId),
    { revalidateOnFocus: false }
  );

  return {
    processInWorkflow: data?.data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProcessInWorkflow;
