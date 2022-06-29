import axios from "axios";


function adviceApi({personId, id}){
  const baseApi = axios.create({
    // baseURL: "http://localhost:3001/v1/people/search.json",
    baseURL: "https://api.wildflowerschools.org/v1/advice",
    timeout: 3000,
    mode: 'no-cors',
    headers: {
            'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            'Content-Type': 'application/json',
    }});

  function index(){
    return baseApi.get(`/people/${personId}/decisions`);
  }

  function create({title, role}){
    return baseApi.post(`/decisions`, {title: title, role: role, });
  }

  function show(){
    return baseApi.get(`/decisions/${id}`);
  }

  function update({context, proposal}){
    return baseApi.put(`/decisions/${id}`, {decision: {context: context, proposal: proposal, }});
  }

  function open() {
    baseApi.put(`/decisions/${id}/open`);
  }

  function amend() {
    return baseApi.put(`/decisions/${id}/amend`);
  }

  function close() {
    baseApi.put(`/decisions/${id}/close`);
  }

  function addStakeholder(){
    // stakeholder ID
    baseApi.post(`/decisions/${id}/stakeholders`);
  }

  function removeStakeholder({stakeholderId}){
    // needs specific ID, and should only apply for certain states...
    return baseApi.delete(`/decisions/${id}/stakeholders/${stakeholderId}`);
  }

  function createMessage(){
    // needs specific data
    return baseApi.post(`/decisions/${id}/messages`);
  }

  return {
    index,
    create,
    show,
    update,
    open,
    amend,
    close,
    addStakeholder,
    removeStakeholder,
    createMessage
  }

}

export default adviceApi;
