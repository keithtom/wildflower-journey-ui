import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { H } from "highlight.run";
import { clearLoggedInState } from "./handleLogout";
// import { Router } from "next/router";
import { useRouter } from "next/router";
import usersApi from "@api/users";

// const router = useRouter();
const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

const pagesWithNoUserRequired = ["/logged-out"];

export function UserProvider({ children }) {
  const token = getCookie("auth");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize isLoggedIn state

  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      if (!token || pagesWithNoUserRequired.includes(router.asPath)) {
        setLoading(false);

        return;
      }

      try {
        axios.defaults.headers.common["Authorization"] = token;

        const config = { headers: { Authorization: token } };
        const decoded = jwt_decode(token);
        const response = await usersApi.show(decoded.sub, config);

        const type = response.data?.data?.type;
        const userAttributes = response.data?.data?.attributes;
        const personId = response.data?.data?.relationships?.person?.data?.id;
        const personAddress = response.data?.included?.find(
          (a) => a.type === "address"
        )?.attributes;

        if (!!userAttributes) {
          const user = {
            id: personId,
            type: type,
            attributes: userAttributes,
            personAddress: personAddress,
          };
          setCurrentUser(user);
          setIsLoggedIn(true);
          H.identify(userAttributes.email, {
            userId: response.data?.data?.id,
            firstName: userAttributes.firstName,
            lastName: userAttributes.lastName,
          });
        }
      } catch (error) {
        console.error(error);
        clearLoggedInState({});
        setCurrentUser(null);
        setIsLoggedIn(false); // Set isLoggedIn to false when clearing state
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, router.asPath]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
