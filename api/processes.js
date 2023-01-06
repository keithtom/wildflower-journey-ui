import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3001/v1/workflow",
  baseURL: "https://api.wildflowerschools.org/v1/workflow",
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

async function index() {}

async function complete(taskId) {
  const response = await api.put(`/steps/${taskId}/complete`);
  // if response good, great.  else.  error out?
}

async function uncomplete() {}

export default { complete };
