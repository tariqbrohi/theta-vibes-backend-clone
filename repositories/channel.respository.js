const models = require("../models");

const Channel = models.Channel;

module.exports = {
  createChannel: async (body) => await Channel.create(body),
  getChannels: async () =>
    await Channel.findAll({
      include: [
        {
          model: models.Subscription,
          as: "subscribers",
        },
      ],
    }),

  getChannelById: async (id) => {
    return await Channel.findOne({
      where: { id },

      include: [
        {
          model: models.Subscription,
          as: "subscribers",
        },
      ],
    });
  },

  getChannelByName: async (name) =>
    await Channel.findOne({
      where: { name },

      include: [
        {
          model: models.Subscription,
          as: "subscribers",
        },
      ],
    }),
  updateChannelById: async (id, body) =>
    await Channel.update(body, { where: { id } }),
  deleteChannelById: async (id) => await Channel.destroy({ where: { id } }),

  getChannelByUserId: async (userId) =>
    await Channel.findOne({
      where: { userId },

      include: [
        {
          model: models.Subscription,
          as: "subscribers",
        },
      ],
    }),

  getChannelByUserIdAndChannelId: async (userId, channelId) => {
    return await Channel.findOne({
      where: { userId, id: channelId },

      include: [
        {
          model: models.Subscription,
          as: "subscribers",
        },
      ],
    });
  },
};
