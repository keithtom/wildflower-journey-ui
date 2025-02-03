import useSWR from "swr";
import { showResources } from "@api/workflows";

const useResources = (workflowId) => {
  const { data, error } = useSWR(
    workflowId ? showResources.key(workflowId) : null,
    () => showResources.fetcher(workflowId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    resources: data?.data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useResources;
