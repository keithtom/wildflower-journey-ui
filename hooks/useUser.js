import useSWR from "swr";
import jwt_decode from "jwt-decode";

import { showUser } from "@api/users";

const useUser = (token) => {
  if (!token) {
    return { user: null, isLoading: false, isError: false };
  }

  const config = { headers: { Authorization: token } };
  const decoded = jwt_decode(token);

  const { data, error } = useSWR(token ? showUser.key(decoded.sub) : null, () =>
    showUser.fetcher(decoded.sub, config)
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
