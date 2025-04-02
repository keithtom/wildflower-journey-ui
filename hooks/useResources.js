import useSWR from "swr";
import { showResources } from "@api/workflows";

const useResources = (workflowId, params = {}) => {
  const { data, error } = useSWR(
    workflowId ? showResources.key(workflowId, params) : null,
    () => showResources.fetcher(workflowId, params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    // account for slightly different shape
    resources: params.phase ? data?.data?.resources : data?.data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useResources;
