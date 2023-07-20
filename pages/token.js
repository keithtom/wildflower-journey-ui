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
          const user = response.data.data;
          setCurrentUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.imageUrl,
          });
          console.log({ user });

          if (!user.attributes.ssj) {
            if (!user.attributes.firstName && !user.attributes.lastName) {
              Router.push("/welcome/existing-member");
            } else {
              Router.push(redirect);
            }
          } else {
            if (!user.attributes.firstName && !user.attributes.lastName) {
              Router.push("/welcome/new-etl");
            } else {
              Router.push(redirect);
            }
          }
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
