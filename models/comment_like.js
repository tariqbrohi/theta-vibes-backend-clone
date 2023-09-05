"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment_Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      this.belongsTo(models.Comment, {
        as: "comment",
        foreignKey: {
          name: "commentId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Comment_Likes.init(
    {
      userId: {
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
      modelName: "Comment_Likes",
    }
  );
  return Comment_Likes;
};
