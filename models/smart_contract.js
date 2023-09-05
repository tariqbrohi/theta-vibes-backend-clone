"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Smart_Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Channel, {
        as: "smartContractChannel",
        foreignKey: {
          name: "CHANNEL_id",
        },
        onDelete: "cascade",
      });
    }
  }
  Smart_Contract.init(
    {
      CHANNEL_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      contractAddress: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      contractABI: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      functionName: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Smart_Contract",
    }
  );
  return Smart_Contract;
};
