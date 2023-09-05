module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Faits", [
      {
        channelId: 1,
        // clientId: "waqasdsdhjjjdhjfd",
        connectAccountId: "343bhhjghj4354h%R^%%^&^%^&dsfhgsdjf",
        // subscriptionPrice: 45,
      },
      {
        channelId: 3,
        // clientId: "waqasdsdhjjjdhjfd",
        connectAccountId: "343bhhjghj4354h%R^%%^&^%^&dsfhgsdjf",
        // subscriptionPrice: 45,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Faits", null, {});
  },
};
