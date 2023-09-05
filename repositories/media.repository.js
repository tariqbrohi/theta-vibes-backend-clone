const models = require("../models");
const Media = models.Media;
const Category = models.Category;
const { Op } = require("sequelize");
const { getTimeAgo } = require("../utilities/getTimeAgo");

module.exports = {
  createMedia: async (media) => {
    try {
      const newMedia = await Media.create(media);
      return newMedia;
    } catch (error) {
      console.error("Error creating media:", error);
      throw error;
    }
  },

  getMedias: async () => {
    try {
      const media = await Media.findAll({
        where: { accessType: { [Op.ne]: "private" } },
        include: [
          {
            model: models.Thumbnail,
          },
          {
            model: models.Channel,
          },
        ],
      });

      if (!media) {
        return false;
      }

      return media;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  },

  getMediasByMultipleMediaTypes: async (channelId) => {
    try {
      const media = await Media.findAll({
        where: { channelId },
        include: [
          {
            model: models.Thumbnail,
          },
          {
            model: models.Channel,
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      if (!media) {
        return false;
      }

      return media;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  },

  getMediasByMultipleAccessTypes: async (accessTypes) => {
    try {
      const media = await Media.findAll({
        where: { accessType: accessTypes },
        include: [
          {
            model: models.Thumbnail,
          },
          {
            model: models.Channel,
          },
        ],
      });

      if (!media) {
        return false;
      }

      return media;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  },

  getSingleChannelMedia: async (channelId) => {
    try {
      const channelMedia = await Media.findAll({
        where: { channelId },
        include: [
          {
            model: models.Thumbnail,
          },
          {
            model: models.Channel,
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      if (!channelMedia) {
        return false;
      }

      return channelMedia;
    } catch (error) {
      console.error("Error getting channel media:", error);
      throw error;
    }
  },

  getSingleMedia: async (mediaId) => {
    try {
      const singleMedia = await Media.findOne({
        where: { id: mediaId },
        include: [
          {
            model: models.Detail,
          },
          {
            model: models.Channel,
          },
          {
            model: models.Thumbnail,
          },
          {
            model: models.Tag,
          },
          {
            model: models.Media_Price,
          },
          {
            model: models.Payment_Type,
          },
        ],
      });

      if (!singleMedia) {
        return false;
      }

      return singleMedia;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  },

  getSingleMediaWithAllData: async (mediaId, incrementViewCount = true) => {
    try {
      const singleMedia = await Media.findOne({
        where: { id: mediaId },
        include: [
          {
            model: models.Detail,
          },
          {
            model: models.Channel,
          },
          {
            model: models.Thumbnail,
          },
          {
            model: models.Tag,
          },
          // {
          //   model: models.Comment,
          //   include: [
          //     {
          //       model: models.Comment_Reply,
          //     },
          //   ],
          // },
        ],
      });

      if (!singleMedia) {
        return false;
      }

      if (incrementViewCount) {
        await Media.increment("views", {
          where: { id: mediaId },
        });
      }

      // calculate days ago
      // Calculate the time ago and add it to the media object
      const timeAgo = getTimeAgo(singleMedia.createdAt);
      singleMedia.dataValues.timeAgo = timeAgo;

      return singleMedia;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  },

  getMediasByChannelIdAndMediaType: async (channelId, mediaType) => {
    try {
      const media = await Media.findAll({
        where: { channelId, mediaType },
        include: [
          {
            model: models.Thumbnail,
          },
          {
            model: models.Channel,
          },
        ],
      });

      if (!media) {
        return false;
      }

      return media;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  },

  updateMediaViewCount: async (mediaId) => {
    try {
      await Media.increment("view_count", {
        where: { id: mediaId },
      });
    } catch (error) {
      console.error("Error updating view count:", error);
      throw error;
    }
  },

  getMediaByCategory: async (category) => {
    try {
      const categoryData = await Category.findOne({
        where: { name: category },
      });

      if (!categoryData) {
        return false;
      }

      const media = await Media.findAll({
        where: {
          accessType: { [Op.ne]: "private" },
          mediaType: "video",
          categoryId: categoryData.id,
        },
        include: [
          {
            model: models.Thumbnail,
          },
          {
            model: models.Channel,
          },
        ],
      });

      if (!media) {
        return false;
      }

      return media;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  },

  getMediaByMultipleCategories: async (categories) => {
    try {
      const categoryData = await Category.findAll({
        where: { name: categories },
      });

      if (!categoryData) {
        return false;
      }

      const media = await Media.findAll({
        where: {
          accessType: { [Op.ne]: "private" },
          mediaType: "video",
          categoryId: categoryData.map((category) => category.id),
        },
      });

      if (!media) {
        return false;
      }

      // calculate days ago
      // Calculate the time ago and add it to the media object
      media.map((singleMedia) => {
        const timeAgo = getTimeAgo(singleMedia.createdAt);
        singleMedia.dataValues.timeAgo = timeAgo;
      });

      return media;
    } catch (error) {
      console.error("Error getting media:", error);
      throw error;
    }
  },

  updateMediaById: async (mediaId, media) => {
    try {
      const updatedMedia = await Media.update(media, {
        where: { id: mediaId },
      });

      if (!updatedMedia) {
        return false;
      }

      return updatedMedia;
    } catch (error) {
      console.error("Error updating media:", error);

      throw error;
    }
  },
  deleteMedia: async (mediaId) => {
    try {
      const deletedMedia = await Media.destroy({
        where: { id: mediaId },
      });

      if (!deletedMedia) {
        return false;
      }

      return deletedMedia;
    } catch (error) {
      console.error("Error deleting media:", error);

      throw new Error("Failed to delete media");
    }
  },

  // getSingleMedia: async (id) => {
  //   try {
  //     const singleMedia = await Media.findOne({
  //       where: { id },
  //       include: [
  //         {
  //           model: Detail,
  //         },
  //         {
  //           attributes: {
  //             exclude: [
  //               "MEDIA_CHANNEL_id",
  //               "MEDIA_id",
  //               "createdAt",
  //               "updatedAt",
  //             ],
  //           },
  //           model: Thumbnail,
  //         },
  //         {
  //           attributes: {
  //             exclude: [
  //               "MEDIA_CHANNEL_id",
  //               "MEDIA_id",
  //               "createdAt",
  //               "updatedAt",
  //             ],
  //           },
  //           model: Tag,
  //         },
  //         {
  //           attributes: {
  //             exclude: [
  //               "MEDIA_CHANNEL_id",
  //               "MEDIA_id",
  //               "createdAt",
  //               "updatedAt",
  //             ],
  //           },
  //           model: Media_Price,
  //         },
  //         {
  //           attributes: {
  //             exclude: [
  //               "MEDIA_CHANNEL_id",
  //               "MEDIA_id",
  //               "createdAt",
  //               "updatedAt",
  //             ],
  //           },
  //           model: Payment_Type,
  //         },
  //       ],
  //     });

  //     let likes = 0;
  //     let dislikes = 0;

  //     if (!singleMedia) {
  //       return false;
  //     }

  //     singleMedia.dataValues.Details.map((detail) => {
  //       if (detail.likes) {
  //         likes = likes + 1;
  //       } else if (detail.dislikes) {
  //         dislikes = dislikes + 1;
  //       }
  //     });

  //     delete singleMedia.dataValues.Details;

  //     singleMedia.dataValues.likes = likes;
  //     singleMedia.dataValues.dislikes = dislikes;

  //     return singleMedia;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // getMediaViaCategory: async (category) =>
  //   await Media.findAll({
  //     where: { category },
  //     include: [
  //       {
  //         attributes: {
  //           exclude: ["MEDIA_CHANNEL_id", "MEDIA_id", "createdAt", "updatedAt"],
  //         },
  //         model: Payment_Type,
  //       },
  //       {
  //         attributes: {
  //           exclude: ["MEDIA_CHANNEL_id", "MEDIA_id", "createdAt", "updatedAt"],
  //         },
  //         model: Thumbnail,
  //       },
  //       {
  //         model: Channel,
  //         as: "channelMedia",
  //         attributes: ["name", "profileImage"],
  //       },
  //     ],
  //   }),

  // //....//
  // getSingleDetail: async (id, email) =>
  //   await Detail.findOne({ where: { MEDIA_id: id, USER_email: email } }),

  // createDetail: async (body) => await Detail.create(body),

  // likeDislikeMedia: async (body, id, email) => {
  //   const updatedMedia = await Detail.update(body, {
  //     where: { MEDIA_id: id, USER_email: email },
  //   });

  //   return updatedMedia;
  // },
  //.....//
};
