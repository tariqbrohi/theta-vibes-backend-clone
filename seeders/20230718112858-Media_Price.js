module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Media_Prices", [
      {
        MEDIA_id: 3,
        MEDIA_CHANNEL_id: 1,
        fortyEightHoursAccess: 35,
        lifeTimeAccess: 3000,
      },
      {
        MEDIA_id: 4,
        MEDIA_CHANNEL_id: 2,
        fortyEightHoursAccess: 350,
        lifeTimeAccess: 300000,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Media_Prices", null, {});
  },
};
