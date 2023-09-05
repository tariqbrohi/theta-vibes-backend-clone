const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notification.controller");
const authState = require("../middlewares/authState");

router.post(
  "/create-notification",
  authState.verifyTokenAndAttachUser,
  notificationController.createUserNotification
);

router.get(
  "/user-notifications",
  authState.verifyTokenAndAttachUser,
  notificationController.getUserNotifications
);

router.put(
  "/update-notification/:notificationId",
  authState.verifyTokenAndAttachUser,
  notificationController.updateUserNotification
);

module.exports = router;
