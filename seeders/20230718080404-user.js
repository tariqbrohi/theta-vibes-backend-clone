module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "ahsannazir@gmail.com",
        firstName: "Ahsan",
        lastName: "Nazir",
        emailVerified: 1,
        userType: "creator",
        country: "Pakistan",
        cityOrState: "Islamabad",
        description: "Ahsan Nazir is a good boy, he can do much better",
        profileImage:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60",
        password:
          "$2b$10$G0jPpps3puOnpoHAVxxKge/4Zii5as8tsVE4iSuNa4LTtmlqheFqW",
      },
      {
        email: "hassannazir@gmail.com",
        firstName: "Hassan",
        lastName: "Nazir",
        emailVerified: 1,
        userType: "user",
        country: "",
        cityOrState: "",
        description: "",
        profileImage:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
        password:
          "$2b$10$jYYfrTnUJa2bGl61CsDIh.Mgy3oMCfGaNGYawP/WRRXg2qQXE6kVq",
      },
      {
        email: "tariqbrohi@gmail.com",
        firstName: "Tariq",
        lastName: "Brohi",
        emailVerified: 1,
        userType: "user",
        country: "Pakistan",
        cityOrState: "Rawalpindi",
        description: "Tariq Brohi is a good boy, he can do much better",
        profileImage:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60",
        password:
          "$2b$10$H3XZKlMaZc1fSWnwNh4dQu6geisVCFjP9LNZ6iJveK7cQW8zY79yK",
      },
      {
        email: "waqarnazir@gmail.com",
        firstName: "Muhammad Waqar",
        lastName: "Nazir",
        emailVerified: 1,
        userType: "creator",
        country: "Pakistan",
        cityOrState: "Islamabad",
        description: "Waqar Nazir is a good boy, he can do much better",
        profileImage: null,
        password:
          "$2b$10$ARFZIWhU6XCzH7fUZEqqOuC6cVpF3N5WIU0LpXH2RjxANDa8TQx0O",
      },
      {
        email: "waqas3399nazir@gmail.com",
        firstName: "Waqas",
        lastName: "Nazir Khan",
        emailVerified: 1,
        userType: "creator",
        country: "England",
        cityOrState: "Rawalpindi",
        description: "Waqas Nazir is a good boy, he can do much better",
        profileImage:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
        password:
          "$2b$10$cuE4nVTu1J881LV2BhQEN.oB2YR3jLjJlp2JdTaQvdP0VMPciuNmS",
      },
      {
        email: "waqasnazirm@gmail.com",
        firstName: "Waqas",
        lastName: "Nazir",
        emailVerified: 1,
        userType: "user",
        country: "Pakistan",
        cityOrState: "Rawalpindi",
        description: "Waqas Nazir is a good boy, he can do much better",
        profileImage:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60",
        password:
          "$2b$10$cuE4nVTu1J881LV2BhQEN.oB2YR3jLjJlp2JdTaQvdP0VMPciuNmS",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
