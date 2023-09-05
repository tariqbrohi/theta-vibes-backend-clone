"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    }
  }
  Payment_Type.init(
    {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Payment_Type",
    }
  );
  return Payment_Type;
};
