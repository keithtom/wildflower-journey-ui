# Authentication
When a user logs in successfully, the API responds with a JWT in the header, which the client saves in a cookie. The app can then make authenticated requests to the API by attaching a JWT to the auth header of every request. 

From the server side (aka in `getServerSideProps`), our current pattern is to attach the header to each individual request. In the future, we will refactor to get rid of the call to `getServerSideProps`. Note: do not set global headers on axios in `getServerSideProps`. The Next.js is a long lived application, meaning it does not rebuild state on the server side with each request. Therefore, if you set any global variables/configs on the server side, all requests, even from different authenticated users, will have access to them.

On the client side, the jwt is set in two different places:
1. `api/base.js` When any of the api instances are registered, the jwt is set in the instance's default authorization header.
2. `useUserContext.js` The jwt is set in the global axios instance's default authorization header.
On the client side, the state of the app is rebuilt with each request. So there (theoretically) is not risk of the JWT persisting in the browser after logging out.