const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authState = require("../middlewares/authState");
const { upload } = require("../middlewares/multer");

router.get("/user", authState.verifyTokenAndAttachUser, userController.getUser);

router.put(
  "/update-user",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  authState.verifyTokenAndAttachUser,

  userController.updateUser
);
// router.get(
//   "/users",
//   authState.verifyTokenAndAttachUser,
//   userController.getUsersByCategory
// );

module.exports = router;
