import wildflowerApi from "@api/base";
import stepsApi from "@api/workflow/steps";


// this was built as an ssj specific route but needs to be moved to workflow
const assignmentsApi = wildflowerApi.register(`/v1/ssj/dashboard/assigned_steps`, {noAuth: true});

// this is really /workflows/id/steps/assigned
async function index(workflowId, config) {
  const response = await assignmentsApi.get(`?workflow_id=${workflowId}`, config);
  const included = response.data.included;
  
  wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
  
  var steps = response.data.data;
  steps.forEach((step) => {
    step = stepsApi.augmentStep(step, included);
  });

  return response
}

export default { index };