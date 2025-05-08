// boiler plate for API calls to api.wildflowerschools.org
import { clearLoggedInState } from "@lib/handleLogout";
import { setCurrentUser } from "@lib/useUserContext";
import Router from "next/router";
import axios from "axios";
import { getCookie } from "cookies-next";
import jwt_decode from "jwt-decode";
import { TokenManager } from "@lib/utils/tokenManager";
import { H } from "highlight.run";

const token = getCookie("auth");

// axios.interceptors.request.use(request => {
//   console.log('Starting Request', request.url)
//   return request
// })

// axios.interceptors.response.use(response => {
//   console.log('Response:', response.data)
//   return response
// })

// path: e.g. '/v1/workflow/'
function register(path, options) {
  let config = {
    baseURL: `${process.env.API_URL}${path}`,
    timeout: 7500,
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const client = axios.create(config);

  // Request interceptor for logging
  client.interceptors.request.use(
    (config) => {
      const token = TokenManager.getToken();
      H.track("api_request", {
        tags: { type: "api_request" },
        url: config.url,
        method: config.method,
        hasToken: !!token,
        isTokenValid: TokenManager.isTokenValid(token),
        timestamp: new Date().toISOString(),
      });
      return config;
    },
    (error) => {
      H.error(error, {
        tags: { type: "api_request" },
        severity: "error",
      });
      return Promise.reject(error);
    }
  );

  // Response interceptor with enhanced logging
  client.interceptors.response.use(
    (response) => {
      H.track("api_response", {
        tags: { type: "api_response" },
        url: response.config.url,
        status: response.status,
        timestamp: new Date().toISOString(),
      });
      return response;
    },
    (error) => {
      const requestInfo = {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        timestamp: new Date().toISOString(),
      };

      if (error.response?.status === 401) {
        const token = TokenManager.getToken();
        H.error(new Error("API 401 Error"), {
          tags: { type: "api_error", status: "401" },
          severity: "error",
          ...requestInfo,
          hasToken: !!token,
          isTokenValid: TokenManager.isTokenValid(token),
          tokenExpiry: token ? TokenManager.getTokenExpiryTime(token) : null,
          errorMessage: error.response?.data?.message || error.message,
        });

        clearLoggedInState({});
        Router.push("/login");
      } else {
        H.error(error, {
          tags: { type: "api_error" },
          severity: "error",
          ...requestInfo,
        });
      }

      return Promise.reject(error);
    }
  );

  return client;
}

// const api = axios.create();
// export it

// api.wildflowerschools.org follows the JSON API spec, which means that
// we often have to rehydrate the relationships with the included objects.
// This is an example:
// data = { data: {
//           id: 1,
//           type: 'process',
//           attributes: {...},
//           relationships: {
//             steps: {data: [{id: 1, type: 'step'}, {id: 2, type: 'step'}...}] }
//           },
//         },
//          included: [ {id: 1,  type: 'step', attributes: {...}, relationships: {...} },
//                      {id: 2,  type: 'step', attributes: {...}, relationships: {...} } ],
//       }

// Loads the relationships from the included array.  Does not recursively load relationships.
// So if an included object has relationships, those relationships need to be pulled out of the included array.
// Modifies data object.
function loadAllRelationshipsFromIncluded(data) {
  const arrayOrObject = data.data;
  const included = data.included;

  if (Array.isArray(arrayOrObject)) {
    arrayOrObject.forEach((e) => {
      loadAllRelationships(e, included);
    });
  } else if (
    typeof arrayOrObject === "object" &&
    arrayOrObject.constructor === Object
  ) {
    loadAllRelationships(arrayOrObject, included);
  }
}

// recursively loads relationship data.  side effect: modifies objectWithRelationships
// never go more than 2 deep to avoid circular dependencies; most relationships will never need more
function loadAllRelationships(objectWithRelationships, included, depth = 0) {
  // console.log("depth", depth);
  if (depth > 2) return;

  if (!objectWithRelationships.relationships) return;

  const relationshipKeys = Object.keys(objectWithRelationships.relationships);
  relationshipKeys.forEach((relationshipKey) => {
    // console.log("relationship", relationshipKey);
    let relationshipData =
      objectWithRelationships.relationships[relationshipKey].data;
    let loadedData = loadRelationshipsFromIncluded(relationshipData, included);

    // console.log("loadedData", loadedData);
    // recursively load relationships from new data.
    if (Array.isArray(loadedData)) {
      loadedData.forEach((e) => {
        loadAllRelationships(e, included, depth + 1);
      });
    } else if (
      loadedData &&
      typeof loadedData === "object" &&
      loadedData.constructor === Object
    ) {
      loadAllRelationships(loadedData, included, depth + 1);
    }

    // put this back into the data key, side effect
    objectWithRelationships.relationships[relationshipKey].data = loadedData;
  });
}

// returns same relationshipData but augmented with data from included; no side effects
function loadRelationshipsFromIncluded(relationshipData, included) {
  let loadedData;
  if (Array.isArray(relationshipData)) {
    loadedData = relationshipData.map(
      (e) => lookupIncluded(included, e.id, e.type) || e
    ); // if we don't find it in included, just keep the same element.
  }
  // Is an object literal? https://www.w3docs.com/snippets/javascript/how-to-check-if-a-value-is-an-object-in-javascript.html
  else if (
    relationshipData &&
    typeof relationshipData === "object" &&
    relationshipData.constructor === Object
  ) {
    loadedData =
      lookupIncluded(included, relationshipData.id, relationshipData.type) ||
      relationshipData;
  }
  return loadedData;
}

function lookupIncluded(included, id, type) {
  return included.find((i) => i.id === id && i.type === type);
}

async function handleErrors(error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    if (error.response.status === 401) {
      clearLoggedInState({});
      // setCurrentUser(null);
      Router.push("/login");
    }
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  throw error;
}

export default {
  register,
  loadRelationshipsFromIncluded,
  loadAllRelationshipsFromIncluded,
  lookupIncluded,
  handleErrors,
};
