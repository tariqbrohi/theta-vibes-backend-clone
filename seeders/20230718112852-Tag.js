module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Tags", [
      {
        mediaId: 1,
        mediaChannelId: 1,
        tag: "Fly",
      },
      {
        mediaId: 1,
        mediaChannelId: 1,
        tag: "Kill",
      },
      {
        mediaId: 1,
        mediaChannelId: 1,
        tag: "Help",
      },
      {
        mediaId: 2,
        mediaChannelId: 1,
        tag: "Fly",
      },
      {
        mediaId: 2,
        mediaChannelId: 1,
        tag: "Help",
      },
      {
        mediaId: 3,
        mediaChannelId: 1,
        tag: "Fly",
      },
      {
        mediaId: 4,
        mediaChannelId: 1,
        tag: "Fly",
      },
      {
        mediaId: 4,
        mediaChannelId: 2,
        tag: "Kill",
      },
      {
        mediaId: 4,
        mediaChannelId: 2,
        tag: "Help",
      },
      {
        mediaId: 4,
        mediaChannelId: 2,
        tag: "Fly",
      },
      {
        mediaId: 5,
        mediaChannelId: 2,
        tag: "Kill",
      },
      {
        mediaId: 5,
        mediaChannelId: 2,
        tag: "Help",
      },
      {
        mediaId: 6,
        mediaChannelId: 3,
        tag: "Fly",
      },
      {
        mediaId: 7,
        mediaChannelId: 3,
        tag: "Kill",
      },
      {
        mediaId: 8,
        mediaChannelId: 1,
        tag: "Help",
      },
      {
        mediaId: 8,
        mediaChannelId: 1,
        tag: "Track",
      },
      {
        mediaId: 8,
        mediaChannelId: 1,
        tag: "Trace",
      },
      {
        mediaId: 8,
        mediaChannelId: 1,
        tag: "Loud",
      },
      {
        mediaId: 8,
        mediaChannelId: 1,
        tag: "Help",
      },
      {
        mediaId: 9,
        mediaChannelId: 1,
        tag: "Help",
      },
      {
        mediaId: 9,
        mediaChannelId: 1,
        tag: "Noice",
      },
      {
        mediaId: 9,
        mediaChannelId: 1,
        tag: "Dance",
      },
      {
        mediaId: 9,
        mediaChannelId: 1,
        tag: "Kill",
      },
      {
        mediaId: 10,
        mediaChannelId: 1,
        tag: "Help",
      },
      {
        mediaId: 10,
        mediaChannelId: 1,
        tag: "Kill",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tags", null, {});
  },
};
