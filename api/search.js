import wildflowerApi from "@api/base";

const peopleSearchApi = wildflowerApi.register("/v1/people/search", {});

async function search(query, params={}, filter={}) {
  // general search interface? right now it is grouped by resource like people
  // but can imagine this hitting multiple endpoitns for multiple resources and aggregating results.
  
  const response = await peopleSearchApi.get(`?search%5Bq%5D=${query}`);
  return response;
  // load resources from included
}

export default {search};


