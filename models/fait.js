"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fait extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Channel, {
        as: "faitChannel",
        foreignKey: {
          name: "channelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Fait.init(
    {
      channelId: {
        type: DataTypes.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      priceId: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      connectAccountId: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      subscriptionPriceId: {
        type: DataTypes.INTEGER,
        // defaultValue: false,
        // allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Fait",
    }
  );
  return Fait;
};
