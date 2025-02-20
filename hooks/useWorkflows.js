import useSWR from "swr";
import { showWorkflow } from "@api/workflows";

const useWorkflows = (workflowIds = []) => {
  // Create a cache key that includes all workflow IDs
  const cacheKey = workflowIds.length ? ["workflows", ...workflowIds] : null;

  // Fetch all workflows in parallel
  const { data, error } = useSWR(cacheKey, async () => {
    if (!workflowIds.length) return [];

    const results = await Promise.all(
      workflowIds.map((id) => showWorkflow.fetcher(id))
    );
    return results;
  });

  return {
    workflows: data || [],
    isLoading: !error && !data,
    error,
  };
};

export default useWorkflows;
