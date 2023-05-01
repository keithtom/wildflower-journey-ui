# Authentication
The app makes authenticated requests to the API by attaching a JWT to the auth header of every request. When a user logs in successfully, the API responds with this JWT, which we save in a cookie.

We use axios 