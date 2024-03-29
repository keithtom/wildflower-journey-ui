import wildflowerApi from "@api/base";
import stepsApi from "@api/workflow/steps";
import { getCookie } from "cookies-next";

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

const workflowsApi = wildflowerApi.register("/v1/workflow", {});

// show me all milestones for a phase
// DEPRECATED for showMilestones
async function index({ workflowId, params, config = {} }) {
  let url = `/workflows/${workflowId}/processes`;
  if (params !== undefined) {
    url += `?`;
    const paramNames = Object.keys(params);
    paramNames.forEach((param, index) => {
      if (index != 0) {
        url += `&`;
      }
      url += `${param}=${params[param]}`;
    });
  }

  let response;
  try {
    response = workflowsApi.get(url, config);
  } catch (error) {
    return Promise.reject(error);
  }
  return response;
}

export const showMilestones = {
  key: (workflowId, params) => {
    let url = `/workflows/${workflowId}/processes`;
    if (params !== undefined) {
      url += `?`;
      const paramNames = Object.keys(params);
      paramNames.forEach((param, index) => {
        if (index != 0) {
          url += `&`;
        }
        url += `${param}=${params[param]}`;
      });
    }
    return url;
  },
  fetcher: (workflowId, params) => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showMilestones.key(workflowId, params), config)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

// look at an individual process/milestone
// DEPRECATED for showMilestone
async function show(id, config = {}) {
  let response;
  try {
    response = await workflowsApi.get(`/processes/${id}`, config);
  } catch (error) {
    return Promise.reject(error);
  }
  const included = response.data.included;

  wildflowerApi.loadAllRelationshipsFromIncluded(response.data);

  var steps = response.data.data.relationships.steps.data;
  steps.forEach((step) => {
    step = stepsApi.augmentStep(step, included);
  });

  // mutate the response to be friendly to the front-end
  response.data.data.relationships.steps.data = steps;
  return response;
}

export const showMilestone = {
  key: (id) => `/processes/${id}`,
  fetcher: (id) => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showMilestone.key(id), config)
      .then((response) => {
        const included = response.data.included;
        wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
        const steps = response.data.data.relationships.steps.data;
        steps.forEach((step) => {
          step = stepsApi.augmentStep(step, included);
        });
        response.data.data.relationships.steps.data = steps;
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export default { index, show };
