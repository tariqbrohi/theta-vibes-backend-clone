const STATUS = require("../constant/status.constant");
const subscriptionRepository = require("../repositories/subscription.repository");
const userRepository = require("../repositories/user.respository");
const channelRepository = require("../repositories/channel.respository");

module.exports = {
  createSubscription: async (req, res) => {
    try {
      const { channelId } = req.params;
      const userId = req.user.id;

      if (!userId) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not logged in" });
        return;
      }

      const channel = await channelRepository.getChannelById(channelId);
      if (!channel) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "Channel not found" });
        return;
      }

      // can't subscribe to own channel
      if (channel.userId === userId) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Can't subscribe to own channel" });
        return;
      }

      const user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      const subscription =
        await subscriptionRepository.getSubscriptionByUserIdAndChannelId(
          userId,
          channelId
        );

      if (subscription) {
        // If subscription already exists, treat it as an unsubscription
        await subscriptionRepository.deleteSubscription(userId, channelId);
        res
          .status(STATUS.SUCCESS)
          .json({ message: "Unsubscribed successfully" });
      } else {
        const newSubscription = await subscriptionRepository.createSubscription(
          {
            userId,
            channelId,
          }
        );

        res.status(STATUS.SUCCESS).json({
          message: "Subscribed successfully",
          subscription: newSubscription,
        });
      }
    } catch (error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  getSubscriptions: async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not logged in" });
        return;
      }

      const user = await userRepository.getUserById(userId);

      if (!user) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      if (!user.isAdmin) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not admin" });
        return;
      }

      const subscriptions = await subscriptionRepository.getSubscriptions();
      res.status(STATUS.SUCCESS).json({ subscriptions });
    } catch (error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  getSubscriptionById: async (req, res) => {
    try {
      const subscriptionId = req.params.id;
      const subscription = await subscriptionRepository.getSubscriptionById(
        subscriptionId
      );
      res.status(STATUS.SUCCESS).json({ subscription });
    } catch (error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  getSubscriptionByUserId: async (req, res) => {
    try {
      const userId = req.user.id;
      const subscription = await subscriptionRepository.getSubscriptionByUserId(
        userId
      );
      res.status(STATUS.SUCCESS).json({ subscription });
    } catch (error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  getSubscriptionByUserIdAndChannelId: async (req, res) => {
    try {
      const userId = req.user.id;
      const channelId = req.params.channelId;
      const subscription =
        await subscriptionRepository.getSubscriptionByUserIdAndChannelId(
          userId,
          channelId
        );

      if (!subscription) {
        res.status(STATUS.NOT_FOUND).json({ isSubscribed: false });
        return;
      }

      res.status(STATUS.SUCCESS).json({ isSubscribed: true });
    } catch (error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  unSubscribe: async (req, res) => {
    try {
      const { channelId } = req.params;
      const userId = req.user.id;

      if (!userId) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not logged in" });
        return;
      }

      const channel = await channelRepository.getChannelById(channelId);
      if (!channel) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "Channel not found" });
        return;
      }

      // can't subscribe to own channel
      if (channel.userId === userId) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Can't subscribe to own channel" });
        return;
      }

      const user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      const subscription =
        await subscriptionRepository.getSubscriptionByUserIdAndChannelId(
          userId,
          channelId
        );

      if (subscription) {
        // If subscription already exists, treat it as an unsubscription
        await subscriptionRepository.deleteSubscription(userId, channelId);
        res
          .status(STATUS.SUCCESS)
          .json({ message: "Unsubscribed successfully" });
      } else {
        res
          .status(STATUS.NOT_FOUND)
          .json({ message: "Subscription not found" });
      }
    } catch (error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  // get subscription of single channel
  getSubscriptionsByChannelId: async (req, res) => {
    try {
      const channelId = req.params.channelId;
      const subscriptions =
        await subscriptionRepository.getSubscriptionsByChannelId(channelId);
      res.status(STATUS.SUCCESS).json({ subscriptions });
    } catch (error) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },
};
