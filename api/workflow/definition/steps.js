import wildflowerApi from "@api/base";
import { getCookie } from "cookies-next";

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

const workflowsApi = wildflowerApi.register("/v1/workflow/", {});

export const showSteps = {
  key: () => `/definition/steps`,
  fetcher: () => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showMilestones.key(), config)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export const showStep = {
  key: (id) => `/definition/steps/${id}`,
  fetcher: (id) => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showMilestone.key(id), config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export default { showSteps, showStep };
