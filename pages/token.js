import authApi from "@api/auth";
import { useEffect } from "react";
import { useUserContext } from "../lib/useUserContext";
import { useRouter } from "next/router";
import RedirectUser from "@lib/redirectUser";

const Token = ({ query }) => {
  const { setCurrentUser } = useUserContext();
  const { token, redirect } = query;
  let loggedIn = false;
  const router = useRouter();

  useEffect(() => {
    // Example link: https://platform.wildflowerschools.org/token?token=&redirect=https%3A%2F%2Fplatform.wildflowerschools.org%2Fwelcome%2Fexisting-tl
    if (!loggedIn) {
      loggedIn = true; // prevent useEffect from firing twice https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
      authApi
        .tokenAuth(token, redirect)
        .then((response) => {
          const userAttributes = response.data.data.attributes;
          const personId = response.data.data.relationships.person.data.id;

          setCurrentUser({
            id: personId,
            type: response.data.data.type,
            attributes: userAttributes,
          });

          //construct the relevant data to redirect based on
          const personRoleList = response.data?.included?.find((a) => {
            return a.id === personId;
          })?.attributes?.roleList;
          const personIsOnboarded = response.data?.included?.find((a) => {
            return a.id === personId;
          })?.attributes?.isOnboarded;

          RedirectUser({
            router: router,
            roleList: personRoleList,
            isOnboarded: personIsOnboarded,
          });
        })
        .catch((error) => {
          // if tokenAuth fails then
          router.push("/login");
          alert(error.message);
        });
    }
  }, []);

  return <></>;
};

export default Token;

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}
