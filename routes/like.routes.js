const express = require("express");
const router = express.Router();

const likeController = require("../controllers/like.controller");
const authState = require("../middlewares/authState");

router.get(
  "/media-like",
  authState.verifyTokenAndAttachUser,
  likeController.getLikeByUserIdAndMediaId
);
router.post(
  "/create-like",
  authState.verifyTokenAndAttachUser,
  likeController.createLikeOrDislike
);

// router.post(
//   "/create-comment",
//   authState.verifyTokenAndAttachUser,
//   commentController.createComments
// );

// // router.get("/comment-replies", commentController.commentReplies);
// router.post(
//   "/create-comment-reply",
//   authState.verifyTokenAndAttachUser,
//   commentController.createCommentReply
// );

// router.put(
//   "/like-dislike-comment",
//   authState.verifyTokenAndAttachUser,
//   commentController.likeDislikeComment
// );

module.exports = router;
