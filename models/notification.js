"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "userNotification",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });
    }
  }
  Notification.init(
    {
      USER_email: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "email",
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
