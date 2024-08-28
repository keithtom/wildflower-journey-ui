import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const schoolRelationshipsApi = wildflowerApi.register(
  "/v1/school_relationships"
);

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

export const showSchoolRelationship = {
  key: (schoolRelationshipId) =>
    `/v1/school_relationships/${schoolRelationshipId}`,
  fetcher: (schoolRelationshipId) => {
    const config = getAuthHeader();
    return schoolRelationshipsApi
      .get(`/${schoolRelationshipId}`, config)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

export const showSchoolRelationships = {
  key: () => `/v1/school_relationships/`,
  fetcher: () => {
    const config = getAuthHeader();
    return schoolRelationshipsApi
      .get(``, config)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

async function create(schoolRelationshipParams) {
  const config = getAuthHeader();

  try {
    const response = await schoolRelationshipsApi.post(
      ``,
      schoolRelationshipParams,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function update(schoolRelationshipId, schoolRelationshipParams) {
  let response;
  try {
    const config = getAuthHeader();
    response = await schoolRelationshipsApi.put(
      `/${schoolRelationshipId}`,
      schoolRelationshipParams,
      config
    );
  } catch (error) {
    return Promise.reject(error);
  }
  const data = await response.data;
  return data;
}

async function destroy(schoolRelationshipId) {
  const config = getAuthHeader();

  try {
    const response = await schoolRelationshipsApi.delete(
      `/${schoolRelationshipId}`,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

export default { create, update, destroy };
