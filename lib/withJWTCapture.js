import { getCookie } from "cookies-next";
import axios from "axios";

const WithJWTCapture = ({ children }) => {
  // ...
  return children;
};

export default WithJWTCapture;

export async function getServerSideProps({ query, res, req }) {
  const token = getCookie("auth", res, req);
  console.log("#######################");
  console.log(token);
  axios.defaults.headers.common["Authorization"] = token;
}

// const Page = () => (
//   <Layout content={(
//     <p>Here's a page!</p>
//   )} />
// )

// Page.getInitialProps = ({ query }) => {
//   //...
// }

// export function withJWTCapture(page) {
//   return page
// }

// export async function getServerSideProps({ res, req }) {
//   const token = getCookie('auth', res, req);
//   console.log("#######################");
//   console.log(token);
//   axios.defaults.headers.common['Authorization'] = token;
// }
