import useSWR from "swr";
import { showWorkflow } from "@api/workflows";

const useWorkflow = (workflowId) => {
  const { data, error } = useSWR(
    workflowId ? showWorkflow.key(workflowId) : null,
    () => showWorkflow.fetcher(workflowId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    workflow: data?.data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useWorkflow;
