import wildflowerApi from "@api/base";
import { getCookie } from "cookies-next";

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

const workflowsApi = wildflowerApi.register("/v1/workflow/", {});

export const showWorkflows = {
  key: () => `/definition/workflows`,
  fetcher: () => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showWorkflows.key(), config)
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export const showWorkflow = {
  key: (id) => `/definition/workflows/${id}`,
  fetcher: (id) => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showWorkflow.key(id), config)
      .then((response) => {
        wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

// GET    /v1/workflow/definition/workflows/:workflow_id/processes/:id
export const showProcessInWorkflow = {
  key: (workflowId, processId) =>
    `definition/workflows/${workflowId}/processes/${processId}`,
  fetcher: (workflowId, processId) => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showProcessInWorkflow.key(workflowId, processId), config)
      .then((response) => {
        wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

// const data = { workflow: {version, name, description }};
// example: { workflow: { version: '1.0', name: 'Test Workflow', description: 'This is a test workflow' } }
async function createWorkflow(data) {
  const config = getAuthHeader();

  try {
    const response = await workflowsApi.post(
      "/definition/workflows",
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function editWorkflow(id, data) {
  const config = getAuthHeader();

  try {
    const response = await workflowsApi.put(
      `/definition/workflows/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}
async function deleteWorkflow(id) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.delete(
      `/definition/workflows/${id}/`,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}
async function newVersionWorkflow(id) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.post(
      `/definition/workflows/${id}/new_version`,
      {},
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function createProcessInWorkflow(id, data) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.post(
      `/definition/workflows/${id}/add_process`,
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}
async function deleteProcessInWorkflow(workflowId, processId) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.put(
      `/definition/workflows/${workflowId}/remove_process/${processId}`,
      {},
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}
async function repositionProcessInRollout(selectedProcessId, params) {
  const config = getAuthHeader();
  const data = { ...params };
  try {
    const response = await workflowsApi.put(
      `/definition/selected_processes/${selectedProcessId}`,
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function reinstateProcessInWorkflow(processId) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.put(
      `definition/selected_processes/${processId}/revert`,
      {},
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function chooseProcessInWorkflow(workflowId, processId, data) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.put(
      `/definition/workflows/${workflowId}/add_process/${processId}`,
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function createNewProcessVersion(workflowId, processId) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.post(
      `/definition/workflows/${workflowId}/new_version/${processId}`,
      {},
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function deleteDependency(dependencyId) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.delete(
      `/definition/dependencies/${dependencyId}`,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}
// PUT /v1/workflow/definition/workflows/#{workflow_id}/publish
async function publishWorkflow(workflowId) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.put(
      `/definition/workflows/${workflowId}/publish`,
      {},
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

export default {
  createWorkflow,
  editWorkflow,
  deleteWorkflow,
  newVersionWorkflow,
  createNewProcessVersion,
  createProcessInWorkflow,
  deleteProcessInWorkflow,
  reinstateProcessInWorkflow,
  chooseProcessInWorkflow,
  deleteDependency,
  publishWorkflow,
  repositionProcessInRollout,
};
