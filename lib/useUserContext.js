import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import jwt_decode from "jwt-decode";

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

      axios.defaults.headers.common["Authorization"] = token;
      const decoded = jwt_decode(token);

      axios
        .get(`${process.env.API_URL}/v1/users/${decoded.sub}`)
        .then((result) => {
          const type = result.data?.data?.type;
          const userAttributes = result.data?.data?.attributes;
          const personId = result.data?.data?.relationships?.person?.data?.id;
          if (!!userAttributes && !ignore) {
            const user = {
              id: personId,
              type: type,
              attributes: userAttributes,
            };
            setCurrentUser(user);
          }
        });
      return () => {
        ignore = true;
      };
    }
    else {
      alert("no token, shoudl log you out")
    }
  }, [token]);

  const isLoggedIn = !!(token && currentUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
