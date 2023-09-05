"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Channels", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      bannerImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },

      usdPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tfuelPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tvibePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalEarned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      underTaking: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable("Channels");
  },
};
