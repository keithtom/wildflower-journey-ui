import useSWR from "swr";
import { showTeam } from "@api/ssj/teams";

const useTeam = (teamId) => {
  const { data, error } = useSWR(teamId ? showTeam.key(teamId) : null, () =>
    showTeam.fetcher(teamId)
  );
  return { team: data, isLoading: !error && !data, isError: error };
};

export default useTeam;
