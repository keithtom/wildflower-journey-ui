import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: `${process.env.API_URL}`,
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

async function setPassword(password, passwordConfirmation) {
  const response = await api.put(
    "/signup",
    {
      user: {
        password: password,
        password_confirmation: passwordConfirmation,
      },
    },
    getAuthHeader()
  );

  return response;
}

async function logout() {
  return await api.delete("/logout", getAuthHeader());
}

// api is instantiated by the Header before a user is logged in. Therefore, cannot set the auth header on instantiation.
function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

export default { setPassword, logout };
