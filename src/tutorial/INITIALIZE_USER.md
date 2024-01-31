# Initialize User

Welcome to your fourth and last step of creating a user_controlled wallet.
So far, you have:

- Got an `API Key`
- Retrieved `App ID`
- Created a user and received a `User ID`
- Acquired a `session token and an encryption key`

First of all, congrulations on making this far.
Even though, we have couple of steps for creating a user controlled wallet using api,
as you can see, when you look each part, they just consist of simple api calls.
Which is much more easier than working with web3 technologies directly.

If you don't have all the variables talked above, please go to previous lesson and complete the tasks, since every task is build upon the previous one, you cannot skip lessons.

## What Are You Doing When You Initialize A User?

Initializing a user involves the `creation of the user's wallets` and the `generation of their private keys`.

This is a necessary step before the user can engage in transactions such as sending or receiving funds, or interacting with smart contracts on the blockchain.

Despite having initialized the user and set up the wallet, the end user must still finalize the setup by establishing a pin and setting up recovery methods.

## Complete Javascript Code To Initialize User

```javascript
"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const initialize_user = async () => {
  const idempotencyKey = uuidv4(); // generates an idempotency key

  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/user/initialize",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${process.env.NEXT_PUBLIC_API_KEY}`,
      "X-User-Token": `${process.env.NEXT_PUBLIC_USER_TOKEN}`,
    },
    data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-MUMBAI"] },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("idempotency key: ", idempotencyKey);
      return response.data.data.challengeId;
    })
    .catch(function (error) {
      console.error(error);
    });
};
```

Now let's break down the code:

```javascript
"use server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
```

- `use server`: Using this statement we can make calls from the backend server. For the project, your repo is a Nextjs project. Since this is a frontend project, your api calls generally from frontend. We have not discussed this topic because this is the first time, you will be using a server side code.

- The reason the code is from `server side` is to `avoid CORS error`.
  `CORS (Cross-Origin Resource Sharing)` is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.

- A CORS error occurs when a web application tries to access resources (like a REST API) on a different domain, protocol, or port to its own. This is a security feature implemented by browsers to prevent malicious behavior.

- For example, if a script on https://example.com tries to make a request to https://api.example.com, the browser will block the request and throw a CORS error unless the API server responds with appropriate headers allowing the cross-origin request.

- So far, with the API calls, you did not have this issue. But with this one, if you simpy make the call from the frontend you will see that you will have a CORS error.

- `import { v4 as uuidv4 } from "uuid";`: This line imports the version 4 function from the uuid library and renames it to uuidv4 for use in the current file. The uuid library is used to generate universally unique identifiers (UUIDs), and version 4 generates random UUIDs.

- `import axios from "axios";` This line imports the axios library into the current file. Axios is a promise-based HTTP client for the browser and Node.js. It's used to make HTTP requests from Node.js or XMLHttpRequests from the browser, and it supports the Promise API natively.

```javascript
const idempotencyKey = uuidv4(); // generates an idempotency key

const options = {
  method: "POST",
  url: "https://api.circle.com/v1/w3s/user/initialize",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer  ${process.env.NEXT_PUBLIC_API_KEY}`,
    "X-User-Token": `${process.env.NEXT_PUBLIC_USER_TOKEN}`,
  },
  data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-MUMBAI"] },
};
```

- `const idempotencyKey = uuidv4();`: This line generates a unique idempotency key using the uuidv4 function. An idempotency key is used to prevent duplicate execution of a request. If the server receives two requests with the same idempotency key, it will only process the request once.

- `const options = {...}`: This object contains the configuration for an HTTP request that will be made using axios.

- `method: "POST"`: This specifies that the HTTP request will be a POST request.

- `url: "https://api.circle.com/v1/w3s/user/initialize"`: This is the URL that the request will be sent to.

- `headers: {...}`: This object contains the headers that will be included in the HTTP request. The headers include the content type, authorization token, and user token.

- `data: { idempotencyKey: idempotencyKey, blockchains: ["MATIC-MUMBAI"] }`: This is the data that will be sent in the body of the HTTP request. It includes the idempotency key and a list of blockchains.

### Idempotency Key

During the initialization request, you must use an idempotency key, which is a unique identifier for the request. This key ensures that if the same request is made multiple times, it doesn't result in the creation of duplicate entities.

### Blockchains

With the `blockchains: [<Blockchain>]`, we are indicating which chain we want to work with. We can choose Ethereum or Polygon(Matic). In this project you are working with `Polygon's testnet MATIC-MUMBAI`.

```javascript
return axios
  .request(options)
  .then(function (response) {
    console.log("idempotency key: ", idempotencyKey);
    return response.data.data.challengeId;
  })
  .catch(function (error) {
    console.error(error);
  });
```

- `axios.request(options)`: This line sends an HTTP request using the configuration specified in the options object.

- `.then(function (response) {...})`: This is a Promise that gets executed when the HTTP request is successful. The response object contains the server's response to the request. Inside this function, it logs the idempotency key to the console and then returns the challengeId from the response data.

- `.catch(function (error) {...})` This is another Promise that gets executed if there is an error with the HTTP request. The error object contains information about what went wrong. Inside this function, it logs the error to the console.

## What Is A Challange

- `A Challenge ID` is a unique identifier associated with a specific challenge. A challenge is a prompt for users to perform certain actions like confirming transactions or executing smart contracts when they use the Circle API for user-controlled wallets.

- When a request requiring user authorization, such as `wallet creation`, `PIN restoration`, or `transaction acceleration`, is made to the Circle API, it returns a Challenge ID. This ID must be passed to the Circle Programmable Wallets SDK, which then presents a user interface for the user to enter their PIN code or provide biometric authentication to resolve the challenge.

Once the challenge is completed, the requested transaction is executed and a response is received from the Circle API.

## Summary

In Summary there are four steps:

- First you get `session token`.
- Then you crate an `idempotency key`.
- You make the API call.
- Finally you receive the `Challange ID`.

### Important Note

`Session Tokens` (from the previous lesson), are valid form limited time.
For this reason, it does not make much sense to add them to the `.env.local` file.
The reason why you have added them to your file last time is simply because at the end of this section, you can see all the necessary variables together.

For that reason, you will be using `session token` or with the name that is used in this project, `user token` from the `.env.local`. My recommendation is that, in a real life project, you chain the previous process (acquiring the session token and encryption key) with this process.
