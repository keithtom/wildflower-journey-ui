import { createContext, useContext, useState } from "react";
import { getCookie } from 'cookies-next';
import axios from "axios";
import jwt_decode from 'jwt-decode';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

async function getUserInfo({ token }) {
  // const baseUrl = `http://localhost:3001`;
  // const baseUrl = `https://api.wildflowerschools.org1`;

  axios.defaults.headers.common['Authorization'] = token;
  const decoded = jwt_decode(token);
  try {
    const response = await axios.get(`${baseUrl}/v1/users/${decoded.sub}`);
    const userAttributes = response.data?.data?.attributes;
    if (!!userAttributes) {
      return {
        firstName: userAttributes.firstName,
        lastName: userAttributes.lastName,
        email: userAttributes.email,
        profileImage: userAttributes.imageUrl,
      }
    } else {
      return null;
    }
  } catch(err) {
    console.error(err);
    return null;
  }
}

export function UserProvider({ children }) {
  const token = getCookie('auth');
  let currentUser, setCurrentUser;

  if (token) {
    const user = getUserInfo({ token });
    [currentUser, setCurrentUser] = useState(user);
  } else {
    [currentUser, setCurrentUser] = useState(null);
  }

  const isLoggedIn = !!(token && currentUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
