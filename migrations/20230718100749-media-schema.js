"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Media", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      channelId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Channels",
          key: "id",
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      ageRestriction: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      accessType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      mediaType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      mediaTokenLimit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null, // Change the defaultValue to null or remove it
      },
      videoPreview: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },

      views: {
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
    await queryInterface.dropTable("Media");
  },
};
