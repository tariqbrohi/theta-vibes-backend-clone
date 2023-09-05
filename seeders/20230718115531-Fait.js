module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Faits", [
      {
        CHANNEL_id: 1,
        clientId: "waqasdsdhjjjdhjfd",
        clientSecret: "343bhhjghj4354h%R^%%^&^%^&dsfhgsdjf",
        subscriptionPrice: 45,
      },
      {
        CHANNEL_id: 3,
        clientId: "waqasdsdhjjjdhjfd",
        clientSecret: "343bhhjghj4354h%R^%%^&^%^&dsfhgsdjf",
        subscriptionPrice: 45,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Faits", null, {});
  },
};
