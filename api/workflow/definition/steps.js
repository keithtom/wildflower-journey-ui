import wildflowerApi from "@api/base";
import { getCookie } from "cookies-next";

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

const workflowsApi = wildflowerApi.register("/v1/workflow/", {});
const documentsApi = wildflowerApi.register("/v1/documents/", {});

export const showSteps = {
  key: () => `/definition/steps`,
  fetcher: () => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showSteps.key(), config)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export const showStep = {
  key: (processId, stepId) =>
    `/definition/processes/${processId}/steps/${stepId}`,
  fetcher: (processId, stepId) => {
    const config = getAuthHeader();
    return workflowsApi
      .get(showStep.key(processId, stepId), config)
      .then((response) => {
        wildflowerApi.loadAllRelationshipsFromIncluded(response.data);
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

// {
//   step: {
//     process_id: 53, title: 'Test Step', description: 'This is a test step', kind: 'default',
//     position: 1, completion_type: 'each_person', decision_question: 'are you sure?',
//     decision_options_attributes: [{description: "option 1"}, {description: "option 2"}],
//     documents_attributes: [{title: "document title", link: "www.example.com"}]
//   }
// }
async function createStep(data) {
  const config = getAuthHeader();

  try {
    const response = await workflowsApi.post(
      "/definition/steps/",
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

// const step_params =   {
//   step:
//    {
//      title: 'Step 1', description: 'This is step 1', kind: 'decision', completion_type: 'each_person', position: 3000,
//      decision_options_attributes: [
// {id: 3, description: "option 1"},
// {id: 4, description: "option 2"}
// ],
//      documents_attributes: [
// {id: 88, title: "document title", link: "www.example.com"}
// ]
//    }
// }

async function editStep(processId, stepId, data) {
  const config = getAuthHeader();
  try {
    const response = await workflowsApi.put(
      `/definition/processes/${processId}/steps/${stepId}`,
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function deleteStep(id) {
  const config = getAuthHeader();

  try {
    const response = await workflowsApi.delete(
      `/definition/steps/${id}`,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function deleteDocument(id) {
  const config = getAuthHeader();

  try {
    const response = await documentsApi.delete(`/${id}`, config);
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

export default { createStep, editStep, deleteStep, deleteDocument };
