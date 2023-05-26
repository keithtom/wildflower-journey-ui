import wildflowerApi from "@api/base";

const schoolsApi = wildflowerApi.register("/v1/schools", {});

async function index() {
  return schoolsApi.get();
}

async function show(id, config = {}) {
  return workflowsApi.get(`/${id}`, config).then((response) => {
    wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
  });  
}

export default { index, show };
