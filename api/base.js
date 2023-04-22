// boiler plate for API calls to api.wildflowerschools.org

import axios from "axios";
import apiUrl from "@lib/utils/baseUrl";
import { getCookie } from 'cookies-next';

const token = getCookie('auth');

// baseUrl: e.g. '/v1/workflow/'
function register(baseUrl, options) {
  let config = {
    baseURL: `${apiUrl}${baseUrl}`,
    timeout: 3000,
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Content-Type": "application/json",
    },
  }
  if (!options.noAuth) {
    config.headers["Authorization"] = token;
  }
  return axios.create(config);
};

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


// returns same relationshipData but augmented with data from included; no side effects
function loadRelationshipsFromIncluded(relationshipData, included){
  let loadedData;
  if (Array.isArray(relationshipData)){
    loadedData = relationshipData.map(e => lookupIncluded(included, e.id, e.type));
  }
  // Is an object literal? https://www.w3docs.com/snippets/javascript/how-to-check-if-a-value-is-an-object-in-javascript.html
  else if (typeof(relationshipData) === 'object' && relationshipData.constructor === Object) {
    loadedData = lookupIncluded(included, relationshipData.id, relationshipData.type);
  }
  return loadedData;
};

// Loads the relationships from the included array.  Does not recursively load relationships.
// So if an included object has relationships, those relationships need to be pulled out of the included array.
// Modifies data object.
function loadAllRelationshipsFromIncluded(data){
  const included = data.included;
  const relationshipKeys = Object.keys(data.data.relationships);
  relationshipKeys.forEach((relationshipKey) => {
    let relationshipData = data.data.relationships[relationshipKey].data;
    let loadedData = loadRelationshipsFromIncluded(relationshipData, included);
    // put this back into the data key, side effect
    data.data.relationships[relationshipKey].data = loadedData;
  });
  return data;
};


function lookupIncluded(included, id, type){
  return included.find(i => i.id === id && i.type === type);
}


export default { register, loadRelationshipsFromIncluded, loadAllRelationshipsFromIncluded };