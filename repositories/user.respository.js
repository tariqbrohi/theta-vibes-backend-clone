const models = require("../models");

const User = models.User;
const Notification = models.Notification;

module.exports = {
  createUser: async (body) => await User.create(body),

  getAllUser: async () => await User.findAll(),
  getUserById: async (id) => await User.findOne({ where: { id } }),

  deleteUserById: async (id) => await User.destroy({ where: { id } }),

  updateUserById: async (id, body) =>
    await User.update(body, { where: { id } }),

  // createUserNotification: async (body) => await Notification.create(body),

  getUserByEmail: async (email) => await User.findOne({ where: { email } }),

  updateUserNotification: async (body, id) =>
    await Notification.update(body, { where: { id } }),

  getUserNotifications: async (userId) =>
    await Notification.findAll({
      where: { userId },
      exclude: ["createdAt", "updatedAt", "userId", "isRead"],
      order: [["createdAt", "DESC"]],
    }),
};
