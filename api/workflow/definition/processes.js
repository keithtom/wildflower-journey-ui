import wildflowerApi from "@api/base";
import { getCookie } from "cookies-next";

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

const workflowsApi = wildflowerApi.register("/v1/workflow/", {});

export const showMilestones = {
  key: () => `/definition/processes`,
  fetcher: () => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showMilestones.key(), config)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export const showMilestone = {
  key: (id) => `/definition/processes/${id}`,
  fetcher: (id) => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showMilestone.key(id), config)
      .then((response) => {
        wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

// const data =
// {
// workflowId: 1,
//   process: {
//     version: '1.0',
//     title: 'Test Workflow',
//     description: 'This is a test process',
//     steps_attributes: [
//       {
//         title: 'Step 1', description: 'This is step 1', kind: 'decision', completion_type: 'each_person', min_worktime: 5, max_worktime: 10,
//         decision_options_attributes: [{description: "option 1"}, {description: "option 2"}],
//         documents_attributes: [{title: "document title", link: "www.example.com"}]
//       },
//       { title: 'Step 2', description: 'This is step 2', kind: 'default', completion_type: 'one_per_group' }
//     ],
//     selected_processes_attributes: [
//       { workflow_id: 35, position: 0}
//     ],
//     workable_dependencies_attributes: [
//       { workflow_id: 35, prerequisite_workable_type: "Workflow::Definition::Process", prerequisite_workable_id: 6},
//     ]
//   }
// }
async function createMilestone(data) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.post(
      "/definition/processes/",
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

// const data =
// {
//   process: {
//     version: '1.0',
//     title: 'Test Workflow',
//     description: 'This is a test process',
//     steps_attributes: [
//       {
//         id: 123, title: 'Step 1', description: 'This is step 1', kind: 'decision', completion_type: 'each_person', min_worktime: 5, max_worktime: 10,
//         decision_options_attributes: [{external_identifier: '234-d3x', description: "option 1"}, {id: 4, description: "option 2"}],
//         documents_attributes: [{external_identifier: '234-der', title: "document title", link: "www.example.com"}]
//       },
//       { id: 456, title: 'Step 2', description: 'This is step 2', kind: 'default', completion_type: 'one_per_group' }
//     ],
//     selected_processes_attributes: [
//       { id: 2, workflow_id: 35, position: 0}
//     ],
//     workable_dependencies_attributes: [
//       { id: 25, workflow_id: 35, prerequisite_workable_type: "Workflow::Definition::Process", prerequisite_workable_id: 6},
//   }
// }
async function editMilestone(id, data) {
  const config = getAuthHeader();

  console.log("in the edit milestone api call", data);

  try {
    const response = await workflowsApi.put(
      `/definition/processes/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function deleteMilestone(id) {
  const config = getAuthHeader();

  try {
    const response = await workflowsApi.delete(
      `/definition/processes/${id}`,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function editStep(processId, stepId, data, stepParams) {
  const config = getAuthHeader();
  console.log("in the edit step api call", data);
  const params = {
    ...config,
    ...stepParams,
  };
  try {
    const response = await workflowsApi.put(
      `/definition/processes/${processId}/steps/${stepId}`,
      data,
      params
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

export default { createMilestone, editMilestone, deleteMilestone, editStep };
