import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from "cookies-next";
import queryString from 'query-string';
import { Title1 } from '../components/dls/Title'; // TODO: do we need this?

const Auth = () => {
  const router = useRouter();
  const {
    query: { jwt },
  } = queryString.parseUrl(router.asPath);

  useEffect(() => {
    if (jwt) {
      setCookie('auth', jwt);
      window.opener.postMessage(
        {
          jwt,
          success: true,
        },
        '*'
      );
      window.close();
    }
  }, []);

  return (
    <div>
      {jwt ? (
        <Title1>Loading...</Title1>
      ) : (
        <Title1>Authentication failed</Title1>
      )}
    </div>
  );
};

export default Auth;