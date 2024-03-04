import useSWR from "swr";
import { showMilestone } from "@api/workflow/definition/processes";

const useMilestone = (id) => {
  const { data, error } = useSWR(id ? showMilestone.key(id) : null, () =>
    showMilestone.fetcher(id)
  );

  // console.log({ data });
  // console.log({ error });
  return {
    milestone: data?.data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMilestone;
