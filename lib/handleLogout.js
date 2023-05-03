import { deleteCookie } from "cookies-next";
import axios from "axios";

export function clearLoggedInState({req, res}) {
  let config = {};
  if (req && res) {
    config = {req, res}
  }
  console.log("deleting auth cookies now")
  deleteCookie("auth", config);
  deleteCookie("workflowId", config);
  deleteCookie("phase", config);
  console.log("removing axios global header");
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
