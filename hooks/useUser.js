import useSWR from "swr";
import jwt_decode from "jwt-decode";
import { getCookie } from "cookies-next";
import { showUser } from "@api/users";

// useUser is a custom hook for fetching the current user's data.
const useUser = () => {
  // Retrieve the auth token from cookies
  const token = getCookie("auth");
  // Check if the token is a valid JWT
  let userId;
  try {
    // Decode the token to get the user ID
    const decodedToken = jwt_decode(token);
    userId = decodedToken.sub;
  } catch (error) {
    // If the token is invalid, return an error and return early with default values
    console.error("Invalid token specified");
    return {
      user: null,
      isLoading: false,
      isError: true,
    };
  }
  // Use SWR to fetch the user's data
  const { data, error } = useSWR(showUser.key(userId), () =>
    showUser.fetcher(userId)
  );

  // Return the user's data, loading state, and error state
  return {
    user: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
