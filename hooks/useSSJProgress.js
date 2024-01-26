import useSWR from "swr";
import { showProgress } from "@api/ssj/ssj";

const useSSJProgress = (workflowId) => {
  const { data, error } = useSWR(
    workflowId ? showProgress.key(workflowId) : null,
    () => showProgress.fetcher(workflowId)
  );

  return {
    assignedSteps: data?.data?.assigned_steps,
    progress: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSSJProgress;
