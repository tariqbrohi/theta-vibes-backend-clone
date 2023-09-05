const STATUS = require("../constant/status.constant");
const userRepository = require("../repositories/user.respository");
const channelRepository = require("../repositories/channel.respository");

const uploadFile = require("../utilities/uploadFile");

module.exports = {
  getUser: async (req, res) => {
    try {
      const userId = req.user.id;
      let user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }
      delete user.dataValues.password;

      if (user.dataValues.isContentCreator) {
        const channel = await channelRepository.getChannelByUserId(userId);

        return res.status(STATUS.SUCCESS).json({
          message: "User found successfully",
          user: { ...user.dataValues },
          channel: { ...channel.dataValues },
        });
      } else {
        res.status(STATUS.SUCCESS).json({
          message: "User found successfully",
          user: { ...user.dataValues },
        });
      }
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const profileImage = req.files["profileImage"]
        ? req.files["profileImage"][0]
        : undefined;
      const coverImage = req.files["coverImage"]
        ? req.files["coverImage"][0]
        : undefined;

      if (profileImage) {
        const profileImageUrl = await uploadFile(profileImage);
        req.body.profileImage = profileImageUrl;
      }

      if (coverImage) {
        const coverImageUrl = await uploadFile(coverImage);
        req.body.coverImage = coverImageUrl;
      }

      const userId = req.user.id;
      let user = await userRepository.getUserById(userId);

      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }
      const updatedUser = await userRepository.updateUserById(userId, req.body);
      if (!updatedUser) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not updated" });

        return;
      }
      res.status(STATUS.SUCCESS).json({
        message: "User updated successfully",
      });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      let user = await userRepository.getUserById(id);

      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }

      delete user.dataValues.password;

      res.status(STATUS.SUCCESS).json({
        user: { ...user.dataValues },
      });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const userId = req.user.userId;
      let user = await userRepository.getUserById(id);
      if (!user) {
        res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
        return;
      }
      const deletedUser = await userRepository.deleteUserById(id);
      if (!deletedUser) {
        res.status(STATUS.UNAUTHORIZED).json({ message: "User not deleted" });
        return;
      }
      res.status(STATUS.SUCCESS).json({ message: "User deleted successfully" });
    } catch (error) {
      return res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};
