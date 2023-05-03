import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("auth");

const api = axios.create({
  baseURL: `${process.env.API_URL}/v1/people`,
  timeout: 3000,
  mode: "no-cors",
  headers: {
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    "Content-Type": "application/json",
    Authorization: token,
  },
});

function show(personId, params={}) {
  return api.get(`/${personId}`, params);
}

async function update(personId, personParams) {
  let response;
  try {
    response = await api.put(`/${personId}`, personParams);
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
  // TODO: do something w/ the response if it's not 200
}

export default { show, update };
