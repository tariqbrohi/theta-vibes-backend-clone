module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Payment_Types", [
      {
        mediaId: 3,
        mediaChannelId: 1,
        name: "TVibe",
      },
      {
        mediaId: 3,
        mediaChannelId: 1,
        name: "TFuel",
      },
      {
        mediaId: 3,
        mediaChannelId: 1,
        name: "Credit Card",
      },
      {
        mediaId: 4,
        mediaChannelId: 2,
        name: "TVibe",
      },
      {
        mediaId: 4,
        mediaChannelId: 2,
        name: "Credit Card",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Payment_Types", null, {});
  },
};
