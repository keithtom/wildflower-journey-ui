import useSWR from "swr";
import { showAssigned } from "@api/workflow/steps";

const useAssignedSteps = (workflowId, params) => {
  const { data, error } = useSWR(
    workflowId ? showAssigned.key(workflowId, params) : null,
    () => showAssigned.fetcher(workflowId, params)
  );

  return {
    assignedSteps: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useAssignedSteps;
