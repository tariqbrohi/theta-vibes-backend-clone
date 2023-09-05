const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer");
const channelController = require("../controllers/channel.controller");
const authState = require("../middlewares/authState");

router.post(
  "/create-channel",
  authState.verifyTokenAndAttachUser,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  channelController.createChannel
);

router.get(
  "/get-channel/:channelId",
  authState.verifyTokenAndAttachUser,
  channelController.getChannel
);

router.put(
  "/update-channel/:channelId",
  authState.verifyTokenAndAttachUser,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  channelController.updateChannel
);

router.delete(
  "/delete-channel/:channelId",
  authState.verifyTokenAndAttachUser,
  channelController.deleteChannel
);

router.get(
  "/get-all-channels",
  authState.verifyTokenAndAttachUser,
  channelController.getAllChannels
);

router.get(
  "/get-channel",
  authState.verifyTokenAndAttachUser,
  channelController.getChannelByUserId
);

module.exports = router;
