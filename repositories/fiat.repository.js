const models = require("../models");
const fait = models.Fait;

module.exports = {
  createFiat: async (body) => await fait.create(body),
  getFiat: async () => await fait.findAll(),
  getFiatById: async (id) => await fait.findOne({ where: { id } }),
  updateFiatById: async (id, body) =>
    await fait.update(body, { where: { id } }),
  deleteFiatById: async (id) => await fait.destroy({ where: { id } }),
  getFiatByChannelId: async (channelId) => {
    return await fait.findOne({ where: { channelId } });
  },
  getFiatByUserIdAndFiatId: async (userId, fiatId) => {
    return await fait.findOne({ where: { userId, id: fiatId } });
  },
};
