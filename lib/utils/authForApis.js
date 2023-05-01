// Factory function that creates the 'setAuthHeader' function for API usage.
// The created function should be called within the 'getServerSideProps' function.
// Note: An instance of Axios is already instantiated when 'getServerSideProps' is called.
function createSetAuthHeaderFactory(scopedObject) {
  function setAuthHeader(token) {
    workflowsApi.defaults.headers.common.Authorization = token;
  }

  return {
    setAuthHeader,
  };
}