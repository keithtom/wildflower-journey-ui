import wildflowerApi from "@api/base";

const workflowsApiNoAuth = wildflowerApi.register("/v1/workflow", { noAuth: true });
const workflowsApi = wildflowerApi.register("/v1/workflow", {});

// show me all milestones for a phase
// show me all milestones that are assigned to me
// show me all milestones that are assigned to me
async function index() {}

// look at an individual process/milestone
async function show(id) {
  var response = await workflowsApiNoAuth.get(`/processes/${id}`);
  
  var responseData = wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
  
  var steps = response.data.data.relationships.steps.data;

  // augment steps with assignees and completers which is a convenient short-hand for looking at assignments since the UI cares about the information this way.
  var steps = response.data.data.relationships.steps.data;
  steps.forEach((step) => {
    let assignments = wildflowerApi.loadRelationshipsFromIncluded(step.relationships.assignments.data, response.data.included);
    let assignees = assignments.map((e) => {
      // load assignee from included
      let relationshipAssignee = e.relationships.assignee.data;
      let assignee = wildflowerApi.lookupIncluded(responseData.included, relationshipAssignee.id, relationshipAssignee.type);
      
      // augment the assignee with completedAt/assignedAt from assignment
      assignee.attributes.assignedAt = e.attributes.assignedAt;
      assignee.attributes.completedAt = e.attributes.completedAt;
      
      return assignee;
    });
    let completers = assignments.filter(e => e.completedAt).map((e) => {
      // load assignee from included
      let relationshipAssignee = e.relationships.assignee.data;
      let assignee = wildflowerApi.lookupIncluded(responseData.included, relationshipAssignee.id, relationshipAssignee.type);
      
      // augment the assignee with completedAt/assignedAt
      assignee.attributes.assignedAt = e.attributes.assignedAt;
      assignee.attributes.completedAt = e.attributes.completedAt;
      
      return assignee;
    });
    
    step.relationships["assignees"] = assignees; // this should be { data: assignees } to match.
    step.relationships["completers"] = completers;
  });

  // load secondary relationship milestone.steps.documents
  steps.forEach((step) => {
    let documents = wildflowerApi.loadRelationshipsFromIncluded(step.relationships.documents.data, response.data.included);

    step.relationships.documents.data = documents;
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
