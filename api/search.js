import wildflowerApi from "@api/base";

const searchApi = wildflowerApi.register("/v1/search", {});

async function search(query, filters={}, params={}, config={}) {
  // general search interface? right now it is grouped by resource like people
  // but can imagine this hitting multiple endpoitns for multiple resources and aggregating results.
  
  // add filters and params.
  const response = await searchApi.get("", {params: {q: query, ...filters, ...params, ...config }});
  return response;
  // load resources from included
}

export default {search};


