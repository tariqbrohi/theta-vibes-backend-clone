module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Channels", [
      {
        USER_email: "waqas3399nazir@gmail.com",
        name: "Altaurux Team",
        profileImage:
          "https://images.unsplash.com/photo-1610145977671-e7c3902aaae9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhbm5lciUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1600&q=60",
        bannerImage:
          "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFubmVyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1600&q=60",
        description:
          "This is Altaurux Team channel, you will find this channel interesting and will enjoy this channel content",
      },
      {
        USER_email: "waqasnazirm@gmail.com",
        name: "Fun Ground Valley",
        profileImage:
          "https://plus.unsplash.com/premium_photo-1661508732718-7323c560fb52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJhbm5lciUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1600&q=60",
        bannerImage:
          "https://plus.unsplash.com/premium_photo-1661508732718-7323c560fb52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJhbm5lciUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1600&q=60",
        description:
          "This is Fun Ground Valley channel, you will find this channel interesting and will enjoy this channel content",
      },
      {
        USER_email: "tariqbrohi@gmail.com",
        name: "The Mafia",
        profileImage:
          "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFubmVyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1600&q=60",
        bannerImage:
          "https://images.unsplash.com/photo-1610145977671-e7c3902aaae9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhbm5lciUyMGltYWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1600&q=60",
        description:
          "This is The Mafia channel, you will find this channel interesting and will enjoy this channel content",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Channels", null, {});
  },
};
