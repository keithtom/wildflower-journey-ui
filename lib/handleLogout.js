import { deleteCookie } from "cookies-next";
import axios from "axios";

export function clearLoggedInState( {req, res}) {
  deleteCookie("auth", {req, res});
  deleteCookie("workflowId", {req, res});
  deleteCookie("phase", {req, res});
  axios.defaults.headers["Authorization"] = null;
}

export function redirectLoginProps() {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}
