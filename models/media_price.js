"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media_Price extends Model {
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
          name: "mediaChannelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Media, {
        as: "userChannel",
        foreignKey: {
          name: "mediaId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Media_Price.init(
    {
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
      fortyEightHoursAccess: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false,
      },
      lifeTimeAccess: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Media_Price",
    }
  );
  return Media_Price;
};
