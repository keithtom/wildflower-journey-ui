import wildflowerApi from "@api/base";

const schoolsApi = wildflowerApi.register("/v1/schools", {});

async function index() {
  return schoolsApi.get();
}

async function show(id, config = {}) {
  return schoolsApi.get(`/${id}`, config)
}

export default { index, show };
