import { useMemo } from "react";
import useWorkflows from "./useWorkflows";

const useSelectedWorkflow = (workflowIds, isOpen) => {
  const { workflows, isLoading, isError } = useWorkflows(workflowIds);

  const selectedWorkflow = useMemo(() => {
    if (!workflows?.length) return null;

    // Find workflow where recurring matches isOpen
    const matchingWorkflow = workflows.find(
      (workflow) => workflow?.data?.data?.attributes?.recurring === isOpen
    );

    return matchingWorkflow?.data?.data || null;
  }, [workflows, isOpen]);

  return {
    selectedWorkflow,
    isLoading,
    isError,
  };
};

export default useSelectedWorkflow;
