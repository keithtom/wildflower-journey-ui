import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const schoolsApi = wildflowerApi.register("/v1/schools", {});

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

// TODO update to SWR hook
async function index() {
  return schoolsApi.get();
}

export const showSchools = {
  key: (filter) => `/v1/schools?${Object.keys(filter).join("_")}`,
  // filters that are usable: status, role, personId
  fetcher: (filter) => {
    const config = getAuthHeader();
    config.params = filter;
    return schoolsApi
      .get(``, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

// DEPRECATED for showSchool
async function show(id, params = {}) {
  return schoolsApi.get(`/${id}`, params);
}

export const showSchool = {
  key: (schoolId, params) => `/v1/schools/${schoolId}`,
  fetcher: (schoolId, params) => {
    const config = getAuthHeader();
    config.params = params;
    return schoolsApi
      .get(`/${schoolId}`, config)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};

async function update(id, params = {}) {
  const config = getAuthHeader();
  return schoolsApi.put(`/${id}`, params, config);
}

async function invitePartner(schoolId, data) {
  const config = getAuthHeader();
  try {
    const response = await schoolsApi.put(
      `/${schoolId}/invite_partner`,
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function reinvitePartner(schoolId, data) {
  const config = getAuthHeader();
  try {
    const response = await schoolsApi.put(
      `/${schoolId}/reinvite_partner`,
      data,
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function removePartner(schoolId, partnerId) {
  const config = getAuthHeader();
  try {
    const response = await schoolsApi.put(
      `/${schoolId}/remove_partner`,
      { person: { id: partnerId } },
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}
export default {
  index,
  show,
  update,
  invitePartner,
  reinvitePartner,
  removePartner,
};
