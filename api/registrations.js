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

async function setPassword(password, passwordConfirmation){
  const response = await api.put("/signup", {
    user: {
        password: password,
        password_confirmation: passwordConfirmation,
    }
  });
  
  return response;
};

export default { setPassword };