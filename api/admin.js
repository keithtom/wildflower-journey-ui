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
//   ops_guide_email: "234s-32x2",
//   rgl_email: "kdo23-lkx3",
// };
async function inviteTeam(data) {
  let response;
  try {
    response = await workflowsApi.put(`/ssj/invite_team`, data);
  } catch (error) {
    return Promise.reject(error);
  }
  response = await response.data;
  return response;
}

export default {
  inviteTeam,
};
