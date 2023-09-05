module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Notifications", [
      {
        USER_email: "waqas3399nazir@gmail.com",
        text: "Congragulations, your channel has 1K subscribers now",
        isRead: 0,
      },
      {
        USER_email: "waqas3399nazir@gmail.com",
        text: "Congragulations, your funnny video has crossed 1B views",
        isRead: 0,
      },
      {
        USER_email: "waqasnazirm@gmail.com",
        text: "Congragulations, You have subscribed Altaurux Team Channel",
        isRead: 0,
      },
      {
        USER_email: "tariqbrohi@gmail.com",
        text: "Your subscription has been cancelled by channel admin, thanks",
        isRead: 0,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Notifications", null, {});
  },
};
