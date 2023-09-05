"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Metamask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Channel, {
        as: "metamaskChannel",
        foreignKey: {
          name: "CHANNEL_id",
        },
        onDelete: "cascade",
      });
    }
  }
  Metamask.init(
    {
      CHANNEL_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      walletAddress: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      TVibeSubscriptionPrice: {
        type: DataTypes.INTEGER,
        defaultValue: false,
        allowNull: true,
      },
      TFuelSubscriptionPrice: {
        type: DataTypes.INTEGER,
        defaultValue: false,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Metamask",
    }
  );
  return Metamask;
};
