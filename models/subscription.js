"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
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
        as: "userChannel",
        foreignKey: {
          name: "CHANNEL_id",
        },
        onDelete: "cascade",
      });
    }
  }
  Subscription.init(
    {
      USER_email: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "email",
        },
      },
      CHANNEL_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      subscriptionDate: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Subscription",
    }
  );
  return Subscription;
};
