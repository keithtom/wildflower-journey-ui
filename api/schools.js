import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const schoolsApi = wildflowerApi.register("/v1/schools", {});

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

async function create(params) {
  const config = getAuthHeader();
  return schoolsApi.post("", params, config);
}

// TODO update to SWR hook
async function index() {
  return schoolsApi.get();
}

export const showSchools = {
  key: (filter) => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (key === "serialization_fields" && Array.isArray(value)) {
        params.append(key, value.join(","));
      } else if (Array.isArray(value)) {
        value.forEach((v) => params.append(key + "[]", v));
      } else {
        params.append(key, value);
      }
    });
    return `/v1/schools?${params.toString()}`;
  },
  // filters that are usable: status, role, personId
  fetcher: (filter) => {
    const config = getAuthHeader();
    // Convert the parameters in the same way as the key function
    const params = {};
    Object.entries(filter).forEach(([key, value]) => {
      if (key === "serialization_fields" && Array.isArray(value)) {
        params[key] = value.join(",");
      } else if (Array.isArray(value)) {
        // For arrays, use the array directly - axios will format with [] suffix
        params[key] = value;
      } else {
        params[key] = value;
      }
    });
    config.params = params;
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
  key: (schoolId, params = {}) => {
    const entries = Object.entries(params || {});
    if (!entries.length) return `/v1/schools/${schoolId}`;

    const usp = new URLSearchParams();
    entries.forEach(([key, value]) => {
      if (key === "serialization_fields" && Array.isArray(value)) {
        usp.append(key, value.join(","));
      } else if (Array.isArray(value)) {
        value.forEach((v) => usp.append(`${key}[]`, v));
      } else if (value !== undefined && value !== null) {
        usp.append(key, value);
      }
    });
    const qs = usp.toString();
    return qs ? `/v1/schools/${schoolId}?${qs}` : `/v1/schools/${schoolId}`;
  },
  fetcher: (schoolId, params) => {
    const config = getAuthHeader();
    if (params) {
      const apiParams = {};
      Object.entries(params).forEach(([key, value]) => {
        if (key === "serialization_fields" && Array.isArray(value)) {
          apiParams[key] = value.join(",");
        } else if (Array.isArray(value)) {
          apiParams[key] = value;
        } else {
          apiParams[key] = value;
        }
      });
      config.params = apiParams;
    }
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

async function removePartner(schoolId, partnerId, endDate) {
  const config = getAuthHeader();
  try {
    const response = await schoolsApi.put(
      `/${schoolId}/remove_partner`,
      {
        person: {
          id: partnerId,
          end_date: endDate,
        },
      },
      config
    );
    return response;
  } catch (error) {
    wildflowerApi.handleErrors(error);
  }
}

async function remove(id) {
  const config = getAuthHeader();
  return schoolsApi.delete(`/${id}`, config);
}

export default {
  index,
  show,
  update,
  invitePartner,
  reinvitePartner,
  removePartner,
  remove,
  create,
};
