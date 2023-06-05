import usersApi from "../api/users";
import { useEffect } from "react";
import { useUserContext } from "../lib/useUserContext";
import Router from "next/router";

const Token = ({query}) => {
  const { currentUser, setCurrentUser } = useUserContext();
  const { token, redirect } = query;
  let loggedIn = false;
  
  useEffect(() => {
    // Example link: https://platform.wildflowerschools.org/token?token=&redirect=https%3A%2F%2Fplatform.wildflowerschools.org%2Fwelcome%2Fexisting-tl    
    if (!loggedIn) {
      loggedIn = true; // prevent useEffect from firing twice https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
      usersApi
        .tokenAuth(token, redirect)
        .then((response) => {
          const user = response.data.data;
          setCurrentUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.imageUrl,
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

  return (
    <>
    </>
  )  
}

export default Token;

export async function getServerSideProps({ query }) {
  
  return {
    props: {
      query,
    },
  };
}
