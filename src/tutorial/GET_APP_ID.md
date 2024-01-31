# Getting the App Id

Welcome to the first step of creating a user controlled wallet.
Do not worry, it will be a smooth sailing.

## Quick Reminder on App Id

An app id is a unique identifier assigned to your application that allows you to configure and manage various settings specific to your user-controlled wallet integration. The app id is essential for identifying your application and enabling communication with the Circle Platform APIs.

## Javascript Code for Getting App Id

```javascript
import axios from "axios";

export const get_app_id = async () => {
  const options = {
    method: "GET",
    url: "https://api.circle.com/v1/w3s/config/entity",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data.data.appId;
    })
    .catch(function (error) {
      console.error(error);
    });
};
```

Before you say anything, let's break down this code and explain what each part of the code does.

```javascript
import axios from "axios";
```

Here, you will use the axios library for making api calls.

```javascript
const options = {
  method: "GET",
  url: "https://api.circle.com/v1/w3s/config/entity",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
};
```

This code defines an object named `options` which is used to configure an `HTTP request`.

- `method: "GET"`: This specifies the HTTP method to be used for the request. In this case, it's a GET request which is used to retrieve data from a specified resource.

- `url: "https://api.circle.com/v1/w3s/config/entity"`: This is the URL of the resource that the request will be sent to.

- `headers`: This is an object that contains any HTTP headers that you want to include in your request. In this case, two headers are included:

1. `Content-Type: "application/json"`: This tells the server that the request will be sending JSON data.

2. `Authorization: Bearer ${process.env.NEXT_PUBLIC_API_KEY}`: This is used for authorization. It includes a bearer token, which is a method of authentication. The token is stored in an environment variable NEXT_PUBLIC_API_KEY. The Bearer keyword is a HTTP authentication scheme that involves security tokens called bearer tokens.

```javascript
return axios
  .request(options)
  .then(function (response) {
    return response.data.data.appId;
  })
  .catch(function (error) {
    console.error(error);
  });
```

This code uses the axios library to send an HTTP request. The options object, that is defined above, specifies the details of the request (like the URL, HTTP method, headers, etc.).

- `axios.request(options)`: This sends an HTTP request based on the options provided. It returns a Promise that resolves to the response of the request.

- `.then(function (response) { return response.data.data.appId; })`: This is a Promise chain. If the request is successful, the function inside the then block is executed. The response object contains information about the server's response, including the status, headers, and data. In this case, it's extracting the appId from the response data.

- `.catch(function (error) { console.error(error); })`: If the request fails for any reason (like a network error, or the server returns an error status), the function inside the catch block is executed. This function logs the error to the console.

## Summary

In summary your code consist of two parts:

1. Where you `create the options for the api call`.

2. Where you `make the api call using your api key`.
