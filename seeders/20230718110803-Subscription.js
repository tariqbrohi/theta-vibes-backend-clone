module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Subscriptions", [
      {
        userId: 1,
        channelId: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 1,
        channelId: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 1,
        channelId: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 2,
        channelId: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 2,
        channelId: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 2,
        channelId: 3,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 4,
        channelId: 3,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 3,
        channelId: 3,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 3,
        channelId: 2,
        subscriptionDate: "24-Aug-2023",
      },
      {
        userId: 4,
        channelId: 2,
        subscriptionDate: "24-Aug-2023",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Subscriptions", null, {});
  },
};
