module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Payment_Types", [
      {
        MEDIA_id: 3,
        MEDIA_CHANNEL_id: 1,
        name: "TVibe",
      },
      {
        MEDIA_id: 3,
        MEDIA_CHANNEL_id: 1,
        name: "TFuel",
      },
      {
        MEDIA_id: 3,
        MEDIA_CHANNEL_id: 1,
        name: "Credit Card",
      },
      {
        MEDIA_id: 4,
        MEDIA_CHANNEL_id: 2,
        name: "TVibe",
      },
      {
        MEDIA_id: 4,
        MEDIA_CHANNEL_id: 2,
        name: "Credit Card",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Payment_Types", null, {});
  },
};
