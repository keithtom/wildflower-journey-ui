import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { Reactrouter } from "styled-icons/simple-icons";

const useAuth = (redirectUrl) => {
  const router = useRouter();
  const token = getCookie("auth"); // a user can be loggedIn if they have a token. isLoggedIn might not be set yet because it is updated asynchornously

  useEffect(() => {
    // Check if the user is not logged in and should be redirected
    if (token == undefined && redirectUrl && router.asPath !== redirectUrl) {
      router.push(redirectUrl);
    }
  }, [token, redirectUrl, router.asPath]);
};

export default useAuth;
