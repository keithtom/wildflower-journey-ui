import useSWR from "swr";
import { showWorkflow } from "@api/workflow/definition/workflows";

const useWorkflow = (id) => {
  const { data, error } = useSWR(
    id ? showWorkflow.key(id) : null,
    () => showWorkflow.fetcher(id),
    { revalidateOnFocus: false }
  );

  // console.log({ data });
  // console.log({ error });
  return {
    workflow: data?.data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useWorkflow;
