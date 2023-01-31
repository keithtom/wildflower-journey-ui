import { getCookie } from 'cookies-next';
import axios from "axios";

export default function setAuthHeader({req, res}) {
  const token = getCookie('auth', { req, res });
  if (token !== undefined) {
    console.log("setting token");
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    console.log("no token to be set");
    // TODO: should we redirect to login page?
  }

}