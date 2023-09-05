const jwt = require("jsonwebtoken");
const tokenUtils = require("../utilities/token");
const userRepository = require("../repositories/user.respository");
const STATUS = require("../constant/status.constant");
module.exports = {
  verifyTokenAndAttachUser: (req, res, next) => {
    if (!req.headers.authorization) {
      res.status(STATUS.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      return;
    }
    let token = req.headers.authorization.split(" ");
    try {
      req.user = tokenUtils.verify(token[1], process.env.JWT_SECRET);
      userRepository.getUserById(req.user.id).then((result) => {
        if (!result) {
          res.status(STATUS.NOT_FOUND).json({ message: "USER_NOT_FOUND" });
        } else {
          next();
        }
      });
    } catch (error) {
      res.status(STATUS.UNAUTHORIZED).json({ message: "INVALID_TOKEN" });
    }
  },
  verifyToken: (req, res, next) => {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ");
      jwt.verify(token[1], process.env.JWT_SECRET, (err) => {
        if (err) {
          res
            .status(STATUS.UNAUTHORIZED)
            .json({ isValid: false, message: "INVALID_TOKEN" });
        } else {
          res
            .status(STATUS.ACCEPTED)
            .json({ isValid: true, message: "VALID_TOKEN" });
        }
      });
    } else {
      res
        .status(STATUS.UNAUTHORIZED)
        .json({ isValid: false, message: "UNAUTHORIZED" });
    }
  },
};
