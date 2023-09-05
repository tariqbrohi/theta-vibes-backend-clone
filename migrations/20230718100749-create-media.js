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
      CHANNEL_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "channels",
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
      category: {
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
        defaultValue: false,
      },
      dateCreated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
