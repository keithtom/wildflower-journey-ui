import wildflowerApi from "@api/base";

const peopleApi = wildflowerApi.register(`/v1/people`);

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
    response = await peopleApi.put(`/${personId}`, personParams);
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
}

// filter example: {{ops_guide: true, rgl: true}}
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
