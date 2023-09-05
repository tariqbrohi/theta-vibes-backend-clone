const models = require("../models");
const LikeModel = models.Like;

module.exports = {
  // Assuming you have a database connection established and relevant models defined.

  existingLike: async (userId, mediaId) => {
    // Check if the user has already liked the media
    const existingLike = await LikeModel.findOne({
      where: {
        userId: userId,
        mediaId: mediaId,
        like: 1,
      },
    });
    return existingLike;
  },

  existingDislike: async (userId, mediaId) => {
    // Check if the user has already disliked the media
    const existingDislike = await LikeModel.findOne({
      where: {
        userId: userId,
        mediaId: mediaId,
        disLike: 1,
      },
    });
    return existingDislike;
  },

  deleteLike: async (userId, mediaId) => {
    // Delete the user's like
    await LikeModel.destroy({
      where: {
        userId: userId,
        mediaId: mediaId,
        like: 1,
      },
    });
  },

  deleteDislike: async (userId, mediaId) => {
    // Delete the user's dislike
    await LikeModel.destroy({
      where: {
        userId: userId,
        mediaId: mediaId,
        disLike: 1,
      },
    });
  },

  createLikeOrDislike: async (likeData) => {
    // Create a new like or dislike
    const newLike = await LikeModel.create(likeData);
    return newLike;
  },

  totalLikes: async (mediaId) => {
    // Get the total number of likes
    const totalLikes = await LikeModel.count({
      where: {
        mediaId: mediaId,
        like: 1,
      },
    });
    return totalLikes;
  },

  totalDislikes: async (mediaId) => {
    // Get the total number of dislikes
    const totalDislikes = await LikeModel.count({
      where: {
        mediaId: mediaId,
        disLike: 1,
      },
    });
    return totalDislikes;
  },
};

// createLikeOrDislike: async (body) => {
//   return await models.Like.create(body);
// },

// getLikeByUserIdAndMediaId: async (userId, mediaId) => {
//   return await models.Like.findOne({ where: { userId, mediaId } });
// },

// getLikesByMediaId: async (mediaId) => {
//   return await models.Like.findAll({ where: { mediaId } });
// },
// existingLike: async (userId, mediaId) => {
//   return await models.Like.findOne({ where: { userId, mediaId } });
// },
// deleteLike: async (userId, mediaId) => {
//   return await models.Like.destroy({ where: { userId, mediaId } });
// },
