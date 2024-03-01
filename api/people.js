import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const peopleApi = wildflowerApi.register(`/v1/people`);

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

function show(personId, params = {}) {
  const config = getAuthHeader();
  config.params = params;
  return peopleApi.get(`/${personId}`, { params: params });
}

export const showPerson = {
  key: (personId, params) => `/v1/people/${personId}`,
  fetcher: (personId, params) => {
    const config = getAuthHeader();
    config.params = params;
    return peopleApi
      .get(`/${personId}`, config)
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
  const config = getAuthHeader();
  config.params = filter;
  let response;
  try {
    response = await peopleApi.get(`/`, config);
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
}

// filter example: {{ops_guide: true, rgl: true}} or {{etl: true}} Note that a person cannot be an etl
export const showPersons = {
  key: (filter) => `/v1/people?${Object.keys(filter).join("_")}`,
  fetcher: (filter) => {
    const config = getAuthHeader();
    config.params = filter;
    return peopleApi
      .get(``, config)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export default { show, update, index };
