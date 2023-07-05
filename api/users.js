import axios from "axios";
import { setCookie } from "cookies-next";

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

async function show(id, config) {
  let response;
  try {
    response = await api.get(`/${id}`, config);
  } catch (error) {
    return Promise.reject(error);
  }

  return response;
}
export default { show };
