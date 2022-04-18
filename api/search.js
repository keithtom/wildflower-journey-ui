// just make the api call to end points.
import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3001/v1/people/search.json",
  baseURL: "https://api.wildflowerschools.org/v1/people/search",
  timeout: 3000,
  mode: 'no-cors',
  headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
  },
});
