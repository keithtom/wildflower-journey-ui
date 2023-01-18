import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const session = {
    user: {
      currentUser: "Taylor Zanke",
      // ... TODO: other user data
    },
  };
  const [currentUser, setCurrentUser] = useState(session ? session.user : null);
  const isLoggedIn = !!(session && currentUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
