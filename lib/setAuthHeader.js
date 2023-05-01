import { getCookie } from 'cookies-next';
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function setAuthHeader({req, res, apiSetAuthHeaderFuncs = []}) {
  const token = getCookie('auth', { req, res });
  console.log("setAuthHeader: token decoded", jwt_decode(token).sub)
  if (token !== undefined) {
    console.log("setting token globally in axios");
    axios.defaults.headers.common['Authorization'] = token;
    apiSetAuthHeaderFuncs.forEach((func) => {
        console.log("setting token in axios instance");
        func(token);
    });
  } else {
    console.log("no token to be set");
    // TODO: should we redirect to login page?
  }
}