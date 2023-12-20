import wildflowerApi from "@api/base";
import { getCookie } from "cookies-next";

const teamsApi = wildflowerApi.register("/v1/ssj/teams", {});

async function index() {
  let response;
  try {
    response = await teamsApi.get(`/`, getAuthHeader());
  } catch (error) {
    return Promise.reject(error);
  }
  const responseData = await response.data;
  wildflowerApi.loadAllRelationshipsFromIncluded(responseData);
  return responseData;
}

async function setStartDate(data) {
  let response;
  try {
    response = await teamsApi.put(
      `/${data.id}`,
      {
        team: { expected_start_date: data.date },
      },
      getAuthHeader()
    );
  } catch (error) {
    return Promise.reject(error);
  }
  const responseData = await response.data;
  return responseData;
}

async function getTeam(id) {
  let response;
  try {
    response = await teamsApi.get(`/${id}`, getAuthHeader());
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  wildflowerApi.loadAllRelationshipsFromIncluded(data);
  return data;
  // if response good, great.  else.  error out?
}

// let data = {
//   etl_people_params: [
//     {
//       email: "test@test.com",
//       first_name: "test",
//       last_name: "test",
//     },
//     {
//       email: "test2@test.com",
//       first_name: "test2",
//       last_name: "test2",
//     },
//   ],
//   ops_guide_id: "234s-32x2",
//   rgl_id: "kdo23-lkx3",
// };
async function inviteTeam(data) {
  let response;
  try {
    response = await teamsApi.post(`/`, data, getAuthHeader());
  } catch (error) {
    return Promise.reject(error);
  }
  response = await response.data;
  return response;
}

async function invitePartner(id, data) {
  return await teamsApi.put(`/${id}/invite_partner`, {
    person: {
      first_name: data.partnerFirstName,
      last_name: data.partnerLastName,
      email: data.partnerEmail,
    },
  });
}

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

export default {
  setStartDate,
  getTeam,
  inviteTeam,
  index,
  invitePartner,
};
