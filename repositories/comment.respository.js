const models = require("../models");
const Comment = models.Comment;
const CommentReply = models.Comment_Reply;
const CommentLikes = models.Comment_Likes;
const CommentReplyLikes = models.Comment_Reply_Likes;

module.exports = {
  createComment: async (body) => await models.Comment.create(body),

  toggleCommentPreference: async (commentId, preference) => {
    try {
      const comment = await Comment.findOne({ where: { id: commentId } });

      if (!comment) {
        throw new Error("Comment not found");
      }

      if (preference === "like") {
        if (comment.likes > 0) {
          comment.likes -= 1; // Remove like
        } else {
          comment.likes += 1; // Add like
          if (comment.dislikes > 0) {
            comment.dislikes -= 1; // If already disliked, remove dislike
          }
        }
      } else if (preference === "dislike") {
        if (comment.dislikes > 0) {
          comment.dislikes -= 1; // Remove dislike
        } else {
          comment.dislikes += 1; // Add dislike
          if (comment.likes > 0) {
            comment.likes -= 1; // If already liked, remove like
          }
        }
      } else {
        throw new Error("Invalid preference");
      }

      await comment.save();
      return comment;
    } catch (error) {
      throw error;
    }
  },
  totalCommentOfMedia: async (mediaId) => {
    return await Comment.count({ where: { mediaId } });
  },
  totalCommentReplyOfComment: async (commentId) => {
    return await CommentReply.count({ where: { commentId } });
  },
  totalCommentReplyOfMedia: async (mediaId) => {
    return await CommentReply.count({ where: { mediaId } });
  },

  getComments: async () => await models.Comment.findAll(),
  getCommentById: async (id) => await models.Comment.findOne({ where: { id } }),
  getCommentByUserId: async (userId) =>
    await models.Comment.findOne({ where: { userId } }),
  getCommentByUserIdAndCommentId: async (userId, commentId) =>
    await models.Comment.findOne({ where: { userId, id: commentId } }),
  getCommentByMediaIdAndCommentId: async (mediaId, commentId) =>
    await models.Comment.findOne({ where: { mediaId, id: commentId } }),
  updateCommentById: async (id, body) =>
    await models.Comment.update(body, { where: { id } }),
  updateComment: async (body) => await models.Comment.update(body),
  deleteCommentById: async (id) =>
    await models.Comment.destroy({ where: { id } }),
  getCommentByUserIdAndMediaId: async (userId, mediaId) => {
    return await models.Comment.findOne({ where: { userId, mediaId } });
  },
  getMediaCommentLikeCount: async () => {
    return await CommentLikes.findAndCountAll();
  },
  getCommentByMediaId: async (mediaId) => {
    return await models.Comment.findAll({
      where: { mediaId },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: {
            exclude: [
              "password",
              "isVerified",
              "country",
              "cityOrState",
              "description",
              "passwordResetSecret",
              "createdAt",
              "updatedAt",
              "isAdmin",
              "isContentCreator",
              "email",
            ],
          },
        },

        {
          model: models.Comment_Reply,
          include: [
            {
              model: models.User,
              as: "userCommentReply",
              attributes: {
                exclude: [
                  "password",
                  "isVerified",
                  "country",
                  "cityOrState",
                  "description",
                  "passwordResetSecret",
                  "createdAt",
                  "updatedAt",
                  "isAdmin",
                  "isContentCreator",
                  "email",
                ],
              },
            },
          ],
        },
      ],

      order: [["createdAt", "DESC"]],

      // attributes: {
      //   exclude: [
      //     "USER_email",
      //     "MEDIA_CHANNEL_id",
      //     "MEDIA_id",
      //     "updatedAt",
      //     "userId",
      //   ],
      // },
    });
  },

  mediaComments: async (id) => {
    try {
      const comments = await User.findAll({
        attributes: {
          exclude: [
            "password",
            "isVerified",
            "country",
            "cityOrState",
            "description",
            "passwordResetSecret",
            "createdAt",
            "updatedAt",
          ],
        },
        include: {
          model: Comment,
          where: { MEDIA_id: id },
          attributes: {
            exclude: [
              "USER_email",
              "MEDIA_CHANNEL_id",
              "MEDIA_id",
              "updatedAt",
            ],
          },
          include: {
            model: CommentReply,
            attributes: {
              exclude: ["COMMENTS_USER_email", "COMMENTS_id", "updatedAt"],
            },
          },
        },
      });

      return comments;
    } catch (error) {
      throw error;
    }
  },

  createComment: async (body) => await Comment.create(body),

  createCommentReply: async (body) => CommentReply.create(body),

  getSingleComment: async (id) => await Comment.findOne({ where: { id } }),

  likeDislikeComment: async (body, id) => {
    return await Comment.update(body, { where: { id } });
  },

  getCommentByUserIdAndMediaId: async (userId, mediaId) => {
    return await models.Comment.findOne({ where: { userId, mediaId } });
  },

  // CommentLikes table
  createCommentLike: async (body) => await CommentLikes.create(body),
  createOrUpdateCommentLike: async (userId, commentId, like, disLike) => {
    const existingLike = await CommentLikes.findOne({
      where: { userId, commentId },
    });

    if (existingLike) {
      await CommentLikes.update(
        { like, disLike },
        { where: { userId, commentId } }
      );
      return await CommentLikes.findOne({ where: { userId, commentId } });
    } else {
      return await CommentLikes.create({ userId, commentId, like, disLike });
    }
  },
  getCommentLikeByUserIdAndCommentId: async (userId, commentId) => {
    return await CommentLikes.findOne({ where: { userId, commentId } });
  },
  deleteCommentLike: async (id) => {
    return await CommentLikes.destroy({ where: { id } });
  },
  updateCommentLike: async (id, body) => {
    return await CommentLikes.update(body, { where: { id } });
  },
  getCommentLikeById: async (id) => {
    return await CommentLikes.findOne({ where: { id } });
  },
  getCommentLikeByCommentId: async (commentId) => {
    return await CommentLikes.findAll({ where: { commentId } });
  },

  totalCommentLikes: async (commentId) => {
    // Get the total number of likes
    const totalLikes = await CommentLikes.count({
      where: {
        commentId: commentId,
        like: 1,
      },
    });
    return totalLikes;
  },

  totalCommentDislikes: async (commentId) => {
    // Get the total number of dislikes
    const totalDislikes = await CommentLikes.count({
      where: {
        commentId: commentId,
        disLike: 1,
      },
    });
    return totalDislikes;
  },

  // CommentReplyLikes table

  createCommentReplyLike: async (body) => await CommentReplyLikes.create(body),

  createOrUpdateCommentReplyLike: async (
    userId,
    commentReplyId,
    like,
    disLike
  ) => {
    const existingLike = await CommentReplyLikes.findOne({
      where: { userId, commentReplyId },
    });

    if (existingLike) {
      await CommentReplyLikes.update(
        { like, disLike },
        { where: { userId, commentReplyId } }
      );
      return await CommentReplyLikes.findOne({
        where: { userId, commentReplyId },
      });
    } else {
      return await CommentReplyLikes.create({
        userId,
        commentReplyId,
        like,
        disLike,
      });
    }
  },

  getCommentReplyLikeByUserIdAndCommentReplyId: async (
    userId,
    commentReplyId
  ) => {
    return await CommentReplyLikes.findOne({
      where: { userId, commentReplyId },
    });
  },

  deleteCommentReplyLike: async (id) => {
    return await CommentReplyLikes.destroy({ where: { id } });
  },

  createOrUpdateCommentReplyLike: async (
    userId,
    commentReplyId,
    like,
    disLike
  ) => {
    const existingLike = await CommentReplyLikes.findOne({
      where: { userId, commentReplyId },
    });

    if (existingLike) {
      await CommentReplyLikes.update(
        { like, disLike },
        { where: { userId, commentReplyId } }
      );
      return await CommentReplyLikes.findOne({
        where: { userId, commentReplyId },
      });
    } else {
      return await CommentReplyLikes.create({
        userId,
        commentReplyId,
        like,
        disLike,
      });
    }
  },
  getCommentReplyLikeByUserIdAndCommentReplyId: async (
    userId,
    commentReplyId
  ) => {
    return await CommentReplyLikes.findOne({
      where: { userId, commentReplyId },
    });
  },
  deleteCommentReplyLike: async (id) => {
    return await CommentReplyLikes.destroy({ where: { id } });
  },
  updateCommentReplyLike: async (id, body) => {
    return await CommentReplyLikes.update(body, { where: { id } });
  },
  getCommentReplyLikeById: async (id) => {
    return await CommentReplyLikes.findOne({ where: { id } });
  },
  getCommentReplyById: async (id) => {
    return await CommentReply.findOne({ where: { id } });
  },
  getMediaCommentReplyLikeCount: async () => {
    return await CommentLikes.findAndCountAll();
  },

  toalCommentReplyLikes: async (commentReplyId) => {
    // Get the total number of likes
    const totalLikes = await CommentReplyLikes.count({
      where: {
        commentReplyId: commentReplyId,
        like: 1,
      },
    });
    return totalLikes;
  },

  totalCommentReplyDislikes: async (commentReplyId) => {
    // Get the total number of dislikes
    const totalDislikes = await CommentReplyLikes.count({
      where: {
        commentReplyId: commentReplyId,
        disLike: 1,
      },
    });
    return totalDislikes;
  },

  // toggleCommentReplyPreference: async (commentReplyId, preference) => {
  //   try {
  //     const commentReply = await CommentReply.findOne({
  //       where: { id: commentReplyId },
  //     });

  //     if (!commentReply) {
  //       throw new Error("Comment reply not found");
  //     }

  //     if (preference === "like") {
  //       if (commentReply.likes > 0) {
  //         commentReply.likes -= 1; // Remove like
  //       } else {
  //         commentReply.likes += 1; // Add like
  //         if (commentReply.dislikes > 0) {
  //           commentReply.dislikes -= 1; // If already disliked, remove dislike
  //         }
  //       }
  //     } else if (preference === "dislike") {
  //       if (commentReply.dislikes > 0) {
  //         commentReply.dislikes -= 1; // Remove dislike
  //       } else {
  //         commentReply.dislikes += 1; // Add dislike
  //         if (commentReply.likes > 0) {
  //           commentReply.likes -= 1; // If already liked, remove like
  //         }
  //       }
  //     } else {
  //       throw new Error("Invalid preference");
  //     }

  //     await commentReply.save();
  //     return commentReply;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};
