"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment_Reply extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: "userCommentReply",
        foreignKey: {
          name: "commentUserId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Comment, {
        as: "userCommentOnMedia",
        foreignKey: {
          name: "commentId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Comment_Reply.init(
    {
      commentUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      commentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "comments",
          key: "id",
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Comment_Reply",
    }
  );
  return Comment_Reply;
};
