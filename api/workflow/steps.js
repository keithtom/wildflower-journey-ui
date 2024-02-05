import wildflowerApi from "@api/base";
import { getCookie } from "cookies-next";
import { useHistory } from "react-router-dom";

const workflowsApi = wildflowerApi.register("/v1/workflow", {});

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

// augment steps with assignees and completers which is a convenient short-hand for looking at assignments since the UI cares about the information this way.
function augmentStep(step, included) {
  let assignments = wildflowerApi.loadRelationshipsFromIncluded(
    step.relationships.assignments.data,
    included
  );

  let assignees = assignments.map((e) => {
    // load assignee from included
    let relationshipAssignee = e.relationships.assignee.data;
    let assignee = wildflowerApi.lookupIncluded(
      included,
      relationshipAssignee.id,
      relationshipAssignee.type
    );

    // augment the assignee with completedAt/assignedAt from assignment
    assignee.attributes.assignedAt = e.attributes.assignedAt;
    assignee.attributes.completedAt = e.attributes.completedAt;

    return assignee;
  });

  let completers = assignments
    .filter((e) => e.attributes.completedAt)
    .map((e) => {
      // load assignee from included
      let relationshipAssignee = e.relationships.assignee.data;
      let assignee = wildflowerApi.lookupIncluded(
        included,
        relationshipAssignee.id,
        relationshipAssignee.type
      );

      // augment the assignee with completedAt/assignedAt
      assignee.attributes.assignedAt = e.attributes.assignedAt;
      assignee.attributes.completedAt = e.attributes.completedAt;

      return assignee;
    });

  step.relationships["assignees"] = { data: assignees }; // this should be { data: assignees } to match.
  step.relationships["completers"] = { data: completers };

  return step;
}

// Grab assigned steps, given a workflow id
//DEPRECATED for showAssigned
async function assigned(workflowId, config = {}) {
  let response;
  try {
    response = await workflowsApi.get(
      `/workflows/${workflowId}/assigned_steps`,
      config
    );
  } catch (error) {
    return Promise.reject(error);
  }
  const included = response.data.included;

  wildflowerApi.loadAllRelationshipsFromIncluded(response.data);

  var steps = response.data.data;
  steps.forEach((step) => {
    step = augmentStep(step, included);
  });

  return response;
}

export const showAssigned = {
  key: (workflowId) => `/workflows/${workflowId}/assigned_steps`,
  fetcher: (workflowId) => {
    const config = getAuthHeader();
    const isOg = getCookie("isOg");
    config.params = { current_user: isOg ? null : true };
    return workflowsApi
      .get(showAssigned.key(workflowId), config)
      .then((res) => {
        const data = res.data;
        wildflowerApi.loadAllRelationshipsFromIncluded(data);
        const included = data.included;
        data.data.forEach((step) => {
          step = augmentStep(step, included);
        });
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

// creates a custom task (TODO: not finished)
async function create(processId, title) {
  const config = getAuthHeader();
  return await workflowsApi.post(
    `/processes/${processId}/steps`,
    {
      title: title,
    },
    config
  );
  // if response good, great.  else.  error out?
}

async function assign(taskId) {
  const config = getAuthHeader();
  console.log("config------------------------", config);
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/assign`, config);
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  return response;
  // if response good, great.  else.  error out?
}

async function unassign(taskId) {
  const config = getAuthHeader();
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/unassign`, config);
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  return response;
  // TODO: do something w/ the response if it's not 200
}

// if response good, great.  else.  error out?
async function complete(taskId) {
  const config = getAuthHeader();
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/complete`, config);
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  return response;
}

// TODO: do something w/ the response if it's not 200
async function uncomplete(taskId) {
  const config = getAuthHeader();
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/uncomplete`, config);
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  return response;
}

async function selectOption(taskId, optionId) {
  const config = getAuthHeader();
  let response;
  try {
    response = await workflowsApi.put(
      `/steps/${taskId}/select_option`,
      {
        selected_option_id: optionId,
      },
      config
    );
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);

  return response;
}

async function show({ milestoneId, taskId, config = {} }) {
  let response;
  try {
    response = await workflowsApi.get(
      `/processes/${milestoneId}/steps/${taskId}`,
      config
    );
  } catch (error) {
    return Promise.reject(error);
  }

  return response;
}
export default {
  assigned,
  assign,
  unassign,
  complete,
  uncomplete,
  selectOption,
  augmentStep,
  show,
};
