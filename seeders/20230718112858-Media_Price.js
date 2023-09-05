module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Media_Prices", [
      {
        mediaId: 3,
        mediaChannelId: 1,
        fortyEightHoursAccess: 35,
        lifeTimeAccess: 3000,
      },
      {
        mediaId: 4,
        mediaChannelId: 2,
        fortyEightHoursAccess: 350,
        lifeTimeAccess: 300000,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Media_Prices", null, {});
  },
};
