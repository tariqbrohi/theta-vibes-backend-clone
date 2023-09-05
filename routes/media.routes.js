const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/multer");
const mediaController = require("../controllers/media.controller");
const authState = require("../middlewares/authState");

// router.post(
//   "/upload-video",
//   authState.verifyTokenAndAttachUser,
//   upload.single("file"),
//   mediaController.uploadVideo
// );

router.post(
  "/create-media",
  authState.verifyTokenAndAttachUser,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  mediaController.createMedia
);

router.get(
  "/check-progress/:videoId",
  authState.verifyTokenAndAttachUser,
  mediaController.checkProgress
);

router.get("/media", mediaController.getMedias);
router.get("/single-media", mediaController.getMedia);

// for ladning page
router.get("/media-trailer", mediaController.getSingleMediaForLandingPage);
router.get(
  "/channel-media",
  authState.verifyTokenAndAttachUser,
  mediaController.getSingleChannelMedias
);
router.get("/media-data", mediaController.getMediaWithAllData);
router.get(
  "/category-media",
  authState.verifyTokenAndAttachUser,
  mediaController.getMediaByCategory
);
router.get(
  "/categories-media",
  authState.verifyTokenAndAttachUser,
  mediaController.getMediaByCategories
);

router.get(
  "/media-types/:channelId",
  authState.verifyTokenAndAttachUser,
  mediaController.getMediasByMultipleMediaTypes
);

router.get(
  "/media-type/:channelId",
  authState.verifyTokenAndAttachUser,
  mediaController.getMediasByChannelIdAndMediaType
);

router.delete(
  "/delete-media/:mediaId",
  authState.verifyTokenAndAttachUser,
  mediaController.deleteMedia
);

router.put(
  "/update-media/:id",
  authState.verifyTokenAndAttachUser,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  mediaController.updateMediaById
);

module.exports = router;
