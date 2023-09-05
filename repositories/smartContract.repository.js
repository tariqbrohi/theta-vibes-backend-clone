const models = require("../models");

const SmartContract = models.SmartContract;

module.exports = {
  createTokenGating: async (data) => {
    return await SmartContract.create(data);
  },
  findTokenGating: async (contractAddress) => {
    return await SmartContract.findOne({ where: { contractAddress } });
  },
  findTokenGatingByAddress: async (contractAddress) => {
    return await SmartContract.findOne({
      where: { contractAddress: contractAddress },
    });
  },
  findTokenByChannelId: async (channelId) => {
    return await SmartContract.findOne({ where: { channelId: channelId } });
  },

  updateTokenGatingById: async (id, data) => {
    return await SmartContract.update(data, { where: { id: id } });
  },
};
