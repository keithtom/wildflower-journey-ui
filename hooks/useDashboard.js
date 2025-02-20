import useSWR from "swr";
import { showDashboardProgress } from "@api/dashboard";

export const useDashboardProgress = (workflowId) => {
  const { data, error } = useSWR(
    workflowId ? showDashboardProgress.key(workflowId) : null,
    () => showDashboardProgress.fetcher(workflowId)
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useDashboardProgress;
