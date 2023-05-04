# Authentication
When a user logs in successfully, the API responds with a JWT in the header, which the client saves in a cookie. The app can then make authenticated requests to the API by attaching a JWT to the auth header of every request. 

From the server side (aka in `getServerSideProps`), our current pattern is to attach the header to each individual request. In the future, we will refactor to get rid of the call to `getServerSideProps`. Note: do not set global headers on axios in `getServerSideProps`. The Next.js is a long lived application, meaning it does not rebuild state on the server side with each request. Therefore, if you set any global variables/configs on the server side, all requests, even from different authenticated users, will have access to them.

On the client side, the jwt is set in two different places:
1. `api/base.js` When any of the api instances are registered, the jwt is set in the instance's default authorization header.
2. `useUserContext.js` The jwt is set in the global axios instance's default authorization header.
On the client side, the state of the app is rebuilt with each request. So there (theoretically) is not risk of the JWT persisting in the browser after logging out.

### Redirects to /login
User will be redirected to the `/login` page in the following scenarios:
1. There is no token to be found and a user is trying to visit a page that requires authentication
2. Whenever an unauthorized request is made, cookies will be removed and user will be removed and redirected.

In order to achieve this functionality, we implement it in two different ways.
A. Deleting the cookies. 
  1. On the client side, all axios instances have an interceptor is attached when registered. This allows axios to catch any 401 responses, and delete the logged in cookies. However, this mechanism will not work on the server side because it does not have access to the req/res object from context (Note: the req/res object from getServerSideProps context is not the same as a axios' request and response objects)
  2. On the server side, if we catch a 401 status error, we explicitly delete the logged in cookies.

B. For the redirect to login page, we handle it in two ways:
  1. If the request is made on the client side, we can call `Router.push('/login')`.
  2. If the request is made on the server side, we return a redirect object as props in the `getServerSideProps` function.
  ```
    return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
  ```
3. 


# TODO:
1. Can you go to the login page if you have a token?
2. When i'm on the login page.... do not check for user....