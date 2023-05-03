import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { H } from 'highlight.run';
import { clearLoggedInState } from "./handleLogout";
import { Router } from "next/router";
// import { useRouter } from "next/router";

// const router = useRouter();
const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const token = getCookie("auth");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      let ignore = false;
      setCurrentUser(null);

      // setting global header for all axios requests on the CLIENT SIDE ONLY
      // token will not be leaked to another user's requests
      axios.defaults.headers.common["Authorization"] = token;
      const decoded = jwt_decode(token);

      axios
        .get(`${process.env.API_URL}/v1/users/${decoded.sub}`)
        .then((result) => {
          const type = result.data?.data?.type;
          const userAttributes = result.data?.data?.attributes;
          const personId = result.data?.data?.relationships?.person?.data?.id;
          const personAddress = result.data?.included?.find((a) => {
            return a.type === "address";
          })?.attributes;
          if (!!userAttributes && !ignore) {
            const user = {
              id: personId,
              type: type,
              attributes: userAttributes,
              personAddress: personAddress,
            };
            setCurrentUser(user);
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
          console.log(error)
          console.error(error);
          console.log("deleting cookies");
          clearLoggedInState();

          Router.push("/login");
        });
      return () => {
        ignore = true;
      };
    } else {
    }
  }, [token]);

  const isLoggedIn = !!(token && currentUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
