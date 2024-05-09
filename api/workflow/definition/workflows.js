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

export default { createWorkflow, editWorkflow, repositionProcessInRollout };
