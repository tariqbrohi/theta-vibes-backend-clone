const SERVER = require("../constants");
const STATUS = require("../constant/status.constant");
const userRepository = require("../repositories/user.respository");
const { sendEmail } = require("../services/nodemailer");
const tokenUtils = require("../utilities/token");
const bcrypt = require("bcrypt");
const path = require("path");

const saltRounds = 10;

module.exports = {
  verifyToken: async (req, res) => {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ");
      jwt.verify(token[1], process.env.JWT_SECRET, (err, userDetails) => {
        if (err) {
          res.status(STATUS.UNAUTHORIZED).json({ message: "Invalid_Token" });
        }
      });
    } else {
      res.status(STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
  },

  signup: async (req, res) => {
    if (await userRepository.getUserByEmail(req.body.email)) {
      res.status(STATUS.CONFLICT).json({ message: "EMAIL_REGISTERED" });
      return;
    }

    const passwordHash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = passwordHash;

    let user = await userRepository.createUser(req.body);
    delete user.dataValues.password;

    const token = tokenUtils.signToken(user.dataValues, process.env.JWT_SECRET);

    let link = `${SERVER}/api/auth/users/${user.dataValues.id}/verify?token=${token}`;
    let sent = await sendEmail(
      user.dataValues.email,
      user.dataValues.firstName,
      user.dataValues.lastName,
      link
    );

    if (!sent) {
      res.status(STATUS.UNPROCESSABLE).json({
        message: `EMAIL_CANNOT_BE_SENT`,
        error: "ACCOUNT_CREATION_FAILED",
      });
      userRepository.deleteUserById(user.dataValues.id);
      return;
    }

    return res
      .status(STATUS.SUCCESS)
      .json({ message: "SUCCESS", userDetails: user });
  },

  signIn: async (req, res) => {
    if (!req.body.email) {
      res.status(STATUS.UNPROCESSABLE).json({ message: "Email missing" });
      return;
    } else if (!req.body.password) {
      res.status(STATUS.UNPROCESSABLE).json({ message: "Password missing" });
      return;
    }

    let user = await userRepository.getUserByEmail(req.body.email);

    if (!user) {
      res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    let isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );

    if (!isPasswordMatched) {
      res.status(STATUS.FORBIDDEN).json({ message: "Wrong password" });
      return;
    }

    if (!user.dataValues.isVerified) {
      res.status(STATUS.FORBIDDEN).json({
        message: "Please verify your email first and then try to Login!",
      });
      return;
    }

    delete user.dataValues.password;
    delete user.dataValues.isVerified;

    const token = tokenUtils.signToken(
      { authState: "loggedIn", id: user.dataValues.id },
      process.env.JWT_SECRET
    );

    res.status(STATUS.SUCCESS).json({
      message: "SUCCESS",
      token,
      authState: "loggedIn",
      id: user.dataValues.id,
    });
  },
  verifyEmail: async (req, res) => {
    if (!req.query.token && !tokenUtils.verify(token)) {
      res.status(STATUS.FORBIDDEN).json({ message: "INVALID_TOKEN" });
      return;
    }
    let userDetails = tokenUtils.decode(req.query.token);
    console.log(userDetails, "userDetails");

    if (Number(req.params.id) !== userDetails.id) {
      res
        .status(STATUS.FORBIDDEN)
        .json({ message: "TOKEN_DOES_NOT_BELONG_TO_USER" });
      return;
    }
    await userRepository.updateUserById(userDetails.id, {
      ...userDetails,
      isVerified: true,
    });

    res.sendFile(
      path.join(__dirname, "../assets/templates/emailVerified.html")
    );
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;

    const user = await userRepository.getUserByEmail(email);

    const n = 6;
    const sixDigitRandomNumber =
      Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);

    if (!user) {
      res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    if (!user.dataValues.isVerified) {
      res
        .status(STATUS.UNAUTHORIZED)
        .json({ message: "Please verify your email first" });
      return;
    }

    if (user) {
      let sent = await sendEmail(
        user.dataValues.email,
        user.dataValues.firstName,
        user.dataValues.lastName,
        "",
        "passwordReset",
        sixDigitRandomNumber
      );

      if (!sent) {
        res.status(STATUS.UNPROCESSABLE).json({
          message: "Email can not be sent",
          error: "Account validation failed",
        });
        return;
      }

      const updateUser = await userRepository.updateUserById(user.id, {
        passwordResetSecret: sixDigitRandomNumber,
      });

      if (!updateUser) {
        res
          .status(STATUS.UNPROCESSABLE)
          .json({ message: "Something went wrong" });
        return;
      }
      res.status(STATUS.SUCCESS).json({ message: "Email sent" });
    }
  },

  updatePassword: async (req, res) => {
    const { email, password, code } = req.body;
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    if (!user.dataValues.isVerified) {
      res
        .status(STATUS.UNAUTHORIZED)
        .json({ message: "Please verify your email first" });
      return;
    }

    if (parseInt(code) !== user.dataValues.passwordResetSecret) {
      res.status(STATUS.UNAUTHORIZED).json({ message: "Invalid code entered" });
      return;
    }

    const passwordHashed = bcrypt.hashSync(password, saltRounds);
    const updatePassword = await userRepository.updateUserById(
      user.dataValues.id,
      { password: passwordHashed }
    );

    if (!updatePassword) {
      res.status(STATUS.FORBIDDEN).json({ message: "Password not updated" });
      return;
    }

    const updatePasswordSecret = await userRepository.updateUserById(
      user.dataValues.id,
      { passwordResetSecret: null }
    );

    if (!updatePasswordSecret) {
      if (!updatePassword) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Something went wrong" });
        return;
      }
    }

    return res
      .status(STATUS.SUCCESS)
      .json({ message: "Password updated successfully" });
  },
};
