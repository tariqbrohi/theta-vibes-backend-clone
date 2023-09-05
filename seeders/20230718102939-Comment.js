module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        userId: 3,
        mediaId: 1,
        mediaChannelId: 1,
        text: "Hello Channel 1",
      },
      {
        userId: 2,
        mediaId: 1,
        mediaChannelId: 1,
        text: "Hello Channel 2",
      },
      {
        userId: 3,
        mediaId: 1,
        mediaChannelId: 1,
        text: "Hello Channel 3",
      },
      {
        userId: 4,
        mediaId: 1,
        mediaChannelId: 1,
        text: "Hello Channel 4",
      },
      {
        userId: 3,
        mediaId: 1,
        mediaChannelId: 1,
        text: "Hello Channel 5",
      },
      {
        userId: 3,
        mediaId: 2,
        mediaChannelId: 1,
        text: "Hello Channel 1",
      },
      {
        userId: 4,
        mediaId: 2,
        mediaChannelId: 1,
        text: "Hello Channel 2",
      },
      {
        userId: 1,
        mediaId: 2,
        mediaChannelId: 1,
        text: "Hello Channel 3",
      },
      {
        userId: 1,
        mediaId: 3,
        mediaChannelId: 1,
        text: "Hello Channel 1",
      },
      {
        userId: 4,
        mediaId: 3,
        mediaChannelId: 1,
        text: "Hello Channel 2",
      },
      {
        userId: 3,
        mediaId: 2,
        mediaChannelId: 2,
        text: "Hello Channel 1",
      },
      {
        userId: 3,
        mediaId: 2,
        mediaChannelId: 2,
        text: "Hello Channel 2",
      },
      {
        userId: 3,
        mediaId: 2,
        mediaChannelId: 2,
        text: "Hello Channel 3",
      },
      {
        userId: 4,
        mediaId: 1,
        mediaChannelId: 2,
        text: "Hello Channel 4",
      },
      {
        userId: 4,
        mediaId: 1,
        mediaChannelId: 2,
        text: "Hello Channel 5",
      },
      {
        userId: 4,
        mediaId: 1,
        mediaChannelId: 2,
        text: "Hello Channel 6",
      },
      {
        userId: 1,
        mediaId: 5,
        mediaChannelId: 2,
        text: "Hello Channel 1",
      },
      {
        userId: 2,
        mediaId: 5,
        mediaChannelId: 2,
        text: "Hello Channel 2",
      },
      {
        userId: 2,
        mediaId: 6,
        mediaChannelId: 3,
        text: "Hello Channel 1",
      },
      {
        userId: 2,
        mediaId: 7,
        mediaChannelId: 3,
        text: "Hello Channel 1",
      },
      {
        userId: 2,
        mediaId: 8,
        mediaChannelId: 1,
        text: "Hello Channel 1",
      },
      {
        userId: 1,
        mediaId: 9,
        mediaChannelId: 1,
        text: "Hello Channel 1",
      },
      {
        userId: 1,
        mediaId: 10,
        mediaChannelId: 1,
        text: "Hello Channel 1",
      },
      {
        userId: 1,
        mediaId: 10,
        mediaChannelId: 1,
        text: "Hello Channel 2",
      },
      {
        userId: 1,
        mediaId: 10,
        mediaChannelId: 1,
        text: "Hello Channel 3",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
