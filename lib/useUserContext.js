import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import jwt_decode from "jwt-decode";
import baseUrl from "./utils/baseUrl";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const token = getCookie("auth");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (token) {
      let ignore = false;
      setCurrentUser(null);

      axios.defaults.headers.common["Authorization"] = token;
      const decoded = jwt_decode(token);

      axios.get(`${baseUrl}/v1/users/${decoded.sub}`).then((result) => {
        const userAttributes = result.data?.data?.attributes;
        const personId = result.data?.data?.relationships?.person?.data?.id;
        if (!!userAttributes && !ignore) {
          const user = {
            firstName: userAttributes.firstName,
            lastName: userAttributes.lastName,
            email: userAttributes.email,
            profileImage: `${baseUrl}/${userAttributes.imageUrl}`,
            id: personId,
            workflowId: userAttributes.workflowId,
          };
          setCurrentUser(user);
        }
      });
      return () => {
        ignore = true;
      };
    }
  }, [token]);

  const isLoggedIn = !!(token && currentUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
