module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Subscriptions", [
      {
        USER_email: "waqasnazirm@gmail.com",
        CHANNEL_id: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "waqas3399nazir@gmail.com",
        CHANNEL_id: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "tariqbrohi@gmail.com",
        CHANNEL_id: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "hassannazir@gmail.com",
        CHANNEL_id: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "waqarnazir@gmail.com",
        CHANNEL_id: 1,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "tariqbrohi@gmail.com",
        CHANNEL_id: 3,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "hassannazir@gmail.com",
        CHANNEL_id: 3,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "waqarnazir@gmail.com",
        CHANNEL_id: 3,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "waqasnazirm@gmail.com",
        CHANNEL_id: 2,
        subscriptionDate: "24-Aug-2023",
      },
      {
        USER_email: "waqas3399nazir@gmail.com",
        CHANNEL_id: 2,
        subscriptionDate: "24-Aug-2023",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Subscriptions", null, {});
  },
};
