import useSWR from "swr";
import { showAssigned } from "@api/workflow/steps";

const useAssignedSteps = (workflowId) => {
  const { data, error } = useSWR(
    workflowId ? showAssigned.key(workflowId) : null,
    () => showAssigned.fetcher(workflowId)
  );
  console.log("workflowId in swr hook -------------------", workflowId);
  console.log("data in swr hook -------------------", data);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useAssignedSteps;
