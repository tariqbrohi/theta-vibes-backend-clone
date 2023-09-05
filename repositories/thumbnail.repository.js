const models = require("../models");

const Thumbnail = models.Thumbnail;

module.exports = {
  createThumbnail: async (body) => await Thumbnail.create(body),
  getThumbnails: async () => await Thumbnail.findAll(),
  getThumbnailById: async (id) => await Thumbnail.findOne({ where: { id } }),
  getThumbnailsByMediaId: async (mediaId) =>
    await Thumbnail.findAll({ where: { mediaId } }),
  getThumbnailByName: async (name) =>
    await Thumbnail.findOne({ where: { name } }),

  getThumbnailByUserId: async (userId) =>
    await Thumbnail.findOne({ where: { userId } }),

  getThumbnailByUserIdAndThumbnailId: async (userId, thumbnailId) => {
    return await Thumbnail.findOne({ where: { userId, id: thumbnailId } });
  },

  updateThumbnailById: async (id, body) =>
    await Thumbnail.update(body, { where: { id } }),
  deleteThumbnailById: async (id) => await Thumbnail.destroy({ where: { id } }),
};
