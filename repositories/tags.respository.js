const models = require("../models");

const Tag = models.Tag;
const Channel = models.Channel;
const Media = models.Media;

module.exports = {
  createTag: async (body) => await Tag.create(body),

  getTags: async () => await Tag.findAll(),

  deleteTagsByMediaId: async (mediaId) =>
    await Tag.destroy({ where: { mediaId } }),
};
