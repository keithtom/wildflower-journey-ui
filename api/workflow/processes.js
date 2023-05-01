import wildflowerApi from "@api/base";
import stepsApi from "@api/workflow/steps";

const workflowsApi = wildflowerApi.register("/v1/workflow", {});

// show me all milestones for a phase
async function index() {
  const apiRouteMilestones = `${process.env.API_URL}/v1/workflow/workflows/${workflowId}/processes?phase=${phase}`;
  const responseMilestones = await axios.get(apiRouteMilestones);
}

// look at an individual process/milestone
async function show(id) {
  const response = await workflowsApi.get(`/processes/${id}`);  
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



export default { index, show };
