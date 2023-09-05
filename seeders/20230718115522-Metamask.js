module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Metamasks", [
      {
        CHANNEL_id: 1,
        walletAddress: "dhsdjfhsjdhsdjfhieuroeiwr",
        TVibeSubscriptionPrice: 34,
        TFuelSubscriptionPrice: 0,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Metamasks", null, {});
  },
};
