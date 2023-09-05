module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comment_Replies", [
      {
        commentUserId: 1,
        commentId: 1,
        text: "This is reply 1",
      },
      {
        commentUserId: 1,
        commentId: 1,
        text: "This is reply 2",
      },
      {
        commentUserId: 1,
        commentId: 1,
        text: "This is reply 2",
      },
      {
        commentUserId: 1,
        commentId: 10,
        text: "This is reply 1",
      },
      {
        commentUserId: 2,
        commentId: 10,
        text: "This is reply 2",
      },
      {
        commentUserId: 2,
        commentId: 10,
        text: "This is reply 2",
      },
      {
        commentUserId: 2,
        commentId: 4,
        text: "This is reply 1",
      },
      {
        commentUserId: 2,
        commentId: 5,
        text: "This is reply 2",
      },
      {
        commentUserId: 2,
        commentId: 5,
        text: "This is reply 2",
      },
      {
        commentUserId: 2,
        commentId: 8,
        text: "This is reply 1",
      },
      {
        commentUserId: 3,
        commentId: 14,
        text: "This is reply 2",
      },
      {
        commentUserId: 3,
        commentId: 17,
        text: "This is reply 2",
      },
      {
        commentUserId: 3,
        commentId: 21,
        text: "This is reply 1",
      },
      {
        commentUserId: 4,
        commentId: 22,
        text: "This is reply 2",
      },
      {
        commentUserId: 4,
        commentId: 24,
        text: "This is reply 2",
      },
      {
        commentUserId: 4,
        commentId: 24,
        text: "This is reply 1",
      },
      {
        commentUserId: 4,
        commentId: 24,
        text: "This is reply 2",
      },
      {
        commentUserId: 4,
        commentId: 24,
        text: "This is reply 2",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comment_Replies", null, {});
  },
};
