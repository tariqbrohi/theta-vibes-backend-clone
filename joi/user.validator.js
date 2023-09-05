const STATUS = require("../constant/status.constant");
const userSchema = require("./user.schema");

module.exports = {
  signUp: (req, res, next) => {
    const { error } = userSchema.signUp.validate(req.body);

    if (error) {
      // console.log(error);
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ error: error.details[0].message.toString() });
    }

    next();
  },

  signIn: (req, res, next) => {
    const { error } = userSchema.signIn.validate(req.body);

    if (error) {
      // console.log(error);
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ error: error.details[0].message.toString() });
    }

    next();
  },

  forgotPassword: (req, res, next) => {
    const { error } = userSchema.forgotPassword.validate(req.body);

    if (error) {
      // console.log(error);
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ error: error.details[0].message.toString() });
    }

    next();
  },

  updatePassword: (req, res, next) => {
    const { error } = userSchema.updatePassword.validate(req.body);

    if (error) {
      // console.log(error);
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ error: error.details[0].message.toString() });
    }

    next();
  },
};
