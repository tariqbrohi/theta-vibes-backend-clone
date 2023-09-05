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
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Comment, {
        // as: "userChannel",
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Comment_Reply, {
        // as: "userChannel",
        foreignKey: {
          name: "commentUserId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Subscription, {
        //  as: "userChannel",
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Notification, {
        //  as: "userChannel",
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(models.Detail, {
        //  as: "userChannel",
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          isNumeric: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // defaultValue: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // defaultValue: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // defaultValue: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isContentCreator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: false,
      },
      cityOrState: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: false,
      },
      passwordResetSecret: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
