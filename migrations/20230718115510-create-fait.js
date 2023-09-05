"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Faits", {
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
      clientId: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false,
      },
      clientSecret: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false,
      },
      subscriptionPrice: {
        type: Sequelize.STRING,
        defaultValue: false,
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
    await queryInterface.dropTable("Faits");
  },
};
