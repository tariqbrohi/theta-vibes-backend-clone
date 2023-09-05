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
        as: "user",
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Channel, {
        as: "channel",
        foreignKey: {
          name: "channelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Subscription.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      channelId: {
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
      subscriptionId: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "inActive",
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
