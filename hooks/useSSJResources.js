import useSWR from "swr";
import { showResources } from "@api/ssj/ssj";

const useSSJResources = (workflowId) => {
  const { data, error } = useSWR(
    workflowId ? showResources.key(workflowId) : null,
    () => showResources.fetcher(workflowId)
  );
  return {
    resources: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSSJResources;
