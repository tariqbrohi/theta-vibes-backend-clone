const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment.controller");
const authState = require("../middlewares/authState");

router.get(
  "/media-comments",
  authState.verifyTokenAndAttachUser,
  commentController.mediaComments
);
router.post(
  "/create-comment",
  authState.verifyTokenAndAttachUser,
  commentController.createComment
);

router.put(
  "/update-comment/:commentId",
  authState.verifyTokenAndAttachUser,
  commentController.updateComment
);

// router.get("/comment-replies", commentController.commentReplies);
router.post(
  "/create-comment-reply",
  authState.verifyTokenAndAttachUser,
  commentController.createCommentReply
);

router.post(
  "/like-dislike-comment/:commentId",
  authState.verifyTokenAndAttachUser,
  commentController.likeOrDislikeComment
);

router.post(
  "/like-dislike-comment-reply/:commentReplyId",
  authState.verifyTokenAndAttachUser,
  commentController.likeOrDislikeCommentReply
);

module.exports = router;
