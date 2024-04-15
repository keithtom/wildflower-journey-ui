import useSWR from "swr";
import { showTags } from "@api/tags";

// context = { context: 'categories' }
const useTags = (context) => {
  const { data, error } = useSWR(showTags.key(context), () =>
    showTags.fetcher(context)
  );

  return {
    tags: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTags;
