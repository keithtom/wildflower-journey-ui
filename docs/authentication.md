# Authentication
When a user logs in successfully, the API responds with a JWT in the header, which the client side saves in a cookie.
The app makes authenticated requests to the API by attaching a JWT to the auth header of every request. 

We use axios 