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
