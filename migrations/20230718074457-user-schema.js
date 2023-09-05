"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isNumeric: true,
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        // defaultValue: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        // defaultValue: false,
      },
      isContentCreator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      passwordResetSecret: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
        // defaultValue: false,
      },
      cityOrState: {
        type: Sequelize.STRING,
        allowNull: true,
        // defaultValue: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        // defaultValue: false,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      coverImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        // defaultValue: false,
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
