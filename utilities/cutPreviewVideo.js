const ffmpeg = require("fluent-ffmpeg");
const pathToFfmpeg = require("ffmpeg-static");
const ffprobe = require("ffprobe-static");

const cutVideo = async (sourcePath, outputPath, startTime, duration) => {
  console.log("start cut video");

  await new Promise((resolve, reject) => {
    ffmpeg(sourcePath)
      .setFfmpegPath(pathToFfmpeg)
      .setFfprobePath(ffprobe.path)
      .output(outputPath)
      .setStartTime(startTime)
      .setDuration(duration)
      .withVideoCodec("copy")
      .withAudioCodec("copy")
      .on("end", function (err) {
        if (!err) {
          console.log("conversion Done");
          resolve();
        }
      })
      .on("error", function (err) {
        console.log("error: ", err);
        reject(err);
      })
      .run();
  });

  console.log("end cut video");

  return outputPath;
};

module.exports = { cutVideo };
