import useSWR from "swr";
import { showAllTeams } from "@api/ssj/teams";

const useAllTeams = () => {
  const { data, error } = useSWR(showAllTeams.key(), () =>
    showAllTeams.fetcher()
  );

  return {
    teams: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useAllTeams;
