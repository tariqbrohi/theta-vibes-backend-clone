module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Thumbnails", [
      {
        MEDIA_id: 1,
        MEDIA_CHANNEL_id: 1,
        image:
          "https://cdn.pixabay.com/photo/2023/05/30/17/25/door-8029228_1280.jpg",
      },
      {
        MEDIA_id: 2,
        MEDIA_CHANNEL_id: 1,
        image:
          "https://cdn.pixabay.com/photo/2023/05/30/17/25/door-8029228_1280.jpg",
      },
      {
        MEDIA_id: 3,
        MEDIA_CHANNEL_id: 1,
        image:
          "https://cdn.pixabay.com/photo/2023/05/30/17/25/door-8029228_1280.jpg",
      },
      {
        MEDIA_id: 4,
        MEDIA_CHANNEL_id: 2,
        image:
          "https://cdn.pixabay.com/photo/2019/07/24/23/09/car-4361321_640.jpg",
      },
      {
        MEDIA_id: 5,
        MEDIA_CHANNEL_id: 2,
        image:
          "https://cdn.pixabay.com/photo/2019/07/24/23/09/car-4361321_640.jpg",
      },
      {
        MEDIA_id: 6,
        MEDIA_CHANNEL_id: 3,
        image:
          "https://cdn.pixabay.com/photo/2019/07/24/23/09/car-4361321_640.jpg",
      },
      {
        MEDIA_id: 7,
        MEDIA_CHANNEL_id: 3,
        image:
          "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg",
      },
      {
        MEDIA_id: 8,
        MEDIA_CHANNEL_id: 1,
        image:
          "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg",
      },
      {
        MEDIA_id: 9,
        MEDIA_CHANNEL_id: 1,
        image:
          "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg",
      },
      {
        MEDIA_id: 10,
        MEDIA_CHANNEL_id: 1,
        image:
          "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Thumbnails", null, {});
  },
};
