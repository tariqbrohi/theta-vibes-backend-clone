module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Details", [
      {
        MEDIA_id: 1,
        USER_email: "waqas3399nazir@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 10,
      },
      {
        MEDIA_id: 1,
        USER_email: "waqasnazirm@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 30,
      },
      {
        MEDIA_id: 1,
        USER_email: "waqarnazir@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 13,
      },
      {
        MEDIA_id: 1,
        USER_email: "tariqbrohi@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 18,
      },
      {
        MEDIA_id: 1,
        USER_email: "hassannazir@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 7,
      },
      {
        MEDIA_id: 2,
        USER_email: "tariqbrohi@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 18,
      },
      {
        MEDIA_id: 2,
        USER_email: "hassannazir@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 7,
      },
      {
        MEDIA_id: 5,
        USER_email: "tariqbrohi@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 18,
      },
      {
        MEDIA_id: 6,
        USER_email: "hassannazir@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 7,
      },
      {
        MEDIA_id: 9,
        USER_email: "tariqbrohi@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 18,
      },
      {
        MEDIA_id: 9,
        USER_email: "hassannazir@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 7,
      },
      {
        MEDIA_id: 9,
        USER_email: "tariqbrohi@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 18,
      },
      {
        MEDIA_id: 9,
        USER_email: "hassannazir@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 7,
      },
      {
        MEDIA_id: 10,
        USER_email: "tariqbrohi@gmail.com",
        likes: 1000,
        dislikes: 100,
        tip: 18,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Details", null, {});
  },
};
