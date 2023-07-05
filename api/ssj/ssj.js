import wildflowerApi from "@api/base";

const workflowsApi = wildflowerApi.register("/v1/ssj/dashboard", {});

// have one function that gets a data structure used for entire dashboard

async function dashboard() {
  // hit API end point that returns
  // dashboard needs - # of assigned tasks, phase, location, hub, open date, startup family, phase stats (# completed, # milestones,), category stats (#completed, # milestones)
  // API should return the data in whatever structure the backend wants
  // we can massage the response here into a data structure the frontend wants
}

async function setStartDate(date) {
  let response;
  try {
    response = await workflowsApi.put(`/team`, {
      team: { expected_start_date: date },
    });
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
}

async function getTeam() {
  let response;
  try {
    response = await workflowsApi.get(`/team`);
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
  // if response good, great.  else.  error out?
}

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

export default { setStartDate, getTeam, invitePartner, progress, resources };
