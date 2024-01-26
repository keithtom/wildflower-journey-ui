import useSWR from "swr";
import { showAssigned } from "@api/workflow/steps";

const useAssignedSteps = (workflowId) => {
  const { data, error } = useSWR(
    workflowId ? showAssigned.key(workflowId) : null,
    () => showAssigned.fetcher(workflowId)
  );

  return {
    assignedSteps: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useAssignedSteps;
