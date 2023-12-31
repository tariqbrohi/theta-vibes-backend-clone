"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Channel, {
        // as: "userChannel",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });

      this.hasMany(models.Comment, {
        // as: "userChannel",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });

      this.hasMany(models.Comment_Reply, {
        // as: "userChannel",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });

      this.hasMany(models.Subscription, {
        //  as: "userChannel",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });

      this.hasMany(models.Notification, {
        //  as: "userChannel",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });

      this.hasMany(models.Detail, {
        //  as: "userChannel",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
      },
      cityOrState: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
