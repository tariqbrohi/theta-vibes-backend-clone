const STATUS = require("../constant/status.constant");
const mediaRepository = require("../repositories/media.repository");
const channelRepository = require("../repositories/channel.respository");
const thumbnailsRepository = require("../repositories/thumbnail.repository");
const userRepository = require("../repositories/user.respository");
const subscriptioRepository = require("../repositories/subscription.repository");
const likeRepository = require("../repositories/like.respository");
const commentRepository = require("../repositories/comment.respository");
const tagRepository = require("../repositories/tags.respository");
const { uploadVideo } = require("../utilities/uploadVideo");
const uploadFile = require("../utilities/uploadFile");
const { checkProgress } = require("../utilities/checkVideoProgress");
const { cutVideo } = require("../utilities/cutPreviewVideo");

module.exports = {
  uploadVideo: async (req, res) => {
    try {
      const video = await uploadVideo(req.file.path);

      return res
        .status(200)
        .json({ message: "Video uploaded successfully", id: video.id });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createMedia: async (req, res) => {
    try {
      const {
        title,
        description,
        ageRestriction,
        accessType,
        mediaType,
        category,
      } = req.body;
      let video;

      const file = req.files ? req.files["file"][0] : undefined;
      const thumbnails = req.files ? req.files["thumbnail"] : undefined;
      const userId = req.user.id;
      const tags = req.body.tags ? req.body.tags : undefined;

      if (!userId) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not logged in" });
        return;
      }

      const channel = await channelRepository.getChannelByUserId(userId);

      // const thetaApiKey = channel.apiKey ? channel.apiKey : undefined;
      // const thetaApiSecret = channel.apiSecret ? channel.apiSecret : undefined;

      const thetaApiKey = "srvacc_d6bnqen96tnru1wj1mvs286hx";
      const thetaApiSecret = "3n1grkbpc545r5k7t195t978x25b688d";

      if (!channel) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "User does not have a channel" });
        return;
      }

      if (!file) {
        res.status(STATUS.NOT_FOUND).json({ message: "File not provided" });
        return;
      }

      if (!title) {
        res.status(STATUS.NOT_FOUND).json({ message: "Title not provided" });
        return;
      }

      if (!description) {
        res
          .status(STATUS.NOT_FOUND)
          .json({ message: "Description not provided" });
        return;
      }

      const videoType = file.mimetype.includes("video");
      const imageType = file.mimetype.includes("image");

      if (!videoType && !imageType) {
        res
          .status(STATUS.BAD_REQUEST)
          .json({ message: "File type not supported" });
        return;
      }

      let mediaData;
      if (videoType) {
        if (!thetaApiKey || !thetaApiSecret) {
          res
            .status(STATUS.UNAUTHORIZED)
            .json({ message: "User does not have theta keys" });
          return;
        }

        video = await uploadVideo(file.path, thetaApiKey, thetaApiSecret);

        const cutVideoPath = await cutVideo(
          file.path,
          file.path + "_cut.mp4",
          0,
          10
        );

        const previewVideoUrl = await uploadVideo(
          cutVideoPath,
          thetaApiKey,
          thetaApiSecret
        );

        mediaData = {
          title,
          description,
          file: process.env.THETA_VIDEO_API_LINK + video.id,
          videoPreview: process.env.THETA_VIDEO_API_LINK + previewVideoUrl.id,
          userId,
          channelId: channel.id,
          ageRestriction,
          accessType,
          mediaType,
          categoryId: category,
        };
      } else {
        const imageUrl = await uploadFile(file);
        mediaData = {
          title,
          description,
          file: imageUrl,
          userId,
          channelId: channel.id,
          ageRestriction,
          accessType,
          mediaType,
          categoryId: category,
        };
      }

      const media = await mediaRepository.createMedia(mediaData);

      if (thumbnails) {
        thumbnails.forEach(async (thumbnail) => {
          const thumbnailUrl = await uploadFile(thumbnail);
          await thumbnailsRepository.createThumbnail({
            mediaId: media.id,
            mediaChannelId: channel.id,
            image: thumbnailUrl,
          });
        });
      }

      if (tags) {
        // delete all tags for this media and then add the new ones
        await tagRepository.deleteTagsByMediaId(media.id);

        tags.forEach(async (tag) => {
          await tagRepository.createTag({
            mediaId: media.id,
            mediaChannelId: channel.id,
            tag,
          });
        });
      }

      if (!media) {
        res.status(STATUS.BAD_REQUEST).json({ message: "Media not created" });
        return;
      }

      return res
        .status(STATUS.SUCCESS)
        .json({ message: "Media created successfully", media: media });
    } catch (error) {
      console.error("Error creating media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  getMedias: async (req, res) => {
    try {
      let media;
      let { accessType } = req.query;

      accessType = accessType ? accessType.split(",") : undefined;

      if (accessType) {
        media = await mediaRepository.getMediasByMultipleAccessTypes(
          accessType
        );
      } else {
        media = await mediaRepository.getMedias();
      }

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({ message: "Media found", media: media });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  checkProgress: async (req, res) => {
    const { videoId } = req.params;

    try {
      const result = await checkProgress(videoId);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "error", error: "Error fetching video progress" });
    }
  },

  getSingleChannelMedias: async (req, res) => {
    try {
      const userId = req.user.id;
      const channel = await channelRepository.getChannelByUserId(userId);

      if (!channel) {
        res.status(STATUS.NOT_FOUND).json({ message: "Channel not found" });
        return;
      }

      const media = await mediaRepository.getSingleChannelMedia(channel.id);

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({ message: "Media found", media: media });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  getSingleMediaForLandingPage: async (req, res) => {
    try {
      const mediaId = req.query.mediaId;
      const media = await mediaRepository.getSingleMedia(mediaId);

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({ message: "Media found", media: media });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  getMedia: async (req, res) => {
    try {
      const userId = req.user.id;
      const mediaId = req.query.mediaId;
      console.log("Media Id:", mediaId);
      const media = await mediaRepository.getSingleMedia(mediaId);
      console.log("Media:", media);

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      const subscription =
        await subscriptioRepository.getSubscriptionByUserIdAndChannelId(
          userId,
          media.channelId
        );

      // If the media is a subscription media and the user is not subscribed to the channel
      if (media.accessType == "subscription") {
        if (!subscription) {
          const media = {
            id: media.id,
            title: media.title,
            description: media.description,
            ageRestriction: media.ageRestriction,
            accessType: media.accessType,
            mediaType: media.mediaType,
            createdAt: media.createdAt,
            updatedAt: media.updatedAt,
            channelId: media.channelId,
            views: media.views,
            videoPreview: media.videoPreview,
          };
          res.status(STATUS.SUCCESS).json({
            message: "Media found",
            media: media,
            subscription: false,
          });
          return;
        }
      }
      return res
        .status(STATUS.SUCCESS)
        .json({ message: "Media found", media: media });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  getMediaWithAllData: async (req, res) => {
    try {
      const mediaId = req.query.mediaId;
      let media = await mediaRepository.getSingleMediaWithAllData(mediaId);

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      const totalLikes = await likeRepository.totalLikes(mediaId);
      const totalDislikes = await likeRepository.totalDislikes(mediaId);

      media = {
        ...media.dataValues,
        totalLikes,
        totalDislikes,
      };

      return res
        .status(STATUS.SUCCESS)
        .json({ message: "Media found", media: media });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  getMediaByCategory: async (req, res) => {
    try {
      const category = req.query.category;
      const media = await mediaRepository.getMediaByCategory(category);

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({ message: "Media found", media: media });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  getMediaByCategories: async (req, res) => {
    try {
      let categories = req.query.categories;
      if (!categories) {
        res
          .status(STATUS.NOT_FOUND)
          .json({ message: "Categories Ids not provided" });
        return;
      }
      categories = categories.split(",");

      const media = await mediaRepository.getMediaByMultipleCategories(
        categories
      );

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({ message: "Media found", media: media });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },
  getMediasByMultipleMediaTypes: async (req, res) => {
    try {
      // let mediaTypes = req.query.mediaTypes;
      const channelId = req.params.channelId;
      const userId = req.user.id;
      let mediaTypes = "post, video, liveStream";
      const user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      const channel = await channelRepository.getChannelById(channelId);
      if (!channel) {
        res.status(STATUS.NOT_FOUND).json({ message: "Channel not found" });
        return;
      }

      const mediaLimit = req.query.limit ? req.query.limit : 10;
      if (!mediaTypes) {
        res
          .status(STATUS.NOT_FOUND)
          .json({ message: "Media Types not provided" });
        return;
      }
      mediaTypes = mediaTypes.split(",");

      const media = await mediaRepository.getMediasByMultipleMediaTypes(
        channelId
      );

      const videos = media
        .filter((item) => item.mediaType === "video")
        .slice(0, mediaLimit);
      const posts = media
        .filter((item) => item.mediaType === "post")
        .slice(0, mediaLimit);
      const liveStreams = media
        .filter((item) => item.mediaType === "liveStream")
        .slice(0, mediaLimit);

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({
        message: "Media found",
        media: { videos, posts, liveStreams },
      });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)

        .json({ error: "Internal Server Error" });
    }
  },

  getMediasByChannelIdAndMediaType: async (req, res) => {
    try {
      const channelId = req.params.channelId;
      const mediaType = req.query.mediaType;
      const userId = req.user.id;

      const user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      const channel = await channelRepository.getChannelById(channelId);
      if (!channel) {
        res.status(STATUS.NOT_FOUND).json({ message: "Channel not found" });
        return;
      }

      const media = await mediaRepository.getMediasByChannelIdAndMediaType(
        channelId,
        mediaType
      );

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      //likes and comments for each media and add it to the media object
      const mediaWithLikesAndDislikes = await Promise.all(
        media.map(async (item) => {
          const likes = await likeRepository.totalLikes(item.id);
          // const dislikes = await likeRepository.totalDislikes(item.id);
          const comments = await commentRepository.totalCommentOfMedia(item.id);
          return {
            ...item.dataValues,
            likes,
            // dislikes,
            comments,
          };
        })
      );

      res.status(STATUS.SUCCESS).json({
        message: "Media found",
        media: mediaWithLikesAndDislikes,
      });
    } catch (error) {
      console.error("Error getting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)

        .json({ error: "Internal Server Error" });
    }
  },

  updateMediaById: async (req, res) => {
    try {
      const { title, tags, category } = req.body;
      const mediaId = req.params.id;
      const userId = req.user.id;
      const thumbnails = req.files ? req.files["thumbnail"] : undefined;

      const channel = await channelRepository.getChannelByUserId(userId);

      if (!channel) {
        res.status(STATUS.NO_CONTENT).json({ message: "Channel not found" });
        return;
      }

      const media = await mediaRepository.getSingleMedia(mediaId);

      if (channel.id !== media.channelId) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "You are not authorized to update this media" });
        return;
      }

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      const { description, ageRestriction, accessType, mediaType } = req.body;

      if (thumbnails) {
        thumbnails.forEach(async (thumbnail) => {
          const thumbnailUrl = await uploadFile(thumbnail);
          await thumbnailsRepository.createThumbnail({
            mediaId: media.id,
            mediaChannelId: channel.id,
            image: thumbnailUrl,
          });
        });
      }

      if (tags) {
        // delete all tags for this media and then add the new ones
        await tagRepository.deleteTagsByMediaId(mediaId);

        tags.forEach(async (tag) => {
          await tagRepository.createTag({
            mediaId: media.id,
            mediaChannelId: channel.id,
            tag,
          });
        });
      }

      const updateMedia = await mediaRepository.updateMediaById(mediaId, {
        title,
        description,
        ageRestriction,
        accessType,
        mediaType,
        categoryId: category,
      });

      if (!updateMedia) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not updated" });
        return;
      }

      res
        .status(STATUS.SUCCESS)
        .json({ message: "Media updated successfully" });
    } catch (error) {
      console.error("Error updating media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },

  deleteMedia: async (req, res) => {
    try {
      const mediaId = req.params.mediaId;
      const userId = req.user.id;

      const channel = await channelRepository.getChannelByUserId(userId);

      if (!channel) {
        res.status(STATUS.NO_CONTENT).json({ message: "Channel not found" });
        return;
      }

      const media = await mediaRepository.getSingleMedia(mediaId);

      if (channel.id !== media.channelId) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "You are not authorized to delete this media" });
        return;
      }

      if (!media) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not found" });
        return;
      }

      const deleteMedia = await mediaRepository.deleteMedia(mediaId);

      if (!deleteMedia) {
        res.status(STATUS.NOT_FOUND).json({ message: "Media not deleted" });
        return;
      }

      res
        .status(STATUS.SUCCESS)
        .json({ message: "Media deleted successfully" });
    } catch (error) {
      console.error("Error deleting media:", error);
      res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  },
};
