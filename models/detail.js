"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
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
      this.belongsTo(models.Media, {
        as: "userChannel",
        foreignKey: {
          name: "MEDIA_id",
        },
        onDelete: "cascade",
      });
    }
  }
  Detail.init(
    {
      USER_email: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "email",
        },
      },

      MEDIA_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "media",
          key: "id",
        },
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      tip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Detail",
    }
  );
  return Detail;
};
