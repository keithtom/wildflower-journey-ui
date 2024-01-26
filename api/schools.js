import wildflowerApi from "@api/base";

const schoolsApi = wildflowerApi.register("/v1/schools", {});

async function index() {
  return schoolsApi.get();
}

async function show(id, params = {}) {
  return schoolsApi.get(`/${id}`, params);
}

export const showSchool = {
  key: (schoolId, params) => `/v1/schools/${schoolId}`,
  fetcher: (schoolId, params) => {
    return schoolsApi
      .get(`/${schoolId}`, { params: params })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

async function update(id, params = {}) {
  return schoolsApi.put(`/${id}`, params);
}

export default { index, show, update };
