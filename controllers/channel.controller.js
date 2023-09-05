const STATUS = require("../constant/status.constant");
const channelRepository = require("../repositories/channel.respository");
const userRepository = require("../repositories/user.respository");

const uploadFile = require("../utilities/uploadFile");

module.exports = {
  createChannel: async (req, res) => {
    try {
      const { name, APIKey, APISecret } = req.body;

      const apiKey = APIKey;
      const apiSecret = APISecret;

      const profileImage = req.files["profileImage"]
        ? req.files["profileImage"][0]
        : undefined;
      const bannerImage = req.files["bannerImage"]
        ? req.files["bannerImage"][0]
        : undefined;

      const userId = req.user.id;

      const user = await userRepository.getUserById(userId);

      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      if (!name) {
        res.status(STATUS.BAD_REQUEST).json({ message: "Name not provided" });
        return;
      }

      if (!apiKey) {
        res
          .status(STATUS.BAD_REQUEST)
          .json({ message: "API Key not provided" });
        return;
      }

      if (!apiSecret) {
        res
          .status(STATUS.BAD_REQUEST)
          .json({ message: "API Secret not provided" });
        return;
      }

      const channelData = {
        ...req.body,
        userId,
      };

      const userChannel = await channelRepository.getChannelByUserId(userId);
      const channelByName = await channelRepository.getChannelByName(name);

      if (userChannel) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "User already have a channel" });
        return;
      }

      // check if channel name already exists
      if (channelByName) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Channel name already exists" });
        return;
      }

      // Create the channel
      const channel = await channelRepository.createChannel(channelData);
      // don't send api key and api secret to response
      delete channel.dataValues.apiKey;
      delete channel.dataValues.apiSecret;

      // If channel is created successfully, update the user's isContentCreator to true
      await userRepository.updateUserById(userId, { isContentCreator: true });

      if (!channel) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Channel not created" });
        return;
      }

      // If profileImage is provided, upload and update the channel's profileImage
      if (profileImage) {
        const profileImageUrl = await uploadFile(profileImage);
        await channel.update({ profileImage: profileImageUrl });
      }

      // If bannerImage is provided, upload and update the channel's bannerImage
      if (bannerImage) {
        const bannerImageUrl = await uploadFile(bannerImage);
        await channel.update({ bannerImage: bannerImageUrl });
      }

      res.status(STATUS.SUCCESS).json({
        message: "Channel created successfully",
        channel: { ...channel.dataValues },
      });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong", error: error.message });
    }
  },

  getChannel: async (req, res) => {
    try {
      const { channelId } = req.params;

      const channel = await channelRepository.getChannelById(channelId);

      if (!channel) {
        res.status(STATUS.NOT_FOUND).json({ message: "Channel not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({
        message: "Channel found",
        channel: { ...channel.dataValues },
      });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
  updateChannel: async (req, res) => {
    try {
      const userId = req.user.id;
      const { channelId } = req.params;

      const user = await userRepository.getUserById(userId);
      // console.log(user);

      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      const channel = await channelRepository.getChannelById(channelId);

      if (!channel) {
        res.status(STATUS.NOT_FOUND).json({ message: "Channel not found" });
        return;
      }
      // console.log(channel.userId, userId);
      if (channel.userId !== userId) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "You are not owner of this channel" });
        return;
      }

      const profileImage = req.files["profileImage"]
        ? req.files["profileImage"][0]
        : undefined;
      const bannerImage = req.files["bannerImage"]
        ? req.files["bannerImage"][0]
        : undefined;

      const channelData = {
        ...req.body,
      };

      // If profileImage is provided, upload and update the channel's profileImage
      if (profileImage) {
        const profileImageUrl = await uploadFile(profileImage);
        channelData.profileImage = profileImageUrl;
      }

      // If bannerImage is provided, upload and update the channel's bannerImage
      if (bannerImage) {
        const bannerImageUrl = await uploadFile(bannerImage);
        channelData.bannerImage = bannerImageUrl;
      }

      // Update the channel
      await channel.update(channelData);

      res.status(STATUS.SUCCESS).json({
        message: "Channel updated successfully",
        channel: { ...channel.dataValues },
      });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
  deleteChannel: async (req, res) => {
    try {
      const userId = req.user.id;
      const { channelId } = req.params;

      const user = await userRepository.getUserById(userId);

      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      const channel = await channelRepository.getChannelById(channelId);

      if (!channel) {
        res.status(STATUS.NOT_FOUND).json({ message: "Channel not found" });
        return;
      }

      if (channel.userId !== userId) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "You are not owner of this channel" });
        return;
      }

      // Delete the channel
      await channel.destroy();

      res.status(STATUS.SUCCESS).json({
        message: "Channel deleted successfully",
        channel: { ...channel.dataValues },
      });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  getChannelByUserId: async (req, res) => {
    try {
      const userId = req.user.id;

      const channel = await channelRepository.getChannelByUserId(userId);

      if (!channel) {
        res.status(STATUS.NOT_FOUND).json({ message: "Channel not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({
        message: "Channel found",
        channel: { ...channel.dataValues },
      });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
  // for admin to get all channels
  getAllChannels: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await userRepository.getUserById(userId);

      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      if (!user.isAdmin) {
        res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "You are not authorized" });
        return;
      }

      const channels = await channelRepository.getChannels();

      if (!channels) {
        res.status(STATUS.NOT_FOUND).json({ message: "Channels not found" });
        return;
      }

      res.status(STATUS.SUCCESS).json({
        message: "Channels found",
        channels: [...channels],
      });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};
