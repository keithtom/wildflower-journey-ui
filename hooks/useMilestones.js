import useSWR from "swr";
import { showMilestones } from "@api/workflow/processes";

const useMilestones = (workflowId, params) => {
  //Fetch the data using SWR
  const { data, error } = useSWR(
    workflowId ? showMilestones.key(workflowId, params) : null,
    () => showMilestones.fetcher(workflowId, params)
  );

  // Initialize data forms
  let milestonesToDo = null;
  let milestonesByCategory = null;
  let milestonesByPhase = null;
  let milestonesByCurrentPhase = null;

  // Transform the data into what is needed
  if (data && data.data.data) {
    milestonesToDo = [];
    data.data.data.forEach((milestone) => {
      if (milestone.attributes.status === "to do") {
        milestonesToDo.push(milestone);
      }
    });
  }

  if (data && data.data.data) {
    milestonesByCategory = [];
    data.data.data.forEach((milestone) => {
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

  if (data && data.data.data) {
    milestonesByPhase = [];
    data.data.data.forEach((milestone) => {
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

  if (data && data.data.data) {
    milestonesByCurrentPhase = {};
    data.data.data.forEach((milestone) => {
      const status = milestone.attributes.status;
      const phase = milestone.attributes.phase;
      if (status && phase && phase === params?.phase) {
        const key = status.replace(/\s+/g, "_"); // Replace spaces with underscores
        if (!milestonesByCurrentPhase[key]) {
          milestonesByCurrentPhase[key] = [];
        }
        milestonesByCurrentPhase[key].push(milestone);
      }
    });
  }

  return {
    milestones: data,
    milestonesToDo,
    milestonesByCategory,
    milestonesByPhase,
    milestonesByCurrentPhase,

    isLoading: !error && !data,
    isLoadingMilestonesToDo: milestonesToDo === null,
    isLoadingMilestonesByCategory: milestonesByCategory === null,
    isLoadingMilestonesByPhase: milestonesByPhase === null,
    isLoadingMilestonesByCurrentPhase: milestonesByCurrentPhase === null,

    isError: error,
  };
};

export default useMilestones;
