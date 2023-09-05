const models = require("../models");
const Notification = models.Notification;

module.exports = {
  createNotification: async (notificationData) => {
    return await Notification.create(notificationData);
  },

  getNotificationsByUserId: async (userId) => {
    return await Notification.findAll({
      where: { userId, isRead: false },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      order: [["createdAt", "DESC"]],
    });
  },

  getNotificationById: async (notificationId) => {
    return await Notification.findOne({
      where: { id: notificationId },
    });
  },

  markNotificationAsRead: async (notificationId) => {
    const notification = await Notification.findByPk(notificationId);
    if (notification) {
      notification.isRead = true;
      await notification.save();
      return true;
    }
    return false;
  },
};
