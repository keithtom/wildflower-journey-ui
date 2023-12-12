import { deleteCookie } from "cookies-next";
import axios from "axios";

export function clearLoggedInState({ req = null, res = null }) {
  let config = {};
  if (req && res) {
    config = { req, res };
  }
  deleteCookie("auth", config);
  deleteCookie("workflowId", config);
  deleteCookie("phase", config);
  deleteCookie("isOg", config);
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
