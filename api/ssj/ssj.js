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
  const response = await workflowsApi.put(`/team`, {
    team: { expected_start_date: date },
  });
  const data = await response.data;
  return data;
  // if response good, great.  else.  error out?
}

async function getTeam() {
  const response = await workflowsApi.get(`/team`);
  const data = await response.data;
  return data;
  // if response good, great.  else.  error out?
}

async function invitePartner(data) {
  const response = await workflowsApi.put(`/invite_partner`, {
    person: {
      first_name: data.partnerFirstName,
      last_name: data.partnerLastName,
      email: data.partnerEmail,
    },
  });
  return response;
}

// Needs to be called from getServerSideProps. Instance of axios is already instantiated when getServerSideProps is called.
function setAuthHeader(token) {
  workflowsApi.defaults.headers.common.Authorization = token;
}

export default { setStartDate, getTeam, invitePartner, setAuthHeader };
