import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { clearLoggedInState } from "./handleLogout";
import { useRouter } from "next/router";
import useSWR from "swr";
import usersApi from "@api/users";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

const pagesWithNoUserRequired = ["/logged-out"];

export function UserProvider({ children }) {
  const token = getCookie("auth");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOperationsGuide, setIsOperationsGuide] = useState(false);
  const router = useRouter();
  const ldClient = useLDClient();

  const { data: userData, error } = useSWR(
    token && !pagesWithNoUserRequired.includes(router.asPath)
      ? ["user", token]
      : null,
    async ([_, token]) => {
      const decoded = jwt_decode(token);
      const config = { headers: { Authorization: token } };
      const result = await usersApi.show(decoded.sub, config);

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
      const includedPersonBasic = result.data?.included?.filter(
        (a) => a.id === personId
      );
      const opsGuide = includedPersonBasic[0].attributes["isOg?"];

      return {
        user: {
          id: personId,
          type: type,
          attributes: userAttributes,
          personAddress: personAddress,
          personRoleList: personRoleList,
          personIsOnboarded: personIsOnboarded,
        },
        isAdmin: userAttributes?.isAdmin,
        isOperationsGuide: opsGuide,
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData.user);
      setIsAdmin(userData.isAdmin);
      setIsOperationsGuide(userData.isOperationsGuide);

      // Identify user to LaunchDarkly
      if (ldClient && userData.user?.attributes?.email) {
        ldClient.identify({
          key: userData.user.id,
          email: userData.user.attributes.email,
          firstName: userData.user.attributes.firstName,
          lastName: userData.user.attributes.lastName,
        });
      }
    }
  }, [userData, ldClient]);

  useEffect(() => {
    if (error) {
      console.error(error);
      clearLoggedInState({});
      router.push("/login");
    }
  }, [error]);

  const isLoggedIn = !!(token && currentUser);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        isAdmin,
        isOperationsGuide,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
