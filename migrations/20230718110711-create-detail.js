"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      USER_email: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "email",
        },
      },
      MEDIA_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "media",
          key: "id",
        },
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      dislikes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      tip: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Details");
  },
};
