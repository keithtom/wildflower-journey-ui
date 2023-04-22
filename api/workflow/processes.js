import wildflowerApi from "@api/base";

const workflowsApiNoAuth = wildflowerApi.register("/v1/workflow", { noAuth: true });
const workflowsApi = wildflowerApi.register("/v1/workflow", {});

// show me all milestones for a phase
// show me all milestones that are assigned to me
// show me all milestones that are assigned to me
async function index() {}

// look at an individual process/milestone
async function show(id) {
  // we look at a process, and see its steps.
  // and for each step, there can be many assignments
  // we need to update it so each step sees assinees and completers
  // TODO: update the response such that it response to t.relationships.completers 
  // and t.relationships.assignees
  var response = await workflowsApiNoAuth.get(`/processes/${id}`);
  
  var responseData = wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
  var steps = response.data.data.relationships.steps.data;
  
  // augment steps with assignees and completers which is a convenient short-hand for looking at assignments.
  steps.forEach((step) => {
    step.relationships["assignees"] = []; // put real data in here from assignments
    step.relationships["completers"] = []; 
  });
  
  // mutate the response to be friendly to the front-end
  response.data.data.relationships.steps.data = steps;
  return response;
}


// move to steps.js
async function complete(taskId) {
  const response = await workflowsApi.put(`/steps/${taskId}/complete`);
  const data = await response.data
  return data
  // if response good, great.  else.  error out?
}

// move to steps.js
async function uncomplete(taskId) {
  const response = await workflowsApi.put(`/steps/${taskId}/uncomplete`);
  const data = await response.data
  return data
  // TODO: do something w/ the response if it's not 200
}

export default { index, show, complete, uncomplete };
