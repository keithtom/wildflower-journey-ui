// just make the api call to end points.
import axios from "axios";

export default axios.create({
  baseURL: "/api/v1/people/search.json", // https://api.wildflowerschools.org/v1/people/search
  timeout: 3000,
  headers: {'Content-Type': 'application/json'},
});
