import useSWR from "swr";
import { showAssigned } from "@api/workflow/steps";

const useAssignedStepsCount = (workflowIds, params) => {
  const workflowArray = Array.isArray(workflowIds) ? workflowIds : [];

  // Use a single SWR hook with all workflowIds as the key
  const { data, error } = useSWR(
    workflowArray.length ? ["assignedStepsCount", ...workflowArray] : null,
    async () => {
      // Fetch data for all workflows in parallel
      const results = await Promise.all(
        workflowArray.map((workflowId) =>
          showAssigned.fetcher(workflowId, params)
        )
      );

      // Count total steps across all workflows
      const totalSteps = results.reduce(
        (sum, result) => sum + (result?.data?.length || 0),
        0
      );

      return totalSteps;
    }
  );

  return {
    assignedSteps: data || 0,
    isLoading: !error && data === undefined,
    isError: error,
  };
};

export default useAssignedStepsCount;
