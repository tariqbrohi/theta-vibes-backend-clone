const STATUS = require("../constant/status.constant");
const commentRepository = require("../repositories/comment.respository");
const mediaRepository = require("../repositories/media.repository");
const commentReplyRepository = require("../repositories/comment.respository");
const commentReplyLikeRepository = require("../repositories/comment.respository");
const userRepository = require("../repositories/user.respository");

module.exports = {
  mediaComments: async (req, res) => {
    const mediaId = req.query.mediaId;

    let mediaComments = await commentRepository.getCommentByMediaId(mediaId);

    if (!mediaComments) {
      res.status(STATUS.NOT_FOUND).json({ message: "Comments not found" });
      return;
    }
    res.status(STATUS.SUCCESS).json({
      message: "Comments found successfully",
      mediaComments,
    });
  },
  createComment: async (req, res) => {
    try {
      const { text } = req.body;
      const { mediaId, channelId } = req.query;
      const userId = req.user.id;

      if (!text) {
        res.status(STATUS.BAD_REQUEST).json({ message: "Text is required" });
        return;
      }

      const commentData = {
        text,
        mediaId,
        userId,
        mediaChannelId: channelId,
        likes: 0,
        dislikes: 0,
      };
      const newComment = await commentRepository.createComment(commentData);

      if (!newComment) {
        res.status(STATUS.BAD_REQUEST).json({ message: "Comment not created" });
        return;
      }

      const comment = {
        id: newComment.id,
        text: newComment.text,
        likes: newComment.likes,
        dislikes: newComment.dislikes,
        mediaId: newComment.mediaId,
        userId: newComment.userId,
        mediaChannelId: newComment.mediaChannelId,
      };

      res.status(STATUS.SUCCESS).json({
        message: "Comment created successfully",
        comment,
      });
    } catch (error) {
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  createCommentReply: async (req, res) => {
    const userId = req.user.id;
    const commentId = req.query.commentId;

    const { comment } = req.body;
    const user = await userRepository.getUserById(userId);

    let singleComment = await commentRepository.getSingleComment(commentId);

    if (!singleComment) {
      res.status(STATUS.UNAUTHORIZED).json({ message: `Comment not found` });
      return;
    }

    const commentReplyData = {
      text: comment,
      commentUserId: userId,
      commentId,
      likes: 0,
      dislikes: 0,
    };

    const newCommentReply = await commentRepository.createCommentReply(
      commentReplyData
    );

    if (!newCommentReply) {
      res
        .status(STATUS.UNAUTHORIZED)
        .json({ message: "Comment reply not created" });
      return;
    }
    res.status(STATUS.CREATED).json({
      message: "Comment reply created successfully",
      newCommentReply,
    });
  },

  updateComment: async (req, res) => {
    const userId = req.user.id;
    const { commentId } = req.params;
    console.log(commentId);

    const { comment } = req.body;
    const user = await userRepository.getUserById(userId);

    if (!user) {
      res.status(STATUS.UNAUTHORIZED).json({ message: `User not found` });
      return;
    }

    let singleComment = await commentRepository.getSingleComment(commentId);

    if (!singleComment) {
      res.status(STATUS.UNAUTHORIZED).json({ message: `Comment not found` });
      return;
    }

    const commentData = {
      text: comment,
      commentUserId: userId,
      commentId,
      likes: 0,
      dislikes: 0,
    };

    const updatedComment = await commentRepository.updateCommentById(
      commentId,
      commentData
    );
    if (!updatedComment) {
      res.status(STATUS.UNAUTHORIZED).json({ message: "Comment not updated" });
      return;
    }
    res.status(STATUS.CREATED).json({
      message: "Comment updated successfully",
      updatedComment,
    });
  },

  // Comment like

  likeOrDislikeComment: async (req, res) => {
    try {
      const { like, disLike } = req.body;
      const { commentId } = req.params;
      const userId = req.user.id;

      const comment = await commentRepository.getCommentById(commentId);

      if (!comment) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ message: "Comment not found" });
      }

      const commentLike =
        await commentRepository.getCommentLikeByUserIdAndCommentId(
          userId,
          commentId
        );

      if (commentLike) {
        if (like === 1 && commentLike.like === 1) {
          await commentRepository.deleteCommentLike(commentLike.id);
          await commentRepository.toggleCommentPreference(commentId, "like");

          // Get updated likes and dislikes count
          await commentRepository.getCommentById(commentId);

          const totalLikes = await commentRepository.totalCommentLikes(
            commentId
          );
          const totalDislikes = await commentRepository.totalCommentDislikes(
            commentId
          );

          return res.status(STATUS.SUCCESS).json({
            message: "Comment like removed successfully",
            totalLikes,
            totalDislikes,
          });
        } else if (disLike === 1 && commentLike.disLike === 1) {
          await commentRepository.deleteCommentLike(commentLike.id);
          await commentRepository.toggleCommentPreference(commentId, "dislike");

          // Get updated likes and dislikes count
          await commentRepository.getCommentById(commentId);

          const totalLikes = await commentRepository.totalCommentLikes(
            commentId
          );
          const totalDislikes = await commentRepository.totalCommentDislikes(
            commentId
          );

          return res.status(STATUS.SUCCESS).json({
            message: "Comment dislike removed successfully",
            totalLikes,
            totalDislikes,
          });
        } else {
          await commentRepository.updateCommentLike(commentLike.id, {
            like,
            disLike,
          });
        }
      } else {
        await commentRepository.createCommentLike({
          userId,
          commentId,
          like,
          disLike,
        });
      }

      // Update comment's likes and dislikes count
      await commentRepository.toggleCommentPreference(commentId, "like");
      await commentRepository.toggleCommentPreference(commentId, "dislike");

      // Get updated likes and dislikes count
      await commentRepository.getCommentById(commentId);

      // Prepare the response message
      let responseMessage = "";
      if (like === 1) {
        responseMessage = "Comment liked successfully";
      } else if (disLike === 1) {
        responseMessage = "Comment disliked successfully";
      }

      const totalLikes = await commentRepository.totalCommentLikes(commentId);
      const totalDislikes = await commentRepository.totalCommentDislikes(
        commentId
      );

      return res.status(STATUS.SUCCESS).json({
        message: responseMessage,
        totalLikes,
        totalDislikes,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  },

  // Comment reply like

  likeOrDislikeCommentReply: async (req, res) => {
    try {
      const { like, disLike } = req.body;
      const { commentReplyId } = req.params;
      const userId = req.user.id;

      const user = await userRepository.getUserById(userId);
      if (!user) {
        return res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
      }

      const commentReply = await commentReplyRepository.getCommentReplyById(
        commentReplyId
      ); // Replace with your actual method
      if (!commentReply) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ message: "Comment reply not found" });
      }

      const existingCommentReplyLike =
        await commentReplyLikeRepository.getCommentReplyLikeByUserIdAndCommentReplyId(
          userId,
          commentReplyId
        );

      if (like) {
        if (existingCommentReplyLike) {
          await commentReplyLikeRepository.deleteCommentReplyLike(
            existingCommentReplyLike.id
          );

          // count total likes and dislikes for comment reply and send it in response
          const totalLikes =
            await commentReplyLikeRepository.toalCommentReplyLikes(
              commentReplyId
            );
          const totalDislikes =
            await commentReplyLikeRepository.totalCommentReplyDislikes(
              commentReplyId
            );

          return res.status(STATUS.SUCCESS).json({
            message: "Like removed successfully",
            totalLikes,
            totalDislikes,
          });
        } else {
          const newLike =
            await commentReplyLikeRepository.createOrUpdateCommentReplyLike(
              userId,
              commentReplyId,
              1,
              0
            );

          // count total likes and dislikes for comment reply and send it in response
          const totalLikes =
            await commentReplyLikeRepository.toalCommentReplyLikes(
              commentReplyId
            );
          const totalDislikes =
            await commentReplyLikeRepository.totalCommentReplyDislikes(
              commentReplyId
            );

          return res.status(STATUS.SUCCESS).json({
            message: "Like added successfully",
            totalLikes,
            totalDislikes,
          });
        }
      } else if (disLike) {
        if (existingCommentReplyLike) {
          await commentReplyLikeRepository.deleteCommentReplyLike(
            existingCommentReplyLike.id
          );

          // count total likes and dislikes for comment reply and send it in response
          const totalLikes =
            await commentReplyLikeRepository.toalCommentReplyLikes(
              commentReplyId
            );
          const totalDislikes =
            await commentReplyLikeRepository.totalCommentReplyDislikes(
              commentReplyId
            );

          return res.status(STATUS.SUCCESS).json({
            message: "Dislike removed successfully",
            totalLikes,
            totalDislikes,
          });
        } else {
          const newDislike =
            await commentReplyLikeRepository.createOrUpdateCommentReplyLike(
              userId,
              commentReplyId,
              0,
              1
            );

          // count total likes and dislikes for comment reply and send it in response
          const totalLikes =
            await commentReplyLikeRepository.toalCommentReplyLikes(
              commentReplyId
            );
          const totalDislikes =
            await commentReplyLikeRepository.totalCommentReplyDislikes(
              commentReplyId
            );

          return res.status(STATUS.SUCCESS).json({
            message: "Dislike added successfully",
            totalLikes,
            totalDislikes,
          });
        }
      } else {
        return res
          .status(STATUS.BAD_REQUEST)
          .json({ message: "Invalid request" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  },
};
