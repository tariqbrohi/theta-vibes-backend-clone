module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Thumbnails", [
      {
        mediaId: 1,
        mediaChannelId: 1,
        image:
          "https://cdn.pixabay.com/photo/2023/05/30/17/25/door-8029228_1280.jpg",
      },
      {
        mediaId: 2,
        mediaChannelId: 1,
        image:
          "https://cdn.pixabay.com/photo/2023/05/30/17/25/door-8029228_1280.jpg",
      },
      {
        mediaId: 3,
        mediaChannelId: 1,
        image:
          "https://cdn.pixabay.com/photo/2023/05/30/17/25/door-8029228_1280.jpg",
      },
      {
        mediaId: 4,
        mediaChannelId: 2,
        image:
          "https://cdn.pixabay.com/photo/2019/07/24/23/09/car-4361321_640.jpg",
      },
      {
        mediaId: 5,
        mediaChannelId: 2,
        image:
          "https://cdn.pixabay.com/photo/2019/07/24/23/09/car-4361321_640.jpg",
      },
      {
        mediaId: 6,
        mediaChannelId: 3,
        image:
          "https://cdn.pixabay.com/photo/2019/07/24/23/09/car-4361321_640.jpg",
      },
      {
        mediaId: 7,
        mediaChannelId: 3,
        image:
          "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg",
      },
      {
        mediaId: 8,
        mediaChannelId: 1,
        image:
          "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg",
      },
      {
        mediaId: 9,
        mediaChannelId: 1,
        image:
          "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg",
      },
      {
        mediaId: 10,
        mediaChannelId: 1,
        image:
          "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Thumbnails", null, {});
  },
};
