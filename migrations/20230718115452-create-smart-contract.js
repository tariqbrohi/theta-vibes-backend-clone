"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Smart_Contracts", {
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
      contractAddress: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false,
      },
      contractABI: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: false,
      },
      functionName: {
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
    await queryInterface.dropTable("Smart_Contracts");
  },
};
