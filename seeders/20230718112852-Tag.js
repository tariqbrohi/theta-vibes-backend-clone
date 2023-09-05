module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Tags", [
      {
        MEDIA_id: 1,
        MEDIA_CHANNEL_id: 1,
        tag: "Fly",
      },
      {
        MEDIA_id: 1,
        MEDIA_CHANNEL_id: 1,
        tag: "Kill",
      },
      {
        MEDIA_id: 1,
        MEDIA_CHANNEL_id: 1,
        tag: "Help",
      },
      {
        MEDIA_id: 2,
        MEDIA_CHANNEL_id: 1,
        tag: "Fly",
      },
      {
        MEDIA_id: 2,
        MEDIA_CHANNEL_id: 1,
        tag: "Help",
      },
      {
        MEDIA_id: 3,
        MEDIA_CHANNEL_id: 1,
        tag: "Fly",
      },
      {
        MEDIA_id: 4,
        MEDIA_CHANNEL_id: 1,
        tag: "Fly",
      },
      {
        MEDIA_id: 4,
        MEDIA_CHANNEL_id: 2,
        tag: "Kill",
      },
      {
        MEDIA_id: 4,
        MEDIA_CHANNEL_id: 2,
        tag: "Help",
      },
      {
        MEDIA_id: 4,
        MEDIA_CHANNEL_id: 2,
        tag: "Fly",
      },
      {
        MEDIA_id: 5,
        MEDIA_CHANNEL_id: 2,
        tag: "Kill",
      },
      {
        MEDIA_id: 5,
        MEDIA_CHANNEL_id: 2,
        tag: "Help",
      },
      {
        MEDIA_id: 6,
        MEDIA_CHANNEL_id: 3,
        tag: "Fly",
      },
      {
        MEDIA_id: 7,
        MEDIA_CHANNEL_id: 3,
        tag: "Kill",
      },
      {
        MEDIA_id: 8,
        MEDIA_CHANNEL_id: 1,
        tag: "Help",
      },
      {
        MEDIA_id: 8,
        MEDIA_CHANNEL_id: 1,
        tag: "Track",
      },
      {
        MEDIA_id: 8,
        MEDIA_CHANNEL_id: 1,
        tag: "Trace",
      },
      {
        MEDIA_id: 8,
        MEDIA_CHANNEL_id: 1,
        tag: "Loud",
      },
      {
        MEDIA_id: 8,
        MEDIA_CHANNEL_id: 1,
        tag: "Help",
      },
      {
        MEDIA_id: 9,
        MEDIA_CHANNEL_id: 1,
        tag: "Help",
      },
      {
        MEDIA_id: 9,
        MEDIA_CHANNEL_id: 1,
        tag: "Noice",
      },
      {
        MEDIA_id: 9,
        MEDIA_CHANNEL_id: 1,
        tag: "Dance",
      },
      {
        MEDIA_id: 9,
        MEDIA_CHANNEL_id: 1,
        tag: "Kill",
      },
      {
        MEDIA_id: 10,
        MEDIA_CHANNEL_id: 1,
        tag: "Help",
      },
      {
        MEDIA_id: 10,
        MEDIA_CHANNEL_id: 1,
        tag: "Kill",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tags", null, {});
  },
};
