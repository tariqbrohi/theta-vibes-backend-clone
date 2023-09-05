const STATUS = require("../constant/status.constant");
const smartContractRepository = require("../repositories/smartContract.repository");
const channelRepository = require("../repositories/channel.respository");
const userRepository = require("../repositories/user.respository");

module.exports = {
  createSmartContract: async (req, res) => {
    try {
      const { channelId, contractAbi, contractAddress } = req.body;

      if (!channelId) {
        return res.status(STATUS.NOT_FOUND).json({
          message: "Channel not found",
        });
      }
      if (!contractAbi) {
        return res.status(STATUS.NOT_FOUND).json({
          message: "contract Abi not found",
        });
      }
      if (!contractAddress) {
        return res.status(STATUS.NOT_FOUND).json({
          message: "Contract Address not found",
        });
      }

      const contract = await smartContractRepository.findTokenGatingByAddress(
        contractAddress
      );
      if (contract) {
        return res.status(STATUS.CONFLICT).json({
          message: "SmartContract already exists with this address",
        });
      }

      const contractByChannelId =
        await smartContractRepository.findTokenByChannelId(req.body.channelId);
      if (contractByChannelId) {
        return res.status(STATUS.CONFLICT).json({
          message: "SmartContract already on this channel",
        });
      }

      const result = await smartContractRepository.createTokenGating({
        channelId,
        contractAbi,
        contractAddress,
      });
      return res.status(STATUS.CREATED).json({
        message: "SmartContract created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  },
  findSmartContract: async (req, res) => {
    try {
      const userId = req.user.id;
      const contractAddress = req.params.contractAddress;
      const user = await userRepository.getUserById(userId);
      if (!user) {
        return res.status(STATUS.NOT_FOUND).json({
          message: "User not found",
        });
      }

      const result = await smartContractRepository.findTokenGating(
        contractAddress
      );
      if (!result) {
        return res.status(STATUS.NOT_FOUND).json({
          message: "SmartContract not found",
        });
      }
      const channel = await channelRepository.getChannelById(result.channelId);
      if (!channel) {
        return res.status(STATUS.NOT_FOUND).json({
          message: "Channel not found",
        });
      }

      if (channel.userId !== userId) {
        return res.status(STATUS.UNAUTHORIZED).json({
          message: "You are not authorized to view this SmartContract",
        });
      }

      return res.status(STATUS.SUCCESS).json({
        message: "SmartContract found successfully",
        data: result,
      });
    } catch (error) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  },

  updateSmartContractById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const userId = req.user.id;

      const contract = await smartContractRepository.findTokenGating(id);
      if (!contract) {
        return res.status(STATUS.NOT_FOUND).json({
          message: "SmartContract not found",
        });
      }

      const channel = await channelRepository.getChannelById(
        contract.channelId
      );
      if (!channel) {
        return res.status(STATUS.NOT_FOUND).json({
          message: "Channel not found",
        });
      }

      if (channel.userId !== userId) {
        return res.status(STATUS.UNAUTHORIZED).json({
          message: "You are not authorized to update this SmartContract",
        });
      }

      const result = await smartContractRepository.updateTokenGatingById(
        id,
        data
      );

      return res.status(STATUS.SUCCESS).json({
        message: "SmartContract updated successfully",
      });
    } catch (error) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  },
};
