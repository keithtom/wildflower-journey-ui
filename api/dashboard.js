import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const dashboardApi = wildflowerApi.register("/v1/dashboard", {});

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

export const showDashboardProgress = {
  key: (workflowId) => `/v1/dashboard/progress?workflow_id=${workflowId}`,
  fetcher: (workflowId) => {
    const config = getAuthHeader();
    return dashboardApi
      .get(`/progress`, { ...config, params: { workflow_id: workflowId } })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export default { showDashboardProgress };
