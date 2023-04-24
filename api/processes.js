import axios from "axios";
import apiUrl from "@lib/utils/baseUrl";
import { getCookie } from "cookies-next";

const token = getCookie("auth");

const api = axios.create({
  baseURL: `${process.env.API_URL}/v1/workflow`,
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

async function index() {}

async function complete(taskId) {
  const response = await api.put(`/steps/${taskId}/complete`);
  const data = await response.data;
  return data;
  // if response good, great.  else.  error out?
}

async function uncomplete(taskId) {
  const response = await api.put(`/steps/${taskId}/uncomplete`);
  const data = await response.data;
  return data;
  // TODO: do something w/ the response if it's not 200
}

export default { complete, uncomplete };
