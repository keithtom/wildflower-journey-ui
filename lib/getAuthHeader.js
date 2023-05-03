import { getCookie } from 'cookies-next';

export default function getAuthHeader({req, res}) {
  const token = getCookie('auth', { req, res });
  if (token !== undefined) {
    return { headers: { Authorization: token } };
  } else {
    return null;
  }
}