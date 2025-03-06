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
  key: (workflowId) => `/workflows/${workflowId}/resources`,
  fetcher: (workflowId) => {
    const config = getAuthHeader();
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

async function remove(workflowId) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.delete(
      `/workflows/${workflowId}`,
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
  remove,
};
