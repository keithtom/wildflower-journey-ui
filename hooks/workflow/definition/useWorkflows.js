import useSWR from "swr";
import { showWorkflows } from "@api/workflow/definition/steps";

const useWorkflows = () => {
  //Fetch the data using SWR
  const { data, error, isValidating } = useSWR(showWorkflows.key(), () =>
    showWorkflows.fetcher()
  );

  // console.log({ data });
  // console.log({ error });

  return {
    workflows: data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  };
};

export default useWorkflows;
