const STATUS = require("../constant/status.constant");
const likeRepository = require("../repositories/like.respository");
const mediaRepository = require("../repositories/media.repository");
const userRespository = require("../repositories/user.respository");

module.exports = {
  createLikeOrDislike: async (req, res) => {
    try {
      const { like, disLike, mediaId } = req.body;
      const userId = req.user.id;

      const user = await userRespository.getUserById(userId);
      if (!user) {
        return res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
      }

      const media = await mediaRepository.getSingleMedia(mediaId);
      if (!media) {
        return res
          .status(STATUS.NOT_FOUND)
          .json({ message: "Media not found" });
      }

      const existingLike = await likeRepository.existingLike(userId, mediaId);
      const existingDislike = await likeRepository.existingDislike(
        userId,
        mediaId
      );

      if (like) {
        if (existingLike) {
          await likeRepository.deleteLike(userId, mediaId);

          // count total likes and dislikes for media and send it in response
          const totalLikes = await likeRepository.totalLikes(mediaId);
          const totalDislikes = await likeRepository.totalDislikes(mediaId);
          const totalLikesAndDislikes = {
            totalLikes,
            totalDislikes,
          };

          return res.status(STATUS.SUCCESS).json({
            message: "Like removed successfully",
            totalLikes: totalLikesAndDislikes.totalLikes,
            totalDislikes: totalLikesAndDislikes.totalDislikes,
          });
        } else {
          if (existingDislike) {
            await likeRepository.deleteDislike(userId, mediaId);
          }
          const newLike = await likeRepository.createLikeOrDislike({
            like: 1,
            disLike: 0,
            mediaId,
            userId,
          });
          // count total likes and dislikes for media and send it in response
          const totalLikes = await likeRepository.totalLikes(mediaId);
          const totalDislikes = await likeRepository.totalDislikes(mediaId);
          const totalLikesAndDislikes = {
            totalLikes,
            totalDislikes,
          };

          return res.status(STATUS.SUCCESS).json({
            message: "Like added successfully",
            totalLikes: totalLikesAndDislikes.totalLikes,
            totalDislikes: totalLikesAndDislikes.totalDislikes,
          });
        }
      } else if (disLike) {
        if (existingDislike) {
          await likeRepository.deleteDislike(userId, mediaId);

          // count total likes and dislikes for media and send it in response
          const totalLikes = await likeRepository.totalLikes(mediaId);
          const totalDislikes = await likeRepository.totalDislikes(mediaId);
          const totalLikesAndDislikes = {
            totalLikes,
            totalDislikes,
          };

          return res.status(STATUS.SUCCESS).json({
            message: "Dislike removed successfully",
            totalLikes: totalLikesAndDislikes.totalLikes,
            totalDislikes: totalLikesAndDislikes.totalDislikes,
          });
        } else {
          if (existingLike) {
            await likeRepository.deleteLike(userId, mediaId);
          }
          const newDislike = await likeRepository.createLikeOrDislike({
            like: 0,
            disLike: 1,
            mediaId,
            userId,
          });

          // count total likes and dislikes for media and send it in response
          const totalLikes = await likeRepository.totalLikes(mediaId);
          const totalDislikes = await likeRepository.totalDislikes(mediaId);
          const totalLikesAndDislikes = {
            totalLikes,
            totalDislikes,
          };

          return res.status(STATUS.SUCCESS).json({
            message: "Dislike added successfully",
            totalLikes: totalLikesAndDislikes.totalLikes,
            totalDislikes: totalLikesAndDislikes.totalDislikes,
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

  getLikeByUserIdAndMediaId: async (req, res) => {
    const mediaId = req.query.mediaId;
    const userId = req.user.id;

    let like = await likeRepository.getLikeByUserIdAndMediaId(userId, mediaId);
    if (!like) {
      res.status(STATUS.NOT_FOUND).json({ message: "Like not found" });
      return;
    }
    res.status(STATUS.SUCCESS).json({
      message: "Like found successfully",
      like,
    });
  },
  getLikesByMediaId: async (req, res) => {
    const mediaId = req.query.mediaId;

    let likes = await likeRepository.getLikesByMediaId(mediaId);
    if (!likes) {
      res.status(STATUS.NOT_FOUND).json({ message: "Likes not found" });
      return;
    }
    res.status(STATUS.SUCCESS).json({
      message: "Likes found successfully",
      likes,
    });
  },
};
