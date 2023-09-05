"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Media_Prices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MEDIA_CHANNEL_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      MEDIA_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "media",
          key: "id",
        },
      },
      fortyEightHoursAccess: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: false,
      },
      lifeTimeAccess: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable("Media_Prices");
  },
};
