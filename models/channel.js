"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "userChannel",
        foreignKey: {
          name: "USER_email",
        },
        onDelete: "cascade",
      });

      this.hasMany(models.Subscription, {
        //as: "userChannel",
        foreignKey: {
          name: "CHANNEL_id",
        },
        onDelete: "cascade",
      });

      this.hasMany(models.Comment, {
        //as: "channelMedia",
        foreignKey: {
          name: "MEDIA_CHANNEL_id",
        },
        onDelete: "cascade",
      });

      //
      this.hasMany(models.Thumbnail, {
        //as: "channelMedia",
        foreignKey: {
          name: "MEDIA_CHANNEL_id",
        },
        onDelete: "cascade",
      });
      this.hasMany(models.Tag, {
        //as: "channelMedia",
        foreignKey: {
          name: "MEDIA_CHANNEL_id",
        },
        onDelete: "cascade",
      });
      this.hasMany(models.Media_Price, {
        //as: "channelMedia",
        foreignKey: {
          name: "MEDIA_CHANNEL_id",
        },
        onDelete: "cascade",
      });
      this.hasMany(models.Payment_Type, {
        //as: "channelMedia",
        foreignKey: {
          name: "MEDIA_CHANNEL_id",
        },
        onDelete: "cascade",
      });
      //

      //
      this.hasOne(models.Smart_Contract, {
        //as: "userChannel",
        foreignKey: {
          name: "CHANNEL_id",
        },
        onDelete: "cascade",
      });
      this.hasOne(models.Metamask, {
        //as: "userChannel",
        foreignKey: {
          name: "CHANNEL_id",
        },
        onDelete: "cascade",
      });
      this.hasOne(models.Fait, {
        //as: "userChannel",
        foreignKey: {
          name: "CHANNEL_id",
        },
        onDelete: "cascade",
      });
      //
    }
  }
  Channel.init(
    {
      USER_email: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "email",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      bannerImage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Channel",
    }
  );
  return Channel;
};
