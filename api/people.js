import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const peopleApi = wildflowerApi.register(`/v1/people`);

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

async function create(personParams) {
  let response;
  try {
    const config = getAuthHeader();
    response = await peopleApi.post(`/`, personParams, config);
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
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
      .then((response) => {
        return response;
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
  key: (filter) => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key + "[]", v));
      } else {
        params.append(key, value);
      }
    });
    return `/v1/people?${params.toString()}`;
  },
  fetcher: (filter) => {
    const config = getAuthHeader();
    config.params = filter;
    return peopleApi
      .get(``, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

async function remove(personId) {
  let response;
  try {
    const config = getAuthHeader();
    response = await peopleApi.delete(`/${personId}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
}

export default { show, update, index, create, remove };
