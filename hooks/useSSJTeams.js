import useSWR from "swr";
import { showAllSSJTeams } from "@api/ssj/teams";

const useSSJTeams = () => {
  const { data, error } = useSWR(showAllSSJTeams.key(), () =>
    showAllSSJTeams.fetcher()
  );
  return {
    teams: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSSJTeams;
