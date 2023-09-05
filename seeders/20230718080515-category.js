module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Music",
      },
      {
        name: "Sports",
      },
      {
        name: "Gaming",
      },
      {
        name: "Education",
      },
      {
        name: "News",
      },
      {
        name: "Movies",
      },
      {
        name: "Fashion",
      },
      {
        name: "Food",
      },
      {
        name: "Travel",
      },
      {
        name: "Lifestyle",
      },
      {
        name: "Technology",
      },
      {
        name: "Science",
      },
      {
        name: "Animals",
      },
      {
        name: "Vehicles",
      },
      {
        name: "Comedy",
      },
      {
        name: "Entertainment",
      },
      {
        name: "Others",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
