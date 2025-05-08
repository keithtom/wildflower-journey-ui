import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { H } from "highlight.run";
import { clearLoggedInState } from "./handleLogout";
import { useRouter } from "next/router";
import useSWR from "swr";
import usersApi from "@api/users";
import { TokenManager } from "@lib/utils/tokenManager";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

const pagesWithNoUserRequired = ["/logged-out"];

export function UserProvider({ children }) {
  const token = TokenManager.getToken();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOperationsGuide, setIsOperationsGuide] = useState(false);
  const router = useRouter();

  // Add token monitoring
  useEffect(() => {
    if (token) {
      const checkToken = () => {
        const isValid = TokenManager.isTokenValid(token);
        if (!isValid) {
          H.error(new Error("UserContext: Token invalid"), {
            tags: { type: "user_context" },
            severity: "warning",
            currentPath: router.asPath,
          });
          clearLoggedInState({});
          router.push("/login");
        }
      };

      // Check immediately
      checkToken();

      // Set up interval to check token every minute
      const interval = setInterval(checkToken, 60000);
      return () => clearInterval(interval);
    }
  }, [token, router]);

  const { data: userData, error } = useSWR(
    token && !pagesWithNoUserRequired.includes(router.asPath)
      ? ["user", token]
      : null,
    async ([_, token]) => {
      try {
        const decoded = jwt_decode(token);
        const config = { headers: { Authorization: token } };
        const result = await usersApi.show(decoded.sub, config);

        H.track("user_data_fetch", {
          tags: { type: "user_context" },
          userId: decoded.sub,
          timestamp: new Date().toISOString(),
        });

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
      } catch (error) {
        H.error(error, {
          tags: { type: "user_data_fetch" },
          severity: "error",
          status: error.response?.status,
        });
        throw error;
      }
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

      if (userData.user?.attributes?.email) {
        H.identify(userData.user.attributes.email, {
          userId: userData.user.id,
          firstName: userData.user.attributes.firstName,
          lastName: userData.user.attributes.lastName,
        });
      }
    }
  }, [userData]);

  useEffect(() => {
    if (error) {
      H.error(error, {
        tags: { type: "user_context" },
        severity: "error",
      });
      clearLoggedInState({});
      router.push("/login");
    }
  }, [error, router]);

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
