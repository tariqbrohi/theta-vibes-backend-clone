"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment_Reply_Likes extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        // as: "user",
        foreignKey: {
          name: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Comment_Reply, {
        as: "comment_reply",
        foreignKey: {
          name: "commentReplyId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Comment_Reply_Likes.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      commentReplyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "comment_replies",
          key: "id",
        },
      },

      like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      disLike: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Comment_Reply_Likes",
    }
  );
  return Comment_Reply_Likes;
};
