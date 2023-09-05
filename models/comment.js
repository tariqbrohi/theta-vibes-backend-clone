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
        as: "user",
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Channel, {
        as: "userChannel",
        foreignKey: {
          name: "mediaChannelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Media, {
        // as: "userMedia",
        foreignKey: {
          name: "mediaId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Comment_Reply, {
        //as: "replies",
        foreignKey: {
          name: "commentId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.Comment_Likes, {
        //as: "likes",
        foreignKey: {
          name: "commentId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      mediaChannelId: {
        type: DataTypes.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      mediaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "media",
          key: "id",
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        // defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
