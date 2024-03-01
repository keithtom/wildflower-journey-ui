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
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export default { showWorkflows, showWorkflow };
