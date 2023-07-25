import authApi from "@api/auth";
import { useEffect } from "react";
import { useUserContext } from "../lib/useUserContext";
import Router from "next/router";

const Token = ({ query }) => {
  const { currentUser, setCurrentUser } = useUserContext();
  const { token, redirect } = query;
  let loggedIn = false;

  const softLaunchDirectoryUsers = [
    "rachel.kimboko@dcwildflowerpcs.org",
    "brandon.royce-diop@wildflowerschools.org",
    "latania@blazingstarsmontessori.org",
    "alejandra@thedahliaschoolsf.org",
    "maggie@wildflowerschools.org",
    "taylor@littleuniverse.com",
    "katelyn.shore@wildflowerschools.org",
    "li.ouyang@wildflowerschools.org",
  ];

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

          if (
            !user.attributes.ssj &&
            softLaunchDirectoryUsers.includes(user.attributes.email)
          ) {
            Router.push("/welcome/existing-member");
          } else {
            Router.push(redirect);
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
