import { getCookie } from 'cookies-next';
import axios from "axios";

export function withJWTCapture(page) {
  return page
}


export async function getServerSideProps({ res, req }) {
  const token = getCookie('auth', res, req);
  console.log("#######################");
  console.log(token);
  axios.defaults.headers.common['Authorization'] = token;
}