"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment_Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "userCommentReply",
        foreignKey: {
          name: "COMMENTS_USER_email",
        },
        onDelete: "cascade",
      });
      this.belongsTo(models.Comment, {
        as: "userCommentOnMedia",
        foreignKey: {
          name: "COMMENTS_id",
        },
        onDelete: "cascade",
      });
    }
  }
  Comment_Reply.init(
    {
      COMMENTS_USER_email: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "email",
        },
      },
      COMMENTS_id: {
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
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      dislikes: {
        type: DataTypes.INTEGER,
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
