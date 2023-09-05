const axios = require("axios");

const apiKey = process.env.THETA_VIDEO_API_KEY;
const apiSecret = process.env.THETA_VIDEO_API_SECRET;

const checkProgress = async (videoId) => {
  try {
    const response = await axios.get(
      `https://api.thetavideoapi.com/video/${videoId}`,
      {
        headers: {
          "x-tva-sa-id": apiKey,
          "x-tva-sa-secret": apiSecret,
        },
      }
    );

    const videoData = response.data.body.videos[0];
    const { state, sub_state, progress, playback_uri, error } = videoData;

    if (state === "success") {
      return { status: "success", progress, playback_uri };
    } else if (state === "processing") {
      return { status: "processing", progress };
    } else {
      return { status: "failed", error };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching video progress");
  }
};

module.exports = { checkProgress };
