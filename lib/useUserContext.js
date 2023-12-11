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
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  useEffect(() => {
    // console.log("checking for user");
    if (token && !pagesWithNoUserRequired.includes(router.asPath)) {
      let ignore = false;
      setCurrentUser(null);

      // setting global header for all axios requests on the CLIENT SIDE ONLY
      // token will not be leaked to another user's requests
      axios.defaults.headers.common["Authorization"] = token;
      const config = { headers: { Authorization: token } };
      const decoded = jwt_decode(token);

      usersApi
        .show(decoded.sub, config)
        .then((result) => {
          const type = result.data?.data?.type;
          const userAttributes = result.data?.data?.attributes;
          const personId = result.data?.data?.relationships?.person?.data?.id;
          const personAddress = result.data?.included?.find((a) => {
            return a.type === "address";
          })?.attributes;
          const personRoleList = result.data?.included?.find((a) => {
            return a.id === personId;
          })?.attributes?.roleList;
          const personIsOnboarded = result.data?.included?.find((a) => {
            return a.id === personId;
          })?.attributes?.isOnboarded;

          if (!!userAttributes && !ignore) {
            const user = {
              id: personId,
              type: type,
              attributes: userAttributes,
              personAddress: personAddress,
              personRoleList: personRoleList,
              personIsOnboarded: personIsOnboarded,
            };
            setCurrentUser(user);
            setIsAdmin(user?.attributes?.isAdmin);
            console.log({ result });
          }
          console.log("highlight.io identifer", userAttributes.id);
          H.identify(userAttributes.email, {
            userId: result.data?.data?.id,
            firstName: userAttributes.firstName,
            lastName: userAttributes.lastName,
          });
        })
        .catch((error) => {
          // TODO: catch error. Should not
          console.log(error);
          console.error(error);
          clearLoggedInState({});

          router.push("/login");
        });
      return () => {
        ignore = true;
      };
    } else {
    }
  }, [token]);

  const isLoggedIn = !!(token && currentUser);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, isAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
}
