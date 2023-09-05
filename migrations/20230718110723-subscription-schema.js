"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Subscriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      channelId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Channels",
          key: "id",
        },
      },
      subscriptionDate: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false,
      },
      subscriptionId: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "inActive",
        allowNull: false,
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
    await queryInterface.dropTable("Subscriptions");
  },
};
