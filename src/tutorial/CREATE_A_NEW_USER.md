# Create A User

Welcome to the second step of creating a user controlled wallet.
In the previous lesson you have created an app id. At this point you should have both `app id` and the `api key`.
If you do not have them both, please complete the previous lesson and come back to this lesson.
If you have both information, let's create our first user!

## What We Mean By Creating A User

To create a user controlled wallet, obviously you need a user. This user will ultimately be the end-users of your application. We identify this user with a `User Id`. This User ID functions as the account identifier, encompassing all corresponding wallets, assets, and transactions for that specific user. Please note that, `circle does not create the user id for us`. Instead you will be generating the user id.

Now, let's see how to create a user.

## Complete Javascript Code To Create A User

```javascript
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const create_a_new_user = async () => {
  const userId = uuidv4();

  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    data: { userId: userId },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("user id: ", userId);
      console.log("status:", response.request.status);
      return {
        userId: userId,
        status: response.request.status,
      };
    })
    .catch(function (error) {
      console.error(error);
    });
};
```

Now, let's understand this code step by step.

```javascript
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
```

Again, as you did for getting the App ID, you will be using the Axios library to create api calls.
Additionally, as you may noticed, we are importing a library called `uuid`.
Sure, let's break it down:

The `uuid` library is used to generate universally unique identifiers (UUIDs). Version 4 UUIDs are randomly generated and are often used when you need a unique identifier that doesn't contain any sensitive or identifiable information.

That is how you will be generating unique User IDs.

```javascript
const userId = uuidv4();

const options = {
  method: "POST",
  url: "https://api.circle.com/v1/w3s/users",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  data: { userId: userId },
};
```

Like you did on the previous lesson to create an api call to get the app id, this part of the code creates the necessary options for the api call.

- `const userId = uuidv4();`: This line is generating a new, random UUID using the uuidv4 function from the uuid library. This UUID is being stored in the userId constant and will be used as a unique identifier for a user.

- `method: "POST"`: This specifies that the HTTP request will be a POST request. POST requests are used to send data to a server to create a new resource.

- `url: "https://api.circle.com/v1/w3s/users"`: This is the URL that the HTTP request will be sent to. It's an API endpoint for creating new users.

- `` headers: { "Content-Type": "application/json", Authorization: \Bearer ${process.env.NEXT_PUBLIC_API_KEY}` } ``: These are the HTTP headers that will be included in the request. The `Content-Typeheader` is telling the server that the data being sent is in JSON format. `TheAuthorization header` is including a bearer token for authentication. The token is being read from an environment variable.

- `data: { userId: userId }`: This is the data that will be sent in the body of the HTTP request. It's an object that contains the generated userId. The server will use this userId to create a new user.

```javascript
return axios
  .request(options)
  .then(function (response) {
    console.log("user id: ", userId);
    console.log("status:", response.request.status);
    return {
      userId: userId,
      status: response.request.status,
    };
  })
  .catch(function (error) {
    console.error(error);
  });
```

- `axios.request(options)`: This line is making an HTTP request using axios. The options object passed to the request method contains the configuration for the HTTP request (like the URL, method, headers, and data).

- `.then(function (response) {...})`: This is a promise chain. When the axios.request promise resolves (i.e., the HTTP request completes successfully), the function inside then is called with the response from the server. The response object contains various information about the server's response, including the status code, headers, and data.

Inside this function, it's logging the userId and the status code of the response (response.request.status). Then, it's returning an object containing the userId and the status code. This object will be the resolved value of the promise returned by this entire axios.request().then().catch() chain.

- `.catch(function (error) {...})`: This is another part of the promise chain. If the axios.request promise rejects (i.e., the HTTP request fails for some reason), the function inside catch is called with the error that caused the promise to reject.

Inside this function, it's logging the error to the console. If an error occurs during the HTTP request, this catch block will handle it and prevent it from causing an unhandled promise rejection.

## Summary

In summary your code consist of three parts:

1. Where you `generate the User ID`.

2. Where you `create the options for the api call`.

3. Where you `make the api call using your api key`.
