"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "userComment",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });
      this.belongsTo(models.Channel, {
        as: "userMedia",
        foreignKey: {
          name: "MEDIA_CHANNEL_id",
        },
        onDelete: "cascade",
      });
      this.belongsTo(models.Media, {
        as: "userChannel",
        foreignKey: {
          name: "MEDIA_id",
        },
        onDelete: "cascade",
      });

      this.hasMany(models.Comment_Reply, {
        //as: "userChannel",
        foreignKey: {
          name: "COMMENTS_id",
        },
        onDelete: "cascade",
      });
    }
  }
  Comment.init(
    {
      USER_email: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "email",
        },
      },
      MEDIA_CHANNEL_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      MEDIA_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "media",
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
      modelName: "Comment",
    }
  );
  return Comment;
};
