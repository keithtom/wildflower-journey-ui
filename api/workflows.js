import wildflowerApi from "@api/base";
import { getCookie } from "cookies-next";

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

const workflowsApi = wildflowerApi.register("/v1/workflow", {});

export const showWorkflow = {
  key: (workflowId) => `/workflows/${workflowId}`,
  fetcher: (workflowId) => {
    const config = getAuthHeader();
    return workflowsApi
      .get(`/workflows/${workflowId}`, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export const showResources = {
  key: (workflowId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return `/workflows/${workflowId}/resources${
      queryString ? `?${queryString}` : ""
    }`;
  },
  fetcher: (workflowId, params = {}) => {
    const config = getAuthHeader();
    config.params = params;
    return workflowsApi
      .get(`/workflows/${workflowId}/resources`, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

async function update(workflowId, visible) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.put(
      `/workflows/${workflowId}`,
      {
        workflow: {
          visible: visible,
        },
      },
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}
async function create(schoolId, definitionId) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.post(
      `/workflows`,
      {
        workflow: {
          school_id: schoolId,
          definition_id: definitionId,
        },
      },
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

export default {
  showWorkflow,
  showResources,
  update,
  create,
};
