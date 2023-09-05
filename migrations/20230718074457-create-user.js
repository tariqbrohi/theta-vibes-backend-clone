"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false,
      },
      cityOrState: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
