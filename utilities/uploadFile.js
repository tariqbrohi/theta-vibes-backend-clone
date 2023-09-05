const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  endpoint: process.env.DO_SPACES_ENDPOINT,
  s3ForcePathStyle: true, // Required for DigitalOcean Spaces
});

const s3 = new AWS.S3();

const uploadFile = async (file) => {
  try {
    const fileContent = fs.readFileSync(file.path); // Read the file content
    const uploadParams = {
      Bucket: process.env.DO_SPACES_NAME,
      Key: Date.now() + "-" + file.originalname,
      Body: fileContent, // Set the file content as the Body
      ACL: "public-read", // To make the file public
    };

    const data = await s3.upload(uploadParams).promise();
    return data.Location;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

module.exports = uploadFile;
