require("dotenv").config("../.env");
module.exports = SERVER =
  process.env.NODE_ENV === "production"
    ? `${process.env.PRODUCTION_BASE_URL}`
    : process.env.NODE_ENV === "staging"
    ? `${process.env.STAGING_BASE_URL}`
    : process.env.NODE_ENV === "development"
    ? `${process.env.DEVELOPMENT_BASE_URL}`
    : `${process.env.LOCAL_BASE_URL}`;
