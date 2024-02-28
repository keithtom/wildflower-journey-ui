import useSWR from "swr";
import { showMilestones } from "@api/workflow/definition/processes";

const useMilestones = () => {
  //Fetch the data using SWR
  const { data, error, isValidating } = useSWR(showMilestones.key(), () =>
    showMilestones.fetcher()
  );

  // Initialize data forms
  let milestonesByCategory = null;
  let milestonesByPhase = null;

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

  return {
    milestones: data,
    milestonesByCategory,
    milestonesByPhase,

    isLoading: !error && !data,
    isLoadingMilestonesByCategory: milestonesByCategory === null,
    isLoadingMilestonesByPhase: milestonesByPhase === null,

    isError: error,
    isValidating,
  };
};

export default useMilestones;
