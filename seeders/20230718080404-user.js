module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "ilyasdev3@gmail.com",
        firstName: "Ilyas",
        lastName: "Khan",
        isVerified: 1,
        isContentCreator: 1,
        country: "Pakistan",
        cityOrState: "Islamabad",
        description: "Ilyas Khan is a good boy, he can do much better",
        profileImage:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60",
        password:
          "$2b$10$m1KRPTMck3c7BaVMLTdnoOfr3.U829z2jckS3j77SGaFMQYwBgdsK",
      },
      {
        email: "saudawan@gmail.com",
        firstName: "Saud",
        lastName: "Awan",
        isVerified: 1,
        isContentCreator: 1,
        country: "",
        cityOrState: "",
        description: "",
        profileImage:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
        password:
          "$2b$10$m1KRPTMck3c7BaVMLTdnoOfr3.U829z2jckS3j77SGaFMQYwBgdsK",
      },
      {
        email: "tariqbrohi@gmail.com",
        firstName: "Tariq",
        lastName: "Brohi",
        isVerified: 1,
        isContentCreator: 1,
        country: "Pakistan",
        cityOrState: "Rawalpindi",
        description: "Tariq Brohi is a good boy, he can do much better",
        profileImage:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60",
        password:
          "$2b$10$m1KRPTMck3c7BaVMLTdnoOfr3.U829z2jckS3j77SGaFMQYwBgdsK",
      },
      {
        email: "waqarnazir@gmail.com",
        firstName: "Muhammad Waqar",
        lastName: "Nazir",
        isVerified: 1,
        isContentCreator: 0,
        country: "Pakistan",
        cityOrState: "Islamabad",
        description: "Waqar Nazir is a good boy, he can do much better",
        profileImage: null,
        password:
          "$2b$10$m1KRPTMck3c7BaVMLTdnoOfr3.U829z2jckS3j77SGaFMQYwBgdsK",
      },
      {
        email: "shahzaib@gmail.com",
        firstName: "Shahzaib",
        lastName: "Arshad",
        isVerified: 1,
        isContentCreator: 0,
        country: "England",
        cityOrState: "Rawalpindi",
        description: "Shahzaib Arshad is a good boy, he can do much better",
        profileImage:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
        password:
          "$2b$10$m1KRPTMck3c7BaVMLTdnoOfr3.U829z2jckS3j77SGaFMQYwBgdsK",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
