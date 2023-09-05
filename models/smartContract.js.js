"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SmartContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

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
  SmartContract.init(
    {
      contractAddress: { type: DataTypes.STRING, allowNull: true },
      contractAbi: { type: DataTypes.TEXT, allowNull: true },
      channelId: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      modelName: "SmartContract",
    }
  );
  return SmartContract;
};
