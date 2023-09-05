"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comment_Replies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      COMMENTS_USER_email: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "email",
        },
      },
      COMMENTS_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "comments",
          key: "id",
        },
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable("Comment_Replies");
  },
};
