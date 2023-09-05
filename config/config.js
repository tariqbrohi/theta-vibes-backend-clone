require("dotenv").config("../.env");

module.exports = {
  local: {
    username: process.env.DB_USER_LOCAL,
    password: process.env.DB_PASS_LOCAL,
    database: process.env.DB_NAME_LOCAL,
    host: process.env.DB_HOST_LOCAL,
    dialect: process.env.DIALECT,
    logging: false,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  development: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT_DEV,
    logging: false,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  staging: {
    username: process.env.DB_USER_STAGING,
    password: process.env.DB_PASS_STAGING,
    database: process.env.DB_NAME_STAGING,
    host: process.env.DB_HOST_STAGING,
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT_STAGING,
    logging: false,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DB_USER_PRODUCTION,
    password: process.env.DB_PASS_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    dialect: process.env.DIALECT,
    logging: false,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
