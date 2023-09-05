const JOI = require("joi");

module.exports = {
  signUp: JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().required(),
    firstName: JOI.string().required(),
    lastName: JOI.string().required(),
    userType: JOI.string().required(),
    country: JOI.string(),
    cityOrState: JOI.string(),
    description: JOI.string(),
    // profileImage: JOI.string(),
  }),

  signIn: JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().required(),
  }),

  forgotPassword: JOI.object({
    email: JOI.string().email().required(),
  }),

  updatePassword: JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().required(),
    code: JOI.number().min(1000000).max(9999999),
  }),
};
