import wildflowerApi from "@api/base";

assignmentsApi = wildflowerApi.register("/v1/ssj/dashboard/assigned_steps");

async function index() {
  const response = await assignmentsApi.get(`/`, {});
  const assignments = response.data

  // assignments have completed_at and who
  // and step, which can be repeated.

  // TODO: update the response such that it response to t.relationships.completers 
  // and t.relationships.assignees
  [{id, attributes, relationships}]

  return assignments
}

export default { index };