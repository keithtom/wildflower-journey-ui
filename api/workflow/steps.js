import wildflowerApi from "@api/base";

const workflowsApi = wildflowerApi.register("/v1/workflow", {});

// augment steps with assignees and completers which is a convenient short-hand for looking at assignments since the UI cares about the information this way.
function augmentStep(step, included){
  let assignments = wildflowerApi.loadRelationshipsFromIncluded(step.relationships.assignments.data, included);
  
  let assignees = assignments.map((e) => {
    // load assignee from included
    let relationshipAssignee = e.relationships.assignee.data;
    let assignee = wildflowerApi.lookupIncluded(included, relationshipAssignee.id, relationshipAssignee.type);
    
    // augment the assignee with completedAt/assignedAt from assignment
    assignee.attributes.assignedAt = e.attributes.assignedAt;
    assignee.attributes.completedAt = e.attributes.completedAt;
    
    return assignee;
  });
  
  let completers = assignments.filter(e => e.attributes.completedAt).map((e) => {
    // load assignee from included
    let relationshipAssignee = e.relationships.assignee.data;
    let assignee = wildflowerApi.lookupIncluded(included, relationshipAssignee.id, relationshipAssignee.type);
    
    // augment the assignee with completedAt/assignedAt
    assignee.attributes.assignedAt = e.attributes.assignedAt;
    assignee.attributes.completedAt = e.attributes.completedAt;
    
    return assignee;
  });
  
  step.relationships["assignees"] = { data: assignees }; // this should be { data: assignees } to match.
  step.relationships["completers"] = { data: completers };

  return step;
};

// creates a custom task (TODO: not finished)
async function create(processId, title){
  return await workflowsApi.post(`/processes/${processId}/steps`, {title: title});
  // if response good, great.  else.  error out?
};

async function assign(taskId) {
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/assign`);
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  return response
  // if response good, great.  else.  error out?
}

async function unassign(taskId) {
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/unassign`);
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  return response
  // TODO: do something w/ the response if it's not 200
}

// if response good, great.  else.  error out?
async function complete(taskId) {
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/complete`);
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  return response
}

// TODO: do something w/ the response if it's not 200
async function uncomplete(taskId) {
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/uncomplete`);
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  return response
}

async function selectOption(taskId, optionId) {
  let response;
  try {
    response = await workflowsApi.put(`/steps/${taskId}/select_option`, { selected_option_id: optionId });
  } catch (error) {
    return Promise.reject(error);
  }
  response.data.data = augmentStep(response.data.data, response.data.included);
  
  return response;
}

export default { assign, unassign, complete, uncomplete, selectOption, augmentStep};
