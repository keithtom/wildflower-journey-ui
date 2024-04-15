import { getCookie } from "cookies-next";
import wildflowerApi from "@api/base";

const tagsApi = wildflowerApi.register("/v1/tags", {});

function getAuthHeader() {
  const token = getCookie("auth");
  return { headers: { Authorization: token } };
}

// filter example: {{context: 'categories'}} or {{context: 'phase'}}
export const showTags = {
  key: (context) => `/tags?context=${Object.keys(context).join("_")}`,
  fetcher: (context) => {
    const config = getAuthHeader();
    config.params = context;
    return tagsApi
      .get(showTags.key(context), config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        wildflowerApi.handleErrors(error);
      });
  },
};
