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
          name: "CHANNEL_id",
        },
        onDelete: "cascade",
      });
    }
  }
  Fait.init(
    {
      CHANNEL_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "channels",
          key: "id",
        },
      },
      clientId: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      clientSecret: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      subscriptionPrice: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Fait",
    }
  );
  return Fait;
};
