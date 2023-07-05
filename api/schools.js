import wildflowerApi from "@api/base";

const schoolsApi = wildflowerApi.register("/v1/schools", {});

async function index() {
  return schoolsApi.get();
}

async function show(id, params = {}) {
  return schoolsApi.get(`/${id}`, params)
}

async function update(id, params = {}) {
  return schoolsApi.put(`/${id}`, params)
}

export default { index, show, update };
