import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const peopleApi = wildflowerApi.register(`/v1/people`);

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

// DEPRECATED for showPerson
function show(personId, params = {}) {
  return peopleApi.get(`/${personId}`, { params: params });
}

export const showPerson = {
  key: (personId, params) => `/v1/people/${personId}`,
  fetcher: (personId, params) => {
    return peopleApi
      .get(`/${personId}`, { params: params })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

async function update(personId, personParams) {
  let response;
  try {
    const config = getAuthHeader();
    response = await peopleApi.put(`/${personId}`, personParams, config);
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
}

// filter example: {{ops_guide: true, rgl: true}}
// TODO update with SWR hook
async function index(filter) {
  let response;
  try {
    response = await peopleApi.get(`/`, { params: filter });
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
}

export default { show, update, index };
