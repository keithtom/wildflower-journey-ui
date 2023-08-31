import wildflowerApi from "@api/base";

const searchApi = wildflowerApi.register("/v1/search", {});

async function search(query, filters = {}, params = {}, config = {}) {
  // general search interface? right now it is grouped by resource like people
  // but can imagine this hitting multiple endpoitns for multiple resources and aggregating results.

  const { page, perPage, ...otherParams } = params;

  // add filters and params.
  const response = await searchApi.get("", {
    params: {
      q: query,
      ...filters,
      ...otherParams,
      ...config,
      page,
      per_page: perPage,
    },
  });
  return response;
  // load resources from included
}

export default { search };
