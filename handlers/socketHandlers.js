const notificationRepository = require("../repositories/notification.repository");
const subscriptionRespository = require("../repositories/subscription.repository");

module.exports = {
  getSingleChannelSubscribers: async (ChannelId) => {
    try {
      const users = await subscriptionRespository.getSubscriptionsByChannelId(
        ChannelId
      );

      const userIds = users.map((subscription) => {
        return subscription.dataValues.userId;
      });

      return userIds;
    } catch (error) {
      return error;
    }
  },
  createNotificationHandler: async (userId, text) => {
    try {
      const userNotification = await notificationRepository.createNotification({
        text,
        userId,
      });

      const newNotification = {
        id: userNotification.dataValues.id,
        text: userNotification.dataValues.text,
      };

      return newNotification;
    } catch (error) {
      return error;
    }
  },
};
