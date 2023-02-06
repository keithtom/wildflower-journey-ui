import loginSuccessful from "@lib/authentication";
import Router from "next/router";

export async function getServerSideProps({ params, req, res }) {
    const apiRoute = `${baseUrl}/users/session/token?token=${params.token}`;
  
    const response = await axios.post(apiRoute);
    await response
    console.log("trying to login");
    loginSuccessful(response);
    Router.push("/welcome")
    const data = response.data;
  
    return {
      props: {
        data,
      },
    };
  }