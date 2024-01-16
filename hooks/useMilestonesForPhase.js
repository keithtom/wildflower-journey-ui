import useSWR from "swr";
import { showMilestonesForPhase } from "@api/workflow/processes";

const useMilestonesForPhase = (workflowId, params) => {
  const { data, error } = useSWR(
    workflowId ? showMilestonesForPhase.key(workflowId, params) : null,
    () => showMilestonesForPhase.fetcher(workflowId, params)
  );

  const milestonesToDo = [];

  if (data && data.data) {
    data.data.forEach((milestone) => {
      if (milestone.attributes.status === "to do") {
        milestonesToDo.push(milestone);
      }
    });
  }

  return {
    milestones: data,
    milestonesToDo,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMilestonesForPhase;
