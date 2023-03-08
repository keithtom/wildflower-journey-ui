import axios from "axios";
import apiUrl from "@lib/utils/baseUrl";
import { getCookie } from "cookies-next";

const token = getCookie("auth");

const api = axios.create({
  baseURL: `${apiUrl}/v1/ssj/dashboard`,
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

async function setStartDate(date) {
  const response = await api.put(`/team`, {
    team: { expected_start_date: date },
  });
  const data = await response.data;
  return data;
  // if response good, great.  else.  error out?
}

async function getTeam() {
  const response = await api.get(`/team`);
  const data = await response.data;
  return data;
  // if response good, great.  else.  error out?
}

export default { setStartDate, getTeam };