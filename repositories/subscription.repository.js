const models = require("../models");

const Subscription = models.Subscription;

module.exports = {
  createSubscription: async (body) => await Subscription.create(body),

  getSubscriptions: async () => await Subscription.findAll(),

  getSubscriptionBySubscriptionId: async (subscriptionId) =>
    await Subscription.findOne({
      where: { subscriptionId },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "email", "firstName", "lastName", "profileImage"],
        },
        {
          model: models.Channel,
          as: "channel",
          attributes: ["id", "name", "description"],
        },
      ],
    }),

  getSubscriptionById: async (id) =>
    await Subscription.findOne({
      where: { id },

      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "email", "firstName", "lastName", "profileImage"],
        },
        {
          model: models.Channel,
          as: "channel",
          attributes: ["id", "name", "description"],
        },
      ],
    }),

  getSubscriptionByUserId: async (userId) =>
    await Subscription.findOne({
      where: { userId },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "email", "firstName", "lastName", "profileImage"],
        },
        {
          model: models.Channel,
          as: "channel",
          attributes: ["id", "name", "description"],
        },
      ],
    }),

  getSubscriptionByUserIdAndChannelId: async (userId, channelId) => {
    return await Subscription.findOne({
      where: { userId, channelId },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "email", "firstName", "lastName", "profileImage"],
        },
        {
          model: models.Channel,
          as: "channel",
          attributes: ["id", "name", "description"],
        },
      ],
    });
  },

  updateSubscriptionById: async (id, body) =>
    await Subscription.update(body, { where: { id } }),

  deleteSubscriptionById: async (id) =>
    await Subscription.destroy({ where: { id } }),

  deleteSubscription: async (userId, channelId) => {
    await Subscription.destroy({
      where: {
        userId: userId,
        channelId: channelId,
      },
    });
  },

  getSubscriptionByUserIdAndSubscriptionId: async (userId, subscriptionId) =>
    await Subscription.findOne({
      where: { userId, id: subscriptionId },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "email", "firstName", "lastName", "profileImage"],
        },
        {
          model: models.Channel,
          as: "channel",
          attributes: ["id", "name", "description"],
        },
      ],
    }),

  getSubscriptionsByChannelId: async (channelId) => {
    return await Subscription.findAll({
      where: { channelId },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "email", "firstName", "lastName", "profileImage"],
        },
        {
          model: models.Channel,
          as: "channel",
          attributes: ["id", "name", "description"],
        },
      ],
    });
  },
};
