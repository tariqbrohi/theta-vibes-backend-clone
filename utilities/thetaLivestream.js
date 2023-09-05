// thetaLivestream.js
const request = require("request");

const createLivestream = (apiKey, apiSecret) => {
  const requestData = {
    name: "demo",
    resolutions: ["160p", "240p", "360p", "720p", "source"],
    source_resolution: "720p",
    fps: 60,
  };

  const options = {
    method: "POST",
    url: "https://api.thetavideoapi.com/stream",
    headers: {
      "x-tva-sa-id": apiKey,
      "x-tva-sa-secret": apiSecret,
      "Content-Type": "application/json",
    },
    json: requestData,
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

module.exports = {
  createLivestream,
};
