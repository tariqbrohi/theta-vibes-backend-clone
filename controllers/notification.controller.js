const STATUS = require("../constant/status.constant");
const notificationRepository = require("../repositories/notification.repository");
const userRepository = require("../repositories/user.respository");

module.exports = {
  createUserNotification: async (req, res) => {
    try {
      const { text } = req.body;
      const userId = req.user.id;

      const userNotification = await notificationRepository.createNotification({
        text,
        userId,
      });

      if (!userNotification) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Notification not created" });
        return;
      }
      return res
        .status(STATUS.SUCCESS)
        .json({ message: "Notification created successfully" });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  getUserNotifications: async (req, res) => {
    try {
      const userId = req.user.id;

      const userNotifications =
        await notificationRepository.getNotificationsByUserId(userId);

      if (!userNotifications) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Notification not found" });
        return;
      }
      return res.status(STATUS.SUCCESS).json({ userNotifications });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  updateUserNotification: async (req, res) => {
    try {
      const userId = req.user.id;
      const id = req.params.notificationId;
      const user = await userRepository.getUserById(userId);

      if (!user) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      const notification = await notificationRepository.getNotificationById(id);

      // console.log(userId, notification.userId);

      if (!notification) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Notification not found" });
        return;
      }

      if (notification.userId !== userId) {
        res.status(STATUS.UNAUTHORIZED).json({
          message: "You are not authorized to update this notification",
        });
        return;
      }

      const updatedUserNotification =
        await notificationRepository.markNotificationAsRead(id);

      if (!updatedUserNotification) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Notification not updated" });
        return;
      }
      res
        .status(STATUS.SUCCESS)
        .json({ message: "Notification updated successfully" });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};
