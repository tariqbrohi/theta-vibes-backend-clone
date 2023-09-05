const request = require("request");
const fs = require("fs");

const uploadVideo = async (filePath, apiKey, apiSecret) => {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: "https://api.thetavideoapi.com/upload",
        headers: {
          "x-tva-sa-id": apiKey,
          "x-tva-sa-secret": apiSecret,
          "Content-Type": "application/json",
        },
      },
      async (err, response, body) => {
        if (err) {
          reject(new Error({ message: "Error uploading video" }));
        } else {
          try {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody); // Check the structure of parsedBody
            const source_upload_id = parsedBody.body.uploads[0].id;
            const presigned_url = parsedBody.body.uploads[0].presigned_url;

            const videoFileStream = fs.createReadStream(filePath);

            var options = {
              method: "PUT",
              url: presigned_url,
              headers: {
                "Content-Type": "application/octet-stream",
              },
              body: videoFileStream,
            };

            request(options, function (error, uploadResponse) {
              if (error) reject(error);
              console.log(uploadResponse.body);

              var thetaOptions = {
                method: "POST",
                url: "https://api.thetavideoapi.com/video",
                headers: {
                  "x-tva-sa-id": apiKey,
                  "x-tva-sa-secret": apiSecret,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  source_upload_id: source_upload_id,
                  playback_policy: "public",
                }),
              };

              request(thetaOptions, function (thetaError, thetaResponse) {
                if (thetaError) reject(thetaError);
                console.log(thetaResponse.body, "response");

                try {
                  const responseBody = JSON.parse(thetaResponse.body);
                  const id = responseBody.body.videos[0].id;
                  console.log(id, "id");
                  resolve({ id });
                } catch (parseError) {
                  reject(parseError);
                }
              });
            });
          } catch (parseError) {
            reject(parseError);
          }
        }
      }
    );

    console.log("1");
  });
};

module.exports = {
  uploadVideo,
};
