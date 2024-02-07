import wildflowerApi from "@api/base";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { getCookie } from "cookies-next";

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

const api = axios.create({
  baseURL: `${process.env.API_URL}/v1/users`,
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

// DEPRECATED for showUser
async function show(id, config) {
  let response;
  try {
    response = await api.get(`/${id}`, config);
  } catch (error) {
    return Promise.reject(error);
  }

  return response;
}
export const showUser = {
  key: (userId) => `/v1/users/${userId}`,
  fetcher: (userId) => {
    const config = getAuthHeader();
    return api
      .get(`/${userId}`, config)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export default { show };
