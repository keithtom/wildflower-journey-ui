import wildflowerApi from "@api/base";

const workflowsApi = wildflowerApi.register("/v1/admin", {});

// have one function that gets a data structure used for entire dashboard

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
    response = await workflowsApi.post(`/ssj_teams`, data);
  } catch (error) {
    return Promise.reject(error);
  }
  response = await response.data;
  return response;
}

export default {
  inviteTeam,
};
