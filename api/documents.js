import axios from "axios";

function documentsApi(){
  const baseApi = axios.create({
    // baseURL: "http://localhost:3001/v1/people/search.json",
    baseURL: "https://api.wildflowerschools.org/v1/documents",
    timeout: 3000,
    mode: 'no-cors',
    headers: {
            'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            'Content-Type': 'application/json',
    }});

  function create({documentableType, documentableId, link}){
    return baseApi.post('', { document: {documentable_type: documentableType, documentable_id: documentableId, link: link, } });
  }

  function destroy(id){
    return baseApi.delete(`/${id}`);
  }

  return {
    create,
    destroy,
  }
}

export default documentsApi;
