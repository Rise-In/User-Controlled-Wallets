export const get_app_id_code = () => {
  return `
        import axios from "axios";

export const get_app_id = async () => {
  const options = {
    method: "GET",
    url: "https://api.circle.com/v1/w3s/config/entity",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${process.env.NEXT_PUBLIC_API_KEY}\`,
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
    `.trim();
};

export const create_a_new_user_code = () => {
  return `
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const create_a_new_user = async () => {
  const userId = uuidv4();

  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${process.env.NEXT_PUBLIC_API_KEY}\`,
    },
    data: { userId: userId },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("user id: ", userId);
      console.log("status:", response.request.status)
      return {
        userId: userId,
        status: response.request.status,
      };
    })
    .catch(function (error) {
      console.error(error);
    });
};
  `.trim();
};

export const acquire_session_token_code = () => {
  return `
import axios from "axios";

export const acquire_session_token = async () => {
  
  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/users/token",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${process.env.NEXT_PUBLIC_API_KEY}\`,
    },
    data: { userId: process.env.NEXT_PUBLIC_USER_ID },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("user token:", response.data.data.userToken);
      console.log("encryption key:", response.data.data.encryptionKey);
      return {
        userToken: response.data.data.userToken,
        encryptionKey: response.data.data.encryptionKey,
      };
    })
    .catch(function (error) {
      console.error(error);
    });

};
`.trim();
};

export const initialize_user_code = () => {
  return `
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
      Authorization: \`Bearer  ${process.env.NEXT_PUBLIC_API_KEY}\`,
      "X-User-Token": \`\${process.env.NEXT_PUBLIC_USER_TOKEN}\`,
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
  `.trim();
};

export const create_wallet_code = () => {
  return `
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'

const sdk = new W3SSdk()

sdk.setAppSettings({
  appId: '<Your App Id>',
})
sdk.setAuthentication({
  userToken: '<Your user token>',
  encryptionKey: '<Your encryption key>',
})

sdk.execute(challengeId, (error, result) => {
  if (error) {
    console.log(
      \`\${error?.code?.toString() || "Unknown code"}: \${
        error?.message ?? 'Error!'
      }\`
    )

    return
  }

  console.log(\`Challenge: \${result.type}\`)
  console.log(\`status: \${result.status}\`)

  if (result.data) {
    console.log(\`signature: \${result.data?.signature}\`)
  }
})
  `.trim();
};
