import authApi from "@api/auth";
import { useEffect } from "react";
import { useUserContext } from "../lib/useUserContext";
import Router from "next/router";

const Token = ({ query }) => {
  const { currentUser, setCurrentUser } = useUserContext();
  const { token, redirect } = query;
  let loggedIn = false;

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

          Router.push(redirect);
        })
        .catch((error) => {
          // if tokenAuth fails then
          Router.push("/login");
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
