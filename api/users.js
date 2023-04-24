import axios from "axios";
import apiUrl from "@lib/utils/baseUrl";
import { setCookie } from "cookies-next";

const api = axios.create({
  baseURL: `${apiUrl}`,
  timeout: 30000,
  mode: "no-cors",
  headers: {
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    "Content-Type": "application/json",
  },
});

// perhaps part of id.wildflowerschools.org?
// login / logout

// show
// update

async function tokenAuth(token, redirectUrl){
  const response = await api.post(`/login?auth_token=${token}`, {
    token: token,
  });
  setCookie("auth", response.headers["authorization"], {
    maxAge: 60 * 60 * 24 * 30,
  });
  
  return response;
};

async function loginEmailLink(email) {
  const response = await api.post(`/users/email_login`, {
    email: email,
  });
  const result = await response.json;
  return result;
}

export default { tokenAuth, loginEmailLink };