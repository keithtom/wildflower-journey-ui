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

  const milestonesByCategory = [];

  if (data && data.data) {
    data.data.forEach((milestone) => {
      const categories = milestone.attributes.categories;
      if (categories && categories.length > 0) {
        categories.forEach((category) => {
          const existingCategory = milestonesByCategory.find(
            (item) => item.category === category
          );
          if (existingCategory) {
            existingCategory.milestones.push(milestone);
          } else {
            milestonesByCategory.push({ category, milestones: [milestone] });
          }
        });
      }
    });
  }

  const milestonesByPhase = [];

  if (data && data.data) {
    data.data.forEach((milestone) => {
      const phase = milestone.attributes.phase;
      if (phase) {
        const capitalizedPhase = phase.charAt(0).toUpperCase() + phase.slice(1);
        const existingPhase = milestonesByPhase.find(
          (item) => item.phase === capitalizedPhase
        );
        if (existingPhase) {
          existingPhase.milestones.push(milestone);
        } else {
          milestonesByPhase.push({
            phase: capitalizedPhase,
            milestones: [milestone],
          });
        }
      }
    });
  }

  return {
    milestones: data,
    milestonesToDo,
    milestonesByCategory,
    categoryMilestonesLoading: !milestonesByCategory,
    milestonesByPhase,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMilestonesForPhase;
