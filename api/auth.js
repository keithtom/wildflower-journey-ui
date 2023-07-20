import axios from "axios";
import { setCookie } from "cookies-next";

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

async function login(email, password) {
  let response;
  try {
    response = await api.post(`/login`, {
      user: {
        email: email,
        password: password,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return response;
}

async function tokenAuth(token) {
  const response = await api.post(`/login?auth_token=${token}`, {
    token: token,
  });
  setCookie("auth", response.headers["authorization"], {
    maxAge: 60 * 60 * 24 * 30,
  });
  const userAttributes = response.data.data.attributes;

  if (userAttributes.ssj) {
    setCookie("workflowId", userAttributes.ssj.workflowId, {
      maxAge: 60 * 60 * 24 * 30,
    });
    setCookie("phase", userAttributes.ssj.currentPhase, {
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

async function loginEmailLink(email) {
  const response = await api.post(`/users/email_login`, {
    email: email,
  });
  const result = await response.json;
  return result;
}

export default { tokenAuth, loginEmailLink, login };
