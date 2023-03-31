import axios from "axios";
import apiUrl from "@lib/utils/baseUrl";
import { setCookie } from "cookies-next";

const api = axios.create({
  baseURL: `${apiUrl}/users`,
  timeout: 3000,
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

async function token(token, redirectUrl){
  const tokenApi = await api.post(`/token`, {
    token: token,
  });
  const response = await tokenApi;
  
  setCookie("auth", response.headers["authorization"], {
    maxAge: 60 * 60 * 24,
  });
  return response;

};

export default { token };