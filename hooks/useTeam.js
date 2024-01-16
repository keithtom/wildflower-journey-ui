import useSWR from "swr";
import { showTeam } from "@api/ssj/teams";

const useTeam = (teamId, config) => {
  const { data, error } = useSWR(teamId ? showTeam.key(teamId) : null, () =>
    showTeam.fetcher(teamId, config)
  );
  return { data, isLoading: !error && !data, isError: error };
};

export default useTeam;
