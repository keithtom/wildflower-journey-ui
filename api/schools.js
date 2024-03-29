import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const schoolsApi = wildflowerApi.register("/v1/schools", {});

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

// TODO update to SWR hook
async function index() {
  return schoolsApi.get();
}

// DEPRECATED for showSchool
async function show(id, params = {}) {
  return schoolsApi.get(`/${id}`, params);
}

export const showSchool = {
  key: (schoolId, params) => `/v1/schools/${schoolId}`,
  fetcher: (schoolId, params) => {
    const config = getAuthHeader();
    config.params = params;
    return schoolsApi
      .get(`/${schoolId}`, config)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

async function update(id, params = {}) {
  const config = getAuthHeader();
  return schoolsApi.put(`/${id}`, params, config);
}

export default { index, show, update };
