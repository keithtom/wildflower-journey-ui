import wildflowerApi from "@api/base";
import stepsApi from "@api/workflow/steps";

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
  var included = responseData.included;
  
  var steps = responseData.data.relationships.steps.data;
  steps.forEach((step) => {
    step = stepsApi.augmentStep(step, included);

    // load secondary relationship milestone.steps.documents
    let documents = wildflowerApi.loadRelationshipsFromIncluded(step.relationships.documents.data, included);
    step.relationships.documents.data = documents;
  });

  // mutate the response to be friendly to the front-end
  response.data.data.relationships.steps.data = steps;
  return response;
}



export default { index, show };
