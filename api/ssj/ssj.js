import wildflowerApi from "@api/base";
import { getCookie } from "cookies-next";

const workflowsApi = wildflowerApi.register("/v1/ssj/dashboard", {});

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

// have one function that gets a data structure used for entire dashboard

async function dashboard() {
  // hit API end point that returns
  // dashboard needs - # of assigned tasks, phase, location, hub, open date, startup family, phase stats (# completed, # milestones,), category stats (#completed, # milestones)
  // API should return the data in whatever structure the backend wants
  // we can massage the response here into a data structure the frontend wants
}

// DEPRECATED
async function invitePartner(data) {
  return await workflowsApi.put(`/invite_partner`, {
    person: {
      first_name: data.partnerFirstName,
      last_name: data.partnerLastName,
      email: data.partnerEmail,
    },
  });
}

async function progress({ workflowId, config = {} }) {
  let response;
  try {
    response = await workflowsApi.get(
      `/progress?workflow_id=${workflowId}`,
      config
    );
  } catch (error) {
    return Promise.reject(error);
  }
  return response;
}

export const showProgress = {
  key: (workflowId) => `/v1/ssj/dashboard/progress?workflow_id=${workflowId}`,
  fetcher: (workflowId) => {
    return workflowsApi
      .get(`/progress?workflow_id=${workflowId}`, getAuthHeader())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

async function resources({ workflowId, config = {} }) {
  let response;
  try {
    response = await workflowsApi.get(
      `/resources?workflow_id=${workflowId}`,
      config
    );
  } catch (error) {
    return Promise.reject(error);
  }
  return response;
}

export const showResources = {
  key: (workflowId) => `/v1/ssj/dashboard/resources?workflow_id=${workflowId}`,
  fetcher: (workflowId) => {
    return workflowsApi
      .get(`/resources?workflow_id=${workflowId}`, getAuthHeader())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export default {
  invitePartner, // DEPRECATED
  progress,
  resources,
};
