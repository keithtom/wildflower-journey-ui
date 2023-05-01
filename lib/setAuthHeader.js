import { getCookie } from 'cookies-next';
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function setAuthHeader({req, res}) {
  const token = getCookie('auth', { req, res });
  console.log("setAuthHeader: token decoded", jwt_decode(token).sub)
  if (token !== undefined) {
    console.log("setting token");
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    console.log("no token to be set");
    // TODO: should we redirect to login page?
  }

}