module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Details", [
      {
        mediaId: 1,
        userId: 1,
        likes: true,
        dislikes: false,
        tip: 10,
      },
      {
        mediaId: 1,
        userId: 1,
        likes: true,
        dislikes: false,
        tip: 30,
      },
      {
        mediaId: 2,
        userId: 1,
        likes: false,
        dislikes: true,
        tip: 13,
      },
      {
        mediaId: 2,
        userId: 2,
        likes: true,
        dislikes: false,
        tip: 18,
      },
      {
        mediaId: 3,
        userId: 3,
        likes: true,
        dislikes: false,
        tip: 7,
      },
      {
        mediaId: 2,
        userId: 2,
        likes: false,
        dislikes: true,
        tip: 18,
      },
      {
        mediaId: 2,
        userId: 2,
        likes: true,
        dislikes: false,
        tip: 7,
      },
      {
        mediaId: 5,
        userId: 3,
        likes: true,
        dislikes: false,
        tip: 18,
      },
      {
        mediaId: 6,
        userId: 4,
        likes: true,
        dislikes: false,
        tip: 7,
      },
      {
        mediaId: 9,
        userId: 1,
        likes: true,
        dislikes: false,
        tip: 18,
      },
      {
        mediaId: 9,
        userId: 1,
        likes: false,
        dislikes: true,
        tip: 7,
      },
      {
        mediaId: 9,
        userId: 2,
        likes: false,
        dislikes: true,
        tip: 18,
      },
      {
        mediaId: 9,
        userId: 3,
        likes: true,
        dislikes: false,
        tip: 7,
      },
      {
        mediaId: 10,
        userId: 4,
        likes: true,
        dislikes: false,
        tip: 18,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Details", null, {});
  },
};
