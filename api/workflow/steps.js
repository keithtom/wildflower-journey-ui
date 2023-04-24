import axios from "axios";
import apiUrl from "@lib/utils/baseUrl";
import { getCookie } from "cookies-next";

const token = getCookie("auth");

const api = axios.create({
  baseURL: `${process.env.API_URL}/v1/workflow/`,
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


// creates a custom task (TODO: not finished)
async function create(processId, title){
  const response = await api.post(`/${processId}/steps`, {title: title});
  // if response good, great.  else.  error out?
};

async function assign(taskId, userId) {
  const response = await api.put(`/steps/${taskId}/assign`, {
    step: { assignee_id: userId },
  });
  const data = await response.data;
  return data;
  // if response good, great.  else.  error out?
}

async function unassign(taskId) {
  const response = await api.put(`/steps/${taskId}/unassign`);
  const data = await response.data;
  return data;
  // TODO: do something w/ the response if it's not 200
}

async function selectOption(optionId) {
  const response = await api.put(`/steps/${optionId}/select_option`);
  const data = await response.data;
  return data;
}

export default { assign, unassign, selectOption };
