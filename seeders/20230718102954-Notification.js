module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Notifications", [
      {
        userId: 1,
        text: "Congragulations, your channel has 1K subscribers now",
        isRead: false,
      },
      {
        userId: 1,
        text: "Hi, Someone is comented on post",
        isRead: false,
      },
      {
        userId: 1,
        text: "Congragulations, You got reward on your video",
        isRead: false,
      },
      {
        userId: 2,
        text: "Congragulations, your funnny video has crossed 1B views",
        isRead: false,
      },
      {
        userId: 3,
        text: "Congragulations, You have subscribed Altaurux Team Channel",
        isRead: false,
      },
      {
        userId: 4,
        text: "Your subscription has been cancelled by channel admin, thanks",
        isRead: false,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Notifications", null, {});
  },
};
