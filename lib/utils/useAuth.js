import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "@lib/useUserContext";

const useAuth = (redirectUrl) => {
  const router = useRouter();
  const { isLoggedIn } = useUserContext(); // Assuming you have a context for user authentication

  console.log({ isLoggedIn });

  useEffect(() => {
    // Check if the user is not logged in and should be redirected
    if (!isLoggedIn && redirectUrl && router.asPath !== redirectUrl) {
      router.push(redirectUrl);
    }
  }, [isLoggedIn, redirectUrl, router.asPath]);
};

export default useAuth;
