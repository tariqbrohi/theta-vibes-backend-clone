const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const validator = require("../joi/user.validator");
const authState = require("../middlewares/authState");

router.post("/signin", validator.signIn, authController.signIn);
router.post("/signup", validator.signUp, authController.signup);
router.get("/users/:id/verify", authController.verifyEmail);
router.post(
  "/forgot-password",
  validator.forgotPassword,
  authController.forgotPassword
);
router.post(
  "/update-password",
  validator.updatePassword,
  authController.updatePassword
);
router.get("/verify-token", authState.verifyToken);

module.exports = router;
