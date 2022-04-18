// just make the api call to end points.
import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3001/v1/people/search.json",
  baseURL: "https://api.wildflowerschools.org/v1/people/search",
  timeout: 3000,
  mode: 'no-cors',
  headers: {
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          'Content-Type': 'application/json',
  },
});
